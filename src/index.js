import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './view/app/App';
import Home from './view/home/Home';
import Login from './view/login/Login';
import CadUser from './view/cadUser/CadUser';
import WhiteTax from './view/whiteTax/WhiteTax';
import AuthVerify from './view/auth/AuthVerify';
import SnackBar from './view/weather-notifaction/SnackBar';
import CadAddress from './view/cadAddress/CadAddress';
import { AddressContextProvider } from './states/AddressContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
    <AddressContextProvider>
    <Routes>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<CadUser/>}/>
      <Route path="/" element={<App />}/>
      <Route path="/home" element={<Home />}/>
      <Route path="/register-address" element={<CadAddress/>}/>
      <Route path="/white-taxes" element={<WhiteTax/>}/>
    </Routes>
    <AuthVerify/>
    <SnackBar/>
    </AddressContextProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
