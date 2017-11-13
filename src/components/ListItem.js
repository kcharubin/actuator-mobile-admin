import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import React from 'react';

import { CardSection } from './common';


const ListItem = ({ title, onPress, onAccessoryPress, accessoryTitle }) => {
    const { textStyle, btnContainer, editStyle } = styles;
    return (
        <TouchableOpacity onPress={() => onPress()}>
            <CardSection>
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
    },
    editStyle: {
        lineHeight: 40,
        paddingLeft: 30, 
    }
}
);
export default ListItem;
