import React from 'react'
import TipSlider from './TipSlider';
import { Link } from 'react-router-dom';

const Tip = () => {
  return (
    <div>
      <TipSlider />
      <Link to={'/'} className='primary-button continue'>Continuar</Link>
    </div>
  )
}

export default Tip