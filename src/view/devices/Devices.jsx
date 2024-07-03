import { Fragment, useState, useContext } from "react";
import Header from "../utils/Header";
import useToken from "../../states/useToken";
import { useNavigate } from "react-router-dom";
import { getDevicesOfAddress } from "../../api/FetchDevices";
import Loading from "../loading/Loading";
import { PlusCircle } from "@phosphor-icons/react";
import DeviceItem from "./DeviceItem";
import { CurrentAddressContext } from "../../states/CurrentAddressContext";

export default function Devices() {
  const [devices, setDevices] = useState();
  const { token, payload } = useToken();
  const navigate = useNavigate();

  const { currentAddress } = useContext(CurrentAddressContext);

  const removeDevice = (id) => {
    setDevices((device) => {
      return device.filter((device) => device.id !== id);
    });
  };

  if (!devices) {
    (async () => {
      const data = await getDevicesOfAddress(token, currentAddress["id"]);
      setDevices(data);
    })();
    return <Loading />;
  } else {
    return (
      <Fragment>
        <div>
          <Header textContent={"Dispositivos"} />
          <ul className="default-item-list">
            {devices.map((device) => (
              <DeviceItem
                id={device.id}
                addressId={currentAddress["id"]}
                name={device.name}
                power={device.power}
                consumptionKWh={device.consumptionKWh.toFixed(2)}
                consumptionReais={device.consumptionReais.toFixed(2)}
                handleDelete={removeDevice}
                key={device.id}
              />
            ))}
          </ul>
        </div>
        <div className="btn-container">
          <button
            className="primary-button btn-cadastrar"
            type="button"
            onClick={() => navigate(`/devices/cadastro/`)}
          >
            <PlusCircle size={20} />
            Cadastrar Equipamento
          </button>
        </div>
      </Fragment>
    );
  }
}
