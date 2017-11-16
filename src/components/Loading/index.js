import React from 'react';
import { View, ActivityIndicator, Text, Modal } from 'react-native';
import { backgroundColor } from '../../constants/config';
import styles from './styles';

const Loading = ({ visible }) => (
  <Modal visible={visible} transparent onRequestClose={() => null}>
    <View style={styles.container}>
      <ActivityIndicator size="large" color={backgroundColor} />
      <Text style={{ textAlign: 'center', color: backgroundColor }}>Loading...</Text>
    </View>
  </Modal>
);

export default Loading;
