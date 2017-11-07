import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ViewPagerAndroid } from 'react-native';

class PostProperty extends Component {
  render() {
    return (
      <ViewPagerAndroid style={styles.viewPager} initialPage={0}>
        <View style={styles.pageStyle}>
          <Text>First page</Text>
        </View>
        <View style={styles.pageStyle}>
          <Text>Second page</Text>
        </View>
      </ViewPagerAndroid>
    );
  }
}

PostProperty.propTypes = {};

export default PostProperty;
