
import { useContext} from "react";
import useToken from "../../states/useToken";
import { AddressContext } from "../../states/AddressContext";
import React from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "@phosphor-icons/react";
import Header from "../utils/Header";
import DefaultItem from "./AddressItem";

export default function Home() {
  const { token } = useToken();
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
                    navigate(`/integracoes/?address=${address.id}`)
                  }
                  handleDelete={removeAddress}
                  key={address.id}
                />
              ))}
            </ul>
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
