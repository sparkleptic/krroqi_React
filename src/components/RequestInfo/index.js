import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, TouchableHighlight } from 'react-native';
import styles from './styles';

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
    alert('submitRequestInfo');
  }

  render() {
    const { onPress } = this.props;
    return (
      <View>
        <TextInput
          style={styles.textInput}
          keyboardType="default"
          returnKeyType="next"
          placeholder="Your Name"
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
          placeholder="Email"
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
          placeholder="Phone"
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
          placeholder="Message"
          autoCapitalize="none"
          autoCorrect={false}
          value={this.state.message}
          onChangeText={message => this.setState({ message })}
          ref={input => (this.messageInput = input)}
        />
        <TouchableHighlight onPress={this.submitRequestInfo} underlayColor="gray">
          <View style={styles.button}>
            <Text style={styles.buttonText}>Request Info</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

RequestInfo.propTypes = {};

export default RequestInfo;
