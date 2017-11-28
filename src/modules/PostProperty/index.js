import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, ScrollView, Dimensions, TouchableHighlight } from 'react-native';
import * as PropertiesActions from '../../Actions/PropertiesAction';
import Location from '../../components/Location';
import PropertyTitle from '../../components/PropertyTitle';
import PropertyAgent from '../../components/PropertyAgent';
import Media from '../../components/Media';
import styles from './styles';

const { width } = Dimensions.get('window');

class PostProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPosition: 0,
      currentPage: 1,
    };
    this.ScrollNext = this.ScrollNext.bind(this);
    this.ScrollPrev = this.ScrollPrev.bind(this);
  }

  ScrollNext() {
    const { currentPosition, currentPage } = this.state;
    if (currentPosition < width * 3) {
      const newPosition = currentPosition + width;
      this.scrollView.scrollTo({ x: newPosition, y: 0, animated: true });
      this.setState({ currentPosition: newPosition, currentPage: currentPage + 1 });
    }
  }

  ScrollPrev() {
    const { currentPosition, currentPage } = this.state;
    if (currentPosition > 0) {
      const newPosition = currentPosition - width;
      this.scrollView.scrollTo({ x: newPosition, y: 0, animated: true });
      this.setState({ currentPosition: newPosition, currentPage: currentPage - 1 });
    }
  }

  render() {
    const { currentPage } = this.state;
    let pagingStyle = {};
    switch (currentPage) {
      case 1:
        pagingStyle = { justifyContent: 'flex-end' };
        break;
      case 4:
        pagingStyle = { justifyContent: 'flex-start' };
        break;
      default:
        pagingStyle = { justifyContent: 'space-between' };
        break;
    }
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ScrollView
            horizontal
            pagingEnabled
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            ref={scrollView => (this.scrollView = scrollView)}
          >
            <View style={{ width }}>
              <Location />
            </View>
            <View style={{ width }}>
              <PropertyTitle />
            </View>
            <View style={{ width }}>
              <PropertyAgent />
            </View>
            <View style={{ width }}>
              <Media />
            </View>
          </ScrollView>
        </View>

        <View style={[{ flexDirection: 'row' }, pagingStyle]}>
          {currentPage !== 1 && (
            <TouchableHighlight onPress={this.ScrollPrev} underlayColor="gray">
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#000',
                  padding: 10,
                }}
              >
                Previous
              </Text>
            </TouchableHighlight>
          )}
          {currentPage !== 4 && (
            <TouchableHighlight onPress={this.ScrollNext} underlayColor="gray">
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#000',
                  padding: 10,
                }}
              >
                Next
              </Text>
            </TouchableHighlight>
          )}
        </View>
      </View>
    );
  }
}

PostProperty.propTypes = {};

function mapStateToProps(state) {
  return {
    property: state.property,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(PropertiesActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostProperty);
