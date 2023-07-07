import React from "react";
import Select from 'react-select';
import Header from "../utils/Header";
import DefaultInput from "../utils/Form/DefaultInput";
import DefaultCheckbox from "../utils/Form/DefaultCheckbox";
import axios from "axios";
import useToken from "../../states/useToken"
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../api/DefaultUrl";


const AddressCadastro = () => {
  const [city, setCity] = React.useState("");
  const [cep, setCep] = React.useState("");
  const [houseNumber, setHouseNumber] = React.useState("");
  const [inputVoltage, setInputVoltage] = React.useState("110");
  const [inputProvider, setInputProvider] = React.useState("CELESC");
  const [street, setStreet] = React.useState("");
  const [neighborhood, setNeighborhood] = React.useState("");
  const [state, setState] = React.useState("");
  const [nickname, setNickname] = React.useState("");
  const [mainAddress, setMainAddress] = React.useState("");

  const [selectedValue, setSelectedValue] = React.useState("");
  
  const optVoltage = [110, 220];
  const optProvider = ["CELESC"];

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const {token,payload} = useToken();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post(
        `${BASE_URL}address/user/${payload.id}`,
    {
        city,
        cep,
        houseNumber,
        inputVoltage,
        street,
        neighborhood,
        energyProviderId: 9,
        state,
        nickname,
        mainAddress
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-type": "application/json",
      },
    }
  ).then(() => navigate(`/`));
};

return (
    <div>
      <Header textContent="Cadastrar Endereço" />
      <section className="default-form-container">
      <form onSubmit={handleSubmit}>
        <DefaultInput
          label={"Cidade"}
          labelClassName={"default-input-label"}
          className="city-input default-form-input"
          id="city"
          type="text"
          value={city}
          setValue={setCity}
        />
        <DefaultInput
          label={"CEP"}
          labelClassName={"default-input-label"}
          className="cep-input default-form-input"
          id="cep"
          type="text"
          value={cep}
          setValue={setCep}
        />
        <DefaultInput
          label={"Número da Residência"}
          labelClassName={"default-input-label"}
          className="houseNumber-input default-form-input"
          id="houseNumber"
          type="text"
          value={houseNumber}
          setValue={setHouseNumber}
        />
       
        <DefaultInput
          label={"Rua"}
          labelClassName={"default-input-label"}
          className="street-input default-form-input"
          id="street"
          type="text"
          value={street}
          setValue={setStreet}
        />
        <DefaultInput
          label={"Bairro"}
          labelClassName={"default-input-label"}
          className="neighborhood-input default-form-input"
          id="neighborhood"
          type="text"
          value={neighborhood}
          setValue={setNeighborhood}
        />
        <DefaultInput
          label={"Estado"}
          labelClassName={"default-input-label"}
          className="state-input default-form-input"
          id="state"
          type="text"
          value={state}
          setValue={setState}
        /> 
        <DefaultInput
          label={"Nome"}
          labelClassName={"default-input-label"}
          className="inputProvide-input default-form-input"
          id="nickname"
          type="text"
          value={nickname}
          setValue={setNickname}
        /> 

        <div className="default-form-input">
            <label htmlFor="inputVoltage" className="default-input-label">
              Voltagem
            </label>
            <Select
              id="inputVoltage"
              value={{ value: inputVoltage, label: inputVoltage }}
              onChange={selectedOption =>
                setInputVoltage(selectedOption.value)
              }
              classNamePrefix="custom-select"
              className="custom-select-control"
              placeholderClassName="custom-select-placeholder"
              isSearchable={false}
              options={optVoltage.map(option => ({
                value: option,
                label: option
              }))}
              theme={theme => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary: "#ca8a04", // Cor da borda
                  primary25: "#f5f5f5" // Cor de fundo das opções ao passar o mouse
                }
              })}
            />
          </div>

        <div className="default-form-input">
            <label htmlFor="inputProvider" className="default-input-label">
              Distribuidora
            </label>
            <Select
              id="inputProvider"
              value={{ value: inputProvider, label: inputProvider }}
              onChange={selectedOption =>
                setInputProvider(selectedOption.value)
              }
              classNamePrefix="custom-select"
              className="custom-select-control"
              placeholderClassName="custom-select-placeholder"
              isSearchable={false}
              options={optProvider.map(option => ({
                value: option,
                label: option
              }))}
              theme={theme => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary: "#ca8a04", // Cor da borda
                  primary25: "#f5f5f5" // Cor de fundo das opções ao passar o mouse
                }
              })}
            />
          </div>

          <div className="default-form-input">
            <label htmlFor="mainAddress" className="default-input-label custom-checkbox-label">
              Endereço Principal
            </label>
            <DefaultCheckbox
              id="mainAddress"
              value={mainAddress}
              onCheckedChange={setMainAddress}
              className="custom-checkbox-input"
            />
          </div>

          <button type="submit" className="primary-button btn-endereco">
            Cadastrar
          </button>
          </form>
          </section>
    </div>
  );
};

export default AddressCadastro;