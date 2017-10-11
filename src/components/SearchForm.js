import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import Textbox from '../inputControls/textbox';

const SearchForm = (props) => {
  const { handleSubmit } = props;
  return (
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
      <Field
        name="search"
        component={Textbox}
        placeholder="Type Here..."
        onSubmitEditing={handleSubmit}
      />
      <TouchableOpacity onPress={handleSubmit}>
        <Text
          style={{
            color: 'white',
            paddingLeft: 10,
            paddingRight: 10,
            fontWeight: '400',
            fontSize: 16,
          }}
        >
          Filter
        </Text>
      </TouchableOpacity>
    </View>
  );
};

SearchForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'search',
})(SearchForm);
