import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, Image, TextInput, TouchableHighlight, ActivityIndicator } from 'react-native';
import { Navigation } from 'react-native-navigation';
import FacebookLogin from '../FacebookLogin';
import { backgroundColor } from '../../constants/config';
import * as AuthAction from '../../Actions/AuthAction';
import styles from './styles';
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
  Navigation.dismissAllModals({
    animationType: 'slide-down', // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
  });
};
class Password extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: props.email,
        password: '',
        showPswdError: false,
      },
      error: false,
      loading: false,
    };
    this.register = this.register.bind(this);
    this.onFBLoginSuccess = this.onFBLoginSuccess.bind(this);
    this.onFBLoginLoading = this.onFBLoginLoading.bind(this);
    this.onFbLoginFail = this.onFbLoginFail.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.success) {
      closeModal();
    }
  }

  onFBLoginLoading() {
    this.setState({ loading: true });
  }

  onFBLoginSuccess(data) {
    let randomPwd = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    this.props.actions.register({...data, 'password': randomPwd});
  }

  onFbLoginFail() {
    this.setState({ loading: false });
  }

  register() {
    const { data } = this.state;

    if (data.password.length > 0){
      this.setState({ showPswdError: false });

      if (this.props.userExist) {
        this.props.actions.login(data);
      } else {
        this.props.actions.register({ ...data, name: '' });
      }
    }else{
      this.setState({ showPswdError: true });
    }
  }

  render() {
    const { loading, data, showPswdError } = this.state;
    const { userExist, auth } = this.props;
    return (
      <View>
        <View style={styles.container}>
          <TouchableHighlight
            style={{ alignSelf: 'flex-end' }}
            onPress={() => {
              this.props.actions.authReset({'success':null});
              closeModal();
            }}
            underlayColor="#f1f1f1"
          >
            <Text style={{ padding: 10, fontSize: 16, fontWeight: '500' }}>{I18n.t('close').toProperCase()}</Text>
          </TouchableHighlight>
          <View style={styles.header}>
            <Image style={styles.imageStyle} resizeMode="contain" source={logoImage} />
            <View style={styles.headerText}>
              <Text style={styles.headerLabel}>
                {userExist ? `${I18n.t('enter').capitalize()}` : `${I18n.t('create').capitalize()}`} {I18n.t('your_password').capitalize()}
              </Text>
            </View>
          </View>
          <View style={styles.textInputView}>
            <Text style={styles.label}>{I18n.t('login_pswd').capitalize()}</Text>
            <TextInput
              style={styles.textInput}
              returnKeyType="done"
              onSubmitEditing={this.register}
              value={this.state.data.password}
              placeholder={I18n.t('login_pswd').capitalize()}
              onChangeText={password => this.setState({ data: { ...data, password } })}
              secureTextEntry
            />

             {userExist ? null : <Text style={{ color: 'red', paddingBottom: 10 }}>{I18n.t('create_pswd').capitalize()}</Text> }
            {
              auth.error && (
              <Text style={{ color: 'red', paddingBottom: 10 }}>{I18n.t('login_err').capitalize()}</Text>
              )
            }
            {
              showPswdError && (
                <Text style={{ color: 'red', paddingBottom: 10 }}>{I18n.t('login_err_null').capitalize()}</Text>
              )
            }
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
        </View>
        {(loading || auth.loading) && (
          <View style={styles.container}>
            <ActivityIndicator size="large" color={backgroundColor} />
            <Text style={{ textAlign: 'center', color: backgroundColor }}>{I18n.t('loading').capitalize()}...</Text>
          </View>
        )}
      </View>
    );
  }
}

Password.propTypes = {
  userExist: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(Password);
