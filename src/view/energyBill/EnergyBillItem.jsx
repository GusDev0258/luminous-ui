import React from 'react'

const EnergyBillItem = ({id,address, dueDate, consumptionReais, consumptionkWh, ...props}) => {
  return (
    <>  
    <li className="default-item" id={id}>
    <span className="default-item-title-text">{address}</span>
    <span className="default-item-main-text">Fatura - {dueDate}</span>
    <span className="default-item-footer-text">
      R${consumptionReais} -{" "}
      {consumptionkWh}kWh
    </span>
  </li></>
  )
}

export default EnergyBillItem