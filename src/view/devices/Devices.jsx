import { Fragment, useContext, useState } from "react";
import Header from "../utils/Header";
import useToken from "../app/useToken";
import { useNavigate } from "react-router-dom";
import { getDevicesOfAddress } from "../../api/FetchDevices";
import Loading from "../loading/Loading";
import { CurrentAddressContext } from "../../states/CurrentAddressContext";

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
                            <button type="button">minha piroca</button>
                        </div>
                    ))}
                </div>
                <div>
                    <button type="button">Adicionar um equipamento</button>
                </div>
            </Fragment>
        )
      }


}
