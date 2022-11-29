import React from 'react';
import {useSelector} from "react-redux";
import {dismissAlert, selectAlerts} from "./index";
import {useAppDispatch} from "../../app/hooks";
import {Alert} from "chums-components";

const AlertList = () => {
    const dispatch = useAppDispatch();
    const list = useSelector(selectAlerts);

    const dismissHandler = (id: number) => {

    }
    return (
        <div>
            {list.map(alert => (
                <Alert key={alert.id} title={alert.title} color={alert.color} canDismiss onDismiss={() => dismissHandler(alert.id)}>
                    {alert.message}
                </Alert>
            ))}
        </div>
    )
}
export default AlertList;
