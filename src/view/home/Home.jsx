import React from "react";
import { useContext, useEffect } from "react";
import { getAddressByUser } from "../../api/FetchAddress";
import useToken from "../app/useToken";
import { useNavigate } from "react-router-dom";

import Header from "../utils/Header";
import DefaultItem from "./AddressItem";

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
  return (
    <div>
      <Header textContent={"Minhas Residências"} />
      <section className="default-item-container">
      {addresses !== [] && (
      <nav className="default-item-nav">
        <ul className="default-item-list">{addresses.map((address) => (
          <DefaultItem
            id={address.id}
            city={address.city}
            houseNumber={address.houseNumber}
            inputVoltage={address.inputVoltage}
            neighborhood={address.neighborhood}
            state={address.state}
            street={address.street}
            handleClick={() => navigate(`/integracoes/?address=${address.id}`)}
            key={address.id}
          />
          ))}</ul>
      </nav>
      )}
      </section>
    </div>
  );
}
