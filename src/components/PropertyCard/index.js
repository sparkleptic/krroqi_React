import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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
  var labelVar = null;
  
  if (!!propertyLabel) {
    if ((propertyLabel.name) === ('Sale')) {
      labelVar = I18n.t('label_name_sale').toProperCase();
    }
    if ((propertyLabel.name) === ('Rent')) {
      labelVar = I18n.t('label_name_rent').toProperCase();
    }
    if ((propertyLabel.name) === ('Future Developments')) {
      labelVar = I18n.t('label_name_Futdev').toProperCase();
    }
  }

  if (!!propertyStatus) {  
    if ((propertyStatus.name) === ('Sale')) {
      labelVar = I18n.t('label_name_sale').toProperCase();
    }
    if ((propertyStatus.name) === ('Rent')) {
      labelVar = I18n.t('label_name_rent').toProperCase();
    }
    if ((propertyStatus.name) === ('Future Developments')) {
      labelVar = I18n.t('label_name_Futdev').toProperCase();
    }
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
            { property.real_address && (
              <Text numberOfLines={1} style={styles.subTitle}>
                <Icon name="ios-pin" size={15} color='#000' /> {property.real_address}
            </Text> )
            }
            { property.agent &&
              property.agent.exists && (
                <Text numberOfLines={1} style={styles.subTitle}>
                  <Icon name="ios-person" size={15} color='#000' /> {property.agent.nickname}
                </Text>
              )
            }
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
            {!!propertyLabel && (labelVar !== null) && <Text style={styles.propertyLabel}>{labelVar}</Text>}
            {!!propertyStatus && (labelVar !== null) && <Text style={styles.propertyStatus}>{labelVar}</Text>}
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
