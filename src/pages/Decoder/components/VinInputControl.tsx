import React from 'react';
import {useVinContext} from '../../../utils/providers/VinContextProvider';

function VinInputControl() {
  const {vin, setVin} = useVinContext();

  function handleInput(event: React.MouseEvent<HTMLInputElement>) {
    setVin(
      event.currentTarget.value
        .toUpperCase()
        .replace(/[^A-Z\d]/g, '')
        .replace(/O/g, '0')
        .replace(/I/g, '1')
        .replace(/Q/g, '9')
    );
  }

  return (
    <input
      type='text'
      className='form-control'
      placeholder='Enter a 17 character VIN'
      value={vin}
      onInput={handleInput}
      maxLength={17}
      autoFocus
    />
  );
}

export default React.memo(VinInputControl);
