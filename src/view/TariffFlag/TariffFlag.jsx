import React, { Fragment, useState } from "react";
import Header from "../utils/Header";
import useToken from "../../states/useToken";
import { getCurrentTariffFlag } from "../../api/FetchTariffFlag";
import Loading from "../loading/Loading";
import {Flag} from '@phosphor-icons/react';

export default function TariffFlag () {
    const [flag, setFlag] = useState();
    const { token } = useToken();

    const flagColor = (flag) =>{
      return flag == 1? "#CA8A04" :
             flag == 2? "#22C55E" :
             flag == 3? "#22C55E" : "#22C55E"
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
                  
              <div>
                <p>Month {flag.month}</p>
                <p>Flag Type {flag.flagType}</p>
                <Flag size={78} color="#A3E635" />
              </div>

            </Fragment>
        )
      }

    }