import React from 'react';
import {IVehicleAttribute} from '../../interfaces/IVehicleApiResponse';

interface IProps {
  children?: React.ReactNode;
}
interface IDecoderState {
  attributes: IVehicleAttribute[];
  setAttributes: React.Dispatch<React.SetStateAction<IVehicleAttribute[]>>;
  isDecoding: boolean;
  toggleDecoding: React.Dispatch<React.SetStateAction<boolean>>;
}

const DecoderContext = React.createContext<IDecoderState>({} as IDecoderState);
export const useDecoderContext = () => React.useContext(DecoderContext);

function DecoderContextProvider({children}: IProps) {
  const [attributes, setAttributes] = React.useState<IVehicleAttribute[]>([]);
  const [isDecoding, toggleDecoding] = React.useState<boolean>(false);

  const state = React.useMemo<IDecoderState>(
    () => ({attributes, setAttributes, isDecoding, toggleDecoding}),
    [attributes, isDecoding]
  );

  return (
    <DecoderContext.Provider value={state}>{children}</DecoderContext.Provider>
  );
}

export default DecoderContextProvider;
