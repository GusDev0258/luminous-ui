import React from 'react'
import Header from '../utils/Header';
import Integration from './Integration';
import '../../css/Integration/integration.css';
import {getAddressByUser} from '../../api/FetchAddress';
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
    const getAddress = async (token, addressId) =>{
      const response = await getAddressByUser(token, addressId);
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
          <Integration url={`/devices/?address=${addressId}`} text="Equipamentos"/>
        </ul>
      </section>
    </>
  )
}

export default AddressIntegration