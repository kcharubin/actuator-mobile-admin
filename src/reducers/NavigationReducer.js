import { NavigationActions } from 'react-navigation';
import { MainNavigator } from '../navigators/MainNavigator';
import { NAVIGATE } from '../actions/types';

const firstAction = MainNavigator.router.getActionForPathAndParams('Main');
const tempNavState = MainNavigator.router.getStateForAction(firstAction);

export default (state = tempNavState, action) => {
    console.log('navigator reducer');
    console.log(state);
    switch (action.type) {
        case 'Navigation/BACK': {
            return MainNavigator.router.getStateForAction(
                NavigationActions.back(),
                state
            ) || state; 
        }
        case NAVIGATE: {
            return MainNavigator.router.getStateForAction(
                NavigationActions.navigate(action.payload),
                state
            ) || state;
        }

        default:
            return state;
    }
};
