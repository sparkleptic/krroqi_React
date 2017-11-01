import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, TouchableWithoutFeedback, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PropertiesAction from '../../Actions/PropertiesAction';
import { backgroundColor } from '../../constants/config';
import styles from './styles';

class SearchFormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
    this.submitSearch = this.submitSearch.bind(this);
  }

  submitSearch() {
    this.props.actions.filteredPropertiesLoad({
      ...this.props.search,
      searchText: this.state.searchText,
    });
    Navigation.dismissModal({
      animationType: 'slide-down',
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="Type Here..."
          value={this.state.searchText}
          onChangeText={searchText => this.setState({ searchText })}
          onSubmitEditing={this.submitSearch}
          underlineColorAndroid="white"
          selectionColor="white"
          autoFocus
        />
        <TouchableWithoutFeedback onPress={this.submitSearch}>
          <View>
            <Text style={styles.button}>Search</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

SearchFormPage.propTypes = {
  actions: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  search: state.search,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(PropertiesAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchFormPage);
