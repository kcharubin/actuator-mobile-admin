import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { CardSection, Card, Button, Input } from './common';
import DoubleButton from './DoubleButton';
import { updateForm, updateServer } from '../actions';

class EndpointEdit extends Component {
    saveEndpoint() {
        const endpointId = this.props.endpointId || uuid();
        const { endpointName, endpointUrl, server } = this.props;
        const endpoint = { endpointName, endpointUrl };
        server.endpoints[endpointId] = endpoint;
        this.props.updateServer(server);
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label='Endpoint Name'
                        value={this.props.serverUrl}
                        onChangeText={text => this.props.updateForm({ prop: 'endpointName', value: text })}
                        placeholder='Health'
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label='Endpoint URL'
                        value={this.props.serverUrl}
                        onChangeText={text => this.props.updateForm({ prop: 'endpointUrl', value: text })}
                        placeholder='/health'
                    />
                </CardSection>
                <CardSection>
                    <DoubleButton
                        leftBtnCallback={() => console.log('left')}
                        leftBtnName='Cancel'
                        rightBtnCallback={() => this.saveEndpoint()}
                        rightBtnName='Save'
                    />
                </CardSection>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    const { endpointName, endpointUrl } = state.form;
    const server = state.servers[state.selectedOption.serverId];
    const endpointId = state.selectedOption.endpointId;
    return { endpointName, endpointUrl, server, endpointId };
};

export default connect(mapStateToProps, { updateForm, updateServer })(EndpointEdit);
