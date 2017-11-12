import { NavigationActions } from 'react-navigation';

import {
    ADD_SERVER,
    NEW_SERVER,
    SELECT_SERVER,
    SELECT_SERVER_ENDPOINT,
    UPDATE_SERVER,
    UPDATE_FORM,
    EDIT_SERVER,
    EDIT_SERVER_ENDPOINT,
    NEW_ENDPOINT,
    DELETE_SERVER
} from './types';


import { navigatorRef } from '../App';

export const createServer = () => (dispatch) => {
    dispatch({
        type: NEW_SERVER,
        payload: null
    });
    navigatorRef.dispatch(
        NavigationActions.navigate({ routeName: 'ServerAdd', params: { addServ: true } })
    );
};

export const addServer = (server) => (
    {
        type: ADD_SERVER,
        payload: server
    }
);
export const deleteServer = (serverId) => (
    {
        type: DELETE_SERVER,
        payload: serverId
    }
);


export const updateServer = (server) => (
    {
        type: UPDATE_SERVER,
        payload: server
    }
);

export const editServer = (server) => (dispatch) => {
    dispatch({
        type: EDIT_SERVER,
        payload: server
    });
    navigatorRef.dispatch(
        NavigationActions.navigate({ routeName: 'ServerEdit' })
    );
};

export const selectServer = (server) => (dispatch) => {
    dispatch({
        type: SELECT_SERVER,
        payload: server
    });
    navigatorRef.dispatch(
        NavigationActions.navigate({ routeName: 'ServerEndpoints' })
    );
};


export const selectServerEndpoint = (endpoint) => (dispatch) => {
    dispatch({
        type: SELECT_SERVER_ENDPOINT,
        payload: endpoint
    });
    navigatorRef.dispatch(
        NavigationActions.navigate({ routeName: 'EndpointDetails' })
    );
};

export const editServerEndpoint = (endpoint) => (dispatch) => {
    dispatch({
        type: EDIT_SERVER_ENDPOINT,
        payload: endpoint
    });
    navigatorRef.dispatch(
        NavigationActions.navigate({ routeName: 'EndpointEdit' })
    );
};

export const createServerEndpoint = (server) => (dispatch) => {  
    dispatch({
        type: NEW_ENDPOINT,
        payload: server
    });
    navigatorRef.dispatch(
        NavigationActions.navigate({ routeName: 'EndpointAdd', params: { addServ: true } })
    );
};

export const updateForm = ({ prop, value }) => (
    {
        type: UPDATE_FORM,
        payload: { prop, value }
    }
);

