import React from 'react';
import {HashRouter, Navigate, Route, Routes} from 'react-router-dom';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import Decoder from './pages/Decoder';
import History from './pages/History';
import DecoderContextProvider from './utils/providers/DecoderContextProvider';

function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Navigate to='/decode' />} />
        <Route
          path='/decode'
          element={
            <DecoderContextProvider>
              <Decoder />
            </DecoderContextProvider>
          }
        />
        <Route path='/history' element={<History />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;
