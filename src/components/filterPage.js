import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { View } from 'react-native';
import { backgroundColor } from './../constants/config';

class filterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: props.search,
      selectedIndex: 0,
    };
    this.handleIndexChange = this.handleIndexChange.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'close_filter_modal') {
        this.props.navigator.dismissModal({
          animationType: 'slide-down',
        });
      }
    }
  }

  handleIndexChange = (index) => {
    this.setState({
      ...this.state,
      selectedIndex: index,
    });
  };

  render() {
    return (
      <View>
        <SegmentedControlTab
          tabStyle={{ borderColor: backgroundColor }}
          activeTabStyle={{ backgroundColor }}
          tabTextStyle={{ color: backgroundColor }}
          values={['Any', '1+', '2+']}
          selectedIndex={this.state.selectedIndex}
          onTabPress={this.handleIndexChange}
        />
      </View>
    );
  }
}

filterPage.propTypes = {
  search: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
};

export default filterPage;
