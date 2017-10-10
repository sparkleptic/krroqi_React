import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions } from 'react-native';
import SearchForm from './SearchForm';

const { width } = Dimensions.get('window');

class SearchTopBar extends Component {
  constructor(props) {
    super(props);
    this.searchProperty = this.searchProperty.bind(this);
  }

  searchProperty(data) {
    alert(JSON.stringify(data));
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SearchForm onSubmit={this.searchProperty} />
      </View>
    );
  }
}

SearchTopBar.propTypes = {};

export default SearchTopBar;
