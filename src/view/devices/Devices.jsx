import { Fragment, useState } from "react";
import Header from "../utils/Header";
import useToken from "../app/useToken";
import { useNavigate } from "react-router-dom";
import { getDevicesOfAddress } from "../../api/FetchDevices";
import Loading from "../loading/Loading";
import { PlusCircle } from "@phosphor-icons/react";
import DeviceItem from "./DeviceItem";


export default function Devices() {

    

    const [devices, setDevices] = useState();
    const { token } = useToken();
    const navigate = useNavigate();
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      const addressId = params.address;

      const removeDevice = (id) => {
        setDevices((device) => {
          return device.filter((device) => device.id !== id);
        })
      }


    if (!devices) {
        (async () => {
          const data = await getDevicesOfAddress(token, addressId);
          setDevices(data);
        })();
        return <Loading />;
      } else {
        return (
            <Fragment>
                <div>
                    <Header textContent={"Dispositivos"} />
                    {devices.map((device) => (

                    <DeviceItem
                    id={device.id}
                    name={device.name}
                    power={device.power}
                    consumptionKWh={device.consumptionKWh.toFixed(2)}
                    consumptionReais={device.consumptionReais.toFixed(2)}
                    handleClick={() => navigate(`/integracoes/?address=${device.id}`)}
                    handleDelete={removeDevice}
                    key={device.id}
                    /> 

                    ))}
                </div>
                <div className="btn-container">
                    <button
                    className="primary-button btn-cadastrar"
                    type="button"
                    onClick={() =>
                        navigate(`/devices/cadastro/`)
                    }
                    >
                    <PlusCircle size={20} />
                    Cadastrar Equipamento
                        </button>
                </div>
        </Fragment>
        )
      }


}
