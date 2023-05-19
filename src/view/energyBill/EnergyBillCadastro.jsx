import React from "react";
import Header from "../utils/Header";
import DefaultInput from "../utils/form/DefaultInput";


const EnergyBillCadastro = () => {
  const [date, setDate] = React.useState("");
  const [address, setAddress] = React.useState();
  const [consumptionReais, setConsumptionReais] = React.useState();
  const [consumptionkWh, setConsumptionkWh] = React.useState();
  const [dueDate, setDueDate] = React.useState("");
  const [file, setFile] = React.useState();
  
  
  function handleFile({target}){
    console.log(target.value);
  }

  return (
    <div>
      <Header textContent="Cadastrar Fatura" />
      <section className="default-form-container">
        <form className="form-container" encType="multipart/data">
        <DefaultInput
          label={"Data de Referência"}
          labelClassName={"default-input-label"}
          className="reference-date-input default-form-input"
          id="referenceDate"
          type="date"
          value={date}
          setValue={setDate}
        />
        <DefaultInput
          label={"Residência da Fatura"}
          labelClassName={"default-input-label"}
          className="address-input default-form-input"
          id="address"
          type="text"
          value={address}
          setValue={setAddress}
        />
        <DefaultInput
          label={"Consumo em Reais"}
          labelClassName={"default-input-label"}
          className="consumptionReais-input default-form-input"
          id="consumptionReais"
          type="number"
          value={consumptionReais}
          setValue={setConsumptionReais}
        />
        <DefaultInput
          label={"Consumo em kWh"}
          labelClassName={"default-input-label"}
          className="consumptionkWh-input default-form-input"
          id="consumptionkWh"
          type="number"
          value={consumptionkWh}
          setValue={setConsumptionkWh}
        />
        <DefaultInput
          label={"Data de Vencimento"}
          labelClassName={"default-input-label"}
          className="dueDate-input default-form-input"
          id="dueDate"
          type="date"
          value={dueDate}
          setValue={setDueDate}
        />
        <input type="file" id="documentBillPath" name="documentBillPath" className="default-input-file" onChange={handleFile}/>
        <button className="primary-button btn-fatura">
          Cadastrar
        </button>
      </form>
      </section>
    </div>
  );
};

export default EnergyBillCadastro;
