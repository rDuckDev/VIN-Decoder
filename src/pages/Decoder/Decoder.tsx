import React from 'react';
import VehicleApiService from '../../api/services/VehicleApiService';
import ProgressSpinner from '../../components/ProgressSpinner';
import {useDecoderContext} from '../../utils/providers/DecoderContextProvider';
import {useVinContext} from '../../utils/providers/VinContextProvider';
import DecoderBodyClassImage from './components/DecoderBodyClassImage';
import DecoderTable from './components/DecoderTable';
import MessageList from './components/MessageList';
import VinInputGroup from './components/VinInputGroup';
import DecoderResults from './helpers/DecoderResults';

function Decoder() {
  const {vin} = useVinContext();
  const {setVehicle, isDecoding, toggleDecoding} = useDecoderContext();
  const [messages, setMessages] = React.useState<string[]>([]);

  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();

    // early return for an incomplete VIN
    if (vin.length !== 17) {
      setMessages(['VIN must be 17 characters']);
      setVehicle(undefined);
      return;
    }

    // always enable the loader
    toggleDecoding(true);

    VehicleApiService.decodeVin(vin)
      .then((response) => {
        let {data} = response;

        // early return when no decoder values are given
        if (!data.Count) {
          setMessages([data.Message || 'No results were found.']);
          setVehicle(undefined);
          return;
        }

        setMessages([data.Message]);
        setVehicle(new DecoderResults(data.Results));
      })
      .catch((error) => {
        setMessages([error.message]);
        setVehicle(undefined);
      })
      // always disable the loader
      .finally(() => toggleDecoding(false));
  };

  return (
    <React.Fragment>
      <section className='flex-fill d-flex flex-column'>
        <section className='container mb-3'>
          <form onSubmit={handleSubmit}>
            <VinInputGroup />
          </form>
        </section>
        {(isDecoding && (
          <section className='flex-fill d-flex align-items-center'>
            <section className='text-secondary mx-auto'>
              <ProgressSpinner size={5} />
            </section>
          </section>
        )) || (
          <React.Fragment>
            <MessageList messages={messages} />
            <DecoderBodyClassImage />
            <DecoderTable />
          </React.Fragment>
        )}
      </section>
    </React.Fragment>
  );
}

export default Decoder;
