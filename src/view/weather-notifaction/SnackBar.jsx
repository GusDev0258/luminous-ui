// import useToken from "../app/useToken";
// import { AddressContext } from "../../states/AddressContext";
// import { useLocation } from "react-router-dom";
// import { Fragment, useContext, useEffect, useState } from "react";
// import { getWeatherTips } from "../../api/FetchWeatherTip";

// function notInRegisterAndLogin(location) {
//   return location.pathname !== "/register" && location.pathname !== "/login";
// }

// function isInHome(location) {
//   return location.pathname === "/home";
// }

// export default function SnackBar() {
//   const location = useLocation();
//   const { token, payload } = useToken();
//   const [visible, setVisible] = useState(true);
//   const [notification, setNotification] = useState({});
//   const { hasAddress } = useContext(AddressContext);
//   const FIVE_MINUTES = 5 * 60 * 1000;

//   useEffect(() => {
//     (async () => {
//       if (notInRegisterAndLogin(location) || isInHome(location)) {
//         if (Object.keys(notification).length === 0 && payload) {
//           setNotification(await getWeatherTips(token, payload));
//           const timer = setInterval(() => setVisible(true), FIVE_MINUTES);
//           return () => clearInterval(timer);
//         }
//       }
//     })();
//   }, [hasAddress]);

//   return (
//     <Fragment>
//       {visible && Object.keys(notification).length !== 0 ? (
//         <div>
//           <div>{notification.city}</div>
//           <div>{notification.description}</div>
//           <div>{notification.feelsLike}</div>
//           <div>{notification.temperature}</div>
//           <div>{notification.tip}</div>
//           <button onClick={() => setVisible(false)}>X</button>
//         </div>
//       ) : (
//         <Fragment></Fragment>
//       )}
//     </Fragment>
//   );
// }
