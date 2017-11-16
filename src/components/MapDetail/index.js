import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
    const { isFavorite, onLikePress, property } = this.props;
    this.props.navigator.showModal({
      screen: 'krooqi.PropertyDetail',
      title: '',
      animated: true,
      navigatorStyle: {
        navBarHidden: true,
      },
      passProps: {
        isFavorite,
        property,
        closeModel: this.closeModel,
        onLikePress,
      },
    });
  }

  closeModel() {
    this.props.navigator.dismissModal({
      animationType: 'slide-down', // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
    });
  }

  render() {
    const { property, favorites, onLikePress } = this.props;
    return (
      <PropertyCard
        containerStyle={{ justifyContent: 'flex-end' }}
        property={property}
        isFavorite={favorites.some(x => x.ID === property.ID)}
        onCardPress={this.openPropertyDetail}
        onLikePress={id => onLikePress(id)}
        fullWidth
      />
    );
  }
}

MapDetail.propTypes = {
  property: PropTypes.object.isRequired,
  favorites: PropTypes.array.isRequired,
  onDismissNotification: PropTypes.func.isRequired,
  navigator: PropTypes.object,
  onLikePress: PropTypes.func.isRequired,
};

MapDetail.defaultProps = {
  navigator: {},
};

function mapStateToProps(state) {
  const favorites = state.favorites.success || [];
  return {
    favorites,
  };
}

export default connect(mapStateToProps)(MapDetail);
