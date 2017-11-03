import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Platform, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ProgressiveImage from '../ProgressiveImage';
import I18n from './../../i18n';
import styles from './styles';

const imagePlaceholder = require('../../images/house_placeholder.png');

const { width } = Dimensions.get('window');

const PropertyCard = ({
  property, onCardPress, fullWidth, containerStyle, onLikePress,
}) => {
  const propertyType = property.features.find(value => value.taxonomy === 'property_type');
  const propertyLabel = property.features.find(value => value.taxonomy === 'property_label');
  const propertyStatus = property.features.find(value => value.taxonomy === 'property_status');
  let fullWidthStyle = {};
  if (fullWidth) {
    fullWidthStyle = {
      width,
      margin: 0,
    };
  }
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableWithoutFeedback onPress={() => onCardPress(property)}>
        <View style={[styles.wrapper, fullWidthStyle]}>
          <ProgressiveImage
            source={{ uri: property.thumbnail }}
            thumbnail={imagePlaceholder}
            style={styles.ProgressiveImage}
          />
          <View style={styles.cardDetail}>
            <Text numberOfLines={1} style={styles.title}>
              {property.post_title}
            </Text>
            <Text numberOfLines={1} style={styles.subTitle}>
              {property.real_address}
            </Text>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.subHeader}>Beds: {property.bedroom_num}</Text>
              <Text style={styles.subHeader}>Baths: {property.bathroom_num}</Text>
              <Text style={styles.subHeader}>Sq m: {property.area}</Text>
            </View>
            {propertyType && <Text style={styles.subHeader}>{propertyType.name}</Text>}
          </View>
          <View style={styles.displayTop}>
            {propertyLabel && <Text style={styles.propertyLabel}>{propertyLabel.name}</Text>}
            {propertyStatus && <Text style={styles.propertyStatus}>{propertyStatus.name}</Text>}
          </View>
          <Text style={styles.priceLabel}>
            {I18n.toNumber(property.eprice, { precision: 0 })} SAR
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => onLikePress(property)}>
        <Icon
          style={styles.iconStyle}
          name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'}
          size={30}
          color="red"
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

PropertyCard.propTypes = {
  property: PropTypes.object.isRequired,
  onCardPress: PropTypes.func.isRequired,
  onLikePress: PropTypes.func.isRequired,
  containerStyle: PropTypes.object,
  fullWidth: PropTypes.bool,
};

PropertyCard.defaultProps = {
  fullWidth: false,
  containerStyle: {},
};

export default PropertyCard;
