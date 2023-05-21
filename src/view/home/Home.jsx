import { useContext, useEffect } from "react";
import { getAddressByUser } from "../../api/FetchAddress";
import useToken from "../app/useToken";
import { AddressContext } from "../../states/AddressContext";

export default function Home() {
  const {token, payload} = useToken();
  const {setHasAddress} = useContext(AddressContext);

  return (
    <div>
      <h1>Home!</h1>
    </div>
  );
}
