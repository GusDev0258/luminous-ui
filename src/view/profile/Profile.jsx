import { Fragment, useEffect, useState } from "react";
import useToken from "../app/useToken";
import { getUser, updateUser } from "../../api/FetchUser";
import Loading from "../loading/Loading";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DeleteModal from "./DeleteModal";

export default function Profile() {
  const { token, payload } = useToken();
  const [user, setUser] = useState();
  const [phone, setPhone] = useState();

  const schema = yup.object().shape({
    name: yup.string(),
    userName: yup.string(),
    phone: yup.string(),
    birthdate: yup.string(),
  });

  const phoneMask = (value) => {
    if (!value) return "";
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    setPhone(value);
  };

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const updateUserData = async (body) => {
    const data = await updateUser(token, payload, body);
    setUser(data);
  };

  useEffect(() => {}, [user]);

  if (!user) {
    (async () => {
      const data = await getUser(token, payload);
      setUser(data);
      phoneMask(data.phone);
    })();
    return <Loading />;
  } else {
    return (
      <Fragment>
        <h1>Meu Perfil</h1>
        <h2>{user.userName}</h2>
        <h3>Informações do usuário</h3>
        <div>
          <form onSubmit={handleSubmit((e) => updateUserData(e))}>
            <label>
              <p>Nome</p>
              <input
                type="text"
                defaultValue={user.name}
                {...register("name")}
              />
            </label>
            <label>
              <p>Username</p>
              <input
                type="text"
                defaultValue={user.userName}
                {...register("userName")}
              />
            </label>
            <label>
              <p>Senha</p>
              <input type="password" />
            </label>
            <label>
              <p>Data de nascimento</p>a
              <input
                type="date"
                defaultValue={user.birthdate}
                {...register("birthdate")}
              />
            </label>
            <label>
              <p>Telefone</p>
              <input
                type="text"
                maxLength="15"
                value={phone}
                {...register("phone", {
                  onChange: (e) => phoneMask(e.target.value),
                  value: phone,
                })}
              />
            </label>
            <button type="submit">Atualizar dados</button>
          </form>

          <DeleteModal/>
        </div>
      </Fragment>
    );
  }
}
