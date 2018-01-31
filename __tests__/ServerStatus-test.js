import 'react-native';
import React from 'react';

import {
    checkIfResponseIsError,
    checkIfResponseIsSuccess,
    checkIfEndpointIsError,
    checkIfEndpointIsHealthy,
    checkIfEndpointIsSyncing,
    checkIfServerHasError,
    checkIfServerIsHealthy,
    checkIfServerIsSyncing
} from '../src/helpers';
const hpData = {
    db: { status: "UP", database: "MySQL", hello: 1 },
    diskSpace: { status: "UP", total: 31035727872, free: 27414249472, threshold: 10485760 },
    status: "UP"
};
const hpData2 = {
    db: { status: "UP", database: "MySQL", hello: 1 },
    diskSpace: { status: "UP", total: 31035727872, free: 27414249472, threshold: 10485760 },
    status: "DOWN"
};

const hpData3 = {
    db: { status: "UP", database: "MySQL", hello: 1 },
    diskSpace: { status: "UP", total: 31035727872, free: 27414249472, threshold: 10485760 },
};

const endpoint1 = { endpointId: "e1", isHealthEndpoint: true };
const endpoint2 = { endpointId: "e2", isHealthEndpoint: true };
const endpoint3 = { endpointId: "e3", isHealthEndpoint: true };
const endpoint4 = { endpointId: "e4", isHealthEndpoint: true };

const server1 = { serverId: "1", endpoints: [endpoint1] };
const server2 = { serverId: "2", endpoints: [endpoint1, endpoint3] };
const server3 = { serverId: "3", endpoints: [endpoint2] };
const server4 = { serverId: "4", endpoints: [endpoint3] };

const serverId1 = server1.serverId;
const serverId2 = server2.serverId;
const serverId3 = server3.serverId;
const serverId4 = server4.serverId;
const fetchedData = {
    e1: { time: "Tue Jan 30 2018 10:11:24 GMT+0100 (CET)", data: hpData, loading: false, isSuccess: true, serverId: serverId1 },
    e2: { time: "Sun Jan 28 2018 19:25:27 GMT+0100 (CET)", data: hpData, loading: false, isSuccess: false, serverId: serverId1 },
    e3: { time: "Sun Dec 31 2017 14:43:00 GMT+0100 (CET)", data: hpData, loading: true, serverId: serverId1 },
    e4: { time: "Tue Jan 30 2018 10:11:24 GMT+0100 (CET)", data: hpData2, loading: false, isSuccess: true, serverId: serverId2 },
    e5: { time: "Sun Jan 28 2018 19:25:27 GMT+0100 (CET)", data: {}, loading: false, isSuccess: false, serverId: serverId3 },
    e6: { time: "Sun Dec 31 2017 14:43:00 GMT+0100 (CET)", data: hpData2, loading: false, isSuccess: true, serverId:serverId4 },
}
const { e1, e2, e3, e4, e5, e6 } = fetchedData;

describe('test if server is syncing (sending call to acutator api)', () => {
    test('Check if server 1 is syncing', () => {
        expect(checkIfServerIsSyncing(server1, fetchedData)).toEqual(true);
    });
    test('Check if server 2 is syncing', () => {
        expect(checkIfServerIsSyncing(server2, fetchedData)).toEqual(false);
    });
    test('Check if server 3 is syncing', () => {
        expect(checkIfServerIsSyncing(server3, fetchedData)).toEqual(false);
    });
    test('Check if server 4 is syncing', () => {
        expect(checkIfServerIsSyncing(server4, fetchedData)).toEqual(false);
    });
});

describe('test if endpoints are syncing', () => {
    test('check if endpoint 1(e1) is syncing', () => {
        expect(checkIfEndpointIsSyncing(endpoint1, fetchedData)).toEqual(false);
    });
    test('check if endpoint 2(e2) is syncing', () => {
        expect(checkIfEndpointIsSyncing(endpoint2, fetchedData)).toEqual(false);
    });
    test('check if endpoint 3(e3) is syncing', () => {
        expect(checkIfEndpointIsSyncing(endpoint3, fetchedData)).toEqual(true);
    })
});

describe('Check checkIfResponseIsError api responses', () => {
    test('check status UP and resonse isSuccess = true', () => {
        expect(checkIfResponseIsError(e1, true)).toEqual(false);
    });
    test('check status UP and response isSuccess = false', () => {
        expect(checkIfResponseIsError(e2, true)).toEqual(true);
    });
    test('check status !== UP and response isSuccess = true', () => {
        expect(checkIfResponseIsError(e4, true)).toEqual(true);
    });
    test('check  response isSuccess = false', () => {
        expect(checkIfResponseIsError(e5, false)).toEqual(true);
    });

});
describe('Check checkIfResponseIsSuccess api responses', () => {
    test('check status UP and resonse isSuccess = true', () => {
        expect(checkIfResponseIsSuccess(e1, true)).toEqual(true);
    });
    test('check status UP and response isSuccess = false', () => {
        expect(checkIfResponseIsSuccess(e2, true)).toEqual(false);
    });
    test('check status !== UP and response isSuccess = true', () => {
        expect(checkIfResponseIsSuccess(e4, true)).toEqual(false);
    });
});

describe('Check endpoints statuses', () => {
    test('check status UP and resonse isSuccess = true', () => {
        expect(checkIfEndpointIsHealthy(endpoint1, fetchedData)).toEqual(true);
    });
    test('check status UP and response isSuccess = false', () => {
        expect(checkIfEndpointIsHealthy(endpoint2, fetchedData)).toEqual(false);
    });
    test('check status !== UP and response isSuccess = true', () => {
        expect(checkIfEndpointIsHealthy(endpoint3, fetchedData)).toEqual(false);
    });

});