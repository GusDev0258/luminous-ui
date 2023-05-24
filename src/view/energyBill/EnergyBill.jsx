import React from "react";
import DefaultInput from "../utils/Form/DefaultInput";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MagnifyingGlass, PlusCircle } from "@phosphor-icons/react";
import Header from "../utils/Header";
import axios from "axios";
import errorImage from "../../images/noRegistersImage.svg";
import EnergyBillItem from "./EnergyBillItem";
import energyBillImageDeco from "../../images/decoEnergyBill.svg";
import useToken from "../app/useToken";
import useAddress from "../utils/useAddress";
import { AddressContext } from "../../states/AddressContext";
import { CurrentAddressContext } from "../../states/CurrentAddressContext";

const EnergyBill = () => {
  const [search, setSearch] = React.useState("");
  const [energyBills, setEnergyBills] = React.useState([]);
  const [error, setError] = React.useState({
    message: "",
    code: "",
    state: true,
  });
  const navigate = useNavigate();
  const [address, setAddress] = useAddress();
  const { currentAddress } = React.useContext(CurrentAddressContext);

  React.useEffect(() => {
    console.log(currentAddress);
    if (currentAddress) {
      setEnergyBills(currentAddress.energyBills);
    } else {
      setError({
        message: "Nenhuma fatura até o momento... :(",
        code: "404",
        state: true,
      });
    }
  }, []);

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
      <section className="default-item-container">
        {error.state === false && (
          <ul className="image-list">
            <li key={error.code}>
              <img src={errorImage} alt="Error" />
              {error.message === "Network Error" &&
                "Verifique sua Conexão com a internet"}
            </li>
          </ul>
        )}

        {energyBills && energyBills.length === 0 && error.state !== false && (
          <ul className="image-list">
            <li key={error.code}>
              <img src={errorImage} alt="Error" />
              {"Nenhuma fatura até o momento... :("}
            </li>
          </ul>
        )}

        {energyBills !== [] && energyBills.length > 0 && (
          <ul className="default-item-list">
            {energyBills.map((energyBill) => (
              <EnergyBillItem
                address={energyBill.address.houseNumber}
                dueDate={energyBill.dueDate}
                consumptionReais={energyBill.energyConsumptionReais}
                consumptionkWh={energyBill.energyConsumption_kWh}
                id={energyBill.id}
              />
            ))}
          </ul>
        )}

        {energyBills && energyBills.length > 0 && (
          <div className="image-container">
            <img src={energyBillImageDeco} alt="energyBillDeco" />
          </div>
        )}
      </section>

      <div className="btn-container">
        <button
          className="primary-button btn-cadastrar"
          type="button"
          onClick={() => navigate(`/energyBill/cadastro/?address=${address}`)}
        >
          <PlusCircle size={24} />
          Cadastrar Fatura
        </button>
      </div>
    </div>
  );
};

export default EnergyBill;
