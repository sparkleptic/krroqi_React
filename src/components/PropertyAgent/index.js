import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, View, Text, Platform, Picker } from 'react-native';
import Panel from '../Panel';
import styles from './styles';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { 
  updateAgent,
  updateScreen_3,
} from '../../Actions/propertyPostAction'
import * as AgentAction from '../../Actions/AgentAction';
import I18n from '../../i18n';

 String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.toProperCase = function() {
  return this.toLowerCase().replace(/^(.)|\s(.)/g, 
    function($1) { return $1.toUpperCase(); });
}

class PropertyAgent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agentLo: '',
    };
    this.selectAgent = this.selectAgent.bind(this);
  }

  selectAgent(agent) {
    this.setState({ agentLo: agent });
    this.props.updateAgent(agent)
  }

  renderRegionAgent() {
    const { agentLo } = this.state;
    const { agents } = this.props;
    const data = (agents.success && agents.success.data) || [];
    return (
      <View>
        <Picker mode="dropdown" selectedValue={agentLo} onValueChange={this.selectAgent}>
          <Picker.Item label={I18n.t('pp_agent').capitalize()} value="Select Agent" />
          {
            (JSON.stringify(data).length > 2) ? data.map((detail, i) => { return <Picker.Item key={i} label={detail.display_name.toProperCase()} value={detail.agentid4msg} /> }) : <Picker.Item label=" " value=" " />
          }
        </Picker>
        {Platform.OS !== 'ios' && <View style={styles.divider} />}
      </View>
    );
  }

  componentWillMount() {
    this.props.actions.loadAgent({});
  }

  render() {
    const { OS } = Platform;
    const { agentLo } = this.state;
    const { agent, screen_3 } = this.props.propertyPost;
    const { agents } = this.props;
    const data = (agents.success && agents.success.data) || [];
    return (
      <View>
        <View style={styles.mainViewHead}><Text style={styles.mainViewHeadText}>{I18n.t('ppt_agent').toProperCase()}</Text></View>
        {
          screen_3 && (
            Alert.alert(
              `${I18n.t('ppa_required').capitalize()}`,
              `${I18n.t('ppa_content').capitalize()}`,
              [
                {text: `${I18n.t('ppa_ok').capitalize()}`, onPress: () => this.props.updateScreen_3(false)},
              ],
              { cancelable: false }
            )
          )
        }
        {OS === 'ios' ? (
          <Panel title={I18n.t('pp_agent').capitalize()} text={agentLo}>
            {this.renderRegionAgent()}
          </Panel>
        ) : (
          <View style={styles.margin}>
            <Text style={styles.label}>{I18n.t('pp_agent').capitalize()}</Text>
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
    agents: state.agents,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updateAgent: (value) => dispatch(updateAgent(value)),
    updateScreen_3: (value) => dispatch(updateScreen_3(value)),
    actions: bindActionCreators(AgentAction, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertyAgent)
