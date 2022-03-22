import React from 'react';
import {useDecoderContext} from '../../../utils/providers/DecoderContextProvider';

function DecoderBodyClassImage() {
  const {attributes} = useDecoderContext();

  const bodyClass = attributes.find(
    // TODO: fix for non-flat API method
    (attribute) => attribute.Variable === 'Body type'
  );

  return (
    <React.Fragment>
      {bodyClass && bodyClass.ValueId && (
        <section className='container my-3'>
          <section className='card'>
            <section className='card-body row justify-content-center g-0'>
              <section className='col-10 col-md-8 col-lg-6'>
                <img
                  alt={`A likeness of the ${bodyClass.Value} body type`}
                  src={`${process.env.PUBLIC_URL}/images/body-class/${bodyClass.ValueId}.png`}
                  className='img-fluid w-100'
                />
              </section>
            </section>
          </section>
        </section>
      )}
    </React.Fragment>
  );
}

// TODO: fix for non-flat API method
export function getBodyClassID(bodyClass: string): string {
  const options: any = {
    'Convertible/Cabriolet': 1,
    Minivan: 2,
    Coupe: 3,
    'Low Speed Vehicle (LSV) / Neighborhood Electric Vehicle (NEV)': 4,
    'Hatchback/Liftback/Notchback': 5,
    'Motorcycle - Standard': 6,
    'Sport Utility Vehicle (SUV)/Multi-Purpose Vehicle (MPV)': 7,
    'Crossover Utility Vehicle (CUV)': 8,
    Van: 9,
    Roadster: 10,
    Truck: 11,
    'Motorcycle - Scooter': 12,
    'Sedan/Saloon': 13,
    Wagon: 15,
    Bus: 16,
    Pickup: 60,
    Trailer: 61,
    'Incomplete - Cutaway': 62,
    'Incomplete - Chassis Cab (Single Cab)': 63,
    'Truck-Tractor': 66,
    'Incomplete - Stripped Chassis': 67,
    'Streetcar / Trolley': 68,
    'Off-road Vehicle - All Terrain Vehicle (ATV) (Motorcycle-style)': '69.png',
    'Incomplete - School Bus Chassis': 71,
    'Incomplete - Commercial Bus Chassis': 72,
    'Bus - School Bus': 73,
    'Incomplete - Chassis Cab (Number of Cab Unknown)': 74,
    'Incomplete - Transit Bus Chassis': 75,
    'Incomplete - Motor Coach Chassis': 76,
    'Incomplete - Shuttle Bus Chassis': 77,
    'Incomplete - Motor Home Chassis': 78,
    'Motorcycle - Sport': 80,
    'Motorcycle - Touring / Sport Touring': 81,
    'Motorcycle - Cruiser': 82,
    'Motorcycle - Trike': 83,
    'Off-road Vehicle - Dirt Bike / Off-Road': 84,
    'Motorcycle - Dual Sport / Adventure / Supermoto / On/Off-Road': 85,
    'Off-road Vehicle - Enduro (Off-road long distance racing)': 86,
    'Motorcycle - Custom': 94,
    'Cargo Van': 95,
    'Off-road Vehicle - Snowmobile': 97,
    'Motorcycle - Street': 98,
    'Motorcycle - Enclosed Three Wheeled / Enclosed Autocycle': 100,
    'Motorcycle - Unenclosed Three Wheeled / Open Autocycle': 103,
    'Off-road Vehicle - Golf Cart': 124,
  };
  return options[bodyClass] || null;
}

export default React.memo(DecoderBodyClassImage);
