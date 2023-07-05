import React, { Fragment, useState } from "react";
import Header from "../utils/Header";
import useToken from "../../states/useToken";
import { getCurrentTariffFlag } from "../../api/FetchTariffFlag";
import Loading from "../loading/Loading";

export default function TariffFlag () {
    const [flag, setFlag] = useState();
    const { token } = useToken();

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
    </div>

            </Fragment>
        )
      }

    }