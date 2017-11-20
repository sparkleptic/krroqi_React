import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  TextInput,
} from 'react-native';
import * as AgentAction from '../../Actions/AgentAction';
import styles from './styles';
import MultiSelect from '../../inputControls/MultiSelect';

class FilterAgent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      agentType: [],
      service: [],
      propertyType: [],
    };
    this.cancelSearch = this.cancelSearch.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    this.searchAgent = this.searchAgent.bind(this);
  }

  cancelSearch() {
    this.props.navigator.dismissModal({
      animationType: 'slide-down',
    });
  }

  searchAgent() {
    const {
      name, agentType, service, propertyType,
    } = this.state;
    const searchData = {
      filter: {
        name,
        agentType: '',
        service: [],
        propertyType: [],
      },
    };
    this.props.actions.loadAgent(searchData);
    this.cancelSearch();
  }

  resetSearch() {
    this.setState({
      name: '',
      agentType: [],
      service: [],
      propertyType: [],
    });
  }

  render() {
    const { propertyStatus, propertyTypes } = this.props;
    const {
      name, agentType, service, propertyType,
    } = this.state;
    const { OS } = Platform;
    const at = [
      {
        key: 'Individual',
        value: 'Individual',
      },
      {
        key: 'Agency',
        value: 'Agency',
      },
    ];
    const pt = propertyTypes.map(item => ({
      key: item.term_id,
      value: item.name,
    }));
    const ps = propertyStatus.map(item => ({
      key: item.term_id,
      value: item.name,
    }));
    return (
      <View style={styles.container}>
        <ScrollView style={styles.flex}>
          <KeyboardAvoidingView style={styles.flex} behavior="padding">
            <View style={styles.margin}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.textInput}
                value={name}
                placeholder="Name"
                onChangeText={text => this.setState({ name: text })}
              />
            </View>
            <View style={styles.margin}>
              <Text style={styles.label}>Agent Type</Text>
              <MultiSelect
                multiSelectData={at}
                selectedValues={agentType}
                onSelect={value => this.setState({ agentType: value })}
              />
              {OS === 'ios' && <View style={[styles.divider, { bottom: 0 }]} />}
            </View>
            <View style={styles.margin}>
              <Text style={styles.label}>Service</Text>
              <MultiSelect
                multiSelectData={ps}
                selectedValues={service}
                onSelect={value => this.setState({ service: value })}
              />
              {OS === 'ios' && <View style={[styles.divider, { bottom: 0 }]} />}
            </View>
            <View style={styles.margin}>
              <Text style={styles.label}>Property Type</Text>
              <MultiSelect
                multiSelectData={pt}
                selectedValues={propertyType}
                onSelect={value => this.setState({ propertyType: value })}
              />
              {OS === 'ios' && <View style={[styles.divider, { bottom: 0 }]} />}
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        <View style={styles.tabBar}>
          <TouchableOpacity onPress={this.cancelSearch}>
            <View>
              <Text style={styles.label}>Cancel</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.resetSearch}>
            <View>
              <Text style={styles.label}>Reset</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.searchAgent}>
            <View>
              <Text style={styles.label}>Search</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

FilterAgent.propTypes = {
  propertyStatus: PropTypes.array.isRequired,
  propertyTypes: PropTypes.array.isRequired,
  navigator: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const propertyStatus = state.propertyStatus.success || [];
  const propertyTypes = state.propertyTypes.success || [];
  return {
    propertyStatus,
    propertyTypes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AgentAction, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterAgent);
