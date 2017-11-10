import React, { Component } from 'react';
import { View, ListView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Button, Card, CardSection } from './common';
import ListItem from './ListItem';
import { createServer, selectServer, editServer } from '../actions/ServerActions';


class MainScreen extends Component {
    constructor(props) {
        super(props);
        console.log(this);
        this.renderRow = this.renderRow.bind(this);
    }
    componentWillMount() {
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ servers }) {
        console.log(servers);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.DataSource = ds.cloneWithRows(servers);
    }

    renderRow(server) {
        return (
            <ListItem
                title={server.serverName}
                onPress={() => this.props.selectServer(server)}
                accessoryTitle="Edit"
                onAccessoryPress={() => this.props.editServer(server)}
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
                            onPress={() => this.props.createServer()}
                        >
                            Add server
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
const mapStateToProps = state => (
    {
        servers: _.map(state.servers, (val, serverId) => ({ ...val, serverId }))
    }
);

export default connect(mapStateToProps, { createServer, selectServer, editServer })(MainScreen);
// export default MainScreen;
