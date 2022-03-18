import React from 'react';
import {useVinContext} from '../../../utils/providers/VinContextProvider';
import VinInputControl from './VinInputControl';

function VinInputGroup() {
  const {vin} = useVinContext();
  const vinLength = vin.length.toString().padStart(2, '0');
  return (
    <section className='input-group'>
      <span className='input-group-text text-muted'>{vinLength}</span>
      <VinInputControl />
      <button type='submit' className='btn btn-secondary'>
        Decode
      </button>
    </section>
  );
}

export default VinInputGroup;
