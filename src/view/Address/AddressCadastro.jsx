import React from "react";
import Header from "../utils/Header";
import DefaultInput from "../utils/Form/DefaultInput";
import DefaultCheckbox from "../utils/Form/DefaultCheckbox";
import DefaultSelection from "../utils/Form/DefaultSelection";
import axios from "axios";
import useToken from "../app/useToken";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../api/DefaultUrl";


const AddressCadastro = () => {
  const [city, setCity] = React.useState("");
  const [cep, setCep] = React.useState("");
  const [houseNumber, setHouseNumber] = React.useState("");
  const [inputVoltage, setInputVoltage] = React.useState("110");
  const [street, setStreet] = React.useState("");
  const [neighborhood, setNeighborhood] = React.useState("");
  const [state, setState] = React.useState("");
  const [nickname, setNickname] = React.useState("");
  const [mainAddress, setMainAddress] = React.useState("");

  const [selectedValue, setSelectedValue] = React.useState("");
  
  const options = [110, 220];

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
        energyProviderId: 70,
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
          className="nickname-input default-form-input"
          id="nickname"
          type="text"
          value={nickname}
          setValue={setNickname}
        /> 

        <div>
          <DefaultSelection
            label={"Voltagem"}
            labelClassName={"default-input-label"}
            className="inputVoltage-input default-form-input"
            id="selectionId"
            value={inputVoltage}
            setValue={setInputVoltage}
            options={options}
          />  
        </div>

        <DefaultCheckbox 
           label={"Endereço Principal"}
           labelClassName={"default-input-label"}
           id="mainAddress"
           value={mainAddress}
           onCheckedChange={setMainAddress}
        />
        
          <button type="submit" className="primary-button btn-endereco">
            Cadastrar
          </button>
          </form>
          </section>
    </div>
  );
};

export default AddressCadastro;