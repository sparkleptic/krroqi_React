import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';

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
    this.openFilterPage = this.openFilterPage.bind(this);
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
        navBarCustomViewInitialProps: {
          searchText: this.state.search.searchText,
        },
      },
      passProps: {
        search: this.state.search,
        onSubmit: this.onSearchSubmit,
      },
    });
  }

  openFilterPage() {
    Navigation.showModal({
      screen: 'krooqi.FilterPage',
      title: 'Filter Page',
      passProps: {
        search: this.state.search,
      },
    });
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          value={this.state.search.searchText}
          style={{ flex: 1 }}
          placeholder="Type Here..."
          onFocus={this.openSaerchPage}
          ref={(input) => {
            this.textInput = input;
          }}
        />
        <TouchableOpacity onPress={this.openFilterPage}>
          <Text
            style={{
              color: 'white',
              paddingLeft: 10,
              paddingRight: 10,
              fontWeight: '400',
              fontSize: 16,
            }}
          >
            Filter
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

searchHeader.propTypes = {};

export default searchHeader;
