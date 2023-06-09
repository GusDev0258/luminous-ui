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
        <div className="default-form-container">
        <h1>Meu Perfil</h1>
        <h1 className="primary-title">{user.userName}</h1>
        <h2>Informações do usuário</h2>
          <form onSubmit={handleSubmit((e) => updateUserData(e))}>
            <label className="control-label">
              <p>Nome</p>
              <input
                type="text"
                className="default-form-input"
                defaultValue={user.name}
                {...register("name")}
              />
            </label>
            <label className="control-label">
              <p>Username</p>
              <input
                type="text"
                defaultValue={user.userName}
                className="default-form-input"
                {...register("userName")}
              />
            </label>
            <label className="control-label">
              <p>Senha</p>
              <input type="password" className="default-form-input"
 />
            </label>
            <label className="control-label">
              <p>Data de nascimento</p>a
              <input
                type="date"
                defaultValue={user.birthdate}
                className="default-form-input"
                {...register("birthdate")}
              />
            </label>
            <label className="control-label">
              <p>Telefone</p>
              <input
                type="text"
                className="default-form-input"
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

        </div>
          <DeleteModal/>
      </Fragment>
    );
  }
}
