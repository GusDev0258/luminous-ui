import React from 'react'
import Header from '../utils/Header';
import Integration from './Integration';
import '../../css/Integration/integration.css';
import {getAddressById} from '../../api/FetchAddress';
import useToken from "../../states/useToken";
import { CurrentAddressContext } from '../../states/CurrentAddressContext';
import { useParams } from 'react-router';

const AddressIntegration = () => {
  
  var {addressId} = useParams();


  const { currentAddress, setCurrentAddress } = React.useContext(
    CurrentAddressContext
  );
  const { token } = useToken();

  React.useEffect(() => {
    document.title = "Integrações | Luminous";
    const getAddress = async (token, addressId) =>{
      const response = await getAddressById(token, addressId);
      await setCurrentAddress(response);
    };
    getAddress(token, addressId);
    
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
          <Integration url={`/energyBill/`} text="Faturas" id="bills"/>
          <Integration url={`/consumption-alert/`} text="Alertas de consumo" id="alerts"/>
          <Integration url={`/devices/?address=${addressId}`} text="Equipamentos" id="devices"/>
          <Integration url={`/consumptionTrack/address/${addressId}`} text="Acompanhar consumo" id="track"/>
          <Integration url={urlMaintenance} text="Consultar manutenção na rede elétrica" id="maintence"/>
          <Integration url={urlEnergyFall} text="Consultar falta de energia" id="energyFall"/>
          <Integration url={`/report/address/${addressId}`} text="Relatórios" id="report"/>
        </ul>
      </section>
    </>
  );
};

export default AddressIntegration;
