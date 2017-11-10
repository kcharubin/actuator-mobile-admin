export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const PASSWORD_CHANGED = 'password_changed';
export const LOGINNAME_CHANGED = 'login_changed';
export const ADD_SERVER = 'add_server';
export const NEW_SERVER = 'new_server';
export const NEW_ENDPOINT = 'new_endpoint';
export const EDIT_SERVER = 'edti_server';
export const UPDATE_FORM = 'update_form';
export const UPDATE_SERVER = 'update_server';
export const SELECT_SERVER = 'select_server';
export const SELECT_SERVER_ENDPOINT = 'select_server_endpoint';
export const EDIT_SERVER_ENDPOINT = 'edit_server_endpoint';

export const INITIAL_ENDPOINTS = {
    e1: {
        endpointName: 'Health',
        endpointUrl: '/health',
    },
    e2: {
        endpointName: 'Metrics',
        endpointUrl: '/metrics',
    },
    e3: {
        endpointName: 'Trace',
        endpointUrl: '/trace',
    }
};

export const SERVER_TEMPLATE = {
    serverName: 'moj server',
    serverUrl: 'https://192.168.1.7:8585/',
    basicAuth: {
        userName: '',
        userPassword: '',
        loading: false,
        error: ''
    },
    endpoints: INITIAL_ENDPOINTS
};
