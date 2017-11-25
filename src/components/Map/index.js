import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions, Platform } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      position: {
        latitude: 0,
        longitude: 0,
      },
    };
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
          position: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
      },
      (error) => {
        this.onErrorNotification(error.message);
      },
      navigatorOptions,
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          provider={PROVIDER_GOOGLE}
          region={this.state.region}
          onRegionChange={region => this.setState({ region })}
        >
          <MapView.Marker
            draggable
            coordinate={this.state.position}
            onDragEnd={e =>
              this.setState({
                position: e.nativeEvent.coordinate,
                region: { ...this.state.region, ...e.nativeEvent.coordinate },
              })}
          />
        </MapView>
      </View>
    );
  }
}

Map.propTypes = {};

export default Map;
