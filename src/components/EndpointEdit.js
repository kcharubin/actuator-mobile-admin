import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { CardSection, Card, Button, Input } from './common';
import DoubleButton from './DoubleButton';

class EndpointEdit extends Component {
    render() {
        return (
            <Card>
                <CardSection>
                    <Input />
                </CardSection>
                <CardSection>
                    <DoubleButton
                        leftBtnCallback={() => console.log('left')}
                        leftBtnName='Cancel'
                        rightBtnCallback={() => console.log('right')}
                        rightBtnName='Save'
                    />
                </CardSection>
            </Card>
        );
    }
}

export default EndpointEdit;
