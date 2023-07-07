import React from 'react'
import Header from '../utils/Header';
import Integration from './Integration';
import '../../css/Integration/integration.css';
import {getAddressByUser} from '../../api/FetchAddress';
import useToken from "../../states/useToken";
import { CurrentAddressContext } from '../../states/CurrentAddressContext';
import { getCurrentConsumption } from "../../api/FetchConsumptionTrack";

const AddressIntegration = () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  const addressId = params.address;
  const { currentAddress, setCurrentAddress } = React.useContext(
    CurrentAddressContext
  );
  const { token } = useToken();

  React.useEffect(() => {
    document.title = "Integrações | Luminous";
    const getAddress = async (token, addressId) =>{
      const response = await getAddressByUser(token, addressId);
      await setCurrentAddress(response);
    };
    getAddress(token, addressId);

    const getConsumptionTrack = async (token, addressId) => {
      const response = await getCurrentConsumption(token, addressId);
    };
    if (currentAddress !== null) {
      try {
        getConsumptionTrack(token, currentAddress.id);
      } catch (error) {
        console.log(error);
      }
    }
  },[addressId]);

  const getIntegrationUrls = () => {
    if (currentAddress && currentAddress.energyProvider) {
      const { energyProvider } = currentAddress;
      return {
        urlMaintenance: energyProvider.urlMaintenance,
        urlEnergyFall: energyProvider.urlEnergyFall,
      };
    }
    return {
      urlMaintenance: '',
      urlEnergyFall: '',
    };
  };

  const { urlMaintenance, urlEnergyFall } = getIntegrationUrls();

  return (
    <>
      <Header textContent="Integrações" />
      <section className="integration-container">
        <ul className="integration-list">
          <Integration url={`/energyBill/`} text="Faturas"/>
          <Integration url={`/consumption-alert/`} text="Alertas de consumo"/>
          <Integration url={`/devices/?address=${addressId}`} text="Equipamentos"/>
          <Integration url={`/consumptionTrack/address/${addressId}`} text="Acompanhar consumo"/>
          <Integration url={urlMaintenance} text="Consultar manutenção na rede elétrica"/>
          <Integration url={urlEnergyFall} text="Consultar falta de energia"/>
          <Integration url={`/report/address/${addressId}`} text="Relatórios"/>
        </ul>
      </section>
    </>
  );
};

export default AddressIntegration;
