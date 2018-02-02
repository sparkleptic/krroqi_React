import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Platform, Picker } from 'react-native';
import Panel from '../Panel';
import styles from './styles';

class PropertyAgent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agent: '',
      agency: '',
    };
    this.selectAgent = this.selectAgent.bind(this);
    this.selectAgency = this.selectAgency.bind(this);
  }

  selectAgent(agent) {
    this.setState({ agent });
  }
  selectAgency(agency) {
    this.setState({ agency });
  }

  renderRegionAgent() {
    const { agent } = this.state;
    return (
      <View>
        <Picker mode="dropdown" selectedValue={agent} onValueChange={this.selectAgent}>
          <Picker.Item label="Select Agent" />
          <Picker.Item label="Agent" />
        </Picker>
        {Platform.OS !== 'ios' && <View style={styles.divider} />}
      </View>
    );
  }
  renderRegionAgency() {
    const { agency } = this.state;
    return (
      <View>
        <Picker mode="dropdown" selectedValue={agency} onValueChange={this.selectAgency}>
          <Picker.Item label="Select Agency" />
          <Picker.Item label="Agency" />
        </Picker>
        {Platform.OS !== 'ios' && <View style={styles.divider} />}
      </View>
    );
  }
  render() {
    const { OS } = Platform;
    const { agent, agency } = this.state;
    return (
      <View>
        <View style={styles.mainViewHead}><Text style={styles.mainViewHeadText}> Agent Details </Text></View>
        {OS === 'ios' ? (
          <Panel title="Agency" text={agency}>
            {this.renderRegionAgency()}
          </Panel>
        ) : (
          <View style={styles.margin}>
            <Text style={styles.label}>Agency</Text>
            {this.renderRegionAgency()}
          </View>
        )}
        {OS === 'ios' ? (
          <Panel title="Agent" text={agent}>
            {this.renderRegionAgent()}
          </Panel>
        ) : (
          <View style={styles.margin}>
            <Text style={styles.label}>Agent</Text>
            {this.renderRegionAgent()}
          </View>
        )}
      </View>
    );
  }
}

PropertyAgent.propTypes = {};

export default PropertyAgent;
