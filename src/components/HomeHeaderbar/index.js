import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableWithoutFeedback } from 'react-native';
import I18n from '../../i18n';
import { MapHeaderText } from '../../common/commonStyle';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.toProperCase = function() {
  return this.toLowerCase().replace(/^(.)|\s(.)/g, 
    function($1) { return $1.toUpperCase(); });
}
const HomeHeader = ({
  flip,
  disableSaveSearch,
  saved,
  sortProperties,
  openSaveSearch,
  flipView,
}) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: '#F6F6F6',
    }}
  >
    <TouchableWithoutFeedback onPress={() => flipView()}>
      <View>
        <MapHeaderText>
          {flip ? I18n.t('map_results').toUpperCase() : I18n.t('list_results').toUpperCase()}
        </MapHeaderText>
      </View>
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback onPress={() => sortProperties()}>
      <View>
        <MapHeaderText>{I18n.t('sort_result').toUpperCase()}</MapHeaderText>
      </View>
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback onPress={() => openSaveSearch(disableSaveSearch || saved)}>
      <View>
        {/* <MapHeaderText disable={disableSaveSearch}>{saved ? `${I18n.t('h_saved').toUpperCase()}` : `${I18n.t('save_search').toUpperCase()}`}</MapHeaderText> */}
        <MapHeaderText>{I18n.t('save_search').toUpperCase()}</MapHeaderText>
      </View>
    </TouchableWithoutFeedback>
  </View>
);

HomeHeader.propTypes = {
  saved: PropTypes.bool.isRequired,
  disableSaveSearch: PropTypes.bool.isRequired,
  flip: PropTypes.bool.isRequired,
  sortProperties: PropTypes.func.isRequired,
  openSaveSearch: PropTypes.func.isRequired,
  flipView: PropTypes.func.isRequired,
};

export default HomeHeader;
