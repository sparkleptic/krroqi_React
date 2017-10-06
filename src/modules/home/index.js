import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    StyleSheet,
    NetInfo
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PropertiesActions from '../../Actions/PropertiesAction';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
        backgroundColor: '#ecf0f1',
    }
});

class App extends Component {
    constructor(props) {
        super(props);
        this._handleConnectivityChange = this._handleConnectivityChange.bind(this);
    }

    componentWillMount() {
        this.props.actions.propertiesLoad();
    }

    componentDidMount() {
        NetInfo.isConnected.fetch().then().done(() => {
            NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectivityChange);
        });
    }

    _handleConnectivityChange = (isConnected) => {
        this.props.actions.checkConnection(isConnected);
   }

    render() {
        return (
            <View style={styles.container}>
            <View>
                {
                    this.props.properties.success && this.props.properties.success.sale.map(value => <Text key={value.ID}>{value.ID}</Text>)
                }
                </View>
                <View>
                {
                    this.props.connection && <Text>Connected</Text>
                }
                </View>
            </View>
        );
    }
}

App.propTypes = {
	actions: PropTypes.object.isRequired,
	properties: PropTypes.object.isRequired,
	connection: PropTypes.bool.isRequired,
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

