import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import PropertyCard from '../PropertyCard';
import Loading from '../Loading';
import * as PropertiesActions from '../../Actions/PropertiesAction';
import { backgroundColor, PUBLIC_URL } from '../../constants/config';
import I18n from '../../i18n';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.toProperCase = function() {
  return this.toLowerCase().replace(/^(.)|\s(.)/g, 
    function($1) { return $1.toUpperCase(); });
}

const H1 = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 10px 5px;
`;

const Divider = styled.View`
  height: 1px;
  background-color: #e3e3e3;
  margin: 5px;
`;

const ButtonText = styled.Text`
  color: ${backgroundColor};
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  padding: 5px;
`;

class HomeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
    this.pushList = this.pushList.bind(this);
    this.pushDetail = this.pushDetail.bind(this);
    this.closeModel = this.closeModel.bind(this);
    this.onLikePress = this.onLikePress.bind(this);
    this.openLogin = this.openLogin.bind(this);
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

  pushList(title, category) {
    this.props.actions.propertiesByCategoryLoad(category);
    this.props.navigator.push({
      screen: 'krooqi.PropertyList',
      title,
      passProps: {
        category,
      },
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

  render() {
    const { data, favorites, loading } = this.props;
    const key = Object.keys(data)[0];
    let title = '';
    if (key === 'sale') {
      title = `${I18n.t('h_pf_sale').toProperCase()}`;
    } else if (key === 'rent') {
      title = `${I18n.t('h_pf_rent').toProperCase()}`;
    } else if (key === 'development') {
      title = `${I18n.t('h_pf_devl').toProperCase()}`;
    } else if (key === 'featured') {
      title = `${I18n.t('h_fe_list').toProperCase()}`;
    } else {
      title = '';
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {loading && <Loading />}
        <H1>{title}</H1>
        <FlatList
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={260}
          renderItem={({ item }) => (
            <PropertyCard
              property={item}
              isFavorite={favorites.some(x => x.ID === item.ID)}
              onCardPress={this.pushDetail}
              onLikePress={this.onLikePress}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          keyExtractor={item => item.ID}
          data={data[key]}
        />
        <Divider />
        <TouchableWithoutFeedback onPress={() => this.pushList(title, key)}>
          <View>
            <ButtonText>{I18n.t('h_see_all').toProperCase()}</ButtonText>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

HomeCard.propTypes = {
  data: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  favorites: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const loading = state.like.loading || state.auth.loading || state.favorites.loading;
  const favorites = state.favorites.success || [];
  return {
    favorites,
    auth: state.auth,
    loading,
  };
};

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

export default connect(mapStateToProps, mapDispatchToProps)(HomeCard);
