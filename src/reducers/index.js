import { combineReducers } from 'redux';
import ServersReducer from './ServersReducer';
import SelectServerReducer from './SelectServerReducer';
import ServerFormReducer from './ServerFormReducer';
import FetchedDataReducer from './FetchedDataReducer';
import NavigationReducer from './NavigationReducer';

const combinedReducer = combineReducers({
    servers: ServersReducer,
    selectedOption: SelectServerReducer,
    form: ServerFormReducer,
    fetchedData: FetchedDataReducer,
    nav: NavigationReducer
});

export default combinedReducer;
