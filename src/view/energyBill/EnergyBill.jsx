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
            const responseData = response.data.data;
            setCurrentAddress(responseData[0].address);
            setEnergyBills(responseData);
        } catch (Error) {
          setError({
            message: "Erro ao carregar faturas",
            code: Error,
            state: true,
          });
        } 
        }
        if(currentAddress){
          getAllEnergyBills(currentAddress.id);
        }else{
          const secondRequest = async () =>{
            const params = new Proxy(new URLSearchParams(window.location.search), {
              get: (searchParams, prop) => searchParams.get(prop),
            });
            const addressId = params.address;
            getAllEnergyBills(addressId);
          }
          secondRequest();
          }
          
    // if (currentAddress) {
    //   fetch(
    //     `http://localhost:8080/api/energyBill/getAll/${currentAddress.id}`
    //   )
    //   .then((res) => res.json())
    //   .then((data) => {
    //       setEnergyBills(data);
    //     });
    // }else{

    // }
    // if (currentAddress) {
    //   setEnergyBills(currentAddress.energyBills);
    // } else {
    //   setError({
    //     message: "Nenhuma fatura até o momento... :(",
    //     code: "404",
    //     state: true,
    //   });
    // }
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
