import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableWithoutFeedback, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const LikeButton = ({ isFavorite, onLikePress }) => (
  <View>
    <TouchableWithoutFeedback onPress={() => onLikePress()}>
      {isFavorite ? (
        <Icon
          style={styles.iconStyle}
          name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'}
          size={30}
          color="red"
        />
      ) : (
        <Icon
          style={styles.iconStyle}
          name={Platform.OS === 'ios' ? 'ios-heart-outline' : 'md-heart-outline'}
          size={30}
          color="red"
        />
      )}
    </TouchableWithoutFeedback>
  </View>
);

LikeButton.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  onLikePress: PropTypes.func.isRequired,
};

export default LikeButton;
