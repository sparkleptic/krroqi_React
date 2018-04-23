import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, View, Text, TextInput, TouchableHighlight } from 'react-native';
import axios from "axios";
import styles from './styles';
import I18n from '../../i18n';
import { krooqi_URL, backgroundColor } from "../../constants/config";

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
      phoneError: false,
      messageError: false,
      agent_id: null,
      name_string: null,
      property_id: null,
      userid: null,
      user_display_name: null,
      user_email: null,
      isLoding: false,
    };
    this.submitRequestInfo = this.submitRequestInfo.bind(this);
  }

  componentDidMount() {

    const { property, auth } = this.props;

    this.setState({
      name_string: property.post_title,
      property_id: property.ID,
      agent_id: property.agent_id,
      message: `Hello, I am interested in ${property.post_title}`,
      userid: auth.success.id,
      user_display_name: auth.success.name,
      user_email: auth.success.email,
    })

  }

  submitRequestInfo() {

    const { name_string, property_id, message, userid, user_display_name, user_email, agent_id, phone } = this.state;

    if (phone.length === 0) {
      this.setState({ phoneError: true });
    }
    if (message.length === 0) {
      this.setState({ messageError: true });
    }

    if ((phone.length === 0 && message.length === 0) || phone.length === 0 || message.length === 0) {
      return false;
    }else{
      this.setState({ phoneError: false, messageError: false });
    }

    this.setState({ isLoding: true })


    let phpPost = {
      "name_string": name_string, // property name
      "agent_id": agent_id, // agent id
      "userlog": "1", // hard coded
      "userid": userid, // login user id
      "typeadd": "1", // hard coded
      "mobile_nounce": "cabfd9e42d" // hard coded
    }

    let nonPhpPost = {
      "property_id": property_id, // id of property 
      "message": message, // user message
      "mobile_nounce": "cabfd9e42d", // hard coded
      "agent_id": agent_id,
      "phone": phone, // phone Number 
      "user_id": userid, // user Id
      "user_email": user_email, // user E-Mail
      "user_display_name": user_display_name, // user Name
    }

    axios
    .post(`${krooqi_URL}wp-content/themes/houzez/framework/contact_agent.php`, phpPost)
    .then((response) => {
      if (response.status == '200' || response.status == 200) {   
        // do nothing
      }
    })
    .catch((error) => {
      alert(error)
    });

    axios
    .post(`${krooqi_URL}wp-admin/admin-ajax.php?action=houzez_start_thread`, nonPhpPost)
    .then((response) => {
      if (response.status == '200' || response.status == 200) { 
        this.setState({ isLoding: false })
        alert("Your Request is sent.")
      }
    })
    .catch((error) => {
      alert(error)
    });
  }

  render() {
    const { onPress, } = this.props;
    const { isLoding, phoneError, messageError } =this.state;
    return (
      <View>
        {/* <TextInput
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
        /> */}
        {
          isLoding ? <ActivityIndicator style={{ zIndex: 999999 }} size="large" color={backgroundColor} /> : null
        }
        <TextInput
          style={styles.textInput}
          keyboardType="numeric"
          returnKeyType="next"
          placeholder={I18n.t('req_Phone').capitalize()}
          autoCapitalize="none"
          autoCorrect={false}
          value={this.state.phone}
          onChangeText={phone => this.setState({ phone })}
          ref={input => (this.phoneInput = input)}
        />
        {
          phoneError && <Text style={{ color: 'red', }}>{I18n.t('PhoneReq').capitalize()}</Text>
        }
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
        {
          messageError && <Text style={{ color: 'red', paddingBottom: 10, }}>{I18n.t('MsgReq').capitalize()}</Text>
        }
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
