import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Button } from './common';

const DoubleButton = ({ leftBtnName, leftBtnCallback, rightBtnName, rightBtnCallback }) => {
    const { equalSplitStyle, verticalSeparatorStyle } = styles;
    return (
        <View style={equalSplitStyle}>
            <Button onPress={() => leftBtnCallback()}>{leftBtnName}</Button>
            <View style={verticalSeparatorStyle} />
            <Button onPress={() => rightBtnCallback()}>{rightBtnName}</Button>
        </View>
    );
};
const styles = StyleSheet.create({

    equalSplitStyle: {
        flex: 2,
        flexDirection: 'row'
    },
    verticalSeparatorStyle: {
        flex: 0.05
    }

});

export default DoubleButton;
