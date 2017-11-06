import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Dimensions,
  TouchableWithoutFeedback,
  FlatList,
  Platform,
  AsyncStorage,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import FlipCard from 'react-native-flip-card';
import I18n from './../../i18n';
import { MapHeaderText } from './../../common/commonStyle';

import * as PropertiesActions from './../../Actions/PropertiesAction';

import PropertyCard from '../../components/PropertyCard';
import MarkerImg from '../../images/highlight-pin-single-family-act.png';
import initialState from '../../reducers/initialState';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
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
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      defaultSearchLabel: '',
      selectedValue: 'Relevance',
      flip: false,
      openProperty: '',
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
    this.onErrorNotification = this.onErrorNotification.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentWillMount() {
    this.props.actions.filteredPropertiesLoad();
    this.props.actions.propertyTypesLoad();
    this.props.actions.propertyStatusLoad();
    this.props.actions.savedSearchLoad();
  }

  componentDidMount() {
    this.props.navigator.setStyle({
      navBarCustomView: 'krooqi.SearchTopBar',
      navBarComponentAlignment: 'fill',
    });

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
      },
      (error) => {
        this.onErrorNotification(error.message);
      },
      navigatorOptions,
    );
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'filter') {
        this.showFilterPage();
      }
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
    this.props.actions.filteredPropertiesLoad(search);
  }

  closeSaveSearch() {
    this.props.navigator.dismissLightBox();
  }

  openSaveSearch(isDisabled) {
    if (!isDisabled) {
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
    }
  }

  showFilterPage() {
    const { search, propertyStatus, propertyTypes } = this.props;
    this.props.navigator.showModal({
      screen: 'krooqi.FilterPage',
      title: 'Filter Page',
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
    if (this.state.openProperty !== property.ID) {
      this.props.navigator.showInAppNotification({
        screen: 'krooqi.MapDetail',
        passProps: {
          property,
          onDismissNotification: this.dismissNotification,
        },
        position: 'bottom',
        autoDismissTimerSec: 10,
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

  render() {
    let disableSaveSearch = false;
    let saved = false;
    const { filteredProperties, search, savedSearch } = this.props;
    const { flip } = this.state;
    const initSearch = JSON.stringify(initialState.search);
    const savedArray = savedSearch.success || [];
    if (initSearch === JSON.stringify(search)) {
      disableSaveSearch = true;
    }
    for (let i = 0; i < savedArray.length; i++) {
      const { searchLabel, ...savedObj } = savedArray[i];
      if (JSON.stringify(savedObj) === JSON.stringify(search)) {
        saved = true;
      }
    }
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingTop: 10,
            paddingBottom: 10,
            backgroundColor: '#F6F6F6',
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              this.dismissNotification();
              this.setState({ flip: !this.state.flip });
            }}
          >
            <View>
              <MapHeaderText>
                {flip ? I18n.t('map_results').toUpperCase() : I18n.t('list_results').toUpperCase()}
              </MapHeaderText>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.sortProperties}>
            <View>
              <MapHeaderText>{I18n.t('sort_result').toUpperCase()}</MapHeaderText>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.openSaveSearch(disableSaveSearch || saved)}>
            <View>
              <MapHeaderText disable={disableSaveSearch}>
                {saved ? 'SAVED' : 'SAVE SEARCH'}
              </MapHeaderText>
            </View>
          </TouchableWithoutFeedback>
        </View>
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
              <MapView
                provider={PROVIDER_GOOGLE}
                style={{ flex: 1 }}
                region={this.state.region}
                onPress={this.dismissNotification}
              >
                {filteredProperties.success &&
                  filteredProperties.success.map(marker => (
                    <MapView.Marker
                      key={marker.ID}
                      coordinate={{
                        latitude: parseFloat(marker.lat),
                        longitude: parseFloat(marker.lng),
                      }}
                      image={MarkerImg}
                      onPress={(e) => {
                        e.stopPropagation();
                        this.showLightBox(marker);
                      }}
                    />
                  ))}
              </MapView>
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
                  <PropertyCard property={item} onCardPress={this.pushDetail} fullWidth />
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
};

const mapStateToProps = (state) => {
  let ps = state.propertyStatus.success || [];
  const pt = state.propertyTypes.success || [];
  ps = ps.filter(item => item.term_id === 33 || item.term_id === 34 || item.term_id === 108);
  return {
    filteredProperties: state.filteredProperties,
    savedSearch: state.savedSearch,
    search: state.search,
    propertyStatus: ps,
    propertyTypes: pt,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(PropertiesActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
