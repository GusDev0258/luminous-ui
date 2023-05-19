import React from "react";

const DefaultInput = ({ type, label, labelClassName, id, value, setValue, ...props }) => {
  function handleChange({ target }) {
    setValue(target.value);
  }
  return (
    <>
      <label className={labelClassName} htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={handleChange}
        {...props}
      />
    </>
  );
};

export default DefaultInput;
