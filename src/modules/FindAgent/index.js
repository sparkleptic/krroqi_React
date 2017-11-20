import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, FlatList, TouchableHighlight } from 'react-native';
import * as AgentAction from '../../Actions/AgentAction';
import AgentCard from '../../components/AgentCard';
// import styles from './styles';

class FindAgent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onRefresh = this.onRefresh.bind(this);
    this.openFilterAgent = this.openFilterAgent.bind(this);
    this.openAgentDetail = this.openAgentDetail.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentWillMount() {
    this.props.actions.loadAgent({});
  }

  onRefresh() {
    this.props.actions.loadAgent({});
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'filterAgent') {
        this.openFilterAgent();
      }
    }
  }

  openAgentDetail(agent) {
    this.props.navigator.push({
      screen: 'krooqi.AgentDetail',
      title: 'Agent Detail',
      passProps: {
        agent,
      },
      navigatorStyle: {
        screenBackgroundColor: 'white',
        tabBarHidden: true,
      },
      animationType: 'slide-up',
    });
  }

  openFilterAgent() {
    this.props.navigator.showModal({
      screen: 'krooqi.FilterAgent',
      title: 'Filter Agent',
      passProps: {},
      navigatorStyle: {},
      animationType: 'slide-up',
    });
  }

  render() {
    const { agents } = this.props;
    const data = (agents.success && agents.success.data) || [];
    return (
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableHighlight onPress={() => this.openAgentDetail(item)} underlayColor="#f1f1f1">
            <View>
              <AgentCard agent={item} />
            </View>
          </TouchableHighlight>
        )}
        ItemSeparatorComponent={() => (
          <View style={{ borderBottomWidth: 1, borderColor: 'gray' }} />
        )}
        keyExtractor={(item, index) => index}
        refreshing={agents.loading}
        onRefresh={this.onRefresh}
      />
    );
  }
}

FindAgent.propTypes = {
  agents: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    agents: state.agents,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AgentAction, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FindAgent);
