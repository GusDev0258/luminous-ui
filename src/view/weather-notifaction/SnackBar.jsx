import useToken from "../app/useToken";
import { Fragment, useEffect, useState } from "react";
import useAddress from "../../states/useAddress";

async function getWeatherTips(token, id) {
    const response = await fetch(`http://localhost:8080/api/weather-tip/${id}`, {
      method: 'GET',
      headers: {
       Accept: 'application/json',
       'Authorization':`Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then((data) => data.json());
    return response;
}

export default function SnackBar() {
    const {token, payload} = useToken();
    const [visible, setVisible] = useState(true);
    const [notification, setNotification] = useState({});
    const {hasAddress} = useAddress();
    const FIVE_MINUTES = 1 * 60 * 1000;

    useEffect((a) => {
        a = hasAddress
        console.log(a);

        if(hasAddress) {
            setNotification(async () => await getWeatherTips(token, payload.id));
            const timer = setInterval(() => setVisible(true), FIVE_MINUTES);
            return () => clearInterval(timer);
        }

      }, [hasAddress]);


    return (
        <Fragment>
            {console.log(notification)}
        {visible && token ?
        <div>
            <div>{notification.city}</div>
            <div>{notification.description}</div>
            <div>{notification.feelsLike}</div>
            <div>{notification.temperature}</div>
            {/* <div>{notification.tips[0]}</div> */}
            <button onClick={() => setVisible(false)}>X</button>
        </div> :
        <Fragment></Fragment>}

        </Fragment>
    )
}