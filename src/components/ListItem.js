import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import React from 'react';

import { CardSection, TransparentCardSection, Spinner } from './common';

const renderAccessory = (loading, accessoryTitle) => {
    const { editStyle } = styles;
    if (loading) {
        return <Spinner size="small" />;
    }
    return <Text style={editStyle}>{accessoryTitle}</Text>;
};

const ListItem =
    ({ title, onPress, onAccessoryPress, accessoryTitle, loading, isError, isHealthy }) => {
        const { textStyle, btnContainer, errorStyle, normalStyle, healthyStyle, cardSectionStyle } = styles;
        let itemStyle = normalStyle;
        if (isHealthy) itemStyle = healthyStyle;
        if (isError) itemStyle = errorStyle;

        return (
            <TouchableOpacity style={itemStyle} onPress={() => onPress()}>
                <TransparentCardSection style={cardSectionStyle}>
                    <View style={btnContainer}>
                        <Text style={textStyle}>{title}</Text>
                        <TouchableOpacity onPress={() => onAccessoryPress()}>
                            {renderAccessory(loading, accessoryTitle)}
                        </TouchableOpacity>
                    </View>
                </TransparentCardSection>
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
    cardSectionStyle: {
        paddingTop: 0,
        paddingBottom: 0,
        marginRight: 5,
        backgroundColor: 'transparent'
    },
    errorStyle: {
        backgroundColor: 'red'
    },
    normalStyle: {
        backgroundColor: 'white'
    },
    healthyStyle: {
        backgroundColor: '#dfd'
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
