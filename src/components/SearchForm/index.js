import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import Textbox from '../../inputControls/textbox';

const SearchForm = (props) => {
  const { handleSubmit, fields: { search } } = props;
  return (
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
      <Field
        name="search"
        component={Textbox}
        placeholder="Type Here..."
        onSubmitEditing={handleSubmit}
        {...search}
        autoFocus
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
          Search
        </Text>
      </TouchableOpacity>
    </View>
  );
};

SearchForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'search',
})(SearchForm);
