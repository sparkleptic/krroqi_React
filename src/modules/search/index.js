import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions, FlatList, Platform, AsyncStorage, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MapView from './Cluster/src/MapContainer'
import FlipCard from 'react-native-flip-card';
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

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 23.8859;
const LONGITUDE = 45.0792;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const sortData = [
  'Relevance',
  'Newest',
  'Price(Low to High)',
  'Price(High to Low)',
  'Sq.m(Low to High)',
  'Sq.m(High to Low)',
  '# of Rooms',
];

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 25,
        longitudeDelta: 25,
      },
      defaultSearchLabel: '',
      selectedValue: 'Relevance',
      flip: false,
      openProperty: '',
      userData: null,
      error: false,
      clusterlo: [],
    };
    this.showLightBox = this.showLightBox.bind(this);
    this.sortProperties = this.sortProperties.bind(this);
    this.selectSortData = this.selectSortData.bind(this);
    this.dismissNotification = this.dismissNotification.bind(this);
    this.openSaveSearch = this.openSaveSearch.bind(this);
    this.closeSaveSearch = this.closeSaveSearch.bind(this);
    this.onSaveSearch = this.onSaveSearch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.pushDetail = this.pushDetail.bind(this);
    this.closeModel = this.closeModel.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.onLikePress = this.onLikePress.bind(this);
    this.onErrorNotification = this.onErrorNotification.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    /*
    this.props.navigator.setStyle({
      navBarCustomView: 'example.CustomTopBar',
      navBarCustomViewInitialProps: {navigator: this.props.navigator}
    });
    */
  }

  componentWillMount() {
    this.props.actions.filteredPropertiesLoad();
    this.props.actions.propertyTypesLoad();
    this.props.actions.propertyStatusLoad();
    this.props.actions.savedSearchLoad();
    this.props.authAction.checkUserExist();
  }

  componentDidMount() {
    let navigatorOptions = {};
    if (Platform.OS === 'android' && Platform.Version === 23) {
      navigatorOptions = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      };
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
        });

        let { mapSearch } = this.props;

        this.props.actionsSearch.updateSearch({
          ...mapSearch,
          searchText: 'found',
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA, 
          longitudeDelta: LONGITUDE_DELTA 
        });
      },
      (error) => {
        // this.onErrorNotification(error.message);
      },
      navigatorOptions,
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth) {
      if (
        nextProps.auth.success &&
        JSON.stringify(this.state.userData) !== JSON.stringify(nextProps.auth.success)
      ) {
        this.props.actions.favoritePropertiesLoad(nextProps.auth.success.id);
      }
      this.setState({ userData: nextProps.auth.success });
    }
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'filter') {
        this.showFilterPage();
      }
    }
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

  onSaveSearch(searchLabel) {
    const { savedSearch, search } = this.props;
    this.props.navigator.dismissLightBox();
    const newSearch = { ...search, searchLabel };
    let newSavedSearch = savedSearch.success || [];
    newSavedSearch = [...newSavedSearch, newSearch];
    AsyncStorage.setItem('savedSearch', JSON.stringify(newSavedSearch), () => {
      this.props.actions.savedSearchLoad();
    });
  }

  onRefresh() {
    this.props.actions.filteredPropertiesLoad();
  }

  onErrorNotification(error) {
    this.props.navigator.showInAppNotification({
      screen: 'krooqi.ErrorNotification',
      passProps: {
        title: 'Error',
        content: error,
      },
      dismissWithSwipe: true,
    });
  }

  onFilter(search) {
    this.props.navigator.dismissModal({
      animationType: 'slide-down', // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
    });
    this.props.navigator.push({
      screen: 'krooqi.FilterResultPage',
      title: `${I18n.t('result_filters').toProperCase()}`,
    });
    this.props.actions.filteredPropertiesLoadOnSearch(search);
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

  closeSaveSearch() {
    this.props.navigator.dismissLightBox();
  }

  openSaveSearch(isDisabled) {
    const { auth } = this.props;
    if (!isDisabled) {
      if (auth.success) {
        this.props.navigator.showLightBox({
          screen: 'krooqi.Search.SaveSearchModal',
          passProps: {
            defaultSearchLabel: this.state.defaultSearchLabel,
            onSaveSearch: this.onSaveSearch,
            onCancel: this.closeSaveSearch,
          },
          style: {
            backgroundBlur: 'dark',
          },
        });
      } else {
        this.openLogin();
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

  sortProperties() {
    this.props.navigator.showLightBox({
      screen: 'krooqi.Search.SortModal',
      passProps: {
        selectedValue: this.state.selectedValue,
        onSelect: this.selectSortData,
        sortData,
      },
      style: {
        backgroundBlur: 'dark',
        tapBackgroundToDismiss: true,
      },
    });
  }

  selectSortData(data) {
    this.props.navigator.dismissLightBox();
    this.setState({ selectedValue: data });
  }

  showLightBox(property) {
    const { favorites } = this.props;
    if (this.state.openProperty !== property.ID) {
      this.props.navigator.showInAppNotification({
        screen: 'krooqi.MapDetail',
        passProps: {
          property,
          onDismissNotification: this.dismissNotification,
          isFavorite: favorites.some(x => x.ID === property.ID),
          onLikePress: this.onLikePress,
        },
        position: 'bottom',
        autoDismissTimerSec: 100,
        dismissWithSwipe: true,
      });
      this.setState({ openProperty: property.ID });
    }
  }

  dismissNotification() {
    this.setState({ openProperty: '' });
    this.props.navigator.dismissInAppNotification();
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

  makeMarkersData(){
    const { filteredProperties } = this.props;
    
    let markers = new Array();
    
    {
      filteredProperties.success && filteredProperties.success.map(marker => {
        let data = {
          id: marker.ID,
          latitude: parseFloat(marker.lat), 
          longitude: parseFloat(marker.lng),
          price: 5000,
          currency: 'Krooqi',
          showLightBox: this.showLightBox,
          marker: marker,
        };

        markers.push(data);
      })
    }

    /*
    let markers = [
      { id: 1, currency: '€', price: 123, latitude: 21.3891, longitude: 39.8579 },
      { id: 2, currency: '$', price: 69, latitude: 55.6839255, longitude: 12.5576476 },
      { id: 3, currency: '£', price: 666, latitude: 55.6799209, longitude: 12.5800284 },
    ];
    */

    return markers;

  }

  render() {
    let disableSaveSearch = false;
    let saved = false;
    const {
      filteredProperties, search, savedSearch, favorites, loading, mapSearch
    } = this.props;
    const { flip } = this.state;
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

    return (
      <View style={{ flex: 1 }}>
        {loading && <Loading />}
        <HomeHeaderbar
          flip={flip}
          disableSaveSearch={disableSaveSearch}
          saved={saved}
          sortProperties={this.sortProperties}
          openSaveSearch={this.openSaveSearch}
          flipView={() => {
            this.dismissNotification();
            this.setState({ flip: !this.state.flip });
          }}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F5FCFF',
          }}
        >
          <FlipCard
            flip={this.state.flip}
            friction={8}
            perspective={1000}
            flipHorizontal
            flipVertical={false}
            clickable={false}
            useNativeDriver
            style={{
              width,
              borderWidth: 0,
            }}
          >
           
            <View
              style={{
                flex: 1,
              }}
            >
              <MapView regionGPS={mapSearch} data={this.makeMarkersData()} dismissNotification={this.dismissNotification} />
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
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
          </FlipCard>
        </View>
      </View>
    );
  }
}

SearchPage.propTypes = {
  navigator: PropTypes.object.isRequired,
  filteredProperties: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
  propertyStatus: PropTypes.array.isRequired,
  propertyTypes: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  savedSearch: PropTypes.object.isRequired,
  authAction: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  favorites: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  likeLoad: PropTypes.func.isRequired,
  likeSuccess: PropTypes.func.isRequired,
  likeError: PropTypes.func.isRequired,
};

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
  propertyStatus = propertyStatus.filter(item => item.term_id === 33 || item.term_id === 34 || item.term_id === 108);
  return {
    filteredProperties: state.filteredProperties,
    savedSearch: state.savedSearch,
    auth: state.auth,
    search: state.search,
    mapSearch: state.mapSearch,
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);