import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { backgroundColor } from '../../constants/config';

class searchHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: {
        searchLabel: '',
        searchText: '',
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
        squareMeterRange: {
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

    this.openSearchPage = this.openSearchPage.bind(this);
  }

  openSearchPage(event) {
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
            buttonColor: backgroundColor,
            buttonFontSize: 14,
            buttonFontWeight: '600',
          },
        ],
        rightButtons: [
          {
            title: 'Search',
            id: 'search',
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

searchHeader.propTypes = {};

export default searchHeader;
