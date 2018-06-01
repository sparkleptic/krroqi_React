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

let string1 = "/advanced-search/?keyword=&property_id=";

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
      savedPara: false,
      disableSaveSearchPara: true,
      clusterlo: [],
      apiRegion: [],
      apiCity: [],
      searchDataBlank: {
      "propertyStatus": `${I18n.t('proStatusValueRent')}`,
      "priceRange": {
        "start": "",
        "end": ""
      },
      "propertyType": [],
      "rooms": 0,
      "baths": 0,
      "squareMeterRange": {
        "start": "",
        "end": ""
      },
      "yearBuilt": {
        "start": "",
        "end": ""
      },
      "district": "",
      "region": ""
    },
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
    
    AsyncStorage.getItem('lang').then((value) => {

      let lang = 'en';
      if(value == null){
        lang = 'en';
      }else{
        lang = value;
      }

      axios
        .get(`${PUBLIC_URL}getRegions/${lang}`)
        .then((response) => {
          this.setState({ apiRegion: response.data })
          // alert(JSON.stringify(response));
        })
        .catch((error) => {
          // do nothing
        });

      axios
        .get(`${PUBLIC_URL}getCities/${lang}`)
        .then((response) => {
          this.setState({ apiCity: response.data })
        })
        .catch((error) => {
          // do nothing
        });

      }).done();
      AsyncStorage.getItem('searchParaKrooqi').then((value) => {
        if(value == null){
          // do nothing
        }else{
          this.setState({ search: JSON.parse(value) })
        }        
      }).done();
  

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
        let { mapSearch } = this.props;
        this.props.actionsSearch.updateSearch({
          ...mapSearch,
          searchText: 'notFound',
          latitude: 23.8859,
          longitude: 45.0792,
          latitudeDelta: 25,
          longitudeDelta: 25,
        });
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
    // this.props.navigator.push({
    //   screen: 'krooqi.FilterResultPage',
    //   title: `${I18n.t('result_filters').toProperCase()}`,
    // });
    let { mapSearch } = this.props;
    this.props.actionsSearch.updateSearch({
      ...mapSearch,
      searchText: 'notFound',
      latitude: 23.8859,
      longitude: 45.0792,
      latitudeDelta: 25,
      longitudeDelta: 25,
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
    // if (!isDisabled) {
      if (auth.success) {
        this._saveSearch();
      } else {
        this.openLogin();
      }
    // }
  }

  showFilterPage() {
    const { propertyStatus, propertyTypes } = this.props;
    const { searchDataBlank } = this.state;
    this.props.navigator.showModal({
      screen: 'krooqi.FilterPage',
      title: `${I18n.t('filter_pg').toProperCase()}`,
      passProps: {
        search: searchDataBlank,
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
    this.setState({ selectedValue: data, savedPara: false, disableSaveSearchPara: false });

    var sentDataApi = {
      sortBy: 'Relevance',
      sortOrder: 'DESC',
    }

    if (data === 'Relevance') {
      sentDataApi = {
        sortBy: 'Relevance',
        sortOrder: 'DESC',
      }
    }
    if (data === 'Newest') {
      sentDataApi = {
        sortBy: 'newest',
        sortOrder: 'DESC',
      }
    }
    if (data === 'Price(Low to High)') {
      sentDataApi = {
        sortBy: 'price',
        sortOrder: 'ASC',
      }
    }
    if (data === 'Price(High to Low)') {
      sentDataApi = {
        sortBy: 'price',
        sortOrder: 'DESC',
      }
    }
    if (data === 'Sq.m(Low to High)') {
      sentDataApi = {
        sortBy: 'area',
        sortOrder: 'ASC',
      }
    }
    if (data === 'Sq.m(High to Low)') {
      sentDataApi = {
        sortBy: 'area',
        sortOrder: 'DESC',
      }
    }
    if (data === '# of Rooms') {
      sentDataApi = {
        sortBy: 'rooms',
        sortOrder: 'DESC',
      }
    }
    this.props.actions.filteredPropertiesLoad(sentDataApi);
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

  _saveSearch = () => {
    const { auth, mapSearch } = this.props;
    const { searchDataBlank, } = this.state;  

    let convObj = searchDataBlank;

    mapSearch.searchText !== undefined && 
    mapSearch.searchText !== null && 
    mapSearch.searchText !== "" && 
    mapSearch.searchText !== "found" && 
    mapSearch.searchText !== "notFound" && 
    (
      convObj = {...searchDataBlank, district: mapSearch.searchText}
    )
    
    this._convertIntoString(convObj);

    let dataSent = {
      "user_id": auth.success.id,
      "search_arg": "from_mobile",
      "email": auth.success.email,
      "search_url": string1
    } 

    this.setState({ disableSaveSearchPara: false, savedPara: true });
    string1 = "/advanced-search/?keyword=&property_id=";
    
    axios
      .post(`${PUBLIC_URL}addSearch`, dataSent)
      .then((response) => {
        if (response.data.status) {
          this.setState({ disableSaveSearchPara: false, savedPara: true });
          this.authsuccessFunction(auth);
          alert(`${I18n.t('AddedToSavedSearch').toProperCase()}`)
        }
        string1 = "/advanced-search/?keyword=&property_id=";
      })
      .catch((error) => {
        console.log(error);        
        string1 = "/advanced-search/?keyword=&property_id=";
      });    
  }

  _convertIntoString = (object1) => {
    for (let key1 in object1) {

      if((typeof object1[key1] === "object") && (key1 === "propertyType")) {
          let finalpara = "type";
          let value = "";
          if(object1[key1][0]){
            value = object1[key1][0].value.toLowerCase();
          }
          string1 = string1 + `&${finalpara}=${value}`;
      }
      
      if((typeof object1[key1] === "object") && (key1 !== "propertyType")) {
        let object2 = object1[key1];
          let parameterPass = "";
          let areaAdditional = "";
          if (key1 === "priceRange") {
            parameterPass = "price";
          }
          if (key1 === "squareMeterRange") {
            parameterPass = "area";
          }
          if (key1 === "yearBuilt") {
            parameterPass = "yrbuilt";
          }
        for (let key2 in object2) {
            let innerparaPass = "";
            if (key2 === "start") {
                innerparaPass = "min";
            }
            if (key2 === "end") {
                innerparaPass = "max";
            }
            if (parameterPass === "area") {
              if (object2[key2] !== "") {
                areaAdditional = "+Sq+m";            
              }
            }
            let finalpara = innerparaPass + "-" + parameterPass;
            string1 = string1 + `&${finalpara}=${object2[key2]}${areaAdditional}`;          
          }
      }
      
      if(typeof object1[key1] === "number") {
          if(key1 === "propertyStatus"){
            let finalpara = "status";
              let value = "";
              if(object1[key1] === `${I18n.t('proStatusValueRent')}`) {
                value = `${I18n.t('proStatusNameRent')}`;
              }
              if(object1[key1] === `${I18n.t('proStatusValueSale')}`) {
                value = `${I18n.t('proStatusNameSale')}`;
              }
              if(object1[key1] === `${I18n.t('proStatusValueFutureDev')}`) {
                value = `${I18n.t('proStatusNameFutureDev')}`;
              }
              if(object1[key1] === `${I18n.t('proStatusValueNewConst')}`) {
                value = `${I18n.t('proStatusNameNewConst')}`;
              }
              if(object1[key1] === `${I18n.t('proStatusValueSold')}`) {
                value = `${I18n.t('proStatusNameSold')}`;
              }
              if(object1[key1] === `${I18n.t('proStatusValueRented')}`) {
                value = `${I18n.t('proStatusNameRented')}`;
              }
              string1 = string1 + `&${finalpara}=${value}`;
          }
        
          if(key1 !== "propertyStatus"){
            let finalpara = "";
            let value = "";
            if(key1 === "rooms") {
              finalpara = "bedrooms";
            }
            if(key1 === "baths") {
              finalpara = "bathrooms";
            }
            if (object1[key1] !== 0) {
              value = object1[key1];
            }
              string1 = string1 + `&${finalpara}=${value}`;
          }
      }
      
      if(typeof object1[key1] === "string") {
          let finalpara = "";
          let value = "";
          if(key1 === "district") {
            finalpara = "location";
            value = object1[key1].replace(/\s+/g, '-').toLowerCase();
          }
          if(key1 === "region") {
            finalpara = "state";
            value = object1[key1].replace(/\s+/g, '-').toLowerCase();
          }
          if(key1 === "rooms") {
            finalpara = "bedrooms";
          }
          if(key1 === "baths") {
            finalpara = "bathrooms";
          }
            string1 = string1 + `&${finalpara}=${value}`;
      }
    }
  }

  authsuccessFunction = (auth) => {
    if (auth.success) {
    axios
      .post(`${PUBLIC_URL}getSearch`, { "user_id": auth.success.id })
      .then((response) => {       
        this.creatingObjFromUrl(response.data);
      })
      .catch((error) => {
        console.log(error)
      });
    }
  }

  creatingObjFromUrl = (urlArr) => {

    let tempStoreUrlArr = [];  
    
    urlArr.map((dataUrl, index) => {
      
      let data = dataUrl.url;
      
      let propertyStatus = `${I18n.t('proStatusValueRent')}`,
        priceRangeStart = "",
        priceRangeEnd = "", 
        rooms = "", 
        baths = "", 
        squareMeterRangeStart = "", 
        squareMeterRangeEnd = "", 
        yearBuiltStart = "", 
        yearBuilttEnd = "", 
        district = "", 
        region = "", 
        propertyTypeKey = "", 
        propertyTypeValue = "";
      let propertyTypeArr = [];
      
      priceRangeStart = this.getQueryString('min-price', data);
      priceRangeEnd = this.getQueryString('max-price', data);
      rooms = this.getQueryString('bedrooms', data);
      baths = this.getQueryString('bathrooms', data);
      squareMeterRangeStart = this.getQueryString('min-area', data);
      squareMeterRangeEnd = this.getQueryString('max-area', data);
      yearBuiltStart = this.getQueryString('min-yrbuilt', data);
      yearBuilttEnd = this.getQueryString('max-yrbuilt', data);
      district = this._getDistrict(this.getQueryString('state', data));
      region = this._getRegion(this.getQueryString('location', data));

      let statusForPro = this.getQueryString('status', data);
      let typeProLocal = this.getQueryString('type', data);     

      propertyTypeValue = typeProLocal.toProperCase();      

      if(statusForPro === `${I18n.t('proStatusNameRent')}`) {
          propertyStatus = `${I18n.t('proStatusValueRent')}`;
      }
      if(statusForPro === `${I18n.t('proStatusNameSale')}`) {
          propertyStatus = `${I18n.t('proStatusValueSale')}`;
      }
      if(statusForPro === `${I18n.t('proStatusNameFutureDev')}`) {
          propertyStatus = `${I18n.t('proStatusValueFutureDev')}`;
      }
      if(statusForPro === `${I18n.t('proStatusNameNewConst')}`) {
          propertyStatus = `${I18n.t('proStatusValueNewConst')}`;
      }
      if(statusForPro === `${I18n.t('proStatusNameSold')}`) {
          propertyStatus = `${I18n.t('proStatusValueSold')}`;
      }
      if(statusForPro === `${I18n.t('proStatusNameRented')}`) {
          propertyStatus = `${I18n.t('proStatusValueRented')}`;
      }

      if(typeProLocal === `${I18n.t('proTypeNameApartment')}`) {
          propertyTypeKey = `${I18n.t('proTypeValueApartment')}`;
      }
      if(typeProLocal === `${I18n.t('proTypeNameBuilding')}`) {
          propertyTypeKey = `${I18n.t('proTypeValueBuilding')}`;
      }
      if(typeProLocal === `${I18n.t('proTypeNameOffice')}`) {
          propertyTypeKey = `${I18n.t('proTypeValueOffice')}`;
      }
      if(typeProLocal === `${I18n.t('proTypeNameShowroom')}`) {
          propertyTypeKey = `${I18n.t('proTypeValueShowroom')}`;
      }
      if(typeProLocal === `${I18n.t('proTypeNameVilla')}`) {
          propertyTypeKey = `${I18n.t('proTypeValueVilla')}`;
      }

      if (propertyTypeKey !== "" && propertyTypeValue !== "") {
        propertyTypeArr = [{"key": propertyTypeKey, "value": propertyTypeValue}];        
      }

      let objectPush = {
        "propertyStatus": propertyStatus,
        "priceRange": {
          "start": priceRangeStart,
          "end": priceRangeEnd
        },
        "propertyType": propertyTypeArr,
        "rooms": rooms,
        "baths": baths,
        "squareMeterRange": {
          "start": squareMeterRangeStart.replace('+Sq+m',''),
          "end": squareMeterRangeEnd.replace('+Sq+m','')
        },
        "yearBuilt": {
          "start": yearBuiltStart,
          "end": yearBuilttEnd
        },
        "district": district.replace(/-/g,' ').toProperCase(),
        "region": region.replace(/-/g,' ').toProperCase()
      };

      tempStoreUrlArr.push(objectPush);

    })

    this.props.actionsSearch.updateSaveSearch(tempStoreUrlArr);
    // console.log("JSON.stringify(tempStoreUrlArr)");
    // console.log(JSON.stringify(tempStoreUrlArr));
  }

  getQueryString = ( field, url ) => {
    let href = url;
    let reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
    let string = reg.exec(href);
    // return string ? string[1] : null;
    return string ? (string[1]  === undefined || string[1]  === null || string[1]  === "" ? "" : string[1] ) : "";
  };

  _getDistrict = (slug) => {
    const { apiCity } = this.state;
    for (let index = 0; index < apiCity.length; index++) {
      if (slug === apiCity[index].slug) {
        return apiCity[index].name;
      }
    }
      return slug;
  }

  _getRegion = (slug) => {
    const { apiRegion } = this.state;
    for (let index = 0; index < apiRegion.length; index++) {
      if (slug === apiRegion[index].slug) {
        return apiRegion[index].name;
      }
    }
      return slug;
  }

  render() {
    let disableSaveSearch = false;
    let saved = false;
    const {
      filteredProperties, search, savedSearch, favorites, loading, mapSearch
    } = this.props;
    const { flip, disableSaveSearchPara, savedPara } = this.state;
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
          disableSaveSearch={disableSaveSearchPara}
          saved={savedPara}
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
            {
              filteredProperties.success.length < 1 && (
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
  propertyStatus = propertyStatus.filter(item => item.term_id === `${I18n.t('proStatusValueRent')}` || item.term_id === `${I18n.t('proStatusValueSale')}` || item.term_id === `${I18n.t('proStatusValueFutureDev')}` || item.term_id === `${I18n.t('proStatusValueNewConst')}` || item.term_id === `${I18n.t('proStatusValueSold')}` || item.term_id === `${I18n.t('proStatusValueRented')}`);
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