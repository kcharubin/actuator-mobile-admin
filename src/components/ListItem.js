import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import React from 'react';

import { CardSection } from './common';


const ListItem = ({ title, onPress, onAccessoryPress, accessoryTitle }) => {
    const { textStyle, btnContainer, editStyle } = styles;
    return (
        <TouchableOpacity onPress={() => onPress()}>
            <CardSection style={{ paddingTop: 0, paddingBottom: 0 }}>
                <View style={btnContainer}>
                    <Text style={textStyle}>{title}</Text>
                    <TouchableOpacity onPress={() => onAccessoryPress()}>
                        <Text style={editStyle}>{accessoryTitle}</Text>
                    </TouchableOpacity>
                </View>
            </CardSection>
        </TouchableOpacity>

    );
};
const styles = StyleSheet.create({
    btnContainer: {
        padding: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1

    },
    textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 40,
        marginTop: 5,
        marginBottom: 5
    },
    editStyle: {
        lineHeight: 50,
        paddingLeft: 40,
        paddingRight: 10,
        marginRight: -10,
    }
}
);
export default ListItem;
