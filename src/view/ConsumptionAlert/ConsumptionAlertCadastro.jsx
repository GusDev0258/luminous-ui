import React from "react";
import Header from "../utils/Header";
import DefaultInput from "../utils/Form/DefaultInput";
import axios from "axios";
import useToken from "../../states/useToken";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../api/DefaultUrl";
import { CurrentAddressContext } from "../../states/CurrentAddressContext";


const ConsumptionAlertCadastro = () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  const consumptionAlertId = params.consumptionAlert;
  const [descricao, setDescricao] = React.useState("");
  const [consumptionLimit, setConsumptionLimit] =
    React.useState("");
  const [consumptionAlertType, setConsumptionAlertType] = React.useState("");
  const { currentAddress } = React.useContext(CurrentAddressContext);
  const { token } = useToken();
  const navigate = useNavigate();
  const [consumptionAlertToEdit, setConsumptionAlertToEdit] = React.useState({});


  React.useEffect(() =>{
    document.title = "Cadastro de Alerta de Consumo | Luminous";
    if (consumptionAlertId) {
      axios
        .get(`${BASE_URL}consumption-alert/${consumptionAlertId}`, {
          headers: {
            authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-type": "application/json",
          },
        })
        .then((response) => {
          setConsumptionAlertToEdit(response.data);
          setDescricao(response.data.descricao);
          setConsumptionLimit(response.data.consumptionLimit);
          setConsumptionAlertType(response.data.consumptionAlertType);
        });
    }
  },[])


  const handleEnergyBillEdit = (event) => {
    event.preventDefault();
    if (consumptionAlertId) {
      axios.put(
        `${BASE_URL}consumption-alert/${consumptionAlertId}`,
        {
          descricao,
          consumptionLimit,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-type": "application/json",
          },
        }
      );
      navigate(`/consumption-alert/`);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post(
        `${BASE_URL}consumption-alert/address/${currentAddress.id}`,
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
      .then(() => navigate(`/consumption-alert/?address=${currentAddress.id}`));
  };
  if(consumptionAlertId){
    return (
      <div>
        <Header textContent="Editar Alerta de Consumo" />
        <section className="default-form-container">
          <form
            onSubmit={handleEnergyBillEdit}
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
            <button type="submit" className="primary-button btn-fatura">
              Cadastrar
            </button>
          </form>
        </section>
      </div>
    );
  }else{
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
  }
};

export default ConsumptionAlertCadastro;
