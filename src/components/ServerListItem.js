import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import React from 'react';

import { CardSection } from './common';


const ServerListItem = ({ server, onPress, onAccessoryPress }) => {
    const { textStyle, btnContainer, editStyle } = styles;
    return (
        <TouchableOpacity onPress={() => onPress()}>
            <CardSection>
                <View style={btnContainer}>
                    <Text style={textStyle}>{server.serverName}</Text>
                    <TouchableOpacity onPress={() => onAccessoryPress()}>
                        <Text style={editStyle}>Edit</Text>
                    </TouchableOpacity>
                </View>
            </CardSection>
        </TouchableOpacity>

    );
};
const styles = StyleSheet.create({
    btnContainer: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1

    },
    textStyle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    editStyle: {
        lineHeight: 50,
        paddingLeft: 30
    }
}
);
export default ServerListItem;
