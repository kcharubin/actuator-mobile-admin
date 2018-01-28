import React, { Component } from 'react';
import { View, Switch, Text } from 'react-native';

class LabeledSwitch extends Component {
    
    render() {
        const { transparentContainerStyle, textStyle, switchStyle } = styles;
        return (
            <View style={transparentContainerStyle}>
                <Switch style={switchStyle} value={this.props.value} onValueChange={this.props.onValueChange} /><View style={transparentContainerStyle}><Text style={textStyle} >{this.props.label}</Text></View>
            </View>
        );
    }
}
const styles = {
    transparentContainerStyle: {
        padding: 5,
        backgroundColor: 'rgba(0,0,0,0)',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative',
        flex: 1
    },
    textStyle: {
        fontSize: 12,
        marginLeft: 8,
        marginRight: 8
    },
    switchStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    }
};

export default LabeledSwitch;
