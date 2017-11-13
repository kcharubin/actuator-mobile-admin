import {
    Button,
    Alert
} from 'react-native';
import React, { Component } from 'react';

class RightNavButton extends Component {
    constructor() {
        super();
        this.internalOnPress = this.internalOnPress.bind(this);
    }


    internalOnPress() {
        const { onPress, alertTitle, alertMsg, shouldConfirm } = this.props;
        if (shouldConfirm) {
            Alert.alert(
                alertTitle,
                alertMsg,
                [
                    { text: 'Cancel', onPress: () => { }, style: 'cancel' },
                    { text: 'OK', onPress: () => onPress(this.props) },
                ],
                { cancelable: false }
            );
            return;
        }
        onPress(this.props);
    }

    render() {
        const { title } = this.props;
        return (
            <Button
                title={title}
                onPress={this.internalOnPress}
            />
        );
    }
}

export default RightNavButton;
