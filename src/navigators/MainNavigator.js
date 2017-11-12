import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import React from 'react';
import { connect } from 'react-redux';
import MainScreen from '../components/MainScreen';
import ServerEdit from '../components/ServerEdit';
import EndpointEdit from '../components/EndpointEdit';
import EndpointDetails from '../components/EndpointDetails';
import ServerEndpoints from '../components/ServerEndpoints';

export const MainNavigator = StackNavigator({
    Main: {
        screen: MainScreen,
        navigationOptions: {
            title: 'Servers',
        }
    },
    ServerAdd: {
        screen: ServerEdit,
        navigationOptions: {
            title: 'Add server'
        }
    },
    ServerEdit: {
        screen: ServerEdit,
        navigationOptions: {
            title: 'Edit server',
        }
    },
    ServerEndpoints: {
        screen: ServerEndpoints,
        navigationOptions: {
            title: 'Actuator endpoints',
        }
    },
    EndpointAdd: {
        screen: EndpointEdit,
        navigationOptions: {
            title: 'Add endpoint'
        }
    },
    EndpointEdit: {
        screen: EndpointEdit,
        navigationOptions: {
            title: 'Edit endpoint'
        }
    },

    EndpointDetails: {
        screen: EndpointDetails,
    }
});

const mapStateToProps = state => ({
    nav: state.nav
});

const MainNavigatorWithState = ({ dispatch, nav }) => (
    <MainNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

export default connect(mapStateToProps)(MainNavigatorWithState);
