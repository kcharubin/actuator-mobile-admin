import 'react-native';
import React from 'react';
import * as actions from '../src/actions';
import ServerReducer from '../src/reducers/ServersReducer';

import {
    ADD_SERVER,
    UPDATE_SERVER
} from '../src/actions/types';

const INITIAL_STATE = {
    server_104: {
        serverName: 'moj server',
        serverId: '104'
    }
};



describe('test adding servers, actions, routers, redux state', () => {
    const server = {
        serverName: "testowy",
        serverId: 'sereridAdd_2'

    };
    test('test addding server action creator', () => {
        expect(
            actions.addServer(server)
        ).toEqual(
            {
                type: ADD_SERVER,
                payload: server
            }
            );
    });
    test('test add serer reducer', () => {
        console.log({ ...INITIAL_STATE });
        var reducerResult = ServerReducer(INITIAL_STATE, { type: ADD_SERVER, payload: { serverName: 'My super server', serverId: "ttt" } });
        
        console.log(reducerResult);
    });

    test('update existing server ', () => {
        const server = {
            serverName: 'server udpated'
        };
        expect(actions.updateServer(server))
            .toEqual(
            {
                type: UPDATE_SERVER,
                payload: server
            }
            );
    });
}
);

describe('Adding and editing actuator endpoints', () => {
    test('test adding endpoint', () => {


     });

});
