import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import SearchBar from '../inputControls/searchBar';

const SearchForm = (props) => {
  const { handleSubmit } = props;
  return (
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
      <Field
        name="search"
        component={SearchBar}
        placeholder="Type Here..."
        onSubmitEditing={handleSubmit}
      />
      <TouchableOpacity onPress={handleSubmit}>
        <Text
          style={{
            color: 'black',
            paddingLeft: 10,
            paddingRight: 10,
            fontWeight: '400',
            fontSize: 16,
          }}
        >
          Search
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default reduxForm({
  form: 'search',
})(SearchForm);
