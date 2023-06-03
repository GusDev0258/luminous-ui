import { Fragment } from "react";

export default function Notification({closeToast, toastProps, notification}) {
    return (
        <Fragment>
            {console.log(notification)}
            <div>
            <p>{notification.description}</p>
            <p>{notification.city}</p>
            <p>{notification.temperature}</p>
            <p>{notification.feelsLike}</p>
            <p>{notification.tip}</p>
          </div>
        </Fragment>
    )
}