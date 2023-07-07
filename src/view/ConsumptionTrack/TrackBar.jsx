import React, { Fragment } from "react";

 const TrackBar = ({lastConsumption, currentConsumption}) => {
   
    return (
        <Fragment>
            <div className="flex-track">
                <div id="last-month-kwh">
                    <div id= "current-month-kwh">
                        {currentConsumption.toFixed(2)} kWh ⠀
                    </div>
                </div> <h5 className="typography">⠀{lastConsumption} kWh</h5>
            </div>
        </Fragment>
    )
}

export default TrackBar;