import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropertyCard from '../PropertyCard';
import * as PropertiesActions from '../../Actions/PropertiesAction';

class PropertyList extends Component {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.pushDetail = this.pushDetail.bind(this);
    this.closeModel = this.closeModel.bind(this);
    this.likeProperty = this.likeProperty.bind(this);
  }

  onRefresh() {
    this.props.actions.propertiesByCategoryLoad(this.props.category);
  }

  pushDetail(property) {
    this.props.navigator.showModal({
      screen: 'krooqi.PropertyDetail',
      title: '',
      animated: true,
      navigatorStyle: {
        navBarHidden: true,
      },
      passProps: {
        property,
        closeModel: this.closeModel,
      },
    });
  }

  closeModel() {
    this.props.navigator.dismissModal({
      animationType: 'slide-down', // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
    });
  }

  likeProperty(property) {
    alert(property.ID);
  }

  render() {
    return (
      <FlatList
        data={this.props.propertiesByCategory.success}
        renderItem={({ item }) => (
          <PropertyCard
            property={item}
            onCardPress={this.pushDetail}
            onLikePress={this.likeProperty}
            fullWidth
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        keyExtractor={(item, index) => index}
        refreshing={this.props.propertiesByCategory.loading}
        onRefresh={this.onRefresh}
      />
    );
  }
}

PropertyList.propTypes = {
  actions: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
  propertiesByCategory: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    propertiesByCategory: state.propertiesByCategory,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(PropertiesActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertyList);
