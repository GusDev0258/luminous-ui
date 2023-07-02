const DefaultCheckbox = ({ label, labelClassName, id, checked, onCheckedChange, ...props }) => {
  function handleChange() {
    onCheckedChange(!checked);
  }

  return (
    <>
      <label className={labelClassName} htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          {...props}
        />
        {label}
      </label>
    </>
  );
};

export default DefaultCheckbox;
