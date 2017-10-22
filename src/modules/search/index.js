import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions, TouchableWithoutFeedback, Text, Modal } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import FlipCard from 'react-native-flip-card';
import I18n from './../../i18n';
import { MapHeaderText } from './../../common/commonStyle';

import * as PropertiesActions from './../../Actions/PropertiesAction';

import SaveSearchModal from '../../components/saveSearchModal';

const { width, height } = Dimensions.get('window');
const aspectRation = width / height;
const latitudeDelta = 0.922;
const longitudeDelta = latitudeDelta * aspectRation;

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
      initialPosition: {
        latitude: 28.3994993,
        longitude: 36.57154549999996,
        latitudeDelta,
        longitudeDelta,
      },
      search: {},
      defaultSearchLabel: 'yagnesh',
      selectedValue: 'Relevance',
      modalVisible: false,
      flip: false,
    };
    this.watchId = null;
    this.setLocation = this.setLocation.bind(this);
    this.showLightBox = this.showLightBox.bind(this);
    this.sortProperties = this.sortProperties.bind(this);
    this.selectSortData = this.selectSortData.bind(this);
    this.dismissNotifiction = this.dismissNotifiction.bind(this);
    this.openSaveSearch = this.openSaveSearch.bind(this);
    this.closeSaveSearch = this.closeSaveSearch.bind(this);
    this.onSaveSearch = this.onSaveSearch.bind(this);
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
        this.setLocation(position);
      },
      error => alert(`geo${JSON.stringify(error)}`),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 2000 },
    );

    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setLocation(position);
      },
      error => alert(JSON.stringify(error)),
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'filter') {
        this.showFilterPage();
      }
    }
  }

  onSaveSearch(data) {
    this.setState({ defaultSearchLabel: data, modalVisible: false });
  }

  setLocation(position) {
    const latitude = parseFloat(position.coords.latitude);
    const longitude = parseFloat(position.coords.longitude);

    const initialRegion = {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    };

    this.setState({ initialPosition: initialRegion });
  }

  closeSaveSearch() {
    this.setState({ modalVisible: false });
  }

  openSaveSearch() {
    this.setState({ modalVisible: true });
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
        rightButtons: [
          {
            title: 'Apply',
            id: 'apply',
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

  render() {
    const { filteredProperties } = this.props;
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
              <MapHeaderText>{I18n.t('list_results').toUpperCase()}</MapHeaderText>
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
              <MapView style={{ flex: 1 }} region={this.state.initialPosition}>
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
              </MapView>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: '#f1c40f',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text>The Back</Text>
            </View>
          </FlipCard>
        </View>

        <Modal
          animationType="slide"
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => null}
        >
          <SaveSearchModal
            defaultSearchLabel={this.state.defaultSearchLabel}
            onSaveSearch={this.onSaveSearch}
            onCancel={this.closeSaveSearch}
          />
        </Modal>
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
