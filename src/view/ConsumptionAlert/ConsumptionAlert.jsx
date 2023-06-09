import React from "react";
import DefaultInput from "../utils/Form/DefaultInput";
import { MagnifyingGlass } from "@phosphor-icons/react";
import ConsumptionAlertItem from "./ConsumptionAlertItem";
import { CurrentAddressContext } from "../../states/CurrentAddressContext";

const ConsumptionAlert = () => {
  const [search, setSearch] = React.useState();
  const [consumptionAlerts, setConsumptionAlerts] = React.useState([]);
  const {currentAddress} = React.useContext(CurrentAddressContext);

  return (
    <div>
      <section className="default-form-container">
        <form className="form-container">
          <DefaultInput
            className="search-input default-form-input"
            id="search"
            type="search"
            value={search}
            setValue={setSearch}
            placeholder="Pesquisar alertas..."
          />
          <MagnifyingGlass size={16} className="search-icon" color="#482803" />
        </form>
      </section>
      <section className="default-item-container">
          {consumptionAlerts && (
            <ul className="default-item-list">
            {consumptionAlerts.map((consumptionAlert) => (
              <ConsumptionAlertItem
                address={currentAddress.houseNumber}
                description={consumptionAlert.description}
                consumption={consumptionAlert.consumptionLimit}
                type={consumptionAlert.type}
                id={consumptionAlert.id}
                key={consumptionAlert.id}
              />
            ))}
          </ul>
          )}
      </section>
    </div>
  );
};

export default ConsumptionAlert;
