import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Platform, TouchableHighlight, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RequestInfo from '../RequestInfo';
import LoginCheck from './loginCheck';

import styles from './styles';
import I18n from '../../i18n';

const { width } = Dimensions.get('window');

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.toProperCase = function() {
  return this.toLowerCase().replace(/^(.)|\s(.)/g, 
    function($1) { return $1.toUpperCase(); });
}

const PropertyContent = ({ property, auth, navigatorProp, lang }) => {
  const ios = Platform.OS === 'ios';
  const propertyType = property.features.find(value => value.taxonomy === 'property_type');
  const propertyLabel = property.features.find(value => value.taxonomy === 'property_label');
  const propertyStatus = property.features.find(value => value.taxonomy === 'property_status');
  
  return (
    <View style={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.title}>{property.post_title}</Text>
        <Text style={styles.subTitle}>
          {
            property.bedroom_num && (
              <Text>{`${property.bedroom_num} ${I18n.t('beds').capitalize()}`}  </Text>
            )
          }
          {
            property.bathroom_num && (
              <Text>{`${property.bathroom_num} ${I18n.t('baths').capitalize()}`}  </Text>
            )
          }
          {
            property.area && (
              <Text>{`${property.area} sq. m`}  </Text>
            )
          }
        </Text>
        <Text>
          <Text style={styles.label}>{I18n.t('single_listed').capitalize()}</Text>
          <Text style={styles.text}> {moment(property.post_date).format('DD-MMM-YYYY')}</Text>
        </Text>
        {!!property.post_content && (
          <View>
            <Text style={styles.subject}>{I18n.t('single_discription').capitalize()}</Text>
            <Text style={styles.text}>{property.post_content}</Text>
          </View>
        )}
        <Text style={styles.subject}>{I18n.t('single_prop_detail').capitalize()}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>{I18n.t('single_prop_id').capitalize()}</Text>
          <Text style={[styles.text, Platform.OS === "android" && lang !== "en" ? {width: width / 3, textAlign: "right"} : {}]}>{property.ID}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>{I18n.t('single_price').capitalize()}</Text>
          <Text style={[styles.text, Platform.OS === "android" && lang !== "en" ? {width: width / 3, textAlign: "right"} : {}]}>{property.eprice} SAR</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>{I18n.t('single_totalArea').capitalize()}</Text>
          <Text style={[styles.text, Platform.OS === "android" && lang !== "en" ? {width: width / 3, textAlign: "right"} : {}]}>{property.area} sq. m</Text>
        </View>
        {!!property.bedroom_num && (
          <View style={styles.row}>
            <Text style={styles.label}>{I18n.t('single_noBedroom').capitalize()}</Text>
            <Text style={[styles.text, Platform.OS === "android" && lang !== "en" ? {width: width / 3, textAlign: "right"} : {}]}>{property.bedroom_num}</Text>
          </View>
        )}
        {!!property.bathroom_num && (
          <View style={styles.row}>
            <Text style={styles.label}>{I18n.t('single_noBath').capitalize()}</Text>
            <Text style={[styles.text, Platform.OS === "android" && lang !== "en" ? {width: width / 3, textAlign: "right"} : {}]}>{property.bathroom_num}</Text>
          </View>
        )}
        {!!property.garage_num && (
          <View style={styles.row}>
            <Text style={styles.label}>{I18n.t('single_noGarage').capitalize()}</Text>
            <Text style={[styles.text, Platform.OS === "android" && lang !== "en" ? {width: width / 3, textAlign: "right"} : {}]}>{property.garage_num}</Text>
          </View>
        )}
        {!!property.garage_area && (
          <View style={styles.row}>
            <Text style={styles.label}>{I18n.t('single_AreaGarage').capitalize()}</Text>
            <Text style={[styles.text, Platform.OS === "android" && lang !== "en" ? {width: width / 3, textAlign: "right"} : {}]}>{property.garage_area} sq. m</Text>
          </View>
        )}
        {!!property.build_year && (
          <View style={styles.row}>
            <Text style={styles.label}>{I18n.t('single_Build_on').capitalize()}</Text>
            <Text style={[styles.text, Platform.OS === "android" && lang !== "en" ? {width: width / 3, textAlign: "right"} : {}]}>{property.build_year}</Text>
          </View>
        )}
        { !!propertyType &&
          !!propertyType.name && (
          <View style={styles.row}>
            <Text style={styles.label}>{I18n.t('single_propType').capitalize()}</Text>
            <Text style={[styles.text, Platform.OS === "android" && lang !== "en" ? {width: width / 3, textAlign: "right"} : {}]}>{propertyType.name}</Text>
          </View>
        )}
        {!!propertyLabel &&
          propertyLabel.name && (
            <View style={styles.row}>
              <Text style={styles.label}>{I18n.t('single_propLabel').capitalize()}</Text>
              <Text style={[styles.text, Platform.OS === "android" && lang !== "en" ? {width: width / 3, textAlign: "right"} : {}]}>{propertyLabel.name}</Text>
            </View>
          )}
        { !!propertyStatus &&
          !!propertyStatus.name && (
          <View style={styles.row}>
            <Text style={styles.label}>{I18n.t('single_propstatus').capitalize()}</Text>
            <Text style={[styles.text, Platform.OS === "android" && lang !== "en" ? {width: width / 3, textAlign: "right"} : {}]}>{propertyStatus.name}</Text>
          </View>
        )}
        <View>
          <Text style={styles.subject}>{I18n.t('single_features').capitalize()}</Text>
          <View style={styles.row}>
            {property.features.map((item) => {
              if (item.taxonomy === 'property_feature') {
                return (
                  <View
                    key={item.term_taxonomy_id}
                    style={{ flexDirection: 'row', width: '50%', alignItems: 'center' }}
                  >
                    <Icon
                      name={ios ? 'ios-checkmark' : 'md-checkmark'}
                      size={24}
                      style={{ margin: 5 }}
                    />
                    <Text style={styles.text}>{item.name}</Text>
                  </View>
                );
              }
              return null;
            })}
          </View>
        </View>
        {
          (property.agent.exists) && (
            <View>              
              { (auth.success !== null && auth.success !== false) ? ((property.post_author !== auth.success.id) ? <View>
                  <Text style={styles.subject}>{I18n.t('single_reqInfo').capitalize()}</Text>
                  <RequestInfo auth={auth} property={property} />
                </View> : null) : <View> 
                  <Text style={styles.subject}>{I18n.t('single_reqInfo').capitalize()}</Text> 
                  <LoginCheck navigator={navigatorProp} /> 
                </View>  
              }
            </View>
          )
        }
      </View>
    </View>
  );
};

PropertyContent.propTypes = {
  property: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  navigatorProp: PropTypes.object.isRequired,
  lang: PropTypes.string,
};

// export default PropertyContent;

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(PropertyContent);