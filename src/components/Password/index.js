import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, Image, TextInput, Button, TouchableHighlight } from 'react-native';
import { Navigation } from 'react-native-navigation';

import Loading from '../Loading';
import FacebookLogin from '../FacebookLogin';
import { backgroundColor } from '../../constants/config';
import * as AuthAction from '../../Actions/AuthAction';
import styles from './styles';

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
    if (nextProps.auth.error) {
      this.setState({ loading: false });
    }
  }

  onFBLoginLoading() {
    this.setState({ loading: true });
  }

  onFBLoginSuccess(data) {
    this.props.actions.register(data);
  }

  onFbLoginFail() {
    this.setState({ loading: false });
  }

  register() {
    const { data } = this.state;
    this.setState({ loading: true });
    if (this.props.userExist) {
      this.props.actions.login(data);
    } else {
      this.props.actions.register({ ...data, name: '' });
    }
  }

  render() {
    const { loading, data } = this.state;
    const { userExist } = this.props;
    return (
      <View>
        {loading && <Loading inModal />}
        <View style={styles.container}>
          <TouchableHighlight
            style={{ alignSelf: 'flex-end' }}
            onPress={this.closeModal}
            underlayColor="#f1f1f1"
          >
            <Text style={{ padding: 10, fontSize: 16, fontWeight: '500' }}>Close</Text>
          </TouchableHighlight>
          <View style={styles.header}>
            <Image style={styles.imageStyle} resizeMode="contain" source={logoImage} />
            <View style={styles.headerText}>
              <Text style={styles.headerLabel}>
                {`${userExist ? 'Enter' : 'Create'} your password`}
              </Text>
            </View>
          </View>
          <View style={styles.textInputView}>
            <Text style={styles.label}>password</Text>
            <TextInput
              style={styles.textInput}
              returnKeyType="done"
              onSubmitEditing={this.register}
              value={this.state.data.password}
              placeholder="password"
              onChangeText={password => this.setState({ data: { ...data, password } })}
              secureTextEntry
            />
          </View>
          <Button
            onPress={this.register}
            title="Submit"
            color={backgroundColor}
            accessibilityLabel="Submit"
          />
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
        </View>
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
