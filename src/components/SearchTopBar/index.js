import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { backgroundColor } from '../../constants/config';
import styles from './styles';

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
    Navigation.showModal({
      screen: 'krooqi.SearchPage',
      title: 'Search Page',
      navigatorStyle: {
        navBarCustomView: 'krooqi.SearchFormPage',
        navBarComponentAlignment: 'fill',
        navBarBackgroundColor: backgroundColor,
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
            buttonColor: 'white',
          },
        ],
      },
    });
  }

  render() {
    const { OS } = Platform;
    return (
      <View style={OS === 'ios' ? styles.iosContainer : styles.container}>
        <TextInput
          value={this.props.search.searchText}
          style={OS === 'ios' ? styles.iosTextInput : styles.textInput}
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

searchHeader.propTypes = {
  search: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  search: state.search,
});

export default connect(mapStateToProps)(searchHeader);
