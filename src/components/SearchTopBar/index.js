import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Platform, Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RNGooglePlaces from 'react-native-google-places';
import { backgroundColor } from '../../constants/config';
import styles from './styles';
import I18n from '../../i18n';
import * as commonActions from '../../Actions/commonActions';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

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
      search: [],
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
          latitudeDelta: LATITUDE_DELTA, 
          longitudeDelta: LONGITUDE_DELTA
        },
      });
      this.props.actionsSearch.updateSearch(this.state.search);
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
  search: state.mapSearch,
});

function mapDispatchToProps(dispatch) {
  return {
    actionsSearch: bindActionCreators(commonActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(searchHeader);