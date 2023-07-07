import React, { Fragment, useState } from "react";
import Header from "../utils/Header";
import useToken from "../../states/useToken";
import { getCurrentTariffFlag } from "../../api/FetchTariffFlag";
import Loading from "../loading/Loading";
import {Flag} from '@phosphor-icons/react';

export default function TariffFlag () {
    const [flag, setFlag] = useState();
    const { token } = useToken();

    const flagColor = () =>{
      return flag.flagType == 1? "#CA8A04" :
             flag.flagType == 2? "#FF5E5E" :
             flag.flagType == 3? "#BF0000" : "#22C55E";
    }

    const flagName= () =>{
      return flag.flagType == 1? "Amarela" :
             flag.flagType == 2? "Vermelha nivel 1" :
             flag.flagType == 3? "Vermelha nivel 2" : "verde";
    }

    if (!flag) {
        (async () => {
          const data = await getCurrentTariffFlag(token);
          setFlag(data);
        })();
        return <Loading />;
      } else {
        return (
            <Fragment>
              <div>
              <Header textContent={"Bandeira tarifária"} />
              </div>
                
              <div class="flexFlag"> 
              <Flag size={90} color={flagColor()} /> 
              </div>
              <div class="typography-tf">
                <p>Estamos na bandeira</p>
                <p>{flagName()}!</p>
              </div>

            </Fragment>
        )
      }

    }