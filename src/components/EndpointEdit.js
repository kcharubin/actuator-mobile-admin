import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { CardSection, Card, Input } from './common';
import DoubleButton from './DoubleButton';
import { updateForm, updateServer, navigateBack } from '../actions';
import RightNavButton from './RightNavButton';

const mapStateToProps = (state) => {
    const { endpointName, endpointUrl } = state.form;
    const { serverId, endpointId } = state.selectedOption;
    const server = { ...state.servers[serverId], serverId };
    return { endpointName, endpointUrl, server, endpointId };
};

const RightNavButtonConnected = connect(
    mapStateToProps,
    {
        updateServer,
        navigateBack
    }
)(RightNavButton);

class EndpointEdit extends Component {
    static navigationOptions = () => {
        const headerRight = (
            <RightNavButtonConnected
                title="Delete"
                alertTitle="Delete endpoint"
                shouldConfirm
                alertMsg="Are you sure that you want to delete this endpoint"
                onPress={(props) => {
                    const { endpointId, server } = props;
                    if (endpointId) {
                        delete server.endpoints[endpointId];
                        props.updateServer(server);
                    }
                    props.navigateBack();
                }
                }

            />
        );

        return { headerRight };
    };

    componentDidMount() {
        this.props.navigation.setParams({ deleteEndpoint: this.deleteEndpoint });
    }
   
    saveEndpoint() {
        const endpointId = this.props.endpointId || uuid();
        const { endpointName, endpointUrl, server } = this.props;
        const endpoint = { endpointName, endpointUrl };
        server.endpoints[endpointId] = endpoint;
        this.props.updateServer(server);
        this.props.navigateBack();
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label='Name'
                        value={this.props.endpointName}
                        onChangeText={text => this.props.updateForm({ prop: 'endpointName', value: text })}
                        placeholder='Health'
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label='URL'
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

export default connect(mapStateToProps, { updateForm, updateServer, navigateBack })(EndpointEdit);
