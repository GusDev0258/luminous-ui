import React from "react";
import DefaultInput from "../utils/Form/DefaultInput";
import { MagnifyingGlass, PlusCircle } from "@phosphor-icons/react";
import ConsumptionAlertItem from "./ConsumptionAlertItem";
import Header from "../utils/Header";
import useToken from "../app/useToken";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../api/DefaultUrl";
import axios from "axios";
import { CurrentAddressContext } from "../../states/CurrentAddressContext";

const ConsumptionAlert = () => {

  const [search, setSearch] = React.useState();
  const [consumptionAlerts, setConsumptionAlerts] = React.useState([]);
  const { token } = useToken();
  const { currentAddress } = React.useContext(CurrentAddressContext);
  const navigate = useNavigate();

  React.useEffect(() =>{
    document.title = "Alertas de consumo | Luminous";
    axios.get(`${BASE_URL}consumption-alert/getAll/address/${currentAddress.id}`, {
      headers: {
        authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-type": "application/json",
      },
    }).then((response) => {
      setConsumptionAlerts(response.data)});
  },[])

  const removeConsumptionAlert = (id) => {
    setConsumptionAlerts((consumptionAlerts) => {
      return consumptionAlerts.filter((consumptionAlert) => consumptionAlert.id !== id);
    })
  }


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
                onConsumptionAlertDelete={removeConsumptionAlert}
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
            navigate(`/consumption-alert/cadastro/`)
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
