import React from "react";

const DefaultSelection = ({ label, labelClassName, id, value, setValue, options }) => {
  
  function handleChange({ target }) {
    setValue(target.value);
  }

  return (
    <>
      <label className={labelClassName} htmlFor={id}>
        {label}
      </label>
      <select id={id} value={value} onChange={handleChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};

export default DefaultSelection;
