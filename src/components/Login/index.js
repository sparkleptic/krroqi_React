/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

import { Navigation } from 'react-native-navigation';
import { backgroundColor, PUBLIC_URL } from '../../constants/config';
import FacebookLogin from '../FacebookLogin';
import styles from './styles';
import * as AuthAction from '../../Actions/AuthAction';
import I18n from '../../i18n';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.toProperCase = function() {
  return this.toLowerCase().replace(/^(.)|\s(.)/g, 
    function($1) { return $1.toUpperCase(); });
}

const logoImage = require('../../images/KR-Logo.png');

const closeModal = () => {
  Navigation.dismissModal({
    animationType: 'slide-down', // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
  });
};

const navigateToPassword = (userExist, email) => {
  Navigation.showModal({
    screen: 'krooqi.Password',
    passProps: {
      userExist,
      email,
    },
    navigatorStyle: {
      navBarHidden: true,
      screenBackgroundColor: 'white',
    },
    animationType: 'slide-up',
  });
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error: false,
      loading: false,
      showError: false,
      showInvalidEmail: false,
    };
    this.onFBLoginSuccess = this.onFBLoginSuccess.bind(this);
    this.onFBLoginLoading = this.onFBLoginLoading.bind(this);
    this.onFbLoginFail    = this.onFbLoginFail.bind(this);
    this.register         = this.register.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.success) {
      closeModal();
    }
    if (nextProps.auth.error) {
      this.setState({ loading: false });
    }
  }

  validateEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

  onFBLoginLoading() {
    this.setState({ loading: true });
  }

  onFBLoginSuccess(data) {
    this.setState({ loading: false });
    let randomPwd = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    this.props.actions.register({...data, 'password': randomPwd});
  }

  onFbLoginFail() {
    this.setState({ loading: false });
  }

  register() {
    if (this.state.email.length > 0) {
      this.setState({ showError: false });
      if (!this.validateEmail(this.state.email)) {
        this.setState({ showInvalidEmail: true });
      }else{
        this.setState({ loading: true, showInvalidEmail: false });
      axios
        .post(`${PUBLIC_URL}checkIfUserExists`, {
          email: this.state.email,
        })
        .then((response) => {
          if (response.data) {
            this.setState({ loading: false });
            navigateToPassword(response.data.exists, this.state.email);
          }
        })
        .catch((error) => {
          this.setState({ error, loading: false });
        });
      }
    }else{
      this.setState({ showError: true });
    }
  }

  render() {
    const { label } = this.props;
    const { loading } = this.state;
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={{ alignSelf: 'flex-end' }}
          onPress={() => closeModal()}
          underlayColor="#f1f1f1"
        >
          <Text style={{ padding: 10, fontSize: 16, fontWeight: '500' }}>{I18n.t('close').toProperCase()}</Text>
        </TouchableHighlight>
        <View style={styles.header}>
          <Image style={styles.imageStyle} resizeMode="contain" source={logoImage} />
          <View style={styles.headerText}>
            <Text style={styles.headerLabel}>{I18n.t('login_title').capitalize()}</Text>
            {/* {<Text style={styles.headerLabel}>{label}</Text>} */}
            <Text>{I18n.t('to_save_a_home').capitalize()}</Text>
          </View>
        </View>
        <View style={styles.textInputView}>
          <Text style={styles.label}>{I18n.t('login_email').capitalize()}</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="email-address"
            returnKeyType="send"
            onSubmitEditing={this.register}
            value={this.state.email}
            placeholder={I18n.t('login_email').capitalize()}
            onChangeText={email => this.setState({ email })}
          />
          {this.state.showError && ( <Text  style={{ color: 'red' }}>The email address is required and cannot be empty.</Text> )}
          {this.state.showInvalidEmail && ( <Text  style={{ color: 'red' }}>You have entered an invalid email address!</Text> )}
        </View>
        <TouchableHighlight onPress={this.register} underlayColor="gray">
          <View style={styles.button}>
            <Text style={styles.buttonText}>{I18n.t('login_sub').capitalize()}</Text>
          </View>
        </TouchableHighlight>
        <View style={styles.header}>
          <View style={styles.fbLoginView}>
            <Text style={styles.fbLoginText}>{I18n.t('login_with').capitalize()}</Text>
            <FacebookLogin
              onFBLoginSuccess={this.onFBLoginSuccess}
              onFBLoginLoading={this.onFBLoginLoading}
              onFbLoginFail={this.onFbLoginFail}
            />
          </View>
          <Text style={styles.TCText}>{I18n.t('termsAndCond').capitalize()}</Text>
        </View>
        {loading && (
          <View style={styles.container}>
            <ActivityIndicator size="large" color={backgroundColor} />
            <Text style={{ textAlign: 'center', color: backgroundColor }}>{I18n.t('loading').capitalize()}...</Text>
          </View>
        )}
      </View>
    );
  }
}

Login.propTypes = {
  label: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AuthAction, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
