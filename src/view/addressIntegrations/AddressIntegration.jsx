import React from 'react'
import Header from '../utils/Header';
import Integration from './Integration';
import '../../css/Integration/integration.css';
import axios from 'axios';
import {getAddressById} from '../../api/FetchAddress';
import useToken from '../app/useToken';
import { CurrentAddressContext } from '../../states/CurrentAddressContext';

const AddressIntegration = () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  const addressId = params.address;
  const {currentAddress, setCurrentAddress} = React.useContext(CurrentAddressContext);
  const {token} = useToken();

  React.useEffect(() =>{
    document.title = "Integrações | Luminous";
    const getAddress = async (token, addressId) =>{
      const response = await getAddressById(token, addressId);
      await setCurrentAddress(response);
    }
    getAddress(token, addressId);
  },[addressId]);
  
  return (
    <>
      <Header textContent="Integrações"/>
      <section className='integration-container'>
        <ul className="integration-list">
          <Integration url={`/energyBill/`} text="Faturas"/>
          <Integration url={`/consumption-alert/`} text="Alertas de consumo"/>
          <Integration url={`/devices/`} text="Equipamentos"/>
        </ul>
      </section>
    </>
  )
}

export default AddressIntegration