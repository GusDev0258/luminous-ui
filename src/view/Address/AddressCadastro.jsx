import React from 'react'
import DefaultInput from '../utils/Form/DefaultInput'

const AddressCadastro = () => {

  const [city, setCity] = React.useState("");

  return (
    <div>
      <DefaultInput
              label={"Cidade"}
              labelClassName={"default-input-label"}
              className="reference-date-input default-form-input"
              id="city"
              type="text"
              value={city}
              setValue={setCity}
            />
    </div>
  )
}

export default AddressCadastro
