import _ from 'lodash';
import uuid from 'uuid';

import {
    INITIAL_ENDPOINTS,
    ADD_SERVER,
    UPDATE_SERVER,
    DELETE_SERVER,
    FETCH_ENDPOINT,
    FETCH_ENDPOINT_FAILURE,
    FETCH_ENDPOINT_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
};



export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_SERVER: {
            const server = action.payload;

            let serverId = server.serverId;
            if (!serverId) {
                serverId = uuid();
            }
            const servers = _.clone(state, true);
            servers[serverId] = { ...server, serverId, endpoints: { ...INITIAL_ENDPOINTS } };
            return servers;
        }
        case UPDATE_SERVER: {
            const server = { ...state[action.payload.serverId], ...action.payload };
            return { ...state, [server.serverId]: server };
        }
        case DELETE_SERVER: {
            return _.omit(state, [action.payload]);
        }
        case FETCH_ENDPOINT: {
            console.log('FETCH_ENPOINT');
            console.log(action);
            return state;
        }
        case FETCH_ENDPOINT_FAILURE: {
            console.log('FETCH_ENDPOINT_FAILURE');
            console.log(action);
            return state;
        }
        case FETCH_ENDPOINT_SUCCESS: {
            console.log('FETCH_ENDPOINT_SUCCESS');
            console.log(action);
            return state;
        }
        default:
            return state;
    }
};
