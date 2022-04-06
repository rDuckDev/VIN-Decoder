import React from 'react';

interface IProps {
  children?: React.ReactNode;
}
interface IVinState {
  vin: string;
  setVin: React.Dispatch<React.SetStateAction<string>>;
}

const VinContext = React.createContext<IVinState>({} as IVinState);
export const useVinContext = () => React.useContext(VinContext);

function VinContextProvider({children}: IProps) {
  const [vin, setVin] = React.useState<string>('');
  const state = React.useMemo<IVinState>(() => ({vin, setVin}), [vin]);
  return <VinContext.Provider value={state}>{children}</VinContext.Provider>;
}

export default VinContextProvider;
