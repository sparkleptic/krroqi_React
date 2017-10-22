import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

class searchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'cancel') {
        this.props.navigator.dismissModal({
          animationType: 'slide-down',
        });
      }
      if (event.id === 'search') {
        this.props.navigator.dismissModal({
          animationType: 'slide-down',
        });
      }
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Near Me</Text>
        <Text>{this.state.search}</Text>
      </View>
    );
  }
}

// searchPage.propTypes = {
//   search: PropTypes.object.isRequired,
// };

export default searchPage;
