import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => (
    <View style={[styles.containerStyle, props.style]}>
        {props.children}
    </View>
);
const TransparentCardSection = (props) => (
    <View style={[styles.transparentContainerStyle, props.style]}>
        {props.children}
    </View>
);

const styles = {
    containerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    },
    transparentContainerStyle: {
        padding: 5,
        backgroundColor: 'rgba(0,0,0,0)',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative'
    }

};

export { CardSection, TransparentCardSection };
