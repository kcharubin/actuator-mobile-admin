import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
    selectServerEndpoint,
    createServerEndpoint,
    editServerEndpoint
} from '../actions/ServerActions';
import { Card, CardSection, Button } from './common';
import ListItem from './ListItem';

class ServerEndpoints extends Component {


    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
    }


    componentWillMount() {
        console.log(this.props);
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
                <Card>
                    <CardSection>
                        <Button
                            onPress={() => this.props.createServerEndpoint(this.props.server)}
                        >
                            Add endpoint
                        </Button>
                    </CardSection>
                </Card>
            </View>
        );
    }
}
const styles = StyleSheet.create(
    {
        listStyle: {
            flex: 1
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
        endpoints: _.map(servers[serverId].endpoints, (val, endpointId) => (
            { ...val, endpointId }
        )),
        server: { ...servers[serverId], serverId }
    };
};


export default connect(mapStateToProps, {
    selectServerEndpoint,
    createServerEndpoint,
    editServerEndpoint
})(ServerEndpoints);