import React, { Component } from 'react';
import { View } from 'react-native';
import SearchForm from './SearchForm';

class SearchTopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serchData: '',
    };
    this.searchProperty = this.searchProperty.bind(this);
  }

  searchProperty(data) {
    this.setState({ serchData: data });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SearchForm value={this.state.serchData} onSubmit={this.searchProperty} />
      </View>
    );
  }
}

SearchTopBar.propTypes = {};

export default SearchTopBar;
