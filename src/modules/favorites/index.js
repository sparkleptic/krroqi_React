import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import PropertyCard from '../../components/PropertyCard';
import * as PropertiesActions from './../../Actions/PropertiesAction';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.pushDetail = this.pushDetail.bind(this);
    this.closeModel = this.closeModel.bind(this);
  }

  componentWillMount() {
    this.props.actions.filteredPropertiesLoad();
  }

  onRefresh() {
    this.props.actions.filteredPropertiesLoad();
  }

  closeModel() {
    this.props.navigator.dismissModal({
      animationType: 'slide-down', // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
    });
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

  render() {
    const { favoriteProperties } = this.props;
    return (
      <FlatList
        data={favoriteProperties.success}
        renderItem={({ item }) => (
          <PropertyCard property={item} onCardPress={this.pushDetail} fullWidth />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        keyExtractor={(item, index) => index}
        refreshing={favoriteProperties.loading}
        onRefresh={this.onRefresh}
      />
    );
  }
}

Favorites.propTypes = {
  navigator: PropTypes.object.isRequired,
  favoriteProperties: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  favoriteProperties: state.filteredProperties,
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(PropertiesActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
