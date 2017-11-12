import { combineReducers } from 'redux';
import ServersReducer from './ServersReducer';
import SelectServerReducer from './SelectServerReducer';
import ServerFormReducer from './ServerFormReducer';
import FetchedDataReducer from './FetchedDataReducer';

export default combineReducers({
    servers: ServersReducer,
    selectedOption: SelectServerReducer,
    form: ServerFormReducer,
    fetchedData: FetchedDataReducer
});

