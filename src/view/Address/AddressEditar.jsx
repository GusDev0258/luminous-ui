import React, { useState, useEffect } from "react";
import Header from "../utils/Header";
import DefaultInput from "../utils/Form/DefaultInput";
import DefaultCheckbox from "../utils/Form/DefaultCheckbox";
import DefaultSelection from "../utils/Form/DefaultSelection";
import { useParams, useNavigate } from "react-router-dom";
import useToken from "../../states/useToken";
import { updateAddressById, getAddressByUser } from "../../api/FetchAddress";

import { BASE_URL } from "../../api/DefaultUrl";

const AddressEditar = () => {
  const { id } = useParams();
  const { token, payload } = useToken();
  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [cep, setCep] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [inputVoltage, setInputVoltage] = useState("");
  const [street, setStreet] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [state, setState] = useState("");
  const [nickname, setNickname] = useState("");
  const [mainAddress, setMainAddress] = useState("");

  const options = [110, 220];

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const addresses = await getAddressByUser(token, payload);
        const selectedAddress = addresses.filter((addr) => addr.id === parseInt(id))[0];
        setCity(selectedAddress.city);
        setCep(selectedAddress.cep);
        setHouseNumber(selectedAddress.houseNumber);
        setInputVoltage(selectedAddress.inputVoltage);
        setStreet(selectedAddress.street);
        setNeighborhood(selectedAddress.neighborhood);
        setState(selectedAddress.state);
        setNickname(selectedAddress.nickname);
        setMainAddress(selectedAddress.mainAddress);
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };

    fetchAddress();
  }, [id, token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateAddressById(token, payload.id, id, {
        city,
        cep,
        houseNumber,
        inputVoltage,
        street,
        neighborhood,
        state,
        nickname,
        mainAddress,
      });
      navigate(`/`);
    } catch (error) {
      console.error("Error updating address:", error);
    }
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
            Salvar
          </button>
          </form>
          </section>
    </div>
  );
};

export default AddressEditar;
