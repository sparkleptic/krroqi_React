import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput } from 'react-native';

const PostTitle = props => (
  <View>
    <View>
      <Text>Property Title</Text>
      <TextInput />
    </View>
    <View>
      <Text>Property Description</Text>
      <TextInput />
    </View>
    <View>
      <Text>Owner Name</Text>
      <TextInput />
    </View>
    <View>
      <Text>Owner Phone #</Text>
      <TextInput />
    </View>
  </View>
);

PostTitle.propTypes = {};

export default PostTitle;
