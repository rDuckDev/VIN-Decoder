import React from 'react';
import DecodedVehicle from '../../pages/Decoder/helpers/DecodedVehicle';

interface IProps {
  children?: React.ReactNode;
}
interface IDecoderState {
  vehicle: DecodedVehicle | undefined;
  setVehicle: React.Dispatch<React.SetStateAction<DecodedVehicle | undefined>>;
  isDecoding: boolean;
  toggleDecoding: React.Dispatch<React.SetStateAction<boolean>>;
}

const DecoderContext = React.createContext<IDecoderState>({} as IDecoderState);
export const useDecoderContext = () => React.useContext(DecoderContext);

function DecoderContextProvider({children}: IProps) {
  const [vehicle, setVehicle] = React.useState<DecodedVehicle | undefined>();
  const [isDecoding, toggleDecoding] = React.useState<boolean>(false);

  const state = React.useMemo<IDecoderState>(
    () => ({vehicle, setVehicle, isDecoding, toggleDecoding}),
    [vehicle, isDecoding]
  );

  return (
    <DecoderContext.Provider value={state}>{children}</DecoderContext.Provider>
  );
}

export default DecoderContextProvider;
