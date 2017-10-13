import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions, TouchableWithoutFeedback, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import I18n from './../../i18n';
import { MapHeaderText } from './../../common/commonStyle';

import * as PropertiesActions from './../../Actions/PropertiesAction';

const { width, height } = Dimensions.get('window');
// const screenHeight = height;
// const screenWidth = width;
const aspectRation = width / height;
const latitudeDelta = 0.922;
const longitudeDelta = latitudeDelta * aspectRation;

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
      markerPosition: {
        latitude: 0,
        longitude: 0,
      },
    };
    this.watchId = null;
    this.setLocation = this.setLocation.bind(this);
  }

  componentWillMount() {
    this.props.actions.filteredPropertiesLoad();
  }

  componentDidMount() {
    this.props.navigator.setStyle({
      navBarCustomView: 'krooqi.SearchTopBar',
      navBarComponentAlignment: 'fill',
    });

    this.props.navigator.setStyle({
      tabBarHidden: true,
      topBarElevationShadowEnabled: true,
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

  setLocation(position) {
    const latitude = parseFloat(position.coords.latitude);
    const longitude = parseFloat(position.coords.longitude);

    const initialRegion = {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    };

    // this.setState({ initialPosition: initialRegion });
    // this.setState({ markerPosition: initialRegion });
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
          <TouchableWithoutFeedback onPress={this.showLightBox}>
            <View>
              <MapHeaderText>{I18n.t('list_results').toUpperCase()}</MapHeaderText>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View>
              <MapHeaderText>{I18n.t('sort_result').toUpperCase()}</MapHeaderText>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View>
              <MapHeaderText>{I18n.t('save_search').toUpperCase()}</MapHeaderText>
            </View>
          </TouchableWithoutFeedback>
        </View>

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
        <View
          style={{
            flex: 2,
            height: 100,
            width: '100%',
            backgroundColor: 'red',
            zIndex: 1000,
            position: 'absolute',
            bottom: -40,
            left: 0,
          }}
        >
          <Text>Hello</Text>
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
