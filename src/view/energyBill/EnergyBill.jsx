import React from 'react'
import DefaultInput from '../utils/form/DefaultInput';


const EnergyBill = () => {
  const [search, setSearch] = React.useState('');

  function handleSearch({target}){
  }

  return (
    <div>
      <section className='default-form-container'>
      <form className="form-container">
      <DefaultInput className="searchInput default-form-input" id="search" type="search" value={search} setValue={setSearch} placeholder="Pesquisar faturas..."/>
      </form>
      </section>
      {search}
    </div>
  )
}

export default EnergyBill
