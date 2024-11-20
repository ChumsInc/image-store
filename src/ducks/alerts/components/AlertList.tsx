import React from 'react';
import {useSelector} from "react-redux";
import {dismissAlert, selectAlerts} from "../index";
import {useAppDispatch} from "../../../app/hooks";
import ContextAlert from "./ContextAlert";


const AlertList = () => {
    const dispatch = useAppDispatch();
    const list = useSelector(selectAlerts);

    const dismissHandler = (id: number) => {
        dispatch(dismissAlert(id));
    }
    return (
        <div>
            {list.map(alert => (
                <ContextAlert key={alert.id} color={alert.color} onClose={() => dismissHandler(alert.id)}
                       context={alert.context} count={alert.count}>
                    {alert.message}
                </ContextAlert>
            ))}
        </div>
    )
}
export default AlertList;
