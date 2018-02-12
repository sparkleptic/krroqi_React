import axios from 'axios';
import * as config from '../../constants/config';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AsyncStorage, View, Text, ScrollView, Dimensions, TouchableHighlight } from 'react-native';
import * as PropertiesActions from '../../Actions/PropertiesAction';
import Location from '../../components/Location';
import PropertyTitle from '../../components/PropertyTitle';
import PropertyBasicDetails from '../../components/PropertyBasicDetails';
import FeaturesAndServices from '../../components/FeaturesAndServices';
import Media from '../../components/Media';
import PropertyAgent from '../../components/PropertyAgent';
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
      successModal: false,
      featuresValuesLo: [],
      postImages: [],
    };
    this.ScrollNext = this.ScrollNext.bind(this);
    this.ScrollPrev = this.ScrollPrev.bind(this);
  }

  componentDidMount(){
    AsyncStorage.getItem('featuresValues').then((value) => {
         this.setState({
          featuresValuesLo: value
         })
     }).done();
     
    AsyncStorage.getItem('postImages').then((value) => {
         this.setState({
          postImages: value
         })
     }).done();
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
          // var screen = 1
        break;
      case 2:
          if ((propertyTitle.length > 0) && (propertyDescription.length > 0) && (ownerName.length > 0) && (ownerPhone.length > 0)) {
            this.props.updateScreen_2(false)
            var screen = 1
          }else{
            this.props.updateScreen_2(true)
            var screen = 0
          }
          // var screen = 1
        break;
      case 3:
          if ((agent.length > 0) && (agent !== 'Select Agent')) {
            this.props.updateScreen_3(false)
            var screen = 1
          }else{
            this.props.updateScreen_3(true)
            var screen = 0
          }
          // var screen = 1
        break;
      case 4:
          if ((rentPerMonth.length > 0) && (dateAvailable.length > 0)  && (dateAvailable !== 'Select Date') && (propertyType.length > 0) && (propertyType !== 'Select Type') && (rooms.length > 0) && (bathrooms.length > 0) && (meterSq.length > 0) && (yearBuild.length > 0)) {
            this.props.updateScreen_4(false)
            var screen = 1
          }else{
            this.props.updateScreen_4(true)
            var screen = 0
          }
          // var screen = 1
        break;
      case 5:
          var screen = 1
        break;
      case 6:
          if ((this.state.featuresValuesLo.length > 2)) {
            this.props.updateScreen_6(false)
            
          let dataPost = {
            lang: 'en',
            owner_id: '1',
            status : propertyFor,
            country: region,
            city: branch,
            district: district,
            real_address: address,
            lat: locationOnMap.latitude,
            lng: locationOnMap.longitude,
            post_title: propertyTitle,
            post_content: propertyDescription,
            post_name: propertyTitle,
            price: rentPerMonth,
            type: propertyType,
            bedroom_num: rooms,
            bathroom_num: bathrooms,
            area: meterSq,
            build_year: yearBuild,
            features: JSON.parse(this.state.featuresValuesLo),
            // images: JSON.parse(this.state.postImages)
          }

          axios
            .post(`${config.PUBLIC_URL}addProperty`, dataPost)
            .then((response) => {
              // alert(JSON.stringify(response.status)+' : response.data.status')
              if (response.status == '200' || response.status == 200) {                
                // alert(screen +'screen' + JSON.stringify(response.status) + ' currentPosition' + currentPosition + ' width * 7' + (width * 7) + 'currentPage '+ currentPage)
                this.setState({
                  successModal: true
                })
              }
            })
            .catch((error) => {
              alert(error)
            });

          }else{
            this.props.updateScreen_6(true)
            var screen = 0
          }
          

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
            style={styles.scrollViewParent}
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
        {
          this.state.successModal ?
         (<View style={styles.success}>            
            <View style={styles.successViewText}>
              <Text style={styles.successText}>Your listing successfully submitted. We will review and get back to you shortly.</Text>
            </View>                
          </View> ): (<View style={[{ flexDirection: 'row' }, pagingStyle]}>
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
            <TouchableHighlight onPress={this.ScrollNext} underlayColor="gray">
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
        </View>)
        }
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
