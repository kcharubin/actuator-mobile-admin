import React, { Component } from 'react';
import { View, StyleSheet, ListView } from 'react-native';
import { connect } from 'react-redux';
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
        const { fetchedData } = this.props;
        const loading = checkIfEndpointIsSyncing(endpoint, fetchedData);
        const isError = checkIfEndpointIsError(endpoint, fetchedData);
        const isHealthy = checkIfEndpointIsHealthy(endpoint, fetchedData);
        console.log("RR: endpoint");
        console.log(endpoint);

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
    return {
        endpoints: endpointsToArray(servers[serverId].endpoints),
        server: { ...servers[serverId], serverId },
        fetchedData
    };
};


export default connect(mapStateToProps, {
    selectServerEndpoint,
    createServerEndpoint,
    editServerEndpoint
})(ServerEndpoints);
