import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TextInput, Button, TouchableHighlight } from 'react-native';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import Icon from 'react-native-vector-icons/Ionicons';

import { Navigation } from 'react-native-navigation';
import { backgroundColor } from '../../constants/config';
import styles from './styles';

const logoImage = require('../../images/KR-Logo.png');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
    this.facebookLogin = this.facebookLogin.bind(this);
    this.register = this.register.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    Navigation.dismissModal({
      animationType: 'slide-down', // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
    });
  }

  register() {
    Navigation.showModal({
      screen: 'krooqi.Password',
      passProps: {
        label: 'to save a home',
      },
      navigatorStyle: {
        navBarHidden: true,
        screenBackgroundColor: 'white',
      },
      animationType: 'slide-up',
    });
  }

  facebookLogin() {
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      (result) => {
        if (result.isCancelled) {
          alert('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const accessToken = data.accessToken;

            const responseInfoCallback = (error, result) => {
              if (error) {
                console.log(error);
                alert(`Error fetching data: ${error.toString()}`);
              } else {
                console.log(result);
                alert(JSON.stringify(result));
              }
            };

            const infoRequest = new GraphRequest(
              '/me',
              {
                accessToken,
                parameters: {
                  fields: {
                    string: 'email,name, picture,first_name,middle_name,last_name',
                  },
                },
              },
              responseInfoCallback,
            );

            // Start the graph request.
            new GraphRequestManager().addRequest(infoRequest).start();
          });
          alert(`Login success with permissions: ${result.grantedPermissions.toString()}`);
        }
      },
      (error) => {
        alert(`Login fail with error: ${error}`);
      },
    );
  }

  render() {
    const { label } = this.props;
    return (
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
        <Button
          onPress={() => alert('button pressed')}
          title="Submit"
          color={backgroundColor}
          accessibilityLabel="Submit"
        />
        <View style={styles.header}>
          <View style={styles.fbLoginView}>
            <Text style={styles.fbLoginText}>Or sign in with</Text>
            <TouchableHighlight onPress={this.facebookLogin} underlayColor="#f1f1f1">
              <Icon style={styles.fbLoginIcon} name="logo-facebook" size={30} color="#3B5998" />
            </TouchableHighlight>
          </View>
          <Text style={styles.TCText}>I accept Krooqi's Terms of use and Privacy Policy</Text>
        </View>
      </View>
    );
  }
}

Login.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Login;
