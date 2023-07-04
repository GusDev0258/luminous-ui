import React from "react";
import Header from "../utils/Header";
import DefaultInput from "../utils/Form/DefaultInput";
import axios from "axios";
import useToken from "../app/useToken";
import { useNavigate } from "react-router-dom";
import { CurrentAddressContext } from "../../states/CurrentAddressContext";
import {
  registerEnergyBill,
  uploadBillFile,
  updateEnergyBill,
  getEnergyBillById,
} from "../../api/FetchEnergyBills";

const EnergyBillCadastro = () => {
  const [referenceDate, setReferenceDate] = React.useState("");
  const [energyConsumptionReais, setEnergyConsumptionReais] =
    React.useState("");
  const [energyConsumption_kWh, setEnergyConsumption_kWh] = React.useState("");
  const [dueDate, setDueDate] = React.useState("");
  const [file, setFile] = React.useState();
  const [fileId, setFileId] = React.useState();
  const { token } = useToken();
  const navigate = useNavigate();
  const { currentAddress } = React.useContext(CurrentAddressContext);
  const [energyBillToEdit, setEnergyBillToEdit] = React.useState({});

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  const energyBillId = params.energyBill;

  React.useEffect(() => {
    document.title = "Cadastro de Fatura | Luminous";
    if (file) {
      handleFileUpload();
    }
    if (energyBillId) {
      getEnergyBillToUpdate(energyBillId, token);
    }
  }, [file]);

  const getEnergyBillToUpdate = async (energyBillId, token) => {
    const requiredEnergyBill = await getEnergyBillById(energyBillId, token);
    await loadEnergyBillDate(requiredEnergyBill);
  };

  const loadEnergyBillDate = (energyBill) => {
    setEnergyBillToEdit(energyBill);
    setReferenceDate(energyBill.referenceDate);
    setDueDate(energyBill.dueDate);
    setEnergyConsumptionReais(energyBill.energyConsumptionReais);
    setEnergyConsumption_kWh(energyBill.energyConsumption_kWh);
  };

  const handleEnergyBillEdit = async (event) => {
    event.preventDefault();
    const energyBillData = {
      referenceDate,
      dueDate,
      energyConsumptionReais,
      energyConsumption_kWh,
      fileId,
    };
    if (energyBillId) {
      await updateEnergyBill(energyBillId, energyBillData, token).then(() => {
        navigate(`/energyBill/`);
      });
    }
  };

  const handleFile = ({ target }) => {
    setFile(target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();

    formData.append("file", file);

    const uploadedFileId = await uploadBillFile(formData, token);
    setFileId(uploadedFileId);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const energyBillData = {
      referenceDate,
      dueDate,
      energyConsumptionReais,
      energyConsumption_kWh,
      fileId,
    };
    await registerEnergyBill(
      currentAddress.id,
      fileId,
      energyBillData,
      token
    ).then(() => navigate(`/energyBill/?address=${currentAddress.id}`));
  };
  if (energyBillId) {
    return (
      <div>
        <Header textContent="Editar Fatura" />
        <section className="default-form-container">
          <form onSubmit={handleEnergyBillEdit}>
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
              value={currentAddress.city}
              disabled={true}
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
            <button className="primary-button btn-fatura">Editar Fatura</button>
          </form>
        </section>
      </div>
    );
  } else {
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
              value={currentAddress.city}
              disabled={true}
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
  }
};

export default EnergyBillCadastro;
