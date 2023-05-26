import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginUser } from "../../api/FetchUser";
import * as yup from "yup";
import useToken from "../app/useToken";

export default function Login() {
  const [unauthorized, setUnauthorized] = useState(false);
  const { setToken } = useToken();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string()
    .required("Você deve preencher todos os campos")
    .matches(),
    password: yup.string().required("Você deve preencher todos os campos"),
  }).required();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const redirectToHome = () => navigate("/");

  const login = async (userData) => {
    const data = await loginUser(userData);
      if (data?.token) {
        setToken(data);
        redirectToHome();
      } else {
        setUnauthorized(true);
      }

  }

    return(
      <div>
        <h1>Conecte-se</h1>
        <form onSubmit={handleSubmit(e => login(e))}>
          <label>
          email
          <input type="email"
          {...register("email")}
          />
          {errors.email && <p>{errors.email.message}</p>}
          </label>
          <label>
            senha
            <input type="password"
            {...register("password")}
             />
            {errors.password && <p>{errors.password.message}</p>}
          </label>
          <label>
            <input type="submit" value="Entrar" />
          </label>
        </form>
        {unauthorized && <p>Login ou senha estão incorretos</p>}
        <p>Não possue uma conta? <a href="/register">Registre-se</a></p>
      </div>
    )
  }
