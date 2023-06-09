import React from 'react'

const AddressItem = ({id, city, houseNumber, inputVoltage, neighborhood, street, state,handleClick, ...props}) => {
  return (
    <>
      <li id={id} className="default-item" onClick={handleClick}>
        <span className='default-item-title-text'>{houseNumber}</span>
        <span className='default-item-main-text'>{street} - {inputVoltage}v</span>
        <span className='default-item-footer-text'>{neighborhood} - {city}/{state}</span>
      </li>
    </>
  )
}

export default AddressItem