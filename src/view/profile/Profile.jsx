import { Fragment, useEffect, useState } from "react";
import useToken from "../app/useToken";
import { getUser } from "../../api/FetchUser";
import Loading from "../loading/Loading";

export default function Profile() {
  const { token, payload } = useToken();
  const [user, setUser] = useState();

useEffect(() => {}, [user]);

  if (!user) {
    ( async () => {
      const data = await getUser(token, payload)
      console.log(data);
      setUser(data);
    })();
    return <Loading />;
  } else {
    return (
      <Fragment>
        <h1>Meu Perfil</h1>
        <h2>{user.userName}</h2>
        <h3>Informações do usuário</h3>
        <div>
          <form>
            <label>
              <p>Email</p>
              <input type="text" value={user.email} defaultValue="asd" />
            </label>
            <label>
              <p>Senha</p>
              <input type="password" />
            </label>
            <label>
              <p>Data de nascimento</p>a
              <input type="date" value={user.birthdate} defaultValue="asd"/>
            </label>
            <label>
              <p>Telefone</p>
              <input type="phone" value={user.phone} defaultValue="asd"/>
            </label>
          </form>
        </div>
      </Fragment>
    );
  }
}
