import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
    borderRadius: 5,
    backgroundColor: '#BDC5CF',
  },
  iconStyle: {
    margin: 10,
  },
  textStyle: {
    width: '100%',
  },
};

const SearchBar = ({ input, ...inputProps }) => (
  <View style={styles.container}>
    <Icon style={styles.iconStyle} name="md-search" size={20} />
    <TextInput
      style={{ flex: 1 }}
      autoCorrect={false}
      returnKeyType="search"
      onChangeText={input.onChange}
      {...inputProps}
    />
    <Icon style={styles.iconStyle} name="md-close" size={20} />
  </View>
);

SearchBar.propTypes = {};

export default SearchBar;
