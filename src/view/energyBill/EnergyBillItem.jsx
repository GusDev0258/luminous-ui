import React from "react";
import { Trash, PencilSimple } from "@phosphor-icons/react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../api/DefaultUrl";
import useToken from "../app/useToken";
import { deleteEnergyBillById } from "../../api/FetchEnergyBills";

const EnergyBillItem = ({
  id,
  address,
  dueDate,
  consumptionReais,
  consumptionkWh,
  ...props
}) => {
  const navigate = useNavigate();
  const {token} = useToken();

  function handleEdit(){
    navigate(`/energyBill/cadastro/?energyBill=${id}`)
  }
  async function handleDelete(){
    await deleteEnergyBillById(id, token).then(() =>{
      props.onEnergyBillDelete(id);
    }).catch((error) => console.log(error)); 
  }

  return (
    <>
      <li className="default-item" id={id}>
        <span className="default-item-title-text">{address}</span>
        <div className="default-item-with-icons-container">
        <span className="default-item-main-text">
          Fatura - {moment(dueDate).format("DD/MM/YYYY")}
        </span>
        <PencilSimple size={24} className="default-item-edit" onClick={handleEdit}/>
        <Trash size={24} className="default-item-delete" onClick={handleDelete}/>
        </div>
        <span className="default-item-footer-text">
          R${consumptionReais} - {consumptionkWh}kWh
        </span>
      </li>
    </>
  );
};

export default EnergyBillItem;
