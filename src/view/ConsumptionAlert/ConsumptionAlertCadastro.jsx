import React from "react";
import Header from "../utils/Header";
import DefaultInput from "../utils/Form/DefaultInput";
import axios from "axios";
import useToken from "../app/useToken";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../api/DefaultUrl";

const ConsumptionAlertCadastro = () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  const addressId = params.address;

  const [descricao, setDescricao] = React.useState("");
  const [consumptionLimit, setConsumptionLimit] =
    React.useState("");
  const [consumptionAlertType, setConsumptionAlertType] = React.useState("");
  const { token } = useToken();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post(
        `${BASE_URL}consumption-alert/address/${addressId}`,
        {
          descricao,
          consumptionLimit,
          consumptionAlertType,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-type": "application/json",
          },
        }
      )
      .then(() => navigate(`/consumption-alert/?address=${addressId}`));
  };

  return (
    <div>
      <Header textContent="Cadastrar Alerta de Consumo" />
      <section className="default-form-container">
        <form
          onSubmit={handleSubmit}
        >
          <DefaultInput
            label={"Descrição"}
            labelClassName={"default-input-label"}
            className="description-input default-form-input"
            id="descricao"
            type="text"
            value={descricao}
            setValue={setDescricao}
          />
          <DefaultInput
            label={"Limite de consumo"}
            labelClassName={"default-input-label"}
            className="consumption-limit-input default-form-input"
            id="consumptionLimit"
            type="number"
            value={consumptionLimit}
            setValue={setConsumptionLimit}
          />
          <DefaultInput
            label={"Tipo de consumo"}
            labelClassName={"default-input-label"}
            className="consumption-alert-type-input default-form-input"
            id="consumptionAlertType"
            type="text"
            value={consumptionAlertType}
            setValue={setConsumptionAlertType}
            placeholder={"Reais ou kWh"}
          />
          <button type="submit" className="primary-button btn-fatura">
            Cadastrar
          </button>
        </form>
      </section>
    </div>
  );
};

export default ConsumptionAlertCadastro;
