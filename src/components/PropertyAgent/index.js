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
    };
    this.selectAgent = this.selectAgent.bind(this);
  }

  selectAgent(agent) {
    this.setState({ agent });
  }

  renderRegion() {
    const { agent } = this.state;
    return (
      <View>
        <Picker mode="dropdown" selectedValue={agent} onValueChange={this.selectAgent}>
          <Picker.Item label="Agent" />
        </Picker>
        {Platform.OS !== 'ios' && <View style={styles.divider} />}
      </View>
    );
  }
  render() {
    const { OS } = Platform;
    const { agent } = this.state;
    return (
      <View>
        {OS === 'ios' ? (
          <Panel title="Agent" text={agent}>
            {this.renderRegion()}
          </Panel>
        ) : (
          <View style={styles.margin}>
            <Text style={styles.label}>Agent</Text>
            {this.renderRegion()}
          </View>
        )}
      </View>
    );
  }
}

PropertyAgent.propTypes = {};

export default PropertyAgent;
