import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Dimensions, TouchableWithoutFeedback, Platform } from 'react-native';
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
  lang,
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
  var labelVarLabel = null;
  var labelVarStatus = null;
  
  if (!!propertyLabel) {
    if ((propertyLabel.slug) === ('for-sale') || (propertyLabel.slug) === ('for-sale-ar')) {
      labelVarLabel = I18n.t('label_name_sale').toProperCase();
    }
    if ((propertyLabel.slug) === ('for-rent') || (propertyLabel.slug) === ('for-rent-ar')) {
      labelVarLabel = I18n.t('label_name_rent').toProperCase();
    }
    if ((propertyLabel.slug) === ('future-developments') || (propertyLabel.slug) === ('future-developments-ar')) {
      labelVarLabel = I18n.t('label_name_Futdev').toProperCase();
    }
    if ((propertyLabel.slug) === ('hot-offer') || (propertyLabel.slug) === ('hot-offer-ar')) {
      labelVarLabel = I18n.t('label_name_HotOffer').toProperCase();
    }
  }

  if (!!propertyStatus) {  
    if ((propertyStatus.slug) === ('for-sale') || (propertyStatus.slug) === ('for-sale-ar')) {
      labelVarStatus = I18n.t('label_name_sale').toProperCase();
    }
    if ((propertyStatus.slug) === ('for-rent') || (propertyStatus.slug) === ('for-rent-ar')) {
      labelVarStatus = I18n.t('label_name_rent').toProperCase();
    }
    if ((propertyStatus.slug) === ('future-developments') || (propertyStatus.slug) === ('future-developments-ar')) {
      labelVarStatus = I18n.t('label_name_Futdev').toProperCase();
    }
    if ((propertyStatus.slug) === ('hot-offer') || (propertyStatus.slug) === ('hot-offer-ar')) {
      labelVarStatus = I18n.t('label_name_HotOffer').toProperCase();
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
            <View>
            <View>
            { property.real_address && (
              <Text  style={[styles.subTitle, Platform.OS === "android" && lang !== "en" ? {textAlign: "right"} : {}]}>
                <Icon name="ios-pin" size={15} color='#000' /> {property.real_address.substr(0, 31)}
            </Text> )
            }
            { property.agent &&
              property.agent.exists && (
                <Text style={[styles.subTitle, Platform.OS === "android" && lang !== "en" ? {textAlign: "right"} : {}]}>
                  <Icon name="ios-person" size={15} color='#000' /> {property.agent.nickname}
                </Text>
              )
            }
            </View>
            <View style={[{ flexDirection: 'row' }, Platform.OS === "android" && lang !== "en" ? {justifyContent: "flex-end"} : {}]}>
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
          </View>
          <View style={styles.displayTop}>
            {!!propertyLabel && (labelVarLabel !== null) && <Text style={styles.propertyLabel}>{labelVarLabel}</Text>}
            {!!propertyStatus && (labelVarStatus !== null) && <Text style={styles.propertyStatus}>{labelVarStatus}</Text>}
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
  lang: PropTypes.string,
};

PropertyCard.defaultProps = {
  fullWidth: false,
  isFavorite: false,
  containerStyle: {},
  lang: "en",
  onLikePress: () => null,
};

export default PropertyCard;
