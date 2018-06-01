import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions, FlatList, Platform, AsyncStorage, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import axios from 'axios';

import * as PropertiesActions from './../../Actions/PropertiesAction';
import * as AuthActions from '../../Actions/AuthAction';
import * as commonActions from '../../Actions/commonActions';

import PropertyCard from '../../components/PropertyCard';
import MarkerImg from '../../images/highlight-pin-single-family-act.png';
import initialState from '../../reducers/initialState';
import { PUBLIC_URL } from '../../constants/config';
import Loading from '../../components/Loading';
import HomeHeaderbar from '../../components/HomeHeaderbar';

import I18n from '../../i18n';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.toProperCase = function() {
  return this.toLowerCase().replace(/^(.)|\s(.)/g, 
    function($1) { return $1.toUpperCase(); });
}

class FilterResultPage extends Component {
    constructor(props) {
        super(props);
    this.pushDetail = this.pushDetail.bind(this);
    this.onLikePress = this.onLikePress.bind(this);
    this.closeModel = this.closeModel.bind(this);
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

  closeModel() {
    this.props.navigator.dismissModal({
      animationType: 'slide-down', // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
    });
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

    render(){

      let disableSaveSearch = false;
      let saved = false;
      const {
        filteredProperties, search, savedSearch, favorites, loading,
      } = this.props;
      const initSearch = JSON.stringify(initialState.search);
      const savedArray = savedSearch.success || [];
      if (initSearch === JSON.stringify(search)) {
        disableSaveSearch = true;
      }
      for (let i = 0; i < savedArray.length; i += 1) {
        const { searchLabel, ...savedObj } = savedArray[i];
        if (JSON.stringify(savedObj) === JSON.stringify(search)) {
          saved = true;
        }      
      }

        return(
            <View style={{ flex:1, backgroundColor: '#fff' }}>
              {
                filteredProperties.success.length <=0 && (
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>{I18n.t('noResult').toProperCase()}</Text>
                  </View>
                )
              }
                <FlatList
                data={filteredProperties.success}
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
                refreshing={filteredProperties.loading}
                onRefresh={this.onRefresh}
              />
            </View>
        );
    }
}


const mapStateToProps = (state) => {
  const loading =
    state.like.loading ||
    state.favorites.loading ||
    state.filteredProperties.loading ||
    state.savedSearch.loading ||
    state.propertyStatus.loading ||
    state.propertyTypes.loading;
  const favorites = state.favorites.success || [];
  let propertyStatus = state.propertyStatus.success || [];
  const propertyTypes = state.propertyTypes.success || [];
  propertyStatus = propertyStatus.filter(item => item.term_id === `${I18n.t('proStatusValueRent')}` || item.term_id === `${I18n.t('proStatusValueSale')}` || item.term_id === `${I18n.t('proStatusValueFutureDev')}` || item.term_id === `${I18n.t('proStatusValueNewConst')}` || item.term_id === `${I18n.t('proStatusValueSold')}` || item.term_id === `${I18n.t('proStatusValueRented')}`);
  return {
    filteredProperties: state.filteredProperties,
    savedSearch: state.savedSearch,
    auth: state.auth,
    search: state.search,
    like: state.like,
    propertyStatus,
    propertyTypes,
    favorites,
    loading,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(PropertiesActions, dispatch),
    actionsSearch: bindActionCreators(commonActions, dispatch),
    authAction: bindActionCreators(AuthActions, dispatch),
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

export default connect(mapStateToProps, mapDispatchToProps)(FilterResultPage);