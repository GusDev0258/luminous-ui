import React from "react";

const DefaultInput = ({ type, label, id, value, setValue, ...props }) => {
  function handleChange({ target }) {
    setValue(target.value);
  }
  return (
    <>
      <label htmlFor={id}>{label}</label>
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
