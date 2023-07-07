import React from "react";
import Header from "../utils/Header";
import DefaultInput from "../utils/Form/DefaultInput";
import axios from "axios";
import useToken from "../../states/useToken";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../api/DefaultUrl";
import { CurrentAddressContext } from "../../states/CurrentAddressContext";

const DeviceCadastro = () => {
  const [name, setName] = React.useState("");
  const [power, setPower] = React.useState("");
  const [usageTime, setUsageTime] = React.useState("01:00");
  const { currentAddress } = React.useContext(CurrentAddressContext);
  const { token } = useToken();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post(
        `${BASE_URL}device/address/${currentAddress.id}`,
        {
          name,
          power,
          usageTime,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-type": "application/json",
          },
        }
      )
      .then(() => navigate(`/devices`));
  };
  return (
    <div>
      <Header textContent={"Novo Dispositivo"} />
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

          <button type="submit" className="primary-button btn-equipmamento">
            Cadastrar
          </button>
        </form>
      </section>
    </div>
  );
};

export default DeviceCadastro;
