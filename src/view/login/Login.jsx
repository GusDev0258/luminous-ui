import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useToken from "../app/useToken";
import luminousLogo from "../../images/luminous-logo.svg";
import abstract from "../../images/login-abstract.svg";
import Message from "../utils/Message";
import { Eye } from "@phosphor-icons/react";
import DefaultInput from "../utils/Input";

async function loginUser(credentials) {
  const response = await fetch("http://localhost:8080/api/auth/authenticate", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify(credentials),
  }).then((data) => data.json());

  return response;
}

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

  const redirectTo = () => navigate("/home");

  const login = async (userData) => {
    const data = await loginUser(userData);
    if (data?.token) {
      setToken(data);
      redirectTo();
    } else {
      setUnauthorized(true);
    }
  };

  return (
    <div className="default-form-container">
      <img src={luminousLogo} alt="Luminous" className="logo" />
      <h1 className="primary-title">Conecte-se</h1>
      <form className="form-container" onSubmit={handleSubmit((e) => login(e))}>
        {/* <DefaultInput
          labelText={"E-mail"}
          labelClass={"control-label"}
          inputClass={"default-form-input"}
          inputName={"email"}
          inputId={"email"}
          inputType={"email"}
          registerFor={'email'}
        />

        {errors.email && (
          <Message messageClass={"default-error-message"}>
            {errors.email.message}
          </Message>
        )}

        <DefaultInput
          labelText={"Senha"}
          labelClass={"control-label"}
          inputClass={"default-form-input"}
          inputName={"senha"}
          inputId={"senha"}
          inputType={"password"}
          registerFor={'password'}
        />

        {errors.password && (
          <Message messageClass={"default-error-message"}>
            {errors.password.message}
          </Message>
        )} */}

        <label className="control-label">
          E-mail
          <input type="email" className="default-form-input"
          {...register("email")}
          />
          {errors.email && <p>{errors.email.message}</p>}
          </label>
          <label className="control-label">
            Senha
            <input type="password" className="default-form-input"
            {...register("password")}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </label>
        <label>
          <input type="submit" value="Entrar" className="primary-button" />
        </label>
        {/* <button type="submit" className="primary-button">
          Entrar
        </button> */}
      </form>
      {unauthorized && <Message messageClass={'default-error-message'}>Login ou senha estão incorretos</Message>}
      <Message messageClass={'default-info-message'}>
        Não possui uma conta? <a href="/register">Registre-se</a>
      </Message>
      <img src={abstract} alt="deco" />
    </div>
  );
}
