import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, TouchableHighlight } from 'react-native';
import styles from './styles';
import I18n from '../../i18n';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.toProperCase = function() {
  return this.toLowerCase().replace(/^(.)|\s(.)/g, 
    function($1) { return $1.toUpperCase(); });
}

class LoginCheck extends Component {
  
  openLogin = () => {
    this.props.navigator.showModal({
      screen: 'krooqi.Login',
      passProps: {
        label: `${I18n.t('to_save_a_home').capitalize()}`,
      },
      navigatorStyle: {
        navBarHidden: true,
        screenBackgroundColor: 'white',
      },
      animationType: 'slide-up',
    });
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
        <TouchableHighlight onPress={() => this.openLogin()} underlayColor="#f1f1f1">
          <View
            style={{
              borderWidth: 1,
              padding: 10,
              borderRadius: 4,
              margin: 10,
              borderColor: '#ccc',
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '400' }}>{I18n.t('m_login').toProperCase()}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

LoginCheck.propTypes = {};

export default LoginCheck;
