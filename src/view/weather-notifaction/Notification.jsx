import { Fragment } from "react";

export default function Notification({closeToast, toastProps, notification}) {
    return (
        <Fragment>
            <div>
            <p>Descrição: {notification.description}</p>
            <p>Cidade: {notification.city}</p>
            <p>Temperatura: {notification.temperature}</p>
            <p>Sensação térmica: {notification.feelsLike}</p>
            <p>Dica: {notification.tip}</p>
          </div>
        </Fragment>
    )
}