import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, ScrollView, Dimensions, TouchableHighlight } from 'react-native';
import * as PropertiesActions from '../../Actions/PropertiesAction';
import Location from '../../components/Location';
import PropertyTitle from '../../components/PropertyTitle';
import PropertyBasicDetails from '../../components/PropertyBasicDetails';
import FeaturesAndServices from '../../components/FeaturesAndServices';
import PropertyAgent from '../../components/PropertyAgent';
import Media from '../../components/Media';
import styles from './styles';
import {
  updateScreen_1,
  updateScreen_2,
  updateScreen_3,
  updateScreen_4,
  updateScreen_5,
  updateScreen_6,
} from '../../Actions/propertyPostAction'

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

    const { 
      propertyFor,
      region,
      branch,
      district,
      address,
      unitFloor,
      locationOnMap,
      propertyTitle,
      propertyDescription,
      ownerName,
      ownerPhone,
      agency,
      agent,
      rentPerMonth,
      dateAvailable,
      propertyType,
      rooms,
      bathrooms,
      meterSq,
      yearBuild,
      viewR,
      featuresR,
      commonFacilitiesR,
      additionalFeaturesR,
    } = this.props.propertyPost;

    var screen = 0

    switch (currentPage) {
      case 1:
        let jsonString = JSON.stringify(locationOnMap);
        if ((propertyFor.length > 0) && (region.length > 0) && (branch.length > 0) && (district.length > 0) && (address.length > 0) && (unitFloor.length > 0) && (jsonString.length > 2)) {
          this.props.updateScreen_1(false)
          var screen = 1
        }else{
          this.props.updateScreen_1(true)
          var screen = 0
        }
        break;
      case 2:
          if ((propertyTitle.length > 0) && (propertyDescription.length > 0) && (ownerName.length > 0) && (ownerPhone.length > 0)) {
            this.props.updateScreen_2(false)
            var screen = 1
          }else{
            this.props.updateScreen_2(true)
            var screen = 0
          }
        break;
      case 3:
          if ((agency.length > 0) && (agent.length > 0)) {
            this.props.updateScreen_3(false)
            var screen = 1
          }else{
            this.props.updateScreen_3(true)
            var screen = 0
          }
        break;
      case 4:
          var screen = 1
        break;
      case 5:
          var screen = 1
        break;
      case 6:
          var screen = 1
        break;
      default:
        var screen = 0
        break;
    }

    if ((currentPosition < width * 5) && (screen == 1)) {
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
      case 7:
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
              <PropertyBasicDetails />
            </View>
            <View style={{ width }}>
              <Media />
            </View>
            <View style={{ width }}>
              <FeaturesAndServices />
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
          {currentPage !== 6 && (
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
          {currentPage === 6 && (
            <TouchableHighlight onPress={() => {alert("You Click On Save")}} underlayColor="gray">
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#000',
                  padding: 10,
                }}
              >
                Save
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
    propertyPost: state.propertyPost,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(PropertiesActions, dispatch),
    updateScreen_1: (value) => dispatch(updateScreen_1(value)),
    updateScreen_2: (value) => dispatch(updateScreen_2(value)),
    updateScreen_3: (value) => dispatch(updateScreen_3(value)),
    updateScreen_4: (value) => dispatch(updateScreen_4(value)),
    updateScreen_5: (value) => dispatch(updateScreen_5(value)),
    updateScreen_6: (value) => dispatch(updateScreen_6(value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostProperty);
