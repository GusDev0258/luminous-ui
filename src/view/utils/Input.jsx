import React from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const DefaultInput = ({labelText, labelClass, inputClass, inputId, inputName, inputType,onChange, registerFor,...props }) => {
  const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .required("Você deve preencher todos os campos")
      .matches(),
    password: yup.string().required("Você deve preencher todos os campos"),
  })
  .required();

const {
  register,
} = useForm({
  resolver: yupResolver(schema),
});

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
      onChange={onChange}
      {...register(`${registerFor}`)}
      {...props}
    />
    </div>
  )
}

export default DefaultInput