import React from 'react'

const DefaultInput = ({labelText, labelClass, inputClass, inputId, inputName, inputType,handleChange, registerFor,...props }) => {
  

  return (
    <div>
    <label htmlFor={inputId} className={labelClass ? labelClass : 'control-label'}>
      {labelText}
    </label>
    <input 
      className={inputClass ? inputClass : 'default-form-input'}
      id={inputId}
      name={inputName}
      type={inputType}
      onChange={handleChange}
      {...props}
    />
    </div>
  )
}

export default DefaultInput