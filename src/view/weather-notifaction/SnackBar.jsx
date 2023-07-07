import React, { useState, useEffect, Fragment } from "react";
import useToken from "../../states/useToken";
import { getWeatherTips } from "../../api/FetchWeatherTip";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notification from "./Notification";

const FIVE_MINUTES = 5 * 60 * 1000;

const SnackBar = () => {
  const [notification, setNotification] = useState({});
  const { token, payload } = useToken();

  const fetchNotifications = async () => {
    try {
      const data = await getWeatherTips(token, payload);
      setNotification(data);
      notify(data);
    } catch (error) {}
  };

  useEffect(() => {
    if (
      window.location.pathname !== "/register" &&
      window.location.pathname !== "/login"
    ) {
      const interval = setInterval(fetchNotifications, FIVE_MINUTES);

      return () => {
        clearInterval(interval);
      };
    }
  }, [notification]);

  const notify = (data) => toast(<Notification notification={data} />);

  return (
    <Fragment>
      <ToastContainer />
    </Fragment>
  );
};

export default SnackBar;
