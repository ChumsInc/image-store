import {combineReducers} from "redux";
import {alertsReducer, pagesReducer} from 'chums-ducks';
import {default as settingsReducer} from '../reducers/settings'
import {default as imagesReducer} from '../reducers/images'
import {default as filtersReducer} from '../reducers/filters'
import {default as userReducer} from '../reducers/user'

const rootReducer = combineReducers({
    alerts: alertsReducer,
    pages: pagesReducer,
    settings: settingsReducer,
    images: imagesReducer,
    filters: filtersReducer,
    user: userReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
