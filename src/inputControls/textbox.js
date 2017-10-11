import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native';

const styles = {
  container: {
    flex: 1,
  },
};

const Textbox = ({ input, ...inputProps }) => (
  <View style={styles.container}>
    <TextInput
      style={{ flex: 1 }}
      autoCorrect={false}
      returnKeyType="search"
      onChangeText={input.onChange}
      {...inputProps}
    />
  </View>
);

Textbox.propTypes = {
  input: PropTypes.object.isRequired,
};

export default Textbox;
