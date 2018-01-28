import uuid from 'uuid';

import {
    UPDATE_FORM,
    NEW_SERVER,
    NEW_ENDPOINT,
    EDIT_SERVER,
    EDIT_SERVER_ENDPOINT
} from '../actions/types';

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

const INITIAL_ENDPOINT_STATE = {
    endpointId: '',
    endpointName: '',
    endpointUrl: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_FORM: {
            return { ...state, [action.payload.prop]: action.payload.value };
        }
        case NEW_SERVER: {
            return { ...INITIAL_STATE, serverId: uuid() };
        }
        case EDIT_SERVER: {
            const { serverName, serverUrl, serverId, basicAuth: { userName, userPassword } } = action.payload;
            return { ...INITIAL_STATE, serverName, serverUrl, userName, userPassword, serverId };
        }
        case EDIT_SERVER_ENDPOINT: {
            return { ...INITIAL_STATE, ...action.payload };
        }
        case NEW_ENDPOINT: {
            return { ...state, ...INITIAL_ENDPOINT_STATE };
        }

        default:
            return state;
    }
};
