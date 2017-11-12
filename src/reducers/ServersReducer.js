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
    console.log('main eserver reducer');
    console.log(action);
    switch (action.type) {
        case ADD_SERVER: {
            const server = action.payload;

            let serverId = server.serverId;
            if (!serverId) {
                serverId = uuid();
            }
            const servers = _.clone(state, true);
            const serv = { ...server, serverId, endpoints: { ...INITIAL_ENDPOINTS } };
            console.log(serv);
            servers[serverId] = { ...server, serverId, endpoints: { ...INITIAL_ENDPOINTS } };
            return servers;
        }
        case UPDATE_SERVER: {
            console.log('update server');
            console.log(state);
            console.log(action.payload);
            const server = { ...state[action.payload.serverId], ...action.payload };
            console.log(server);
            return { ...state, [server.serverId]: server };
        }
        case DELETE_SERVER: {
            console.log("DELETE SERV");
            console.log(state);
            console.log(_.omit(state, [action.payload]));
            return _.omit(state, [action.payload]);
        }
        default:
            return state;
    }
};
