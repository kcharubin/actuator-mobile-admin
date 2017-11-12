import React, { Component } from 'react';
import { Button as NativeButton, Alert } from 'react-native';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { CardSection, Card, Input } from './common';
import DoubleButton from './DoubleButton';
import { updateForm, updateServer } from '../actions';

class EndpointEdit extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        const headerRight = (
            <NativeButton
                title="Delete"
                onPress={params.deleteEndpoint ? params.deleteEndpoint : () => null}
            />
        );
        return { headerRight };
    };
    constructor() {
        super();
        this.deleteEndpoint = this.deleteEndpoint.bind(this);
    }
    componentDidMount() {
        this.props.navigation.setParams({ deleteEndpoint: this.deleteEndpoint });
    }
    deleteEndpoint() {
        Alert.alert(
            'Delete endpoint',
            'Are you sure that you want to delete this endpoint?',
            [
                { text: 'Cancel', onPress: () => { }, style: 'cancel' },
                { text: 'OK', onPress: () => this.deleteEndpointConfirmed() },
            ],
            { cancelable: false }
        );
    }

    deleteEndpointConfirmed() {
        const { endpointId, server } = this.props;
        if (endpointId) {
            delete server.endpoints[endpointId];
            this.props.updateServer(server);
        }
        this.props.navigation.goBack();
    }

    saveEndpoint() {
        console.log("PROPS");
        console.log(this.props);
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
                        value={this.props.endpointName}
                        onChangeText={text => this.props.updateForm({ prop: 'endpointName', value: text })}
                        placeholder='Health'
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label='Endpoint URL'
                        value={this.props.endpointUrl}
                        onChangeText={text => this.props.updateForm({ prop: 'endpointUrl', value: text })}
                        placeholder='/health'
                    />
                </CardSection>
                <CardSection>
                    <DoubleButton
                        leftBtnCallback={() => this.props.navigation.goBack()}
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
    console.log(state);
    const { endpointName, endpointUrl } = state.form;
    const { serverId, endpointId } = state.selectedOption;
    const server = { ...state.servers[serverId], serverId };
    return { endpointName, endpointUrl, server, endpointId };
};

export default connect(mapStateToProps, { updateForm, updateServer })(EndpointEdit);
