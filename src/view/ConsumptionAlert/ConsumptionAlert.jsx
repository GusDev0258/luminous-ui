import React from "react";
import DefaultInput from "../utils/Form/DefaultInput";
import { MagnifyingGlass, PlusCircle } from "@phosphor-icons/react";
import ConsumptionAlertItem from "./ConsumptionAlertItem";
import Header from "../utils/Header";
import useToken from "../app/useToken";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../api/DefaultUrl";
import axios from "axios";

const ConsumptionAlert = () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  const addressId = params.address;

  const [search, setSearch] = React.useState();
  const [consumptionAlerts, setConsumptionAlerts] = React.useState([]);
  const { token } = useToken();
  const navigate = useNavigate();

  React.useEffect(() =>{
    axios.get(`${BASE_URL}consumption-alert/getAll/address/${addressId}`, {
      headers: {
        authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-type": "application/json",
      },
    }).then((response) => {
      console.log(response);
      setConsumptionAlerts(response.data)});
  },[])


  return (
    <div>
      <Header textContent="Alertas de consumo" />
      <section className="default-form-container">
        <form className="form-container">
          <DefaultInput
            className="search-input default-form-input"
            id="search"
            type="search"
            value={search}
            setValue={setSearch}
            placeholder="Pesquisar alertas..."
          />
          <MagnifyingGlass size={16} className="search-icon" color="#482803" />
        </form>
      </section>
      <section className="default-item-container">
          {consumptionAlerts && (
            <ul className="default-item-list">
            {consumptionAlerts.map((consumptionAlert) => (
              <ConsumptionAlertItem
                description={consumptionAlert.descricao}
                consumption={consumptionAlert.consumptionLimit}
                type={consumptionAlert.consumptionAlertType}
                id={consumptionAlert.id}
                key={consumptionAlert.id}
              />
            ))}
          </ul>
          )}
      </section>
      <div className="btn-container">
        <button
          className="primary-button btn-cadastrar"
          type="button"
          onClick={() =>
            navigate(`/consumption-alert/cadastro/?address=${addressId}`)
          }
        >
          <PlusCircle size={24} />
          Cadastrar Alerta
        </button>
      </div>
    </div>
  );
};

export default ConsumptionAlert;
