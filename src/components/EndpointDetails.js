import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, ListView } from 'react-native';
import JSONTree from 'react-native-json-tree'

import { fetchEndpoint } from '../actions';

class EndpointDetails extends Component {

    componentDidMount() {
        console.log("endpoint details");
        console.log(this.props);
        this.props.fetchEndpoint(this.props.server, this.props.endpoint);
    }
    renderLastResponse() {
        const { lastResponse } = this.props;
        if (!lastResponse) {
            return <Text>No data</Text>;
        }
        const { loading, data, time } = lastResponse;
        return <JSONTree data={data} />;
    }
    render() {
        return (
            <ScrollView>
                {this.renderLastResponse()}
            </ScrollView>
        );
    }
}
const mapStateToProps = (state) => {
    const { serverId, endpointId } = state.selectedOption;
    const server = state.servers[serverId];
    const endpoint = { ...server.endpoints[endpointId], endpointId };
    const lastResponse = state.fetchedData[endpointId];
    console.log("last resp id" + endpointId);
    // console.log(lastRE);
    console.log(state);
    return { server, endpoint, lastResponse };
};

export default connect(mapStateToProps, { fetchEndpoint })(EndpointDetails);
