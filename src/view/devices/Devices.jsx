import { Fragment, useState } from "react";
import Header from "../utils/Header";
import useToken from "../app/useToken";
import { useNavigate } from "react-router-dom";
import { getDevicesOfAddress } from "../../api/FetchDevices";
import Loading from "../loading/Loading";
import { PlusCircle } from "@phosphor-icons/react";


export default function Devices() {

    const [devices, setDevices] = useState();
    const { token } = useToken();
    const navigate = useNavigate();
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      const addressId = params.address;

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
                        <div key={device.id}>
                            <p>
                                {device.name} - 220v
                            </p>
                            <p>
                               {device.power}W - {device.consumptionKWh.toFixed(2)}kWh
                            </p>
                            <button type="button">Configurações</button>
                        </div>
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
