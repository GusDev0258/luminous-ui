import {AddressContext} from "../../states/AddressContext";
import { useContext } from "react";

export default function CadAddress() {
  const {setHasAddress} = useContext(AddressContext);
  return (
    <div>
      <button onClick={() => setHasAddress({
      city:"Ibirama",
    cep:"89140-000",
    houseNumber:123,
    inputVoltage:220,
    street:"Rua dos Bobos",
    state:"SC",
    neighborhood:"bairro legal"
})}>ativar</button>
      <button onClick={() => setHasAddress({})}>desativar</button>
    </div>
  );
}
