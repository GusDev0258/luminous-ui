import React from 'react'
import { Trash, PencilSimple } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import useToken from "../app/useToken";
import { BASE_URL } from "../../api/DefaultUrl";
import axios from "axios";

const ConsumptionAlertItem = ({id,address, consumption, description, type,...props}) => {

  const navigate = useNavigate();
  const {token} = useToken();

  function handleEdit(){
    navigate(`/consumption-alert/cadastro/?consumptionAlert=${id}`)
  }
  function handleDelete(){
    axios.delete(`${BASE_URL}consumption-alert/${id}`,{
      headers: {
        authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-type": "application/json",
      },
    }).then(() =>{
      props.onConsumptionAlertDelete(id);
    }).catch((error) => console.log(error)); 
  }

  return (
    <>  
    <li className="default-item" id={id}>
    <span className="default-item-title-text">{address}</span>
    <div className="default-item-with-icons-container">
    <span className="default-item-main-text">{description}</span>
        <PencilSimple size={24} className="default-item-edit" onClick={handleEdit}/>
        <Trash size={24} className="default-item-delete" onClick={handleDelete}/>
        </div>
    <span className="default-item-footer-text">
      {type === "REAIS" ? `R$${consumption}` : `${consumption}kWh`}
    </span>
  </li></>
  )
}

export default ConsumptionAlertItem