import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, FlatList, Text, TouchableHighlight, Platform } from 'react-native';
import axios from 'axios';
import PropertyCard from '../../components/PropertyCard';
import Loading from '../../components/Loading';
import * as PropertiesActions from './../../Actions/PropertiesAction';
import { PUBLIC_URL } from '../../constants/config';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: props.auth,
      error: false,
    };
    this.onRefresh = this.onRefresh.bind(this);
    this.pushDetail = this.pushDetail.bind(this);
    this.closeModel = this.closeModel.bind(this);
    this.openLogin = this.openLogin.bind(this);
    this.onLikePress = this.onLikePress.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth && JSON.stringify(this.state.auth) !== JSON.stringify(nextProps.auth)) {
      this.setState({ auth: nextProps.auth });
    }
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabSelected' && event.selectedTabIndex === 2) {
      if (!this.state.auth.success) {
        this.openLogin();
      }
    }
  }

  onRefresh() {
    const { auth } = this.state;
    if (auth.success) {
      this.props.actions.favoritePropertiesLoad(auth.success.id);
    }
  }

  onLikePress(propertyID) {
    const { auth } = this.state;
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

  openLogin() {
    this.props.navigator.showModal({
      screen: 'krooqi.Login',
      passProps: {
        label: 'to save a home',
      },
      navigatorStyle: {
        navBarHidden: true,
        screenBackgroundColor: 'white',
      },
      animationType: 'slide-up',
    });
  }

  closeModel() {
    this.props.navigator.dismissModal({
      animationType: 'slide-down',
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
        isFavorite: true,
        closeModel: this.closeModel,
        onLikePress: this.onLikePress,
      },
    });
  }

  render() {
    const { favoriteProperties, auth, loading } = this.props;
    // const { userData } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {loading && Platform.OS === 'ios' && <Loading />}
        {auth.success ? (
          <FlatList
            data={favoriteProperties.success}
            renderItem={({ item }) => (
              <PropertyCard
                property={item}
                onCardPress={this.pushDetail}
                onLikePress={this.onLikePress}
                isFavorite
                fullWidth
              />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            keyExtractor={(item, index) => index}
            refreshing={favoriteProperties.loading}
            onRefresh={this.onRefresh}
          />
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Please Login to view your Favorite Properties</Text>
            <TouchableHighlight onPress={this.openLogin} underlayColor="#f1f1f1">
              <View
                style={{
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 4,
                  margin: 10,
                  borderColor: 'gray',
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: '400' }}>Login</Text>
              </View>
            </TouchableHighlight>
          </View>
        )}
      </View>
    );
  }
}

Favorites.propTypes = {
  navigator: PropTypes.object.isRequired,
  favoriteProperties: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const loading = state.like.loading || state.auth.loading || state.favorites.loading;
  const favorites = state.favorites.success || [];
  return {
    favoriteProperties: state.favorites,
    auth: state.auth,
    loading,
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

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
