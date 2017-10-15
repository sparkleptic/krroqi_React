import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { backgroundColor } from '../constants/config';

class searchHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: {
        searchLabel: '',
        searchText: 'Yagnesh',
        propertyStatus: {
          term_id: '',
          name: '',
        },
        priceRange: {
          start: '',
          end: '',
        },
        propertyType: [],
        rooms: '',
        baths: '',
        squreMeterRange: {
          start: '',
          end: '',
        },
        yearBuilt: {
          start: '',
          end: '',
        },
        district: '',
      },
    };

    this.openSaerchPage = this.openSaerchPage.bind(this);
  }

  openSaerchPage(event) {
    event.stopPropagation();
    this.textInput.blur();
    Navigation.showModal({
      screen: 'krooqi.SearchPage',
      title: 'Search Page',
      navigatorStyle: {
        navBarCustomView: 'krooqi.SearchFormPage',
        navBarComponentAlignment: 'fill',
        navBarBackgroundColor: 'white',
      },
      passProps: {
        search: this.state.search,
        onSubmit: this.onSearchSubmit,
      },
      navigatorButtons: {
        leftButtons: [
          {
            title: 'Cancel',
            id: 'cancel',
            showAsAction: 'ifRoom',
            buttonColor: backgroundColor,
            buttonFontSize: 14,
            buttonFontWeight: '600',
          },
        ],
      },
    });
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          value={this.state.search.searchText}
          style={{ flex: 1, color: 'white' }}
          placeholder="Search city, state or zip"
          onFocus={this.openSaerchPage}
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

searchHeader.propTypes = {};

export default searchHeader;
