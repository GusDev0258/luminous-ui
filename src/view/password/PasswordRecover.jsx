import React from 'react'
import Logo from "../../images/luminous-logo.svg";
import RecoverDeco from "../../images/recover.svg";
import DefaultInput from '../utils/Form/DefaultInput';
import axios from 'axios';
import { BASE_URL } from '../../api/DefaultUrl';
import { Link, useNavigate } from 'react-router-dom';

const PasswordRecover = () => {
  const [email, setEmail] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) =>{
    event.preventDefault();
    await axios.post(`${BASE_URL}auth/password-recovery`, {
      email
    }, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    }).then(() => navigate("/password/sent"))
    }

  return (
    <div className='default-form-container'>
      <img src={Logo} alt="logo" className="logo" />
      <h1 className="primary-title">Recuperar Senha</h1>
      <img src={RecoverDeco} alt="decoration" className="recover-deco" />
      <section className="default-form-container">
      <form onSubmit={handleSubmit} className="form-container">
        <DefaultInput 
          label={"Email de recuperação"}
          labelClassName={"default-input-label"}
          className="email-input default-form-input"
          id="email"
          type="email"
          placeholder="Digite seu email"
          value={email}
          setValue={setEmail}
        />
        <button className='primary-button'>
          ENVIAR
        </button>
    </form>
    <Link to={"/login"}>
      Já possui uma conta? <b>Entrar</b>
    </Link>
    </section>
    </div>
  )
}

export default PasswordRecover