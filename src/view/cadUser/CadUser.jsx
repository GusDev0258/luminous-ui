import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "../app/useToken";

async function registerUser(data) {
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

  const redirectTo = () => navigate("/home");
  
  const [payload, setPayload] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
    phone: "",
    birthDate:""
  });

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await registerUser({
      payload
    });
    if(token) {
      setToken(token);
      redirectTo()
    }
  }

  return (
    <div>
      <h1>Junte-se a nós</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Nome</p>
            <input type="text" value={payload.name} onChange={e => setPayload({...payload, name: e.target.value})}/>
          </label>
          <label>
            <p>Nome de Usuário</p>
            <input type="text" value={payload.userName} onChange={e => setPayload({...payload, userName: e.target.value})}/>
          </label>
          <label>
            <p>Email</p>
            <input type="text" value={payload.email} onChange={e => setPayload({...payload, email: e.target.value})}/>
          </label>
          <label>
            <p>Senha</p>
            <input type="password" value={payload.password} onChange={e => setPayload({...payload, password: e.target.value})}/>
          </label>
          <label>
            <p>Telefone</p>
            <input type="text" value={payload.phone} onChange={e => setPayload({...payload, phone: e.target.value})}/>
          </label>
          <label>
            <p>Data de nascimento</p>
            <input type="date" value={payload.birthDate} onChange={e => setPayload({...payload, birthDate: e.target.value})}/>
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