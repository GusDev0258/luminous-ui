import React from "react";
import { Trash, PencilSimple } from "@phosphor-icons/react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import useToken from "../../states/useToken";
import { deleteEnergyBillById } from "../../api/FetchEnergyBills";
import axios from "axios";
import { BASE_URL } from "../../api/DefaultUrl";

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

  const handleDownload = (energyBillId, dueDate) => {
    axios.get(`${BASE_URL}billFile/download/${energyBillId}`,{
      responseType: 'blob',
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `minha_fatura_${moment(dueDate).format("DD/MM/YYYY")}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error('Erro ao baixar o arquivo:', error);
      });
  };

  return (
    <>
      <li className="default-item" id={id}>
        <span className="default-item-title-text">{address}</span>
        <div className="default-item-with-icons-container">
        <a onClick={() => handleDownload(id, dueDate)}>
        <span className="default-item-main-text">
          Fatura - {moment(dueDate).format("DD/MM/YYYY")}
        </span>
        </a>
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
