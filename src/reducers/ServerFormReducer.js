import {
    UPDATE_FORM,
    NEW_SERVER,
    EDIT_SERVER
} from '../actions/types';
import uuid from 'uuid';


const INITIAL_STATE = {
    serverName: '',
    serverUrl: '',
    userName: '',
    userPassword: '',
    serverId: '',
    endpointId: '',
    endpointName: '',
    endpointUrl: ''

};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_FORM: {
            console.log(state);
            return { ...state, [action.payload.prop]: action.payload.value };
        }
        case NEW_SERVER: {
            return { ...INITIAL_STATE, serverId: uuid() };
        }
        case EDIT_SERVER: {
            console.log(action.payload);
            const { serverName, serverUrl, serverId, basicAuth: { userName, userPassword } } = action.payload;
            return { ...INITIAL_STATE, serverName, serverUrl, userName, userPassword, serverId };
        }
        default:
            return state;
    }
};
