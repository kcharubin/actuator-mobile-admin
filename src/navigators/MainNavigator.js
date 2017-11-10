import { StackNavigator } from 'react-navigation';
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
            title: 'Server Add'
        }
    },
    ServerEdit: {
        screen: ServerEdit,
        navigationOptions: {
            title: 'Server Eidt',
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
