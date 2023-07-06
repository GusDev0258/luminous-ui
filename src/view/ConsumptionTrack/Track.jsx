import React from "react";
import '../../css/Track/Track.css';
import { Fragment, useState, useContext } from "react";
import { getCurrentConsumption } from "../../api/FetchConsumptionTrack";
import Header from "../utils/Header";
import useToken from "../../states/useToken";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";
import { CurrentAddressContext } from "../../states/CurrentAddressContext";

const ConsumptionTrack = () => {
    
    const { currentAddress } = useContext(
        CurrentAddressContext
    );
    
    const [consumption, setConsumption] = useState();
    
    const { token } = useToken();

    console.log(token, currentAddress[0]["id"]);
    if (!consumption) {
        (async () => {
          const data = await getCurrentConsumption(token, currentAddress[0]["id"]);

          setConsumption(data);
        })();
        return <Loading />;
        } else {

            const{energyConsumptionKWh, energyConsumptionReais, lastEnergyBill} = consumption
            const currentCons = consumption.energyConsumptionKWh;
            const lastMonthCons = 108.43;
            const tributes = 37.56;
        return(
            <Fragment>
            <div>
                <Header textContent={"Acompanhamento"} />
                <div>
                    <p class="typography">{lastMonthCons} kWh</p>
                    <div class="last-month-kwh"></div>
                    <p class="typography">{energyConsumptionKWh.toFixed(2)} kWh</p>  
                    <div class="current-month-kwh"></div>
                </div>
                    <p class="typography">Tributos totais: R${tributes}</p>
                <div>
                    <div class = "circle">
                        <p class="typography-16">Valor total:</p>
                        <p class="total-value">R${(energyConsumptionReais + tributes).toFixed(2)}</p>
                    </div>
                </div>       
            </div>
            </Fragment>
        )
    }
}

export default ConsumptionTrack;