import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

class MapDetail extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      this.props.navigator.toggleTabs({
        to: 'hidden', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
        animated: true, // does the toggle have transition animation or does it happen immediately (optional)
      });
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      this.props.navigator.toggleTabs({
        to: 'shown', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
        animated: true, // does the toggle have transition animation or does it happen immediately (optional)
      });
    }
  }

  render() {
    return (
      <View
        style={{
          height: 200,
          width,
          justifyContent: 'flex-end',
          backgroundColor: 'red',
        }}
      >
        <View>
          <Text>Hello</Text>
        </View>
      </View>
    );
  }
}

MapDetail.propTypes = {};

export default MapDetail;
