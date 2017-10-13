import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';

class SearchFormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: props.searchText,
    };
    this.onChnageText = this.onChnageText.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
  }

  onChnageText(e) {
    this.setState({ searchText: e.target.value });
  }

  submitSearch() {
    Navigation.dismissModal({
      animationType: 'slide-down',
    });
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={{ flex: 1 }}
          placeholder="Type Here..."
          value={this.state.searchText}
          onChange={this.onChnageText}
          onSubmitEditing={this.submitSearch}
          autoFocus
        />
        <TouchableOpacity onPress={this.submitSearch}>
          <Text
            style={{
              color: 'white',
              paddingLeft: 10,
              paddingRight: 10,
              fontWeight: '400',
              fontSize: 16,
            }}
          >
            Search
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

SearchFormPage.propTypes = {
  searchText: PropTypes.string.isRequired,
};

export default SearchFormPage;
