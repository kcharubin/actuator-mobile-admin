import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { Button, Input, Card, CardSection } from './common';
import { updateForm, addServer, updateServer, deleteServer, navigateBack } from '../actions';
import DoubleButton from './DoubleButton';
import RightNavButton from './RightNavButton';

const mapStateToProps = (state) => {
    const { serverName, serverUrl, userPassword, userName, serverId } = state.form;
    return { serverName, serverUrl, userPassword, userName, serverId };
};
const RightNavServerButtonConnected = connect(
    mapStateToProps,
    {
        deleteServer,
        navigateBack
    }
)(RightNavButton);

class ServerEdit extends Component {
    static navigationOptions = () => {
        const headerRight = (
            <RightNavServerButtonConnected
                title="Delete"
                alertTitle="Delete server"
                shouldConfirm
                alertMsg="Are you sure that you want to delete this server?"
                onPress={(props) => {
                    props.deleteServer(props.serverId);
                    props.navigateBack();
                }
                }
            />
        );

        return { headerRight };
    };

    cancelClicked() {
        this.props.navigation.goBack();
    }
    
    saveClicked() {
        const { serverName, serverUrl, userPassword, userName, serverId } = this.props;
        const server = {
            serverName,
            basicAuth: {
                userPassword,
                userName,
            },
            serverUrl,
            serverId
        };
        const params = this.props.navigation.state.params;
        if (params && params.addServ) {
            //adding new server
            this.props.addServer(server);
        } else {
            //updating existing server
            this.props.updateServer(server);
        }

        this.props.navigation.goBack();
    }
    render() {
        return (
            <ScrollView>
                <Card>
                    <CardSection>
                        <Input
                            label='Server name'
                            value={this.props.serverName}
                            onChangeText={text => this.props.updateForm({ prop: 'serverName', value: text })}
                            placeholder='My server'
                        />
                    </CardSection>
                    <CardSection>
                        <Input
                            label='Server url'
                            value={this.props.serverUrl}
                            onChangeText={text => this.props.updateForm({ prop: 'serverUrl', value: text })}
                            placeholder='https://myserver.com/'
                        />
                    </CardSection>
                    <CardSection>
                        <Input
                            label='User name'
                            value={this.props.userName}
                            onChangeText={text => this.props.updateForm({ prop: 'userName', value: text })}
                            placeholder='jon@example.com'
                        />
                    </CardSection>
                    <CardSection>
                        <Input
                            label='Password'
                            value={this.props.userPassword}
                            onChangeText={text => this.props.updateForm({ prop: 'userPassword', value: text })}
                            secureTextEntry
                        />
                    </CardSection>
                    <CardSection>
                        <Button>Test connection</Button>
                    </CardSection>
                    <CardSection>
                        <DoubleButton
                            leftBtnName="Cancel"
                            leftBtnCallback={() => this.cancelClicked()}
                            rightBtnName="Save"
                            rightBtnCallback={() => this.saveClicked()}
                        />
                    </CardSection>
                </Card>
            </ScrollView>
        );
    }
}


export default connect(
    mapStateToProps,
    {
        updateForm,
        addServer,
        updateServer,
        deleteServer
    }
)(ServerEdit);
