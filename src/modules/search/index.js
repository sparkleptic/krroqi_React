import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const screenHeight = height;
const screenWidth = width;
const aspectRation = width / height;
const latitudeDelta = 0.0922;
const longitudeDelta = latitudeDelta * aspectRation;

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialPosition: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0,
            },
            markerPosition: {
                latitude: 0,
                longitude: 0,
            }
        }
        this.setLocation = this.setLocation.bind(this);
    }

    watchId: ?number = null

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setLocation(position);
        },
            (error) => alert(JSON.stringify(error)),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 3000 });

        this.watchId = navigator.geolocation.watchPosition((position) => {
            this.setLocation(position);
        },
            (error) => alert(JSON.stringify(error)),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 3000 });
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    }

    setLocation(position) {
        let latitude = parseFloat(position.coords.latitude);
        let longitude = parseFloat(position.coords.longitude);

        let initialRegion = {
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta
        }

        this.setState({ initialPosition: initialRegion });
        this.setState({ markerPosition: initialRegion });
    }


    render() {
        return (
            <View>

            </View>
        );
    }
}

SearchPage.propTypes = {

};

export default SearchPage;  