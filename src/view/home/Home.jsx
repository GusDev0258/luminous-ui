import React from "react";
import { useContext, useEffect } from "react";
import { getAddressByUser } from "../../api/FetchAddress";
import useToken from "../../states/useToken";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "@phosphor-icons/react";
import Header from "../utils/Header";

import AddressItem from "./AddressItem";

export default function Home() {
  const { token, payload } = useToken();
  const navigate = useNavigate();
  const [addresses, setAddresses] = React.useState([]);

  useEffect(() => {
    document.title = "Minhas Residências | Luminous";
    async function requestAddresses() {
      const response = await getAddressByUser(token, payload.id);
      return response;
    }
    requestAddresses().then((data) => {
      setAddresses(data);
    });
  }, []);

  const removeAddress = (id) => {
    setAddresses((address) => {
      return address.filter((address) => address.id !== id);
    })
  }
  return (
    <div>
      <Header textContent={"Minhas Residências"} />
      <section className="default-item-container">

      {addresses !== [] && (
      
      <nav className="default-item-nav">
        <ul className="default-item-list">{addresses.map((address) => (
      
          <AddressItem
            id={address.id}
            city={address.city}
            houseNumber={address.houseNumber}
            inputVoltage={address.inputVoltage}
            neighborhood={address.neighborhood}
            state={address.state}
            street={address.street}
            handleClick={() => navigate(`/integracoes/?address=${address.id}`)}
            handleDelete={removeAddress}
            key={address.id}
          /> 
          ))}</ul>
      </nav>
      )}
      </section>
      <div className="btn-container">
        <button
          className="primary-button btn-cadastrar"
          type="button"
          onClick={() =>
            navigate(`/address/cadastro/`)
          }
        >
          <PlusCircle size={24} />
          Cadastrar Endereço
        </button>
        </div>
    </div>
  );

}
