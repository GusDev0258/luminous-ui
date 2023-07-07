import React from "react";
import '../../css/Track/Track.css';
import { Fragment, useState, useContext } from "react";
import { getCurrentConsumption } from "../../api/FetchConsumptionTrack";
import Header from "../utils/Header";
import useToken from "../../states/useToken";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";
import { CurrentAddressContext } from "../../states/CurrentAddressContext";
import TrackBar from "./TrackBar";

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
            const lastMonthCons = 108.43;
            const tributes = 37.56;

            const getBarWidth = () =>{
                let element  = document.getElementById("current-month-kwh");
                let largura = (300*energyConsumptionKWh)/lastMonthCons
                element.style.width = largura + "%";
            }

        return(
            <Fragment>
            <div>
                <Header textContent={"Acompanhamento"} />
                <TrackBar lastConsumption={lastMonthCons} currentConsumption={energyConsumptionKWh}/>
                
                <div className="typography-17">
                    Tributos totais: {tributes}
                </div>

                <div className="flex-track">
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