import _ from 'lodash';

export const endpointsToArray = (endpoints) => {
    return _.map(endpoints, (val, endpointId) => (
        { ...val, endpointId }
    ));
};
export const serversToArray = (servers) => {
    return _.map(servers, (val, serverId) => ({ ...val, serverId }));
};



export const checkIfEndpointIsSyncing = (endpoint, fetchedData) => {
    if (!fetchedData || !endpoint) {
        return false;
    }
    const { endpointId } = endpoint;
    return !!fetchedData[endpointId] && fetchedData[endpointId].loading === true;
};
export const checkIfEndpointIsHealthy = (endpoint, fetchedData) => {
    if (!fetchedData || !endpoint) {
        return false;
    }
    const { endpointId } = endpoint;
    return checkIfResponseIsSuccess(fetchedData[endpointId], endpoint.isHealthPoint);
};
export const checkIfEndpointIsError = (endpoint, fetchedData) => {
    if (!fetchedData || !endpoint) {
        return false;
    }
    const { endpointId } = endpoint;
    return checkIfResponseIsError(fetchedData[endpointId], endpoint.isHealthPoint);
};

export const checkIfResponseIsError = (response, isHealthPoint = false) => {
    console.log(response, isHealthPoint);
    if (!response) {
        return false;
    }
    if (isHealthPoint) {
        return response.isSuccess === false || !response.data || response.data.status !== 'UP';
    }
    return response.isSuccess === false;
};

export const checkIfItIsHealthEndpoint = (server, endpointId) => {
    const healthEndpoints = _.filter(server.endpoints, o => o.isHealthEndpoint === true);
    return _.find(healthEndpoints, e => e.isHealthPoint === true && e.endpointId === endpointId);
};

export const checkIfServerIsSyncing = (server, fetchedData) => {
    if (!fetchedData || !server) {
        return false;
    }
    const { serverId } = server;
    const filteredData = _.filter(
        endpointsToArray(fetchedData),
        o => o.serverId === serverId && o.loading === true
    );
    if (!!filteredData && filteredData.length > 0) {
        return true;
    }
    return false;
};

export const checkIfServerHasError = (server, fetchedData) => {
    const filteredData = _.filter(
        endpointsToArray(fetchedData),
        o => o.serverId === server.serverId &&
            checkIfResponseIsError(o, checkIfItIsHealthEndpoint(server, o.endpointId))
    );
    return filteredData.length > 0;
};

export const checkIfResponseIsSuccess = (response, isHealthPoint = false) => {
    if (!response) {
        return false;
    }
    if (isHealthPoint) {
        return response.isSuccess === true && !!response.data && response.data.status === 'UP';
    }
    return response.isSuccess === true;
};

export const checkIfServerIsHealthy = (server, fetchedData) => {
    const filteredData = _.filter(
        endpointsToArray(fetchedData),
        o => o.serverId === server.serverId &&
            !checkIfResponseIsSuccess(o, checkIfItIsHealthEndpoint(server, o.endpointId))
    );
    return filteredData.length === 0;
};

