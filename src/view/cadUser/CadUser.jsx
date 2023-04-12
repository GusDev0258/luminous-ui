import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import useToken from "../app/useToken";

async function request(data) {
  return fetch('http://localhost:8080/api/auth/register', {
    method: 'POST',
    headers: {
     Accept: 'application/json',
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(data.payload)
  })
    .then(data => data.json());
}

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

  const registerUser = async payload => {
    const token = await request({
      payload
    });
    if(token) {
      setToken(token);
      redirectTo()
    }
  }

  useEffect(() => {

  }, [phone])

  return (
    <div>
      <h1>Junte-se a nós</h1>
      <div>
        <form onSubmit={handleSubmit(e => registerUser(e))}>
          <label>
            <p>Nome</p>
            <input type="text" {...register("name")}/>
          {errors.name && <p>{errors.name.message}</p>}
          </label>
          <label>
            <p>Usuário</p>
            <input type="text" {...register("userName")}/>
            {errors.username && <p>{errors.username.message}</p>}
          </label>
          <label>
            <p>Email</p>
            <input type="email" {...register("email")}/>
            {errors.email && <p>{errors.email.message}</p>}
          </label>
          <label>
            <p>Senha</p>
            <input type="password" {...register("password")}/>
            {errors.password && <p>{errors.password.message}</p>}
          </label>
          <label>
            <p>Telefone</p>
              <input
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
          <label>
            <p>Data de nascimento</p>

          <input type="date"
          {...register("birthdate")}/>

          {errors.birthdate && <p>{errors.birthdate.message}</p>}
          </label>
          <label>
            <input type="submit" value="Criar conta" />
          </label>
        </form>
      </div>
      <div>
        <p>Ja possui uma conta? <a href="/login">Entrar</a></p>
      </div>
    </div>
  )
}