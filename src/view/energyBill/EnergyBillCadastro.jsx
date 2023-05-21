import React from "react";
import Header from "../utils/Header";
import DefaultInput from "../utils/form/DefaultInput";
import axios from "axios";
import useToken from '../app/useToken';

const EnergyBillCadastro = () => {
  const [referenceDate, setReferenceDate] = React.useState("");
  const [address, setAddress] = React.useState();
  const [consumptionReais, setConsumptionReais] = React.useState();
  const [consumptionkWh, setConsumptionkWh] = React.useState();
  const [dueDate, setDueDate] = React.useState("");
  const [file, setFile] = React.useState();
  const [fileId, setFileId] = React.useState();
  const [addressId, setAddressId] = React.useState();
  const {token} = useToken();
  
  React.useEffect(() =>{
    console.log(token);
  }, [token]);

  const handleFile = ({ target }) => {
    setFile(target.files[0]);
  };
  const handleFileUpload = async (event) => {
    event.preventDefault();

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
    await setFileId(response.data);
  };

  const handleSubmit = async (event) => {
    await handleFileUpload(event);
    await axios.post(
      `http://localhost:8080/api/energyBill/address/${addressId}/billFile/${fileId}`,
      {
        referenceDate,
        dueDate,
        consumptionReais,
        consumptionkWh,
        fileId
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-type": "application/json",
        },
      }
    );
  };

  return (
    <div>
      <Header textContent="Cadastrar Fatura" />
      <section className="default-form-container">
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
        <form
          encType="multipart/form-data"
          onSubmit={handleFileUpload}
          method="POST"
        >
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
