
import React, { useState, useEffect, Fragment, memo } from 'react';
import useToken from "../app/useToken";
import { getWeatherTips } from "../../api/FetchWeatherTip";

const SnackBar = memo(() => {
  const [notification, setNotification] = useState({});
  const { token, payload } = useToken();

  const fetchNotifications = async () => {
    try {
      const data = await getWeatherTips(token, payload);
      console.log(data);
      setNotification(await getWeatherTips(token, payload));
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchNotifications, 5 * 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const closeNotification = () => {
    setNotification({});
  };

  return (
    <Fragment>
      {Object.keys(notification).length !== 0 ?
      <div>
          <div>
            <p>{notification.description}</p>
            <p>{notification.city}</p>
            <p>{notification.temperature}</p>
            <p>{notification.feelsLike}</p>
            <p>{notification.tip}</p>
            <button onClick={() => closeNotification()}>Close</button>
          </div>
      </div> :
<Fragment></Fragment>
    }
    </Fragment>
  );
});

export default SnackBar;
