import React from 'react'
import Logo from "../../images/luminous-logo.svg";
import RecoverDeco from "../../images/recover2.svg";
import { CaretRight } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import '../../css/Password/Password.css';

const PasswordSent = () => {
  const navigate = useNavigate('/login');

  React.useEffect(() => {
    document.title = 'Email enviado | Luminous';
  },[])

  return (
    <div className="recover-container">
      <img src={Logo} alt="logo" className="logo" />
      <h1 className="primary-title">Recuperar Senha</h1>
      <img src={RecoverDeco} alt="recover sent" className="recover-deco" />
      <p className='recover-text'>
        Um link para recuperar sua senha foi enviado ao seu email
      </p>
      <button className='primary-button' style={{display: 'flex', alignItems: "center", justifyContent: "center"}}
      onClick={navigate}>
        CONTINUAR <CaretRight size={24} weight="bold" />
      </button>
    </div>
  )
}

export default PasswordSent