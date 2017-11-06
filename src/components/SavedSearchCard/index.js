import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableWithoutFeedback } from 'react-native';

const SavedSearchCard = ({ item, onCardPress }) => (
  <TouchableWithoutFeedback onPress={() => onCardPress(item)}>
    <View>
      <Text>{item.searchLabel}</Text>
    </View>
  </TouchableWithoutFeedback>
);

SavedSearchCard.propTypes = {
  item: PropTypes.object.isRequired,
  onCardPress: PropTypes.func.isRequired,
};

export default SavedSearchCard;
