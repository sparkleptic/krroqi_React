import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions, TouchableWithoutFeedback, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';

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

        this.props.navigator.setStyle({
            navBarCustomView: 'krooqi.SearchTopBar',
            navBarComponentAlignment: 'fill',
        });

        navigator.geolocation.getCurrentPosition((position) => {
            this.setLocation(position);
        },
            (error) => alert('geo' + JSON.stringify(error)),
            {enableHighAccuracy: false, timeout: 20000, maximumAge: 2000});

        this.watchId = navigator.geolocation.watchPosition((position) => {
            this.setLocation(position);
        },
            (error) => alert(JSON.stringify(error)));
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
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 10, paddingBottom: 10, backgroundColor: '#F6F6F6' }}>
                    <TouchableWithoutFeedback>
                        <Icon name="md-funnel" size={30} />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <Icon name="md-options" size={30} />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <Icon name="md-bookmark" size={30} />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <Icon name="md-map" size={30} />
                    </TouchableWithoutFeedback>
                </View>
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={this.state.initialRegion}
                />
            </View>
        );
    }
}

SearchPage.propTypes = {

};

export default SearchPage;  