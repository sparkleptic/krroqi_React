import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions, TouchableWithoutFeedback, Text, FlatList } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import FlipCard from 'react-native-flip-card';
import I18n from './../../i18n';
import { MapHeaderText } from './../../common/commonStyle';

import * as PropertiesActions from './../../Actions/PropertiesAction';

import PropertyCard from '../../components/PropertyCard';
import PriceMarker from '../../components/PriceMarker';

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
      error: '',
      search: {},
      defaultSearchLabel: 'yagnesh',
      selectedValue: 'Relevance',
      flip: false,
    };
    this.showLightBox = this.showLightBox.bind(this);
    this.sortProperties = this.sortProperties.bind(this);
    this.selectSortData = this.selectSortData.bind(this);
    this.dismissNotifiction = this.dismissNotifiction.bind(this);
    this.openSaveSearch = this.openSaveSearch.bind(this);
    this.closeSaveSearch = this.closeSaveSearch.bind(this);
    this.onSaveSearch = this.onSaveSearch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.pushDetail = this.pushDetail.bind(this);
    this.closeModel = this.closeModel.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentWillMount() {
    this.props.actions.filteredPropertiesLoad();
  }

  componentDidMount() {
    this.props.navigator.setStyle({
      navBarCustomView: 'krooqi.SearchTopBar',
      navBarComponentAlignment: 'fill',
    });

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
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'filter') {
        this.showFilterPage();
      }
    }
  }

  onSaveSearch(data) {
    this.props.navigator.dismissLightBox();
    this.setState({ defaultSearchLabel: data });
  }

  onRefresh() {
    this.props.actions.filteredPropertiesLoad();
  }

  closeSaveSearch() {
    this.props.navigator.dismissLightBox();
  }

  openSaveSearch() {
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

  showFilterPage() {
    this.props.navigator.showModal({
      screen: 'krooqi.FilterPage',
      title: 'Filter Page',
      passProps: {
        search: this.state.search,
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

  showLightBox() {
    this.props.navigator.showInAppNotification({
      screen: 'krooqi.MapDetail',
      passProps: {},
      position: 'bottom',
      autoDismissTimerSec: 10,
      dismissWithSwipe: true,
    });
  }

  dismissNotifiction() {
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
    const { filteredProperties } = this.props;
    const { flip } = this.state;
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
          <TouchableWithoutFeedback onPress={this.openSaveSearch}>
            <View>
              <MapHeaderText>{I18n.t('save_search').toUpperCase()}</MapHeaderText>
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
                onRegionChange={region => this.setState({ region })}
                onRegionChangeComplete={region => this.setState({ region })}
                onPress={this.dismissNotifiction}
              >
                {filteredProperties.success &&
                  filteredProperties.success.map(marker => (
                    <MapView.Marker
                      key={marker.ID}
                      coordinate={{
                        latitude: parseFloat(marker.lat),
                        longitude: parseFloat(marker.lng),
                      }}
                      onPress={this.showLightBox}
                    >
                      <PriceMarker amount={parseInt(marker.eprice, 10)} />
                    </MapView.Marker>
                  ))}
              </MapView>
              {/* <MapView style={{ flex: 1 }} region={this.state.initialPosition}>
                {filteredProperties.success &&
                  filteredProperties.success.map(marker => (
                    <MapView.Marker
                      key={marker.ID}
                      coordinate={{
                        latitude: parseFloat(marker.lat),
                        longitude: parseFloat(marker.lng),
                      }}
                      title={marker.post_title}
                      description={marker.post_content}
                    >
                      <Text
                        style={{
                          fontWeight: 'bold',
                        }}
                      >
                        X
                      </Text>
                    </MapView.Marker>
                  ))}
              </MapView> */}
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
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  filteredProperties: state.filteredProperties,
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(PropertiesActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
