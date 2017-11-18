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
    };
    this.onFBLoginSuccess = this.onFBLoginSuccess.bind(this);
    this.onFBLoginLoading = this.onFBLoginLoading.bind(this);
    this.onFbLoginFail = this.onFbLoginFail.bind(this);
    this.register = this.register.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.success) {
      closeModal();
    }
    if (nextProps.auth.error) {
      this.setState({ loading: false });
    }
  }

  onFBLoginLoading() {
    this.setState({ loading: true });
  }

  onFBLoginSuccess(data) {
    this.setState({ loading: false });
    this.props.actions.register(data);
  }

  onFbLoginFail() {
    this.setState({ loading: false });
  }

  register() {
    this.setState({ loading: true });
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
          <Text style={{ padding: 10, fontSize: 16, fontWeight: '500' }}>Close</Text>
        </TouchableHighlight>
        <View style={styles.header}>
          <Image style={styles.imageStyle} resizeMode="contain" source={logoImage} />
          <View style={styles.headerText}>
            <Text style={styles.headerLabel}>Sign in or register</Text>
            <Text style={styles.headerLabel}>{label}</Text>
          </View>
        </View>
        <View style={styles.textInputView}>
          <Text style={styles.label}>Enter your email</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="email-address"
            returnKeyType="send"
            onSubmitEditing={this.register}
            value={this.state.email}
            placeholder="Enter your email"
            onChangeText={email => this.setState({ email })}
          />
        </View>
        <TouchableHighlight onPress={this.register} underlayColor="gray">
          <View style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </View>
        </TouchableHighlight>
        <View style={styles.header}>
          <View style={styles.fbLoginView}>
            <Text style={styles.fbLoginText}>Or sign in with</Text>
            <FacebookLogin
              onFBLoginSuccess={this.onFBLoginSuccess}
              onFBLoginLoading={this.onFBLoginLoading}
              onFbLoginFail={this.onFbLoginFail}
            />
          </View>
          <Text style={styles.TCText}>I accept Krooqi's Terms of use and Privacy Policy</Text>
        </View>
        {loading && (
          <View style={styles.container}>
            <ActivityIndicator size="large" color={backgroundColor} />
            <Text style={{ textAlign: 'center', color: backgroundColor }}>Loading...</Text>
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
