import React from 'react'

const EnergyBillItem = ({address, dueDate, consumptionReais, consumptionkWh, ...props}) => {
  return (
    <>  
    <li className="energyBils-item">
    <span className="energyBill-address">{address}</span>
    <span className="energyBill-dueDate">Fatura - {dueDate}</span>
    <span className="energyBill-consumption">
      R${consumptionReais} -{" "}
      {consumptionkWh}kWh
    </span>
  </li></>
  )
}

export default EnergyBillItem