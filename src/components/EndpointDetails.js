import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, View, RefreshControl } from 'react-native';
import JSONTree from 'react-native-json-tree';
import { Spinner } from './common';

import { fetchEndpoint } from '../actions';

class EndpointDetails extends Component {
    constructor() {
        super();
        this.onRefresh = this.onRefresh.bind(this);
    }

    componentDidMount() {
        this.onRefresh();
    }

    onRefresh() {
        const { lastResponse } = this.props;

        if (lastResponse && lastResponse.loading === true) {
            return;
        }
        this.props.fetchEndpoint(this.props.server, this.props.endpoint);
    }

    renderLastResponse() {
        const { lastResponse } = this.props;
        if (!lastResponse) {
            return <Text>No data</Text>;
        }
        const { data } = lastResponse;
        if (!data) {
            return <Text>No data</Text>;
        }

        return (
            <JSONTree
                data={data}
                theme={theme}
            />
        );
    }
    render() {
        const { lastResponse } = this.props;
        let timeString = '';
        if (lastResponse) {
            let time = lastResponse.time;
            timeString = time ? time.toLocaleString() : '';
        }
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.props.loading}
                        onRefresh={this.onRefresh}
                    />
                }
            >
                <Text style={styles.actualizationDateContainer}>{timeString}</Text>
                {this.renderLastResponse()}
            </ScrollView>
        );
    }
}
const theme = {
    scheme: 'bright',
    author: 'chris kempson (http://chriskempson.com)',
    base00: '#000000',
    base01: '#303030',
    base02: '#505050',
    base03: '#b0b0b0',
    base04: '#d0d0d0',
    base05: '#e0e0e0',
    base06: '#f5f5f5',
    base07: '#ffffff',
    base08: '#fb0120',
    base09: '#fc6d24',
    base0A: '#fda331',
    base0B: '#a1c659',
    base0C: '#76c7b7',
    base0D: '#6fb3d2',
    base0E: '#d381c3',
    base0F: '#be643c'
};

const styles = {
    actualizationDateContainer: {
        padding: 10,
        backgroundColor: 'white',
        textAlign: 'center'
    }
};
const mapStateToProps = (state) => {
    const { serverId, endpointId } = state.selectedOption;
    const server = state.servers[serverId];
    const endpoint = { ...server.endpoints[endpointId], endpointId };
    const lastResponse = state.fetchedData[endpointId];
    let loading = false;
    if (lastResponse) {
        loading = lastResponse.loading;
    }
    return { server, endpoint, lastResponse, loading };
};

export default connect(mapStateToProps, { fetchEndpoint })(EndpointDetails);
