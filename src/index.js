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
import EnergyBill from './view/energyBill/EnergyBill';
import EnergyBillCadastro from './view/energyBill/EnergyBillCadastro';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/home" element={<Home />}/>
      <Route path="/register" element={<CadUser/>}/>
      <Route path="/white-taxes" element={<WhiteTax/>}/>
      <Route path="/energyBill/" element={<EnergyBill/>}/>
      <Route path="/energyBill/cadastro/" element={<EnergyBillCadastro/>}/>
    </Routes>
    <AuthVerify/>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
