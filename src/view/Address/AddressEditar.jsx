import React, { useState, useEffect } from "react";
import Select from 'react-select';
import Header from "../utils/Header";
import DefaultInput from "../utils/Form/DefaultInput";
import DefaultCheckbox from "../utils/Form/DefaultCheckbox";
import { useParams, useNavigate } from "react-router-dom";
import useToken from "../../states/useToken";
import { updateAddressById, getAddressByUser } from "../../api/FetchAddress";

const AddressEditar = () => {
  const { id } = useParams();
  const { token, payload } = useToken();
  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [cep, setCep] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [inputVoltage, setInputVoltage] = useState("");
  const [inputProvider, setInputProvider] = useState("CELESC");
  const [street, setStreet] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [state, setState] = useState("");
  const [nickname, setNickname] = useState("");
  const [mainAddress, setMainAddress] = useState("");

  const optVoltage = [110, 220];
  const optProvider = ["CELESC"];

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
            Salvar
          </button>
          </form>
          </section>
    </div>
  );
};

export default AddressEditar;
