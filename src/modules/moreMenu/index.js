import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

class MoreMenu extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Text>More Menu</Text>
      </View>
    );
  }
}

MoreMenu.propTypes = {};

export default MoreMenu;
