import React from 'react'
import TipSlider from './TipSlider';
import { Link, useNavigate } from 'react-router-dom';

const Tip = () => {

  const navigate = useNavigate();

  React.useEffect(() => {
    document.title = 'Dicas | Luminous';
    setTimeout(() => {
      navigate('/');
    }, 10000);
  },[])

  return (
    <div>
      <TipSlider />
      <Link to={'/'} className='primary-button continue'>Continuar</Link>
    </div>
  )
}

export default Tip