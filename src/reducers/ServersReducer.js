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

const arrayToObjectsWithUuid = (array, indexName) =>
    array.reduce((o, itm) => {
        const obj = o;
        const item = itm;
        const id = uuid();
        if (indexName) {
            item[indexName] = id;
        }
        obj[id] = item;
        return obj;
    }, {});

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_SERVER: {
            const server = action.payload;

            let serverId = server.serverId;
            if (!serverId) {
                serverId = uuid();
            }
            const servers = _.clone(state, true);
            const endpoints = { ...arrayToObjectsWithUuid(INITIAL_ENDPOINTS, 'endpointId') };
            servers[serverId] = { ...server, serverId, endpoints };
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
