import React from 'react'

const ConsumptionAlertItem = ({id,address, consumption, description, type,...props}) => {
  return (
    <>  
    <li className="default-item" id={id}>
    <span className="default-item-title-text">{address}</span>
    <span className="default-item-main-text">Descrição - {description}</span>
    <span className="default-item-footer-text">
      {type === "REAIS" ? `R$${consumption}` : `${consumption}kWh`}
    </span>
  </li></>
  )
}

export default ConsumptionAlertItem