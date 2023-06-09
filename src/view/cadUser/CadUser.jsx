import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerUser } from "../../api/FetchUser";
import logo from "../../images/luminous-logo.svg";
import * as yup from "yup";
import useToken from "../app/useToken";

export default function CadUser() {
  const { setToken } = useToken();
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");

  const redirectTo = () => navigate("/login");

  const schema = yup.object().shape({
    name: yup.string()
    .required("Você deve preencher todos os campos"),
    userName: yup.string()
    .required("Você deve preencher todos os campos"),
    email: yup.string()
    .required("Você deve preencher todos os campos")
    .matches(),
    password: yup.string().required("Você deve preencher todos os campos"),
    phone: yup.string()
    .required("Você deve preencher todos os campos"),
    birthdate: yup.string().required("Você deve preencher todos os campos")
  }).required();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const phoneMask = ({target: {value}}) => {
    if (!value) return "";
    value = value.replace(/\D/g,'');
    value = value.replace(/(\d{2})(\d)/,"($1) $2");
    value = value.replace(/(\d)(\d{4})$/,"$1-$2");
    setPhone(value)
  }

  const doRequest = async payload => {
    const token = await registerUser({
      payload
    });
    if(token) {
      setToken(token);
      redirectTo()
    }
  }

  useEffect(() => {}, [phone])

  return (
      <Fragment>
            <div className="default-form-container">
        <img src={logo} alt="logo" className="logo" style={{marginBottom:"10px"}}/>
        <h1 className="primary-title">Junte-se a nós</h1>
        <div>
          <form className="form-container" onSubmit={handleSubmit(e => doRequest(e))}>
            <label className="control-label">
              <p>Nome</p>
              <input
              className="default-form-input"
              type="text" {...register("name")}/>
            {errors.name && <p>{errors.name.message}</p>}
            </label>
            <label className="control-label">
              <p>Usuário</p>
              <input
              className="default-form-input" type="text" {...register("userName")}/>
              {errors.username && <p>{errors.username.message}</p>}
            </label>
            <label className="control-label">
              <p>Email</p>
              <input
              className="default-form-input" type="email" {...register("email")}/>
              {errors.email && <p>{errors.email.message}</p>}
            </label>
            <label className="control-label">
              <p>Senha</p>
              <input
              className="default-form-input" type="password" {...register("password")}/>
              {errors.password && <p>{errors.password.message}</p>}
            </label>
            <label className="control-label">
              <p>Telefone</p>
                <input
                className="default-form-input"
                  type="text"
                  maxLength="15"
                  value={phone}
                  {...register("phone", {
                    onChange: e => phoneMask(e),
                    value: phone
                  })}
                />
                {errors.phone && <p>{errors.phone.message}</p>}
            </label>
            <label className="control-label">
              <p>Data de nascimento</p>
            <input className="default-form-input" type="date"
            {...register("birthdate")}/>
            {errors.birthdate && <p>{errors.birthdate.message}</p>}
            </label>
            <label  className="control-label">
              <input type="submit" value="Criar conta" className="primary-button" />
            </label>
          </form>
        </div>
        <div>
          <p className="default-info-message">Ja possui uma conta? <Link to="/login">Entrar</Link></p>
        </div>
            </div>
      </Fragment>
  )
}