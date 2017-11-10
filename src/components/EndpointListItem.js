import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import React from 'react';

import { CardSection } from './common';


const EndpointListItem = ({ endpoint, onPress }) => {
    const { textStyle, btnContainer } = styles;
    return (
        <TouchableOpacity onPress={() => onPress()}>
            <CardSection>
                <View style={btnContainer}>
                    <Text style={textStyle}>{endpoint.endpointName}</Text>
                </View>
            </CardSection>
        </TouchableOpacity>

    );
};
const styles = StyleSheet.create({
    btnContainer: {
        padding: 10,

    },
    textStyle: {
        fontSize: 18,
        fontWeight: 'bold'
    }
}
);
export default EndpointListItem;
