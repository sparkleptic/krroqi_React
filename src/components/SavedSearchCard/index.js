import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { propertyStatuses } from '../../constants/config';
import styles from './styles';
import I18n from './../../i18n';

const SavedSearchCard = ({ item, onCardPress }) => (
  <View style={styles.container}>
    <TouchableWithoutFeedback onPress={() => onCardPress(item)}>
      <View style={styles.innerView}>
        {!!item.searchLabel && <Text style={styles.searchLabel}>{item.searchLabel}</Text>}
        <Text>
          {!!item.searchText && <Text>{`${item.searchText} `}</Text>}
          <Text>{propertyStatuses[item.propertyStatus]}</Text>
        </Text>
        {!!(item.priceRange.start || item.priceRange.end) && (
          <Text>
            <Text style={styles.label}>Price: </Text>
            <Text>
              {`${I18n.toNumber(item.priceRange.start, { precision: 0 }) || 'Any'} SAR - `}
            </Text>
            <Text>{`${I18n.toNumber(item.priceRange.end, { precision: 0 }) || 'Any'} SAR`}</Text>
          </Text>
        )}
        {!!(item.rooms !== 0 || item.baths !== 0) && (
          <Text>
            {!!item.rooms !== 0 && <Text>{`${item.rooms} Rooms`} </Text>}
            {!!item.baths !== 0 && <Text>{`${item.baths} Baths`}</Text>}
          </Text>
        )}
        {!!item.propertyType.length > 0 && (
          <Text>
            <Text style={styles.label}>Property Types: </Text>
            <Text>{item.propertyType.map(data => data.value).join(', ')}</Text>
          </Text>
        )}
        {!!(item.squareMeterRange.start || item.squareMeterRange.end) && (
          <Text>
            <Text style={styles.label}>Area: </Text>
            <Text>
              {`${I18n.toNumber(item.squareMeterRange.start, { precision: 0 }) || 'Any'} sqft - `}
            </Text>
            <Text>
              {`${I18n.toNumber(item.squareMeterRange.end, { precision: 0 }) || 'Any'} sqft`}
            </Text>
          </Text>
        )}
        {!!(item.yearBuilt.start || item.yearBuilt.end) && (
          <Text>
            <Text style={styles.label}>Built Year: </Text>
            <Text>{item.yearBuilt.start || 'Any'}</Text>
            <Text> - {item.yearBuilt.end || 'Any'}</Text>
          </Text>
        )}
        {!!item.district && (
          <Text>
            <Text style={styles.label}>District: </Text>
            <Text>{item.district}</Text>
          </Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  </View>
);

SavedSearchCard.propTypes = {
  item: PropTypes.object.isRequired,
  onCardPress: PropTypes.func.isRequired,
};

export default SavedSearchCard;
