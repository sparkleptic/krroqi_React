import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import RequestInfo from '../RequestInfo';

import styles from './styles';

const PropertyContent = ({ property }) => {
  const ios = Platform.OS === 'ios';
  const propertyType = property.features.find(value => value.taxonomy === 'property_type');
  const propertyLabel = property.features.find(value => value.taxonomy === 'property_label');
  const propertyStatus = property.features.find(value => value.taxonomy === 'property_status');
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
          <Text style={styles.label}>Listed On: </Text>
          <Text style={styles.text}>{moment(property.post_date).format('DD-MMM-YYYY')}</Text>
        </Text>
        {!!property.post_content && (
          <View>
            <Text style={styles.subject}>Description</Text>
            <Text style={styles.text}>{property.post_content}</Text>
          </View>
        )}
        <Text style={styles.subject}>Property Details</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Propert ID</Text>
          <Text style={styles.text}>{property.ID}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Price</Text>
          <Text style={styles.text}>{property.eprice} sar</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Total area</Text>
          <Text style={styles.text}>{property.area} sq. m</Text>
        </View>
        {!!property.bedroom_num && (
          <View style={styles.row}>
            <Text style={styles.label}>Number of bedroom</Text>
            <Text style={styles.text}>{property.bedroom_num}</Text>
          </View>
        )}
        {!!property.bathroom_num && (
          <View style={styles.row}>
            <Text style={styles.label}>Number of bathroom</Text>
            <Text style={styles.text}>{property.bathroom_num}</Text>
          </View>
        )}
        {!!property.garage_num && (
          <View style={styles.row}>
            <Text style={styles.label}>Number of garage</Text>
            <Text style={styles.text}>{property.garage_num}</Text>
          </View>
        )}
        {!!property.garage_area && (
          <View style={styles.row}>
            <Text style={styles.label}>Total garage area</Text>
            <Text style={styles.text}>{property.garage_area} sq. m</Text>
          </View>
        )}
        {!!property.build_year && (
          <View style={styles.row}>
            <Text style={styles.label}>Build on</Text>
            <Text style={styles.text}>{property.build_year}</Text>
          </View>
        )}
        {!!propertyType.name && (
          <View style={styles.row}>
            <Text style={styles.label}>Property type</Text>
            <Text style={styles.text}>{propertyType.name}</Text>
          </View>
        )}
        {!!propertyLabel &&
          propertyLabel.name && (
            <View style={styles.row}>
              <Text style={styles.label}>Property label</Text>
              <Text style={styles.text}>{propertyLabel.name}</Text>
            </View>
          )}
        {!!propertyStatus.name && (
          <View style={styles.row}>
            <Text style={styles.label}>Property status</Text>
            <Text style={styles.text}>{propertyStatus.name}</Text>
          </View>
        )}
        <View>
          <Text style={styles.subject}>Features</Text>
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
        <Text style={styles.subject}>Request Info</Text>
        <RequestInfo />
      </View>
    </View>
  );
};

PropertyContent.propTypes = {
  property: PropTypes.object.isRequired,
};

export default PropertyContent;
