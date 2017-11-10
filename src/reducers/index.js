import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ServersReducer from './ServersReducer';
import SelectServerReducer from './SelectServerReducer';
import ServerFormReducer from './ServerFormReducer';


export default combineReducers({
    auth: AuthReducer,
    servers: ServersReducer,
    selectedOption: SelectServerReducer,
    form: ServerFormReducer
});

