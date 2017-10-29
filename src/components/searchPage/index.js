import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Platform, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class searchPage extends Component {
  constructor(props) {
    super(props);
    this.searchNearby = this.searchNearby.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'cancel') {
        this.props.navigator.dismissModal({
          animationType: 'slide-down',
        });
      }
    }
  }

  searchNearby() {
    alert('search nearby');
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <TouchableOpacity onPress={this.searchNearby}>
          <View style={{ flexDirection: 'row', padding: 12 }}>
            <Icon
              name={Platform.OS === 'ios' ? 'ios-locate-outline' : 'md-locate'}
              size={30}
              color="gray"
            />
            <Text style={{ fontSize: 18, paddingLeft: 30 }}>Nearby</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

searchPage.propTypes = {
  navigator: PropTypes.object,
};

searchPage.defaultProp = {
  navigator: {},
};

export default searchPage;
