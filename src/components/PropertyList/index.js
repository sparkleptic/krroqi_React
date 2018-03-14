import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import PropertyCard from '../PropertyCard';
import Loading from '../Loading';
import * as PropertiesActions from '../../Actions/PropertiesAction';
import { PUBLIC_URL } from '../../constants/config';
import I18n from '../../i18n';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.toProperCase = function() {
  return this.toLowerCase().replace(/^(.)|\s(.)/g, 
    function($1) { return $1.toUpperCase(); });
}

class PropertyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
    this.onRefresh = this.onRefresh.bind(this);
    this.pushDetail = this.pushDetail.bind(this);
    this.closeModel = this.closeModel.bind(this);
    this.onLikePress = this.onLikePress.bind(this);
    this.openLogin = this.openLogin.bind(this);

    this.onFilter = this.onFilter.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentWillMount() {
    this.props.actions.filteredPropertiesLoad();
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'filter') {
        this.showFilterPage();
      }
    }
  }

  showFilterPage() {
    const { search, propertyStatus, propertyTypes } = this.props;
    this.props.navigator.showModal({
      screen: 'krooqi.FilterPage',
      title: `${I18n.t('filter_pg').toProperCase()}`,
      passProps: {
        search,
        propertyStatus,
        propertyTypes,
        onFilter: this.onFilter,
      },
      navigatorButtons: {
        leftButtons: [
          {
            title: 'Cancel',
            id: 'cancel',
            buttonColor: 'white',
            buttonFontSize: 14,
            buttonFontWeight: '600',
          },
        ],
      },
    });
  }

  onFilter(search) {
    this.props.actions.filteredPropertiesLoad(search);
  }

  onLikePress(propertyID) {
    const { auth } = this.props;
    if (auth.success) {
      this.props.likeLoad();
      axios
        .post(`${PUBLIC_URL}saveUserFavouriteProperty`, {
          user_id: auth.success.id,
          property_id: propertyID,
        })
        .then((response) => {
          this.props.likeSuccess(response.data);
          if (response.data && response.data.success) {
            this.props.actions.favoritePropertiesLoad(auth.success.id);
          }
        })
        .catch((error) => {
          this.props.likeError(error);
        });
    } else {
      this.openLogin();
    }
  }

  onRefresh() {
    this.props.actions.propertiesByCategoryLoad(this.props.category);
  }

  openLogin() {
    this.props.navigator.showModal({
      screen: 'krooqi.Login',
      passProps: {
        label: `${I18n.t('to_save_a_home').toProperCase()}`,
      },
      navigatorStyle: {
        navBarHidden: true,
        screenBackgroundColor: 'white',
      },
      animationType: 'slide-up',
    });
  }

  pushDetail(property) {
    const { favorites } = this.props;
    this.props.navigator.showModal({
      screen: 'krooqi.PropertyDetail',
      title: '',
      animated: true,
      navigatorStyle: {
        navBarHidden: true,
      },
      passProps: {
        property,
        isFavorite: favorites.some(x => x.ID === property.ID),
        closeModel: this.closeModel,
        onLikePress: this.onLikePress,
      },
    });
  }

  closeModel() {
    this.props.navigator.dismissModal({
      animationType: 'slide-down', // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
    });
  }

  render() {
    const { favorites, loading } = this.props;
    return (
      <View>
        {loading && <Loading />}
        <FlatList
          data={this.props.propertiesByCategory.success}
          renderItem={({ item }) => (
            <PropertyCard
              property={item}
              isFavorite={favorites.some(x => x.ID === item.ID)}
              onCardPress={this.pushDetail}
              onLikePress={this.onLikePress}
              fullWidth
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          keyExtractor={(item, index) => index}
          refreshing={this.props.propertiesByCategory.loading}
          onRefresh={this.onRefresh}
        />
      </View>
    );
  }
}

PropertyList.propTypes = {
  actions: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
  propertiesByCategory: PropTypes.object.isRequired,
  favorites: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const loading =
    state.like.loading ||
    state.auth.loading ||
    state.favorites.loading ||
    state.propertiesByCategory.loading;
    const favorites = state.favorites.success || [];
    const propertyTypes = state.propertyTypes.success || [];
    let propertyStatus = state.propertyStatus.success || [];
    propertyStatus = propertyStatus.filter(item => item.term_id === 33 || item.term_id === 34 || item.term_id === 108);

  return {
    propertiesByCategory: state.propertiesByCategory,
    auth: state.auth,
    favorites,
    loading,
    search: state.search,
    propertyStatus,
    propertyTypes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(PropertiesActions, dispatch),
    likeLoad: () => {
      dispatch(PropertiesActions.likePropertyRequest());
    },
    likeSuccess: (data) => {
      dispatch(PropertiesActions.likePropertySuccess(data));
    },
    likeError: (error) => {
      dispatch(PropertiesActions.likePropertyFail(error));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertyList);
