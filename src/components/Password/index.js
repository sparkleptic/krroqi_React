import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TextInput, Button, TouchableHighlight } from 'react-native';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import Icon from 'react-native-vector-icons/Ionicons';

import { Navigation } from 'react-native-navigation';
import { backgroundColor } from '../../constants/config';
import styles from './styles';

const logoImage = require('../../images/KR-Logo.png');

class Password extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
    };
    this.register = this.register.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    Navigation.dismissAllModals({
      animationType: 'slide-down', // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
    });
  }

  register() {
    Navigation.dismissAllModals({
      animationType: 'slide-down', // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
    });
  }

  render() {
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
            <Text style={styles.headerLabel}>Choose a password</Text>
          </View>
        </View>
        <View style={styles.textInputView}>
          <Text style={styles.label}>Enter your password</Text>
          <TextInput
            style={styles.textInput}
            returnKeyType="done"
            onSubmitEditing={this.register}
            value={this.state.password}
            placeholder="Enter your password"
            onChangeText={password => this.setState({ password })}
            secureTextEntry
          />
        </View>
        <Button
          onPress={() => alert('button pressed')}
          title="Submit"
          color={backgroundColor}
          accessibilityLabel="Submit"
        />
      </View>
    );
  }
}

Password.propTypes = {};

export default Password;
