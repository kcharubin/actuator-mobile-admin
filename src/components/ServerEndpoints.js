import React, { Component } from 'react';
import { View, StyleSheet, ListView } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { endpointsToArray } from '../helpers';
import {
    selectServerEndpoint,
    createServerEndpoint,
    editServerEndpoint
} from '../actions/ServerActions';
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

    saveDetails() {

    }

    createDataSource({ endpoints }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.DataSource = ds.cloneWithRows(endpoints);
    }

    renderRow(endpoint) {
        return (
            <ListItem
                title={endpoint.endpointName}
                onPress={() => this.props.selectServerEndpoint(endpoint)}
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
    const { servers, selectedOption: { serverId } } = state;
    return {
        endpoints: endpointsToArray(servers[serverId].endpoints),
        server: { ...servers[serverId], serverId }
    };
};


export default connect(mapStateToProps, {
    selectServerEndpoint,
    createServerEndpoint,
    editServerEndpoint
})(ServerEndpoints);
