import _ from 'lodash';
import uuid from 'uuid';

import {
    SERVER_TEMPLATE,
    INITIAL_ENDPOINTS,
    ADD_SERVER,
    UPDATE_SERVER,
    DELETE_SERVER
} from '../actions/types';

const INITIAL_STATE = {
    server_104: SERVER_TEMPLATE
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
        default:
            return state;
    }
};
