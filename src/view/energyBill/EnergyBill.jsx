import React from "react";
import DefaultInput from "../utils/form/DefaultInput";
import { MagnifyingGlass, List, Flag } from "@phosphor-icons/react";
import Header from "../utils/Header";

const EnergyBill = () => {
  const [search, setSearch] = React.useState("");

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
      {search}
    </div>
  );
};

export default EnergyBill;
