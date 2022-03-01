import {combineReducers} from 'redux';
import {now} from "../utils";
import {DISMISS_ALERT, SET_ALERT} from "../constants/app";
import images from './images';
import settings from './settings';
import filters from "./filters";
import user from "./user";

const alertSort = (a, b) => a.id - b.id;
const errorAlert = (err) => ({type: 'danger', title: err.name, message: err.message, id: now()});

const alerts = (state = [], action) => {
    const {type, props, id, context}  = action;
    switch (type) {
    case SET_ALERT:
        if (!!props.context) {
            const [{id = now(), count = 0} = {}] = state.filter(a => a.context === props.context);
            return [
                ...state.filter(a => a.context !== props.context),
                {...props, id, count: count + 1}
            ].sort(alertSort);
        }
        return [...state, {...props, count: 1, id: now()}].sort(alertSort);
        // return [...state, {...props, id: new Date().valueOf()}];
    case DISMISS_ALERT:
        if (!id && !!context) {
            return [...state.filter(alert => alert.context !== context)].sort(alertSort);
        }
        return [...state.filter(alert => alert.id !== id)].sort(alertSort);
    default:
        return state;
    }
};


export default combineReducers({
    alerts,
    settings,
    images,
    filters,
    user,
})
