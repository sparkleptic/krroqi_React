import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import RNGooglePlaces from 'react-native-google-places';
import { backgroundColor } from '../../constants/config';
import styles from './styles';

import I18n from '../../i18n';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.toProperCase = function() {
  return this.toLowerCase().replace(/^(.)|\s(.)/g, 
    function($1) { return $1.toUpperCase(); });
}

class searchHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: props.search,
    };

    this.openSearchPage = this.openSearchPage.bind(this);
  }

  openSearchPage(event) {
    event.stopPropagation();
    this.textInput.blur();
    const { search } = this.state;
    RNGooglePlaces.openAutocompleteModal()
      .then((place) => {
        this.setState({
          search: {
            ...search,
            searchText: place.name,
            latitude: place.latitude,
            longitude: place.longitude,
          },
        });
      })
      .catch(error => console.log(error.message));
  }

  render() {
    const { OS } = Platform;
    const { search } = this.state;
    return (
      <View style={OS === 'ios' ? styles.iosContainer : styles.container}>
        <TextInput
          value={search.searchText}
          style={OS === 'ios' ? styles.iosTextInput : styles.textInput}
          placeholder={I18n.t('search_placeholder').capitalize()}
          placeholderTextColor="white"
          onFocus={this.openSearchPage}
          underlineColorAndroid="white"
          selectionColor="white"
          ref={(input) => {
            this.textInput = input;
          }}
        />
      </View>
    );
  }
}

searchHeader.propTypes = {
  search: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  search: state.search,
});

export default connect(mapStateToProps)(searchHeader);
