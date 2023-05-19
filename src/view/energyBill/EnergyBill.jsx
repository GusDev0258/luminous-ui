import React from "react";
import DefaultInput from "../utils/form/DefaultInput";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlass, PlusCircle } from "@phosphor-icons/react";
import Header from "../utils/Header";
import axios from "axios";
import moment from "moment";
import errorImage from "../../images/noRegistersImage.svg";
import EnergyBillItem from "./EnergyBillItem";
import energyBillImageDeco from "../../images/decoEnergyBill.svg";

const EnergyBill = () => {
  const [search, setSearch] = React.useState("");
  const [energyBills, setEnergyBills] = React.useState([]);
  const [error, setError] = React.useState({
    message: "",
    code: "",
    state: true,
  });
  const navigate = useNavigate();
  const redirectTo = () => navigate("/energyBill/cadastro");
  React.useEffect(() => {
    requestAllEnergyBills();
  }, []);

  const requestAllEnergyBills = async () => {
    try {
      const token = JSON.parse(window.sessionStorage.getItem("token"));

      const response = await axios.get(
        "http://localhost:8080/api/energyBill/getAllEnergyBills",
        {
          headers: {
            authorization: `Bearer ${token.token}`,
            Accept: "application/json",
            "Content-type": "application/json",
          },
        }
      );
      console.log(response.data);
      await setEnergyBills(response.data);
    } catch (error) {
      setError({
        message: error.message,
        code: error.code,
        state: false,
      });
    }
  };

  function handleSearch({ target }) {}
  function handleClick() {}

  return (
    <div>
      <Header textContent="Minhas Faturas" />

      <section className="default-form-container">
        <form className="form-container">
          <DefaultInput
            className="search-input default-form-input"
            id="search"
            type="search"
            value={search}
            setValue={setSearch}
            placeholder="Pesquisar faturas..."
          />
          <MagnifyingGlass size={16} className="search-icon" color="#482803" />
        </form>
      </section>
      <section className="eneryBills-container">
        {error.state === false && (
          <ul className="image-list">
            <li key={error.code}>
              <img src={errorImage} alt="Error" />
              {error.message === "Network Error" &&
                "Verifique sua Conexão com a internet"}
            </li>
          </ul>
        )}

        {energyBills.length === 0 && error.state !== false && (
          <ul className="image-list">
            <li key={error.code}>
              <img src={errorImage} alt="Error" />
              {"Nenhuma fatura até o momento... :("}
            </li>
          </ul>
        )}

        {energyBills.length > 0 && (
          <ul className="energyBills-list">
            
            {energyBills.map((energyBill) => (
              <EnergyBillItem
                address={energyBill.address}
                dueDate={energyBill.dueDate}
                consumptionReais={energyBill.energyConsumptionReais}
                consumptionkWh={energyBill.energyConsumption_kWh}
                key={energyBill.id}
              />
            ))}
          </ul>
        )}

        {energyBills.length > 0 && (
          <div className="image-container">
            <img src={energyBillImageDeco} alt="energyBillDeco" />
          </div>
        )}
      </section>

      <div className="btn-container">
        <button
          className="primary-button btn-cadastrar"
          type="button"
          onClick={redirectTo}
        >
          <PlusCircle size={24} />
          Cadastrar Fatura
        </button>
      </div>
    </div>
  );
};

export default EnergyBill;
