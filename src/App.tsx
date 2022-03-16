import axios from 'axios';
import _ from 'lodash';
import React, {useState} from 'react';

/** This interface specifies a response from the vPIC API */
interface IVehicleApiResponse<T> {
  Count: number;
  Message: string;
  SearchCriteria: string | null;
  Results: T[];
}

/** This interface specifies a vehicle attribute */
interface IAttributeValue {
  VariableId: number; // IAttributeVariable->ID
  Variable: string;
  ValueId: string | null;
  Value: string | null;
}

function App() {
  const [vin, setVin] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);
  const [vehicle, setVehicle] = useState<IAttributeValue[]>([]);
  const [isLoading, toggleLoading] = useState<boolean>(false);

  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();

    // early return for an incomplete VIN
    if (vin.length !== 17) {
      setMessages(['VIN must be 17 characters']);
      setVehicle([]);
      return;
    }

    // always activate the loader
    toggleLoading(true);

    let uri = `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvaluesextended/${vin}?format=json`;
    axios
      .get<IVehicleApiResponse<{[key: string]: string}>>(uri)
      .then((response) => {
        let {data} = response;

        // early return when no decoder values are given
        if (!data.Count) {
          setMessages([data.Message || 'No results were found.']);
          setVehicle([]);
          return;
        }

        // results are guaranteed by data.Count
        let decoder = _.head(data.Results) || {};

        // read all possible error messages
        const pendingMessages = [data.Message];
        pendingMessages.push(..._.split(decoder.ErrorText, '; '));
        pendingMessages.push(..._.split(decoder.AdditionalErrorText, '; '));
        if (decoder.SuggestedVIN) {
          pendingMessages.push(`Suggested VIN: ${decoder.SuggestedVIN}`);
        }
        setMessages(_.compact(pendingMessages));
        setVehicle(formatDecodedVehicle(decoder));
      })
      .catch((error) => {
        setMessages([error.message]);
        setVehicle([]);
      })
      // always disable the loader
      .finally(() => toggleLoading(false));
  };

  const handleInput = (event: any) => {
    setVin(
      event.target.value
        .toUpperCase()
        .replace(/[^A-Z\d]/gi, '')
        .replace('O', '0')
        .replace('I', '1')
        .replace('Q', '9')
    );
  };

  return (
    <React.Fragment>
      <header className='mb-3 border-bottom'>
        <nav className='navbar navbar-light bg-light'>
          <section className='container'>
            <span className='navbar-brand d-flex align-items-center'>
              <img
                alt=''
                src={`${process.env.PUBLIC_URL}/manifest/icons/icon-30x30.png`}
                className='me-3'
              />
              VIN Decoder
            </span>
          </section>
        </nav>
      </header>
      <section className='flex-grow-1 flex-shrink-1 mb-3'>
        <section className='container mb-3'>
          <form onSubmit={handleSubmit}>
            <section className='input-group'>
              <span className='input-group-text text-muted'>
                {vin.length.toString().padStart(2, '0')}
              </span>
              <input
                type='text'
                className='form-control'
                placeholder='Enter a VIN'
                maxLength={17}
                value={vin}
                onInput={handleInput}
                autoFocus
              />
              <button type='submit' className='btn btn-secondary'>
                Decode
              </button>
            </section>
          </form>
        </section>
        {!!messages.length && !isLoading && (
          <section className='container mb-3'>
            <ul className='list-group'>
              {messages.map((message, index) => (
                <li
                  key={index}
                  className='list-group-item list-group-item-light'
                >
                  {message}
                </li>
              ))}
            </ul>
          </section>
        )}
        {!!vehicle.length && !isLoading && (
          <section className='container mb-3'>
            <table className='table table-sm table-striped table-hover'>
              <tbody>
                {vehicle.map((attribute, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td>{attribute.Variable}</td>
                      <td>{attribute.Value}</td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </section>
      {isLoading && (
        <section className='d-flex flex-column align-items-center flex-grow-1'>
          <section className='container text-center'>
            <span className='text-secondary fa-5x'>
              <i className='fa-solid fa-spinner fa-spin-pulse' />
            </span>
          </section>
        </section>
      )}
      <footer className='container text-center'>
        <section className='border-top d-inline-block p-2'>
          rDuckDev © {new Date().getFullYear()} | All rights reserved
        </section>
      </footer>
    </React.Fragment>
  );
}

function formatDecodedVehicle(vehicle: any) {
  return [
    {
      VariableId: 0,
      Variable: 'Year',
      ValueId: null,
      Value: vehicle.ModelYear,
    },
    {VariableId: 1, Variable: 'Make', ValueId: null, Value: vehicle.Make},
    {VariableId: 2, Variable: 'Model', ValueId: null, Value: vehicle.Model},
    {VariableId: 3, Variable: 'Trim', ValueId: null, Value: vehicle.Trim},
    {
      VariableId: 4,
      Variable: 'Series',
      ValueId: null,
      Value: vehicle.Series,
    },
    {
      VariableId: 5,
      Variable: 'Body type',
      ValueId: null,
      Value: formatBodyType(vehicle),
    },
    {
      VariableId: 6,
      Variable: 'Driveline',
      ValueId: null,
      Value: vehicle.DriveType,
    },
    {
      VariableId: 7,
      Variable: 'Engine',
      ValueId: null,
      Value: formatEngine(vehicle),
    },
    {
      VariableId: 8,
      Variable: 'Fuel',
      ValueId: null,
      Value: formatFuel(vehicle),
    },
    {
      VariableId: 9,
      Variable: 'Transmission',
      ValueId: null,
      Value: formatTransmission(vehicle),
    },
    {
      VariableId: 10,
      Variable: 'Vehicle type',
      ValueId: null,
      Value: vehicle.VehicleType,
    },
    {VariableId: 11, Variable: 'Weight', ValueId: null, Value: vehicle.GVWR},
    {
      VariableId: 12,
      Variable: 'Manufacturer',
      ValueId: null,
      Value: vehicle.Manufacturer,
    },
    {
      VariableId: 13,
      Variable: 'Plant',
      ValueId: null,
      Value: formatPlant(vehicle),
    },
  ];
}

function formatBodyType(vehicle: any) {
  let body = [];

  if (vehicle.Doors) body.push(vehicle.Doors + ' Door ');
  if (vehicle.BodyClass) body.push(vehicle.BodyClass);

  return body.join('').trim();
}

function formatEngine(vehicle: any) {
  let engine = [];

  if (vehicle.EngineCylinders)
    engine.push(
      formatEngineBlock(vehicle.EngineConfiguration) + vehicle.EngineCylinders
    );

  if (vehicle.VehicleType.toLowerCase().indexOf('motorcycle') > -1) {
    // compose engine data for motorcycles
    if (vehicle.DisplacementCC) engine.push(vehicle.DisplacementCC + ' CC');
  } else {
    // compose engine data for standard vehicles
    if (vehicle.DisplacementL) {
      let displacement =
        parseFloat(vehicle.DisplacementL).toFixed(1).toString() + 'L';

      if (vehicle.DisplacementCI)
        displacement +=
          ' (' + parseInt(vehicle.DisplacementCI).toString() + ' CI)';

      engine.push(displacement);
    }
    if (vehicle.FuelInjectionType) {
      if (vehicle.FuelInjectionType.indexOf('(') > -1) {
        let startIndex = vehicle.FuelInjectionType.indexOf('(') + 1,
          finishIndex = vehicle.FuelInjectionType.indexOf(')'),
          injectionType = vehicle.FuelInjectionType.substring(
            startIndex,
            finishIndex
          );

        engine.push(injectionType);
      }
      if (vehicle.FuelInjectionType.toLowerCase().indexOf('carburet') > -1)
        engine.push('Carb');
    }
    if (vehicle.Turbo.toLowerCase().indexOf('yes') > -1) engine.push('Turbo');
    if (vehicle.OtherEngineInfo.toLowerCase().indexOf('supercharge') > -1)
      engine.push('Supercharged');
    if (vehicle.ValveTrainDesign) {
      if (vehicle.ValveTrainDesign.toUpperCase().indexOf('SOHC') > -1)
        engine.push('SOHC');
      if (vehicle.ValveTrainDesign.toUpperCase().indexOf('DOHC') > -1)
        engine.push('DOHC');
    }
  }

  return engine.join('; ').trim();
}

function formatEngineBlock(block: string) {
  if (block.replace(' ', '-') === 'In-Line') return 'L';
  if (block.replace(' ', '-') === 'V-Shaped') return 'V';
  if (block.replace(' ', '-') === 'W-Shaped') return 'W';

  return 'Cyl-';
}

function formatFuel(vehicle: any) {
  let fuel = [];

  if (vehicle.FuelTypePrimary) fuel.push(vehicle.FuelTypePrimary);
  if (vehicle.FuelTypeSecondary) fuel.push(vehicle.FuelTypeSecondary);

  return fuel.join('; ');
}

function formatTransmission(vehicle: any) {
  let transmission = [];

  if (vehicle.TransmissionSpeeds)
    transmission.push(vehicle.TransmissionSpeeds + ' speed ');
  if (vehicle.TransmissionStyle) transmission.push(vehicle.TransmissionStyle);

  return transmission.join('').trim();
}

function formatPlant(vehicle: any) {
  let plant = [];

  if (vehicle.PlantCity) plant.push(vehicle.PlantCity);
  if (vehicle.PlantState) plant.push(vehicle.PlantState);
  if (vehicle.PlantCountry) plant.push(vehicle.PlantCountry);

  return plant.join(', ').trim();
}

export default App;
