import React from "react";
import { useNavigate } from "react-router-dom";
import useToken from "../app/useToken";
import axios from "axios";

import Header from "../utils/Header";
import DefaultItem from './AddressItem';


export default function Home() {
  const navigate = useNavigate();
  const { token } = useToken();
  const [addresses, setAddresses] = React.useState([]);

  React.useEffect(() => {
    fetchData();
  },[]);

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
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  function handleClick(){

  }

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
            handleClick={() => navigate(`/energyBill/?address=${address.id}`)}
            key={address.id}
          />
          ))}</ul>
      </nav>
      )}
      </section>
    </div>
  );
}
