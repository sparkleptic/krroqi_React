import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions, Platform, TouchableWithoutFeedback } from 'react-native';
import ProgressiveImage from './ProgressiveImage';

const imagePlaceholder = require('../images/house_placeholder.png');

const { width } = Dimensions.get('window');

class MapDetail extends Component {
  constructor(props) {
    super(props);
    this.openPropertyDetail = this.openPropertyDetail.bind(this);
    this.closeModel = this.closeModel.bind(this);
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
    this.props.onDismissNotification();
    if (Platform.OS === 'android') {
      this.props.navigator.toggleTabs({
        to: 'shown', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
        animated: true, // does the toggle have transition animation or does it happen immediately (optional)
      });
    }
  }

  openPropertyDetail() {
    this.props.navigator.showModal({
      screen: 'krooqi.PropertyDetail',
      title: '',
      animated: true,
      navigatorStyle: {
        navBarHidden: true,
      },
      passProps: {
        property: this.props.property,
        closeModel: this.closeModel,
      },
    });
  }

  closeModel() {
    this.props.navigator.dismissModal({
      animationType: 'slide-down', // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
    });
  }

  render() {
    const { property } = this.props;
    return (
      <View
        style={{
          height: 250,
          width,
          justifyContent: 'flex-end',
          backgroundColor: 'white',
        }}
      >
        <TouchableWithoutFeedback onPress={this.openPropertyDetail}>
          <View style={{ flex: 1 }}>
            <ProgressiveImage
              source={{ uri: property.thumbnail }}
              thumbnail={imagePlaceholder}
              style={{ width, height: 140 }}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

MapDetail.propTypes = {
  property: PropTypes.object.isRequired,
  onDismissNotification: PropTypes.func.isRequired,
};

export default MapDetail;
