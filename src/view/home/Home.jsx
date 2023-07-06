<<<<<<< HEAD
import { useContext, useEffect } from "react";
import { getAddressByUser } from "../../api/FetchAddress";
import useToken from "../../states/useToken";
import { AddressContext } from "../../states/AddressContext";
import React from "react";
=======
import React from "react";
import { useContext, useEffect } from "react";
import { getAddressByUser } from "../../api/FetchAddress";
import useToken from "../../states/useToken";
>>>>>>> 241378ce12ee9077f6be4cccc0aca4b7bf4aff74
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "@phosphor-icons/react";
import Header from "../utils/Header";
<<<<<<< HEAD
import DefaultItem from "./AddressItem";

export default function Home() {
  const { token, payload } = useToken();
  const { setHasAddress } = useContext(AddressContext);
  const navigate = useNavigate();
  const [addresses, setAddresses] = React.useState([]);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/address/user/10`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-type": "application/json",
          },
        }
      );
      await setAddresses(response.data);
      return response;
    } catch (error) {}
  };
=======
import AddressItem from "./AddressItem";

export default function Home() {
  const { token, payload } = useToken();
  const navigate = useNavigate();
  const [addresses, setAddresses] = React.useState([]);

  useEffect(() => {
    document.title = "Minhas Residências | Luminous";
    async function requestAddresses() {
      const response = await getAddressByUser(token, payload);
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
>>>>>>> 241378ce12ee9077f6be4cccc0aca4b7bf4aff74

  return (
    <div>
      <Header textContent={"Minhas Residências"} />
      <section className="default-item-container">
<<<<<<< HEAD
        {addresses !== [] && (
          <nav className="default-item-nav">
            <ul className="default-item-list">
              {addresses.map((address) => (
                <DefaultItem
                  id={address.id}
                  city={address.city}
                  houseNumber={address.houseNumber}
                  inputVoltage={address.inputVoltage}
                  neighborhood={address.neighborhood}
                  state={address.state}
                  street={address.street}
                  handleClick={() =>
                    navigate(`/energyBill/?address=${address.id}`)
                  }
                  key={address.id}
                />
              ))}
            </ul>
          </nav>
        )}
=======
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
>>>>>>> 241378ce12ee9077f6be4cccc0aca4b7bf4aff74
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
