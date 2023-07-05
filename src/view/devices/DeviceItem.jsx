import { GearSix } from 'phosphor-react';
import React from 'react';
import DeleteDeviceModal from './DeleteDeviceModal';
import useToken from "../app/useToken";
import { useNavigate } from "react-router-dom";

const DeviceItem = ({ id, name, power, consumptionKWh, consumptionReais, handleClick, handleDelete,}) => {
  const { token, payload } = useToken();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/devices/alterar/${id}` );
  };

  return (
    <>
      <li id={id} className="default-item" onClick={handleClick}>
        <div className="device-details">
          <span className='default-item-title-text'>R${consumptionReais} por dia</span>
          <span className='default-item-main-text'>{name} </span>
          <span className='default-item-footer-text'>{power}W - {consumptionKWh}kWh</span>
        </div>
      </li>
    
      <div className="btns-address">
        <button 
          className="btn-address-edit" 
          type="button" 
          onClick={ handleEdit }>
          <GearSix  size={25} weight="fill" />
        </button>
        <DeleteDeviceModal token={token} id={id} addressId={payload.id} onDelete={handleDelete}/>
      </div>
    </>
  );
};

export default DeviceItem;