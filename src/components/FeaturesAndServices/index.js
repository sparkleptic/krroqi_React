import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CheckBox, View, Text, TextInput, KeyboardAvoidingView, Platform, Picker, ScrollView } from 'react-native';
// import { CheckBox } from 'react-native-elements'
import styles from './styles';

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

class PropertyBasicDetails extends Component {
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
  }
  featuresCheckBoxFuc = (ArrValue) => {
    let featuresTemp = this.state.features
    featuresTemp[ArrValue].checkedValue = !this.state.features[ArrValue].checkedValue
    this.setState({ features: featuresTemp })
  }
  commonFacilitiesCheckBoxFuc = (ArrValue) => {
    let commonFacilitiesTemp = this.state.commonFacilities
    commonFacilitiesTemp[ArrValue].checkedValue = !this.state.commonFacilities[ArrValue].checkedValue
    this.setState({ commonFacilities: commonFacilitiesTemp })
  }
  additionalFeaturesCheckBoxFuc = (ArrValue) => {
    let additionalFeaturesTemp = this.state.additionalFeatures
    additionalFeaturesTemp[ArrValue].checkedValue = !this.state.additionalFeatures[ArrValue].checkedValue
    this.setState({ additionalFeatures: additionalFeaturesTemp })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mainViewHead}><Text style={styles.mainViewHeadText}> Features & Services </Text></View>
        <ScrollView style={styles.flex}>
          <KeyboardAvoidingView style={styles.flex} behavior="padding">
            <View style={styles.margin}>
              <Text style={styles.optionHeading}>Views</Text>
              <View style={styles.mainDivParent}>
              {
                this.state.views.map( (dir, i) => {
                  return <View key={i} style={styles.divChild_4}>
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
                    return <View key={i} style={{ flexDirection: 'row', width: '33%' }}>
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
                    return <View key={i} style={{ flexDirection: 'row', width: '33%' }}>
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
                    return <View key={i} style={{ flexDirection: 'row', width: '33%' }}>
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

PropertyBasicDetails.propTypes = {};

export default PropertyBasicDetails;
