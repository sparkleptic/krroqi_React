import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Platform, Picker } from 'react-native';
import Panel from '../Panel';
import styles from './styles';
import { connect } from 'react-redux'
import { 
updateAgency,
updateAgent,
} from '../../Actions/propertyPostAction'

class PropertyAgent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agentLo: '',
      agencyLo: '',
    };
    this.selectAgent = this.selectAgent.bind(this);
    this.selectAgency = this.selectAgency.bind(this);
  }

  selectAgent(agent) {
    this.setState({ agentLo: agent });
    this.props.updateAgent(agent)
  }
  selectAgency(agency) {
    this.setState({ agencyLo: agency });
    this.props.updateAgency(agency)
  }

  renderRegionAgent() {
    const { agentLo } = this.state;
    return (
      <View>
        <Picker mode="dropdown" selectedValue={agentLo} onValueChange={this.selectAgent}>
          <Picker.Item label="Select Agent" value="Select Agent" />
          <Picker.Item label="Agent 1" value="Agent 1" />
          <Picker.Item label="Agent 2" value="Agent 2" />
          <Picker.Item label="Agent 3" value="Agent 3" />
        </Picker>
        {Platform.OS !== 'ios' && <View style={styles.divider} />}
      </View>
    );
  }
  renderRegionAgency() {
    const { agencyLo } = this.state;
    return (
      <View>
        <Picker mode="dropdown" selectedValue={agencyLo} onValueChange={this.selectAgency}>
          <Picker.Item label="Select Agency" value="Select Agency" />
          <Picker.Item label="Agency 1" value="Agency 1" />
          <Picker.Item label="Agency 2" value="Agency 2" />
          <Picker.Item label="Agency 3" value="Agency 3" />
          <Picker.Item label="Agency 4" value="Agency 4" />
        </Picker>
        {Platform.OS !== 'ios' && <View style={styles.divider} />}
      </View>
    );
  }
  render() {
    const { OS } = Platform;
    const { agentLo, agencyLo } = this.state;
    const { agency, agent, screen_3 } = this.props.propertyPost;
    return (
      <View>
        <View style={styles.mainViewHead}><Text style={styles.mainViewHeadText}> Agent Details </Text></View>
        {
          screen_3 ? <Text style={{color: 'red', fontWeight: '600'}}>Fill All Fields</Text> : null
        }
        {OS === 'ios' ? (
          <Panel title="Agency" text={agencyLo}>
            {this.renderRegionAgency()}
          </Panel>
        ) : (
          <View style={styles.margin}>
            <Text style={styles.label}>Agency</Text>
            {this.renderRegionAgency()}
          </View>
        )}
        {OS === 'ios' ? (
          <Panel title="Agent" text={agentLo}>
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

function mapStateToProps (state) {
  return {
    propertyPost: state.propertyPost,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updateAgency: (value) => dispatch(updateAgency(value)),
    updateAgent: (value) => dispatch(updateAgent(value)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertyAgent)
