import { GearSix } from 'phosphor-react';
import React from 'react';
import DeleteAddressModal from './DeleteAddressModal';
import useToken from "../app/useToken";
import { useNavigate } from "react-router-dom";

const AddressItem = ({ id, city, houseNumber, inputVoltage, neighborhood, street, state, handleClick, handleDelete, ...props }) => {
  const { token, payload } = useToken();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/address/alterar/${id}` );
  };

  return (
    <>
      <li id={id} className="default-item" onClick={handleClick}>
        <div className="address-details">
          <span className='default-item-title-text'>{houseNumber}</span>
          <span className='default-item-main-text'>{street} - {inputVoltage}v </span>
          <span className='default-item-footer-text'>{neighborhood} - {city}/{state}</span>
        </div>
      </li>
    
      <div className="btns-address">
        <button 
          className="btn-address-edit" 
          type="button" 
          onClick={ handleEdit }>
          <GearSix  size={25} weight="fill" />
        </button>
        <DeleteAddressModal token={token} userId={payload.id} addressId={id} onDelete={handleDelete}/>
      </div>
    </>
  );
};

export default AddressItem;