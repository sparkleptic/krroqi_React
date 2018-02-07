import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, CheckBox, View, Text, TextInput, KeyboardAvoidingView, Platform, Picker, ScrollView } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux'
import {
  updateViewR,
  updateFeaturesR,
  updateCommonFacilitiesR,
  updateAdditionalFeaturesR,
  updateScreen_6,
} from '../../Actions/propertyPostAction'

let viewsArr = [
  {
    view: 'north',
    checkedValue: false,
  },
  {
    view: 'south',
    checkedValue: false,
  },
  {
    view: 'west',
    checkedValue: false,
  },
  {
    view: 'east',
    checkedValue: false,
  },
];

let featuresArr = [
  {
    feature: 'storage',
    checkedValue: false,
  },
  {
    feature: 'garden',
    checkedValue: false,
  },
  {
    feature: 'garage',
    checkedValue: false,
  },
  {
    feature: 'elevator',
    checkedValue: false,
  },
  {
    feature: 'furnished',
    checkedValue: false,
  },
  {
    feature: 'pool',
    checkedValue: false,
  },
];

let commonFacilitiesArr = [
  {
    facility: 'gym',
    checkedValue: false,
  },
  {
    facility: 'pool',
    checkedValue: false,
  },
  {
    facility: 'recreation room',
    checkedValue: false,
  },
];

let additionalFeaturesArr = [
  {
    additional: 'hot tub',
    checkedValue: false,
  },
  {
    additional: 'flooring',
    checkedValue: false,
  },
  {
    additional: 'laundry room',
    checkedValue: false,
  },
  {
    additional: 'alarm system',
    checkedValue: false,
  },
  {
    additional: 'window glazing',
    checkedValue: false,
  },
  {
    additional: 'control access',
    checkedValue: false,
  },
];


String.prototype.toProperCase = function() {
  return this.toLowerCase().replace(/^(.)|\s(.)/g, 
      function($1) { return $1.toUpperCase(); });
}

class FeaturesAndServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      views: viewsArr,
      features: featuresArr,
      commonFacilities: commonFacilitiesArr,
      additionalFeatures: additionalFeaturesArr,
    };
  }

  viewsCheckBoxFuc = (ArrValue) => {
    let viewsTemp = this.state.views
    viewsTemp[ArrValue].checkedValue = !this.state.views[ArrValue].checkedValue
    this.setState({ views: viewsTemp })
    let TempEmpty = new Array();
    this.state.views.map((value, i) => {
      if(value.checkedValue){
        let pushValue = TempEmpty.push(value.view)
      }
    })
    this.props.updateViewR(TempEmpty)
  }
  featuresCheckBoxFuc = (ArrValue) => {
    let featuresTemp = this.state.features
    featuresTemp[ArrValue].checkedValue = !this.state.features[ArrValue].checkedValue
    this.setState({ features: featuresTemp })
    let TempEmpty = new Array();
    this.state.features.map((value, i) => {
      if(value.checkedValue){
        let pushValue = TempEmpty.push(value.feature)
      }
    })
    this.props.updateFeaturesR(TempEmpty)
  }
  commonFacilitiesCheckBoxFuc = (ArrValue) => {
    let commonFacilitiesTemp = this.state.commonFacilities
    commonFacilitiesTemp[ArrValue].checkedValue = !this.state.commonFacilities[ArrValue].checkedValue
    this.setState({ commonFacilities: commonFacilitiesTemp })
    let TempEmpty = new Array();
    this.state.commonFacilities.map((value, i) => {
      if(value.checkedValue){
        let pushValue = TempEmpty.push(value.facility)
      }
    })
    this.props.updateCommonFacilitiesR(TempEmpty)
  }
  additionalFeaturesCheckBoxFuc = (ArrValue) => {
    let additionalFeaturesTemp = this.state.additionalFeatures
    additionalFeaturesTemp[ArrValue].checkedValue = !this.state.additionalFeatures[ArrValue].checkedValue
    this.setState({ additionalFeatures: additionalFeaturesTemp })
    let TempEmpty = new Array();
    this.state.additionalFeatures.map((value, i) => {
      if(value.checkedValue){
        let pushValue = TempEmpty.push(value.additional)
      }
    })
    this.props.updateAdditionalFeaturesR(TempEmpty)
  }

  render() {
    const { viewR, featuresR, commonFacilitiesR, additionalFeaturesR, screen_6 } = this.props.propertyPost
    return (
      <View style={styles.container}>
        <View style={styles.mainViewHead}><Text style={styles.mainViewHeadText}> Features & Services </Text></View>
        <ScrollView style={styles.flex}>
          <KeyboardAvoidingView style={styles.flex} behavior="padding">
            {
              screen_6 && (
                Alert.alert(
                  'Required',
                  'Please fill all the fields',
                  [
                    {text: 'OK', onPress: () => this.props.updateScreen_6(false)},
                  ],
                  { cancelable: false }
                )
              )
            }
            <View style={styles.margin}>
              <Text style={styles.optionHeading}>Views</Text>
              <View style={styles.mainDivParent}>
              {
                this.state.views.map( (dir, i) => {
                  return <View key={i} style={styles.divChild_3}>
                    <CheckBox                       
                      value= {dir.checkedValue}
                      onValueChange= { () => this.viewsCheckBoxFuc(i)}
                    />
                    <Text style={styles.divText}>{dir.view.toProperCase()}</Text>
                  </View>
                })
              }
              </View>
            </View>
            <View style={styles.margin}>
              <Text style={styles.optionHeading}>Features</Text>
                <View style={styles.mainDivParent}>
                {
                  this.state.features.map( (dir, i) => {
                    return <View key={i} style={styles.divChild_3}>
                      <CheckBox                       
                        value= {dir.checkedValue}
                        onValueChange= { () => this.featuresCheckBoxFuc(i)}
                      />
                      <Text style={styles.divText}>{dir.feature.toProperCase()}</Text>
                    </View>
                  })
                }
              </View>
            </View>
            <View style={styles.margin}>
              <Text style={styles.optionHeading}>Comman Facilities</Text>
                <View style={styles.mainDivParent}>
                {
                  this.state.commonFacilities.map( (dir, i) => {
                    return <View key={i} style={styles.divChild_3}>
                      <CheckBox                       
                        value= {dir.checkedValue}
                        onValueChange= { () => this.commonFacilitiesCheckBoxFuc(i)}
                      />
                      <Text style={styles.divText}>{dir.facility.toProperCase()}</Text>
                    </View>
                  })
                }
              </View>
            </View>
            <View style={styles.margin}>
              <Text style={styles.optionHeading}>Additional Features</Text>
                <View style={styles.mainDivParent}>
                {
                  this.state.additionalFeatures.map( (dir, i) => {
                    return <View key={i} style={styles.divChild_3}>
                      <CheckBox                       
                        value= {dir.checkedValue}
                        onValueChange= { () => this.additionalFeaturesCheckBoxFuc(i)}
                      />
                      <Text style={styles.divText}>{dir.additional.toProperCase()}</Text>
                    </View>
                  })
                }
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

FeaturesAndServices.propTypes = {};

function mapStateToProps (state) {
  return {
    propertyPost: state.propertyPost,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updateScreen_6: (value) => dispatch(updateScreen_6(value)),
    updateViewR: (value) => dispatch(updateViewR(value)),
    updateFeaturesR: (value) => dispatch(updateFeaturesR(value)),
    updateCommonFacilitiesR: (value) => dispatch(updateCommonFacilitiesR(value)),
    updateAdditionalFeaturesR: (value) => dispatch(updateAdditionalFeaturesR(value)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeaturesAndServices)
