import _ from 'lodash';
import uuid from 'uuid';

import {
    SERVER_TEMPLATE,
    INITIAL_ENDPOINTS,
    ADD_SERVER,
    UPDATE_SERVER
} from '../actions/types';

const INITIAL_STATE = {
    server_104: SERVER_TEMPLATE
};


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_SERVER: {
            const server = action.payload;

            let serverId = server.serverId;
            console.log("serer id");
            console.log(server);
            console.log(serverId);
            if (!serverId) {
                serverId = uuid();
            }
            const servers = _.clone(state, true);
            servers[serverId] = { ...server, serverId, endpoints: INITIAL_ENDPOINTS };
            return servers;
        }
        case UPDATE_SERVER: {
            console.log('update server');
            console.log(action.payload);
            const server = { ...state[action.payload.serverId], ...action.payload };
            console.log(server);
            return { ...state, [server.serverId]: server };
        }
        default:
            return state;
    }
};
