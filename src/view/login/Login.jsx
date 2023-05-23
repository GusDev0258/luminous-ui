import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginUser } from "../../api/FetchUser";
import * as yup from "yup";
import useToken from "../app/useToken";
import logo from '../../images/luminous-logo.svg';
import abstractVector from '../../images/login-abstract.svg';


export default function Login() {
  const [unauthorized, setUnauthorized] = useState(false);
  const { setToken } = useToken();
  const navigate = useNavigate();

  const schema = yup
    .object()
    .shape({
      email: yup
        .string()
        .required("Você deve preencher todos os campos")
        .matches(),
      password: yup.string().required("Você deve preencher todos os campos"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const redirectToHome = () => navigate("/home");

  const login = async (userData) => {
    const data = await loginUser(userData);
      if (data?.token) {
        setToken(data);
        redirectToHome();
      } else {
        setUnauthorized(true);
      }

  return (
    <div className="default-form-container">
      <img src={logo} alt="logo" className="logo"/>
      <h1 className="primary-title">Conecte-se</h1>
      <form className="form-container" onSubmit={handleSubmit((e) => login(e))}>
        <label className="control-label">
          Email
          <input type="email" {...register("email")} className="default-form-input"/>
          {errors.email && <p>{errors.email.message}</p>}
        </label>
        <label className="control-label">
          Senha
          <input type="password" {...register("password")} className="default-form-input"/>
          {errors.password && <p>{errors.password.message}</p>}
        </label>
        <label className="control-label">
          <input type="submit" value="Entrar" className="primary-button"/>
        </label>
      </form>
      {unauthorized && <p>Login ou senha estão incorretos</p>}
      <p className="default-info-message">
        Não possue uma conta? <a href="/register">Registre-se</a>
      </p>
      <img src={abstractVector} alt="deco"/>
    </div>
  );
}
}
