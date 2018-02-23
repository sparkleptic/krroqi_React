import React from 'react';
import { View, ActivityIndicator, Text, Modal } from 'react-native';
import { backgroundColor } from '../../constants/config';
import styles from './styles';
import I18n from '../../i18n';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.toProperCase = function() {
  return this.toLowerCase().replace(/^(.)|\s(.)/g, 
    function($1) { return $1.toUpperCase(); });
}

const Loading = ({ visible }) => (
  <Modal visible={visible} transparent onRequestClose={() => null}>
    <View style={styles.container}>
      <ActivityIndicator size="large" color={backgroundColor} />
      <Text style={{ textAlign: 'center', color: backgroundColor }}>{I18n.t('loading').toProperCase()}...</Text>
    </View>
  </Modal>
);

export default Loading;
