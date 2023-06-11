import React from 'react'
import Header from '../utils/Header';
import Integration from './Integration';
import '../../css/Integration/integration.css';
import axios from 'axios';


const AddressIntegration = () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  const addressId = params.address;
  
  return (
    <>
      <Header textContent="Integrações"/>
      <section className='integration-container'>
        <ul className="integration-list">
          <Integration url={`/energyBill/?address=${addressId}`} text="Faturas"/>
          <Integration url={`/consumption-alert/?address=${addressId}`} text="Alertas de consumo"/>
          <Integration url={`/devices/?address=${addressId}`} text="Equipamentos"/>
        </ul>
      </section>
    </>
  )
}

export default AddressIntegration