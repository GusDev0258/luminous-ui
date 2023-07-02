import React from 'react'
import DefaultInput from '../utils/Form/DefaultInput';
import Logo from "../../images/luminous-logo.svg";
import axios from 'axios';
import { BASE_URL } from '../../api/DefaultUrl';
import { useNavigate, useSearchParams } from 'react-router-dom';

const PasswordReset = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassowrd] = React.useState("");
  const navigate = useNavigate();
  const [tokenParam, setTokenParam] = useSearchParams();
  

  const handleSubmit = async () => {
    if(password === confirmPassword){
    try{
        await axios.post(`${BASE_URL}auth/password-reset?token=${tokenParam.get("token")}`, {
          email,
          password
        },{
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }).then(() =>{
          navigate("/login");
        })
      }catch(error){
        console.log(error)
      }
  }
  }

  return (
    <section className='default-form-container'>
      <img src={Logo} alt="logo" className="logo" />
      <h1 className="primary-title">Mudar Senha</h1>
      <form className="form-container" onSubmit={handleSubmit}>
      <DefaultInput 
          label={"Confirmar email de recuperação"}
          labelClassName={"default-input-label"}
          className="email-input default-form-input"
          id="email"
          type="email"
          placeholder="Digite seu email"
          value={email}
          setValue={setEmail}
        />
        <DefaultInput 
          label={"Nova senha"}
          labelClassName={"default-input-label"}
          className="email-input default-form-input"
          id="password"
          type="password"
          placeholder="Nova senha"
          value={password}
          setValue={setPassword}
        />
        <DefaultInput 
          label={"Confirmar senha"}
          labelClassName={"default-input-label"}
          className="email-input default-form-input"
          id="confirm-password"
          type="password"
          placeholder="Confirmar senha"
          value={confirmPassword}
          setValue={setConfirmPassowrd}
        />
        <button className='primary-button'>CONFIRMAR

        </button>
      </form>
    </section>
  )
}

export default PasswordReset