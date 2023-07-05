import React, { useState, useEffect } from "react";
import Header from "../utils/Header";
import DefaultInput from "../utils/Form/DefaultInput";
import { useParams, useNavigate } from "react-router-dom";
import useToken from "../app/useToken";
import { updateDevice, getDevicesOfAddress } from "../../api/FetchDevices";

import { BASE_URL } from "../../api/DefaultUrl";

const DeviceEditar = () => {
  const { id } = useParams();
  const { token, payload } = useToken();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [power, setPower] = useState("");
  const [usageTime, setUsageTime] = useState("");

  useEffect(() => {
    const fetchDevice = async () => {
      try {
        const devices = await getDevicesOfAddress(token, payload);
        const selectedDevice = devices.filter((device) => device.id === parseInt(id))[0];
        setName(selectedDevice.name);
        setPower(selectedDevice.power);
        setUsageTime(selectedDevice.usageTime);
      } catch (error) {
        console.error("Error fetching device:", error);
      }
    };

    fetchDevice();
  }, [id, token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateDevice(token, id, payload.id, {
        name,
        power,
        usageTime
      });
      navigate(`/`);
    } catch (error) {
      console.error("Error updating Device:", error);
    }
  };

  return (
    <div>
        <Header textContent={"Atualizar Equipamento"} />
        <section className="default-form-container">
        <form onSubmit={handleSubmit}>
        <DefaultInput
          label={"Nome"}
          labelClassName={"default-input-label"}
          className="name-input default-form-input"
          id="name"
          type="text"
          value={name}
          setValue={setName}
        />
        <DefaultInput
          label={"Potência"}
          labelClassName={"default-input-label"}
          className="power-input default-form-input"
          id="power"
          type="text"
          value={power}
          setValue={setPower}
        />
        <DefaultInput
          label={"Estimativa de tempo de uso (em horas)"}
          labelClassName={"default-input-label"}
          className="usageTime-input default-form-input"
          id="usageTime"
          type="hour"
          value={usageTime}
          setValue={setUsageTime}
        />
    
      <button type="submit" className="primary-button btn-device">
        Atualizar
      </button>
      </form>
      </section>
    </div>
);
};

export default DeviceEditar;