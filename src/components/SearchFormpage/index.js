import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PropertiesAction from '../../Actions/PropertiesAction';
import { backgroundColor } from '../../constants/config';

class SearchFormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
    this.onChnageText = this.onChnageText.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
  }

  onChnageText(e) {
    this.setState({ searchText: e.target.value });
  }

  submitSearch() {
    this.props.actions.filteredPropertiesLoad(this.state.searchText);
    Navigation.dismissModal({
      animationType: 'slide-down',
    });
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={{
            flex: 1,
            color: backgroundColor,
            marginLeft: 10,
            marginRight: 10,
          }}
          placeholder="Type Here..."
          value={this.state.searchText}
          onChange={this.onChnageText}
          onSubmitEditing={this.submitSearch}
          underlineColorAndroid={backgroundColor}
          selectionColor={backgroundColor}
          autoFocus
        />
      </View>
    );
  }
}

SearchFormPage.propTypes = {
  actions: PropTypes.object.isRequired,
};

// const mapStateToProps = state => ({
//   searchResult: state.searchResult,
// });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(PropertiesAction, dispatch),
});

export default connect(null, mapDispatchToProps)(SearchFormPage);
