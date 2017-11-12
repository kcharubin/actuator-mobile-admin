import axios from 'axios';

import {
    FETCH_ENDPOINT,
    FETCH_ENDPOINT_SUCCESS,
    FETCH_ENDPOINT_FAILURE
} from './types';

export const fetchEndpoint = (server, endpoint) => (dispatch) => {
    const url = `${server.serverUrl}/${endpoint.endpointUrl}`;
    const { userName, userPassword } = server.basicAuth;

    const requestConfig = {
        auth: {
            username: userName,
            password: userPassword
        }
    };
    dispatch({
        type: FETCH_ENDPOINT,
        payload: null,
        server,
        endpoint
    });
    axios.get(url, requestConfig)
        .then((response) => {
            dispatch({
                type: FETCH_ENDPOINT_SUCCESS,
                payload: response.data,
                server,
                endpoint
            });
        }).catch((error) => {
            dispatch({
                type: FETCH_ENDPOINT_FAILURE,
                error,
                server,
                endpoint
            });
        });
};

