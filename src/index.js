import {StrictMode} from 'react';
import {createRoot } from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './view/app/App';
import { BrowserRouter } from 'react-router-dom';
import SnackBar from './view/weather-notifaction/SnackBar';
import Modal from 'react-modal';

createRoot(document.getElementById('root')).render(
      <StrictMode>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </StrictMode>
);

createRoot(document.getElementById('snackbar-root')).render(
  <StrictMode>
    <SnackBar/>
  </StrictMode>
);

Modal.setAppElement("#root");

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
