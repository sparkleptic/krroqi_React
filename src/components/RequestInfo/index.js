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

class RequestInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      message: '',
    };
    this.submitRequestInfo = this.submitRequestInfo.bind(this);
  }

  submitRequestInfo() {
    // alert('submitRequestInfo');
  }

  render() {
    const { onPress } = this.props;
    return (
      <View>
        <TextInput
          style={styles.textInput}
          keyboardType="default"
          returnKeyType="next"
          placeholder={I18n.t('req_your_name').capitalize()}
          value={this.state.name}
          autoCapitalize="none"
          autoCorrect={false}
          onSubmitEditing={() => this.emailInput.focus()}
          onChangeText={name => this.setState({ name })}
        />
        <TextInput
          style={styles.textInput}
          keyboardType="email-address"
          returnKeyType="next"
          placeholder={I18n.t('req_email_address').capitalize()}
          value={this.state.email}
          autoCapitalize="none"
          autoCorrect={false}
          onSubmitEditing={() => this.phoneInput.focus()}
          onChangeText={email => this.setState({ email })}
          ref={input => (this.emailInput = input)}
        />
        <TextInput
          style={styles.textInput}
          keyboardType="phone-pad"
          returnKeyType="next"
          placeholder={I18n.t('req_Phone').capitalize()}
          autoCapitalize="none"
          autoCorrect={false}
          value={this.state.phone}
          onSubmitEditing={() => this.messageInput.focus()}
          onChangeText={phone => this.setState({ phone })}
          ref={input => (this.phoneInput = input)}
        />
        <TextInput
          style={styles.textInput}
          numberOfLines={4}
          keyboardType="default"
          returnKeyType="go"
          placeholder={I18n.t('req_msg').capitalize()}
          autoCapitalize="none"
          autoCorrect={false}
          value={this.state.message}
          onChangeText={message => this.setState({ message })}
          ref={input => (this.messageInput = input)}
        />
        <TouchableHighlight onPress={this.submitRequestInfo} underlayColor="gray">
          <View style={styles.button}>
            <Text style={styles.buttonText}>{I18n.t('req_info').capitalize()}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

RequestInfo.propTypes = {};

export default RequestInfo;
