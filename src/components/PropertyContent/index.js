import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Platform, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RequestInfo from '../RequestInfo';
import LoginCheck from './loginCheck';

import styles from './styles';
import I18n from '../../i18n';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.toProperCase = function() {
  return this.toLowerCase().replace(/^(.)|\s(.)/g, 
    function($1) { return $1.toUpperCase(); });
}

const PropertyContent = ({ property, auth, navigatorProp }) => {
  const ios = Platform.OS === 'ios';
  const propertyType = property.features.find(value => value.taxonomy === 'property_type');
  const propertyLabel = property.features.find(value => value.taxonomy === 'property_label');
  const propertyStatus = property.features.find(value => value.taxonomy === 'property_status');
  // const { auth } = this.props;
  return (
    <View style={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.title}>{property.post_title}</Text>
        <Text style={styles.subTitle}>
          <Text>{`${property.bedroom_num} beds  `}</Text>
          <Text>{`${property.bathroom_num} bath  `}</Text>
          <Text>{`${property.area} sq. m  `}</Text>
        </Text>
        <Text>
          <Text style={styles.label}>{I18n.t('single_listed').capitalize()}</Text>
          <Text style={styles.text}>{moment(property.post_date).format('DD-MMM-YYYY')}</Text>
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
          <Text style={styles.text}>{property.ID}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>{I18n.t('single_price').capitalize()}</Text>
          <Text style={styles.text}>{property.eprice} sar</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>{I18n.t('single_totalArea').capitalize()}</Text>
          <Text style={styles.text}>{property.area} sq. m</Text>
        </View>
        {!!property.bedroom_num && (
          <View style={styles.row}>
            <Text style={styles.label}>{I18n.t('single_noBedroom').capitalize()}</Text>
            <Text style={styles.text}>{property.bedroom_num}</Text>
          </View>
        )}
        {!!property.bathroom_num && (
          <View style={styles.row}>
            <Text style={styles.label}>{I18n.t('single_noBath').capitalize()}</Text>
            <Text style={styles.text}>{property.bathroom_num}</Text>
          </View>
        )}
        {!!property.garage_num && (
          <View style={styles.row}>
            <Text style={styles.label}>{I18n.t('single_noGarage').capitalize()}</Text>
            <Text style={styles.text}>{property.garage_num}</Text>
          </View>
        )}
        {!!property.garage_area && (
          <View style={styles.row}>
            <Text style={styles.label}>{I18n.t('single_AreaGarage').capitalize()}</Text>
            <Text style={styles.text}>{property.garage_area} sq. m</Text>
          </View>
        )}
        {!!property.build_year && (
          <View style={styles.row}>
            <Text style={styles.label}>{I18n.t('single_Build_on').capitalize()}</Text>
            <Text style={styles.text}>{property.build_year}</Text>
          </View>
        )}
        { !!propertyType &&
          !!propertyType.name && (
          <View style={styles.row}>
            <Text style={styles.label}>{I18n.t('single_propType').capitalize()}</Text>
            <Text style={styles.text}>{propertyType.name}</Text>
          </View>
        )}
        {!!propertyLabel &&
          propertyLabel.name && (
            <View style={styles.row}>
              <Text style={styles.label}>{I18n.t('single_propLabel').capitalize()}</Text>
              <Text style={styles.text}>{propertyLabel.name}</Text>
            </View>
          )}
        { !!propertyStatus &&
          !!propertyStatus.name && (
          <View style={styles.row}>
            <Text style={styles.label}>{I18n.t('single_propstatus').capitalize()}</Text>
            <Text style={styles.text}>{propertyStatus.name}</Text>
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
        <Text style={styles.subject}>{I18n.t('single_reqInfo').capitalize()}</Text>
        { auth.success ? <RequestInfo auth={auth} property={property} /> : <LoginCheck navigator={navigatorProp} /> }
      </View>
    </View>
  );
};

PropertyContent.propTypes = {
  property: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  navigatorProp: PropTypes.object.isRequired,
};

// export default PropertyContent;

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(PropertyContent);