import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, View, Text, Linking, Image, TextInput, TouchableHighlight, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { krooqi_URL, backgroundColor } from '../../constants/config';
import I18n from '../../i18n';
import axios from "axios";
import styles from './styles';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.toProperCase = function() {
  return this.toLowerCase().replace(/^(.)|\s(.)/g, 
    function($1) { return $1.toUpperCase(); });
}

class AgentDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      phone: '',
      phoneError: false,
      messageError: false,
      isLoding: false,
    }
  }

  submitRequestInfo = () => {
    const { auth, agent } = this.props;
    const { message, phone } = this.state;

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

    this.setState({ isLoding: true });

    let phpPost = {
      "name_string": "name_string", // property name
      "agent_id": agent.agentid4msg, // agent id
      "userlog": "1", // hard coded
      "userid": auth.success.id, // Login user id
      "typeadd": "1", // hard coded
      "mobile_nounce": "cabfd9e42d" // hard coded
    }

    let nonPhpPost = {
      "property_id": "0", // id of property 
      "flag": "contact", // hard coded
      "message": message, // user message
      "mobile_nounce": "cabfd9e42d", // hard coded
      "agent_id": agent.agentid4msg, // agent id
      "phone": phone, // user phone number
      "user_id": auth.success.id, // user id
      "user_email": auth.success.email, // user email
      "user_display_name":  auth.success.name, // user name
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

  openURL = (url) => {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log(`Can't handle url: ${url}`);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => console.error('An error occurred', err));
  };

  render() {
    const { agent, auth } = this.props;
    const { message, isLoding, phone, phoneError, messageError } = this.state;
    const number = '+918690090417';
    return (
      <ScrollView>
      <View style={{ flex: 1, margin: 10 }}>
        <View>
          <View style={{ flexDirection: 'row' }}>
            <View>
              {agent.image ? (
                <Image style={{ width: 100, height: 100 }} source={{ uri: agent.image }} />
              ) : (
                <Icon name="md-person" size={100} />
              )}
            </View>
            <View style={{ marginHorizontal: 10 }}>
              <Text>{agent.display_name}</Text>
              <Text>{agent.address}</Text>
              <Text>{agent.user_email}</Text>
            </View>
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text>Active Listing (5)</Text>
            <Text>Rating & Reviews (3)</Text>
          </View>
          {
            auth.success !== null &&
            auth.success !== false &&
            agent.agentid4msg !== 0 &&
            agent.agentid4msg !== "0" &&
            agent.ID !== auth.success.id && (
              <View>
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
                  value={phone}
                  onChangeText={phone => this.setState({ phone })}
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
                  value={message}
                  onChangeText={message => this.setState({ message })}
                />
                {
                  messageError && <Text style={{ color: 'red', paddingBottom: 10 }}>{I18n.t('MsgReq').capitalize()}</Text>
                }
                <TouchableHighlight onPress={() => this.submitRequestInfo()} underlayColor="gray">
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>{I18n.t('sendMsg').toProperCase()}</Text>
                  </View>
                </TouchableHighlight>
              </View>
            )
          }
        </View>
        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 25 }}>
          <TouchableHighlight onPress={() => this.openURL(`sms:${number}`)} underlayColor="white">
            <Text style={{ paddingLeft: 10 }}>Send A Message</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.openURL(`tel:${number}`)} underlayColor="white">
            <Text style={{ paddingRight: 10 }}>Call</Text>
          </TouchableHighlight>
        </View> */}
      </View>
      </ScrollView>
    );
  }

}

AgentDetail.propTypes = {
  agent: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  messageEdit: PropTypes.func,
  submitRequestInfo: PropTypes.func,
};

export default AgentDetail;
