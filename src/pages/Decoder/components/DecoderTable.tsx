import React from 'react';
import {useDecoderContext} from '../../../utils/providers/DecoderContextProvider';
import DecoderTableRow from './DecoderTableRow';

function DecoderTable() {
  const {attributes} = useDecoderContext();

  return (
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
  );
}

export default React.memo(DecoderTable);
