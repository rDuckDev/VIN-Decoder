import React from 'react';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import Decoder from './pages/Decoder';
import DecoderContextProvider from './utils/providers/DecoderContextProvider';

function App() {
  return (
    <React.Fragment>
      <Header />
      <DecoderContextProvider>
        <Decoder />
      </DecoderContextProvider>
      <Footer />
    </React.Fragment>
  );
}

export default App;
