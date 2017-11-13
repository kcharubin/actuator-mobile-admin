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
    DELETE_SERVER,
    NAVIGATE
} from './types';


export const navigateAction = (routeParams) => (
    {
        type: NAVIGATE,   
        payload: routeParams
    }
);

export const navigateBack = () => (
    {
        type: 'Navigation/BACK'
    }
);

export const createServer = () => (dispatch) => {
    dispatch({
        type: NEW_SERVER,
        payload: null
    });
    dispatch(
        navigateAction({ routeName: 'ServerAdd', params: { addServ: true } })
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
    dispatch(
        navigateAction({ routeName: 'ServerEdit' })
    );
};

export const selectServer = (server) => (dispatch) => {
    dispatch({
        type: SELECT_SERVER,
        payload: server
    });
    dispatch(
        navigateAction({ routeName: 'ServerEndpoints' })
    ); 
};


export const selectServerEndpoint = (endpoint) => (dispatch) => {
    dispatch({
        type: SELECT_SERVER_ENDPOINT,
        payload: endpoint
    });
    dispatch(
        navigateAction({ routeName: 'EndpointDetails' })
    ); 
};

export const editServerEndpoint = (endpoint) => (dispatch) => {
    dispatch({
        type: EDIT_SERVER_ENDPOINT,
        payload: endpoint
    });
    dispatch(
        navigateAction({ routeName: 'EndpointEdit' })
    ); 
};

export const createServerEndpoint = (server) => (dispatch) => {
    dispatch({
        type: NEW_ENDPOINT,
        payload: server
    });
    dispatch(
        navigateAction({ routeName: 'EndpointAdd' })
    ); 
};

export const updateForm = ({ prop, value }) => (
    {
        type: UPDATE_FORM,
        payload: { prop, value }
    }
);

