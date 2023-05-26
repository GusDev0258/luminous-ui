import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Login from '../../view/login/Login';
import Home from '../../view/home/Home';
import CadUser from '../../view/cadUser/CadUser';
import WhiteTax from '../../view/whiteTax/WhiteTax';
import AuthVerify from '../../view/auth/AuthVerify';
import CadAddress from '../../view/cadAddress/CadAddress';
import { AddressContextProvider } from '../../states/AddressContext';
import Profile from '../../view/profile/Profile';

export default function Router() {
    return (
    <AddressContextProvider>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<CadUser/>}/>
      <Route path="/register-address" element={<CadAddress/>}/>
      <Route path="/white-taxes" element={<WhiteTax/>}/>
      <Route path="/profile" element={<Profile/>}/>
    </Routes>
    <AuthVerify/>
    </AddressContextProvider>
    )

}