import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, ScrollView, StyleSheet, NetInfo, FlatList } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PropertiesActions from '../../Actions/PropertiesAction';
import HomeCard from './../../components/HomeCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: '#ecf0f1',
  },
});

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
      },
    };
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentWillMount() {
    this.props.actions.propertiesLoad();
  }
  componentDidMount() {
    const dispatchConnected = isConnected => this.props.actions.checkConnection(isConnected);
    NetInfo.isConnected.fetch().then((isConnected) => {
      this.props.actions.checkConnection(isConnected);
      NetInfo.isConnected.addEventListener('connectionChange', dispatchConnected);
    });

    this.props.navigator.setStyle({
      navBarCustomView: 'krooqi.HomeTopBar',
      navBarComponentAlignment: 'fill',
    });
  }

  onRefresh() {
    this.props.actions.propertiesLoad();
  }

  render() {
    const properties = this.props.properties.success;
    let arrayData = [];
    if (properties) {
      arrayData = Object.keys(properties).map((val) => {
        const obj = {};
        obj[val] = properties[val];
        return obj;
      });
    }
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={arrayData}
          renderItem={({ item }) => <HomeCard data={item} navigator={this.props.navigator} />}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          keyExtractor={(item, index) => index}
          refreshing={this.props.properties.loading}
          onRefresh={this.onRefresh}
        />
      </View>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  properties: PropTypes.object.isRequired,
  connection: PropTypes.object.isRequired,
  navigator: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    properties: state.properties,
    connection: state.connection,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(PropertiesActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
