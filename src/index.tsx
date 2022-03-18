import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import worker from './registerServiceWorker';
import reportWebVitals from './reportWebVitals';
import VinContextProvider from './utils/providers/VinContextProvider';

ReactDOM.render(
  <React.StrictMode>
    <VinContextProvider>
      <App />
    </VinContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
worker.register();
