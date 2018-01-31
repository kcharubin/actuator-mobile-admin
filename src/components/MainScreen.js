import React, { Component } from 'react';
import {
    View,
    ListView,
    StyleSheet,
    Text,
    RefreshControl,
    AppState
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
    serversToArray,
    endpointsToArray,
    checkIfServerHasError,
    checkIfServerIsHealthy,
    checkIfServerIsSyncing
} from '../helpers';

import { Button, TransparentCardSection } from './common';
import ListItem from './ListItem';
import { createServer, selectServer, editServer } from '../actions/ServerActions';
import { fetchEndpoint } from '../actions/index';


class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.state = {
            appState: AppState.currentState,
            actualizationStart: ''
        };
    }

    componentWillMount() {
        this.createDataSource(this.props);
    }

    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);
        this.onRefresh();
    }


    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }
    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    onRefresh() {
        this.props.servers.forEach(server => {
            const endpoints = endpointsToArray(server.endpoints);
            if (endpoints) {
                endpoints.forEach(endpoint => {
                    this.props.fetchEndpoint(server, endpoint);
                });
            }
        });
    }

    handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            this.onRefresh();
        }
        this.setState({ appState: nextAppState });
    }

    createDataSource({ servers }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.DataSource = ds.cloneWithRows(servers);
    }
    renderSeparator() {
        return <View style={styles.separatorStyle} />;
    }
    renderRow(server) {
        const { serverName, loading, isError, isHealthy } = server;
        return (
            <ListItem
                title={serverName}
                onPress={() => this.props.selectServer(server)}
                accessoryTitle="Edit"
                loading={loading}
                isError={isError}
                isHealthy={isHealthy}
                onAccessoryPress={() => this.props.editServer(server)}
            />
        );
    }
    renderActualizationDate() {
        return (
            <Text style={styles.actualizationDateContainer}>
                {`Last sync started at: ${(new Date()).toLocaleString()}`}
            </Text>);
    }
    renderAddButton() {
        return (
            <TransparentCardSection>
                <Button
                    onPress={() => this.props.createServer()}
                >
                    Add server
                </Button>
            </TransparentCardSection>
        );
    }
    render() {
        const { listStyle, contentContainer, noDataTextStyle } = styles;
        if (this.DataSource.getRowCount()) {
            return (
                <View style={contentContainer}>
                    {this.renderActualizationDate()}
                    <ListView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.props.loading}
                                onRefresh={this.onRefresh}
                            />}
                        style={listStyle}
                        enableEmptySections
                        dataSource={this.DataSource}
                        renderRow={this.renderRow}
                        renderSeparator={this.renderSeparator}
                    />
                    {this.renderAddButton()}
                </View>
            );
        }

        return (
            <View style={contentContainer}>
                <Text style={noDataTextStyle}>Please add your first server!</Text>
                {this.renderAddButton()}
            </View>

        );
    }
}
const styles = StyleSheet.create(
    {
        actualizationDateContainer: {
            padding: 10,
            textAlign: 'left'
        },
        separatorStyle: {
            flex: 1,
            height: 1,
            borderBottomColor: '#bbb',
            borderBottomWidth: StyleSheet.hairlineWidth,
        },
        listStyle: {
            flex: 1,
            padding: 5
        },
        noDataTextStyle: {
            flex: 1,
            justifyContent: 'center',
            textAlign: 'center',
            fontSize: 16,
            padding: 20
        },
        contentContainer: {
            flex: 1,
            paddingBottom: 20
        }
    }

);
const mapStateToProps = state => {
    const { fetchedData } = state;
    const servers = _.map(serversToArray(state.servers), server => (
        {
            ...server,
            loading: checkIfServerIsSyncing(server, fetchedData),
            isError: checkIfServerHasError(server, fetchedData),
            isHealthy: checkIfServerIsHealthy(server, fetchedData)
        }
    ));
    return (
        {
            servers,
            fetchedData,
            loading: false
        }
    );
};

export default connect(
    mapStateToProps,
    {
        createServer,
        selectServer,
        editServer,
        fetchEndpoint
    }
)(MainScreen);
