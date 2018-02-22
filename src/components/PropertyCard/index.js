import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Dimensions, TouchableWithoutFeedback } from 'react-native';
import LikeButton from '../LikeButton';
import ProgressiveImage from '../ProgressiveImage';
import I18n from './../../i18n';
import styles from './styles';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.toProperCase = function() {
  return this.toLowerCase().replace(/^(.)|\s(.)/g, 
    function($1) { return $1.toUpperCase(); });
}
const imagePlaceholder = require('../../images/house_placeholder.png');

const { width } = Dimensions.get('window');

const PropertyCard = ({
  property,
  onCardPress,
  fullWidth,
  containerStyle,
  isFavorite,
  onLikePress,
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
              {!!property.bedroom_num && (
                <Text style={styles.subHeader}>{I18n.t('beds').toProperCase()}: {property.bedroom_num}</Text>
              )}
              {!!property.bathroom_num && (
                <Text style={styles.subHeader}>{I18n.t('baths').toProperCase()}: {property.bathroom_num}</Text>
              )}
              {!!property.area && <Text style={styles.subHeader}>Sq m: {property.area}</Text>}
            </View>
            {propertyType && <Text style={styles.subHeader}>{propertyType.name}</Text>}
          </View>
          <View style={styles.displayTop}>
            {!!propertyLabel && <Text style={styles.propertyLabel}>{propertyLabel.name}</Text>}
            {!!propertyStatus && <Text style={styles.propertyStatus}>{propertyStatus.name}</Text>}
          </View>
          {!!property.eprice && (
            <Text style={styles.priceLabel}>
              {I18n.toNumber(property.eprice, { precision: 0 })} SAR
            </Text>
          )}
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.iconStyle}>
        <LikeButton onLikePress={() => onLikePress(property.ID)} isFavorite={isFavorite} />
      </View>
    </View>
  );
};

PropertyCard.propTypes = {
  property: PropTypes.object.isRequired,
  onCardPress: PropTypes.func.isRequired,
  onLikePress: PropTypes.func,
  containerStyle: PropTypes.object,
  fullWidth: PropTypes.bool,
  isFavorite: PropTypes.bool,
};

PropertyCard.defaultProps = {
  fullWidth: false,
  isFavorite: false,
  containerStyle: {},
  onLikePress: () => null,
};

export default PropertyCard;
