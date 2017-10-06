import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    StyleSheet,
    NetInfo,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PropertiesActions from '../../Actions/PropertiesAction';
import HList from './../../components/List';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
        backgroundColor: '#ecf0f1',
    }
});

const screenHeight = height;
const screenWidth = width;
const aspectRation = width / height;
const latitudeDelta = 0.0922;
const longitudeDelta = latitudeDelta * aspectRation;

class App extends Component {
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

    componentWillMount() {
        this.props.actions.propertiesLoad();
    }
    componentDidMount() {
        const dispatchConnected = isConnected => this.props.actions.checkConnection(isConnected);
        NetInfo.isConnected.fetch().then(isConnected => {
            this.props.actions.checkConnection(isConnected);
            NetInfo.isConnected.addEventListener('connectionChange', dispatchConnected);
        });

        // navigator.geolocation.getCurrentPosition((position) => {
        //     this.setLocation(position);
        // },
        //     (error) => alert(JSON.stringify(error)),
        //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 3000 });

        // this.watchId = navigator.geolocation.watchPosition((position) => {
        //     this.setLocation(position);
        // },
        //     (error) => alert(JSON.stringify(error)),
        //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 3000 });
    }

    // componentWillUnmount() {
    //     navigator.geolocation.clearWatch(this.watchId);
    // }

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
                {this.props.properties.loading ?
                    <ActivityIndicator size="large" color="red" /> :
                    <View>
                        {this.props.properties.success &&
                            <HList title="Sale" data={this.props.properties.success.sale} />
                        }
                    </View>
                }
            </View>
        );
    }
}

App.propTypes = {
    actions: PropTypes.object.isRequired,
    properties: PropTypes.object.isRequired,
    connection: PropTypes.object.isRequired,
    navigator: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        properties: state.properties,
        connection: state.connection
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(PropertiesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

