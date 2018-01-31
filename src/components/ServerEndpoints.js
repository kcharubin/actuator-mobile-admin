import React, { Component } from 'react';
import { View, StyleSheet, ListView } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
    selectServerEndpoint,
    createServerEndpoint,
    editServerEndpoint
} from '../actions/ServerActions';
import {
    checkIfEndpointIsError,
    checkIfEndpointIsSyncing,
    checkIfEndpointIsHealthy,
    endpointsToArray
} from '../helpers';

import { TransparentCardSection, Button } from './common';
import ListItem from './ListItem';

class ServerEndpoints extends Component {
    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
    }

    componentWillMount() {
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ endpoints }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.DataSource = ds.cloneWithRows(endpoints);
    }

    renderRow(endpoint) {
        const { loading, isHealthy, isError } = endpoint;
        return (
            <ListItem
                title={endpoint.endpointName}
                onPress={() => this.props.selectServerEndpoint(endpoint)}
                loading={loading}
                isError={isError}
                isHealthy={isHealthy && !isError}
                accessoryTitle="Edit"
                onAccessoryPress={() => this.props.editServerEndpoint(endpoint)}
            />
        );
    }

    render() {
        const { listStyle, contentContainer } = styles;
        return (
            <View style={contentContainer}>
                <ListView
                    style={listStyle}
                    enableEmptySections
                    dataSource={this.DataSource}
                    renderRow={this.renderRow}
                    renderSeparator={() => <View style={styles.separatorStyle} />}
                />
                <TransparentCardSection>
                    <Button
                        onPress={() => this.props.createServerEndpoint(this.props.server)}
                    >
                        Add endpoint
                        </Button>
                </TransparentCardSection>
            </View>
        );
    }
}
const styles = StyleSheet.create(
    {
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
        contentContainer: {
            flex: 1,
            paddingBottom: 20
        },
    }

);
const mapStateToProps = state => {
    const { servers, selectedOption: { serverId }, fetchedData } = state;
    
    const endpoints = _.map(endpointsToArray(servers[serverId].endpoints), endpoint => ({
        ...endpoint,
        loading: checkIfEndpointIsSyncing(endpoint, fetchedData),
        isError: checkIfEndpointIsError(endpoint, fetchedData),
        isHealthy: checkIfEndpointIsHealthy(endpoint, fetchedData)
    }
    ));
    return {
        endpoints,
        server: { ...servers[serverId], serverId },
        fetchedData
    };
};


export default connect(mapStateToProps, {
    selectServerEndpoint,
    createServerEndpoint,
    editServerEndpoint
})(ServerEndpoints);
