import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import PropertyCard from '../PropertyCard';

class MapDetail extends Component {
  constructor(props) {
    super(props);
    this.openPropertyDetail = this.openPropertyDetail.bind(this);
    this.closeModel = this.closeModel.bind(this);
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      this.props.navigator.toggleTabs({
        to: 'hidden',
        animated: true,
      });
    }
  }

  componentWillUnmount() {
    this.props.onDismissNotification();
    if (Platform.OS === 'android') {
      this.props.navigator.toggleTabs({
        to: 'shown',
        animated: true,
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
      <PropertyCard
        containerStyle={{ justifyContent: 'flex-end' }}
        property={property}
        onCardPress={this.openPropertyDetail}
        onLikePress={data => this.props.onLikeProperty(data)}
        fullWidth
      />
    );
  }
}

MapDetail.propTypes = {
  property: PropTypes.object.isRequired,
  onDismissNotification: PropTypes.func.isRequired,
  onLikeProperty: PropTypes.func.isRequired,
  navigator: PropTypes.object,
};

MapDetail.defaultProps = {
  navigator: {},
};

export default MapDetail;
