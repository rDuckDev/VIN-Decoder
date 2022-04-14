import _ from 'lodash';
import React from 'react';
import {useDecoderContext} from '../../../utils/providers/DecoderContextProvider';
import DecoderResults from '../helpers/DecoderResults';
import DecoderTableRow from './DecoderTableRow';

const ATTRIBUTES = DecoderResults.getAttributeMap();

function DecoderTable() {
  const {vehicle} = useDecoderContext();
  const attributes: any[] = getSummaryTable(vehicle);

  return (
    <React.Fragment>
      {!!attributes.length && (
        <section className='container my-3'>
          <table className='table table-sm table-striped table-hover m-0'>
            <tbody>
              {attributes.map((attribute, index) => (
                <DecoderTableRow
                  key={index}
                  label={attribute.Variable}
                  value={attribute.Value || ''}
                />
              ))}
            </tbody>
          </table>
        </section>
      )}
    </React.Fragment>
  );
}

function getSummaryTable(vehicle: DecoderResults | undefined) {
  if (!vehicle) return [];

  return [
    {
      VariableId: 0,
      Variable: 'Year',
      ValueId: null,
      Value: vehicle.getAttributeValue(ATTRIBUTES.model_year),
    },
    {
      VariableId: 1,
      Variable: 'Make',
      ValueId: null,
      Value: vehicle.getAttributeValue(ATTRIBUTES.make),
    },
    {
      VariableId: 2,
      Variable: 'Model',
      ValueId: null,
      Value: vehicle.getAttributeValue(ATTRIBUTES.model),
    },
    {
      VariableId: 3,
      Variable: 'Trim',
      ValueId: null,
      Value: vehicle.getAttributeValue(ATTRIBUTES.trim),
    },
    {
      VariableId: 4,
      Variable: 'Series',
      ValueId: null,
      Value: vehicle.getAttributeValue(ATTRIBUTES.series),
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
      Value: vehicle.getAttributeValue(ATTRIBUTES.drive_type),
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
      Value: vehicle.getAttributeValue(ATTRIBUTES.vehicle_type),
    },
    {
      VariableId: 11,
      Variable: 'Weight',
      ValueId: null,
      Value: vehicle.getAttributeValue(
        ATTRIBUTES.gross_vehicle_weight_rating_from
      ),
    },
    {
      VariableId: 12,
      Variable: 'Manufacturer',
      ValueId: null,
      Value: vehicle.getAttributeValue(ATTRIBUTES.manufacturer_name),
    },
    {
      VariableId: 13,
      Variable: 'Plant',
      ValueId: null,
      Value: formatPlant(vehicle),
    },
  ];
}

function formatBodyType(vehicle: DecoderResults) {
  const doorCount = vehicle.getAttributeValue(ATTRIBUTES.doors);

  return _.compact([
    doorCount ? `${doorCount} Door` : '',
    vehicle.getAttributeValue(ATTRIBUTES.body_class),
  ]).join(' ');
}

function formatEngine(vehicle: DecoderResults) {
  const isMotorcycle = _.includes(
    vehicle.getAttributeValue(ATTRIBUTES.vehicle_type),
    'MOTORCYCLE'
  );

  const engineBlock = (() => {
    let block = vehicle.getAttributeValue(ATTRIBUTES.engine_configuration);
    let cyl = vehicle.getAttributeValue(ATTRIBUTES.engine_number_of_cylinders);

    if (!cyl) return '';

    block = (block || 'Cyl-')
      .replace('In-Line', 'L')
      .replace('V-Shaped', 'V')
      .replace('W-Shaped', 'W');

    return _.compact([block, cyl]).join('');
  })();

  const displacement = (() => {
    const uom = {
      L: vehicle.getAttributeValue(ATTRIBUTES.displacement_l),
      CI: vehicle.getAttributeValue(ATTRIBUTES.displacement_ci),
      CC: vehicle.getAttributeValue(ATTRIBUTES.displacement_cc),
    };

    // early return CCs for a motorcycle
    if (isMotorcycle) return uom.CC ? `${Number(uom.CC).toFixed(0)} CC` : '';

    let liter = uom.L ? `${Number(uom.L).toFixed(1)}L` : '';
    let ci = uom.CI ? `${Number(uom.CI).toFixed(0)} CI` : '';
    if (liter && ci) ci = `(${ci})`;

    return _.compact([liter, ci]).join(' ');
  })();

  const fuelDelivery = (() => {
    const delivery = vehicle.getAttributeValue(
      ATTRIBUTES.fuel_delivery_fuel_injection_type
    );

    // early return for carbureted engines
    if (_.includes(delivery, 'CARBURET')) return 'Carb';

    return _.chain(delivery)
      .words(/\(.*?\)/gi)
      .trim('()')
      .value();
  })();

  const forcedInduction = (() => {
    const hasTurbo = _.chain(vehicle.getAttributeValue(ATTRIBUTES.turbo))
      .lowerCase()
      .includes('yes')
      .value();

    const hasSuper = _.chain(
      vehicle.getAttributeValue(ATTRIBUTES.other_engine_info)
    )
      .lowerCase()
      .includes('supercharge')
      .value();

    return _.compact([
      hasTurbo ? 'Turbo' : '',
      hasSuper ? 'Supercharged' : '',
    ]).join('; ');
  })();

  const valveDesign = (() => {
    return _.chain(vehicle.getAttributeValue(ATTRIBUTES.valve_train_design))
      .words(/\((?:SOHC|DOHC)\)/gi)
      .trim('()')
      .value();
  })();

  return _.compact([
    engineBlock,
    displacement,
    fuelDelivery,
    forcedInduction,
    valveDesign,
  ]).join('; ');
}

function formatFuel(vehicle: DecoderResults) {
  return _.compact([
    vehicle.getAttributeValue(ATTRIBUTES.fuel_type_primary),
    vehicle.getAttributeValue(ATTRIBUTES.fuel_type_secondary),
  ]).join('; ');
}

function formatTransmission(vehicle: DecoderResults) {
  const speedCount = vehicle.getAttributeValue(ATTRIBUTES.transmission_speeds);

  return _.compact([
    speedCount ? `${speedCount} speed` : '',
    vehicle.getAttributeValue(ATTRIBUTES.transmission_style),
  ]).join(' ');
}

function formatPlant(vehicle: DecoderResults) {
  return _.compact([
    vehicle.getAttributeValue(ATTRIBUTES.plant_city),
    vehicle.getAttributeValue(ATTRIBUTES.plant_state),
    vehicle.getAttributeValue(ATTRIBUTES.plant_country),
  ]).join(', ');
}

export default React.memo(DecoderTable);
