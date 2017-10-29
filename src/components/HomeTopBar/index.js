import React from 'react';
// import PropTypes from 'prop-types';
import { View, Image, StyleSheet } from 'react-native';

const logoImage = require('../../images/KR-Logo.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

const HomeTopBar = () => (
  <View style={styles.container}>
    <Image style={{ height: 30, width: 90 }} resizeMode="contain" source={logoImage} />
  </View>
);

HomeTopBar.propTypes = {};

export default HomeTopBar;
