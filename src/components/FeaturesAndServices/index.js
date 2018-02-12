import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage, TouchableOpacity, Alert, CheckBox, View, Text, TextInput, KeyboardAvoidingView, Platform, Picker, ScrollView } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux'
import {
  updateFeaturesServices,
  updateFeaturesData,
  updateScreen_6,
} from '../../Actions/propertyPostAction'
import { loadFeatures } from '../../Actions/FeaturesGet'
 
String.prototype.toProperCase = function() {
  return this.toLowerCase().replace(/^(.)|\s(.)/g, 
    function($1) { return $1.toUpperCase(); });
}

class FeaturesAndServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      featureArray: [],
    };
  }

  componentWillMount() {
    this.props.loadFeatures();
  }

  featureServicesFuc = (ArrValue) => {
    const { features_data } = this.props.propertyPost

    // alert('ArrValue : '+ArrValue +'features_data : '+features_data)

    // let viewsTemp = this.state.featureArray
    // viewsTemp[ArrValue].isChecked = !this.state.featureArray[ArrValue].isChecked
    // this.setState({ featureArray: viewsTemp })
    // let TempEmpty = new Array();
    // this.state.featureArray.map((value, i) => {
    //   if(value.isChecked){
    //     let pushValue = TempEmpty.push(value.term_id)
    //   }
    // })

    let viewsTemp = new Array();
    viewsTemp = features_data
    viewsTemp[ArrValue].isChecked = !viewsTemp[ArrValue].isChecked
    this.setState({ featureArray: viewsTemp })
    let TempEmpty = new Array();
    viewsTemp.map((value, i) => {
      if(value.isChecked){
        let pushValue = TempEmpty.push(value.term_id)
      }
    })
    // AsyncStorage.setItem('featuresValues', JSON.stringify(TempEmpty));
    AsyncStorage.setItem('featuresValues', JSON.stringify(TempEmpty));
   
    // this.props.updateFeaturesData(viewsTemp)
    //this.props.updateFeaturesServices(TempEmpty)
  }

  render() {
    const { screen_6, features_data, features_services} = this.props.propertyPost
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
              <View style={styles.mainDivParent}>
              {
                features_data.map((dir, i) => {
                  let value = dir.term_id
                  let keyValue = i
                return <View key={i} style={styles.divChild_3}>
                  <CheckBox
                    value= {dir.isChecked}
                    onValueChange= { () => this.featureServicesFuc(keyValue)}
                  />
                  <Text style={styles.divText}>{dir.name.toProperCase()}</Text>
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
    loadFeatures: () => dispatch(loadFeatures()),
    updateScreen_6: (value) => dispatch(updateScreen_6(value)),
    updateFeaturesData: (value) => dispatch(updateFeaturesData(value)),
    updateFeaturesServices: (value) => dispatch(updateFeaturesServices(value)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeaturesAndServices)
