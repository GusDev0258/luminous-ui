import React from "react";
import DefaultInput from "../utils/Form/DefaultInput";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlass, PlusCircle } from "@phosphor-icons/react";
import Header from "../utils/Header";
import errorImage from "../../images/noRegistersImage.svg";
import EnergyBillItem from "./EnergyBillItem";
import energyBillImageDeco from "../../images/decoEnergyBill.svg";
import axios from "axios";
import { AddressContext } from "../../states/AddressContext";
import useToken from "../app/useToken";
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
  const { currentAddress, setCurrentAddress } = React.useContext(
    CurrentAddressContext
  );
  const { token } = useToken();

  React.useEffect(() => {
    async function getAllEnergyBills(addressId) {
        try {
          debugger;
          const response = await axios
            .get(
              `http://localhost:8080/api/energyBill/getAll/${addressId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
              }
            );
            const responseData = response.data;
            console.log(responseData);
            setCurrentAddress(responseData[0].address);
            setEnergyBills(responseData);
            console.log(responseData);
        } catch (Error) {
          setError({
            message: "Erro ao carregar faturas",
            code: Error,
            state: false,
          });
        } 
        }
        if(currentAddress !== undefined){
          getAllEnergyBills(currentAddress.id);
        }else{
          console.log('entrou aqui');
          const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
          });
          const addressId = params.address;
          const secondRequest = async (id) =>{
            
            getAllEnergyBills(id);
          }
          secondRequest(addressId);
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
              {error.message === "Erro ao carregar faturas" &&
                "Estamos passando por problemas técnicos..."}
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

        {energyBills !== {} && (
          <ul className="default-item-list">
            {energyBills.map((energyBill) => (
              <EnergyBillItem
                address={currentAddress.houseNumber}
                dueDate={energyBill.dueDate}
                consumptionReais={energyBill.energyConsumptionReais}
                consumptionkWh={energyBill.energyConsumption_kWh}
                id={energyBill.id}
                key={energyBill.id}
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
          onClick={() =>
            navigate(`/energyBill/cadastro/?address=${currentAddress.id}`)
          }
        >
          <PlusCircle size={24} />
          Cadastrar Fatura
        </button>
      </div>
    </div>
  );
};

export default EnergyBill;
