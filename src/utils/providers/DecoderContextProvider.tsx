import React from 'react';
import DecoderResults from '../../pages/Decoder/helpers/DecoderResults';

interface IProps {
  children?: React.ReactNode;
}
interface IDecoderState {
  vehicle: DecoderResults | undefined;
  setVehicle: React.Dispatch<React.SetStateAction<DecoderResults | undefined>>;
  isDecoding: boolean;
  toggleDecoding: React.Dispatch<React.SetStateAction<boolean>>;
}

const DecoderContext = React.createContext<IDecoderState>({} as IDecoderState);
export const useDecoderContext = () => React.useContext(DecoderContext);

function DecoderContextProvider({children}: IProps) {
  const [vehicle, setVehicle] = React.useState<DecoderResults | undefined>();
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
