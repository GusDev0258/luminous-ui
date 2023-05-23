import React from "react";
import Header from "../utils/Header";
import DefaultInput from "../utils/form/DefaultInput";
import axios from "axios";
import useToken from '../app/useToken';
import useAddress from "../utils/useAddress";
import { useNavigate } from "react-router-dom";

const EnergyBillCadastro = () => {
  const [referenceDate, setReferenceDate] = React.useState("");
  const [energyConsumptionReais, setEnergyConsumptionReais] = React.useState("");
  const [energyConsumption_kWh, setEnergyConsumption_kWh] = React.useState("");
  const [dueDate, setDueDate] = React.useState("");
  const [file, setFile] = React.useState();
  const [fileId, setFileId] = React.useState();
  const [address, setAddress] = useAddress();
  const {token} = useToken();
  const navigate = useNavigate();
  
  React.useEffect(() =>{
    if(file){
      handleFileUpload();
    }
  }, [file]);

  const handleFile = async ({ target }) => {
    setFile(target.files[0]);
  };
  const handleFileUpload = async () => {

    const formData = new FormData();

    formData.append("file", file);

    const response = await axios.post(
      "http://localhost:8080/api/billFile/upload",
      formData,
      {
        headers: {
          authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-type": "multipart/form-data",
        },
      }
    );
    console.log(response);
    await setFileId(response.data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post(
      `http://localhost:8080/api/energyBill/address/${address}/billFile/${fileId}`,
      {
        referenceDate,
        dueDate,
        energyConsumptionReais,
        energyConsumption_kWh,
        fileId
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-type": "application/json",
        },
      }
    ).then(() => navigate(`/energyBill/?address=${address}`));
  };

  return (
    <div>
      <Header textContent="Cadastrar Fatura" />
      <section className="default-form-container">
      <form
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          accept={".pdf"}
        >
        <DefaultInput
          label={"Data de Referência"}
          labelClassName={"default-input-label"}
          className="reference-date-input default-form-input"
          id="referenceDate"
          type="date"
          value={referenceDate}
          setValue={setReferenceDate}
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
          type="text"
          value={energyConsumptionReais}
          setValue={setEnergyConsumptionReais}
        />
        <DefaultInput
          label={"Consumo em kWh"}
          labelClassName={"default-input-label"}
          className="consumptionkWh-input default-form-input"
          id="consumptionkWh"
          type="text"
          value={energyConsumption_kWh}
          setValue={setEnergyConsumption_kWh}
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
          <input
            type="file"
            id="documentBillPath"
            name="documentBillPath"
            className="default-input-file"
            onChange={handleFile}
          />
          <button type="submit" className="primary-button btn-fatura">
            Cadastrar
          </button>
        </form>
      </section>
    </div>
  );
};

export default EnergyBillCadastro;
