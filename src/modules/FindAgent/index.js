import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import * as AgentAction from '../../Actions/AgentAction';
import AgentCard from '../../components/AgentCard';
// import styles from './styles';

class FindAgent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentWillMount() {
    this.props.actions.loadAgent({});
  }

  onRefresh() {
    this.props.actions.loadAgent({});
  }

  render() {
    const { agents } = this.props;
    const data = (agents.success && agents.success.data) || [];
    return (
      <FlatList
        data={data}
        renderItem={({ item }) => <AgentCard agent={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
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
