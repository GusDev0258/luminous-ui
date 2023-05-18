import React from "react";
import DefaultInput from "../utils/form/DefaultInput";
import { MagnifyingGlass, List, Flag } from "@phosphor-icons/react";
import Header from "../utils/Header";
import axios from "axios";

const EnergyBill = () => {
  const [search, setSearch] = React.useState("");
    const [energyBills, setEnergyBills] = React.useState([]);

    React.useEffect(() =>{
      requestAllEnergyBills();
    },[]);

  const requestAllEnergyBills = async () =>{
    try{
      const response = await axios.get("http://localhost:8080/api/energyBill/getAllEnergyBills");
      setEnergyBills(response.data);
      console.log(response.data);
    }catch(error){
      console.log(error);
    }
  };

  function handleSearch({ target }) {}

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

    </div>
  );
};

export default EnergyBill;
