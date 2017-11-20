import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, Platform, Linking, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AgentCard = ({ agent }) => {
  const sendEmail = (url) => {
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
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
      }}
    >
      <View style={{ width: 60, justifyContent: 'center', alignItems: 'center' }}>
        {agent.image ? (
          <Image style={{ width: 50, height: 50 }} source={{ uri: agent.image }} />
        ) : (
          <Icon name="md-person" size={50} />
        )}
      </View>
      <View style={{ flex: 1, paddingHorizontal: 10 }}>
        <Text>{agent.display_name}</Text>
        <Text>{agent.address}</Text>
        <View />
      </View>
      <View style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableHighlight
          onPress={() => sendEmail(`mailto:${agent.user_email}`)}
          underlayColor="white"
        >
          <Icon name={Platform.OS === 'ios' ? 'ios-mail' : 'md-mail'} size={30} />
        </TouchableHighlight>
      </View>
    </View>
  );
};

AgentCard.propTypes = {
  agent: PropTypes.object.isRequired,
};

export default AgentCard;
