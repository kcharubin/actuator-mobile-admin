import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, View } from 'react-native';
import JSONTree from 'react-native-json-tree';
import { Spinner } from './common';

import { fetchEndpoint } from '../actions';

class EndpointDetails extends Component {

    componentDidMount() {
        this.props.fetchEndpoint(this.props.server, this.props.endpoint);
    }
    renderLastResponse() {
        const { lastResponse } = this.props;
        if (!lastResponse) {
            return <Text>No data</Text>;
        }
        const { loading, data } = lastResponse;
        if (loading) {
            return (
                <View style={styles.spinnerContainer} >
                    <Spinner />
                </View>
            );
        }
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
        return (
            <ScrollView>
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
    spinnerContainer: {
        padding: 10
    }
};
const mapStateToProps = (state) => {
    const { serverId, endpointId } = state.selectedOption;
    const server = state.servers[serverId];
    const endpoint = { ...server.endpoints[endpointId], endpointId };
    const lastResponse = state.fetchedData[endpointId];
    return { server, endpoint, lastResponse };
};

export default connect(mapStateToProps, { fetchEndpoint })(EndpointDetails);
