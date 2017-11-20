import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Linking, Image, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AgentDetail = ({ agent }) => {
  const openURL = (url) => {
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
  const number = '+918690090417';
  const message = `Hi ${agent.display_name}, I saw your profile on krooqi and wanted to see if you could help me`;
  return (
    <View style={{ flex: 1, margin: 10 }}>
      <View style={{ flex: 1 }}>
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
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableHighlight
          onPress={() => openURL(`sms:${number}?body=${message}`)}
          underlayColor="white"
        >
          <Text>Send A Message</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => openURL(`tel:${number}`)} underlayColor="white">
          <Text>Call</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

AgentDetail.propTypes = {
  agent: PropTypes.object.isRequired,
};

export default AgentDetail;
