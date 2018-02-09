import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Picker,
  TextInput,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import RNGooglePlaces from 'react-native-google-places';
import { Navigation } from 'react-native-navigation';
import MapView from 'react-native-maps';
import styles from './styles';
import { backgroundColor, propertyStatuses } from '../../constants/config';
import Panel from '../Panel';
import Map from '../Map';
import { connect } from 'react-redux'
import { 
  updatePropertyFor,
  updateRegion, 
  updateBranch, 
  updateDistrict, 
  updateAddress, 
  updateUnitFloor,
  updateLocationOnMap,
  updateScreen_1,
} from '../../Actions/propertyPostAction'

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

Navigation.registerComponent('krooqi.Map', () => Map);

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      propertyStatus: '33',
      branchLo: '',
      regionLo: '',
      city: '',
      districtLo: '',
      addressLo: '',
      unit: '',
      mapRegion: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    };
    this.selectPropertyStatus = this.selectPropertyStatus.bind(this);  
    this.openMap = this.openMap.bind(this);
  }

  selectRegion = (region) => {
    this.setState({ regionLo: region });
    this.props.updateRegion(region)
  }
  selectBranch = (branch) => {
    this.setState({ branchLo: branch });
    this.props.updateBranch(branch)
  }
  selectDistrict = (district) => {
    this.setState({ districtLo: district });
    this.props.updateDistrict(district)
  }

  addressUpdate = (addText) => {
    this.setState({ addressLo: addText })
    this.props.updateAddress(addText)
  }

  unitFloorUpdate = (unitUpdate) => {
    this.setState({ unit: unitUpdate })
    this.props.updateUnitFloor(unitUpdate)
  }

  selectPropertyStatus(index) {
    let termId = 0;
    if (index === 0) {
      termId = 33;
    } else if (index === 1) {
      termId = 34;
    } else {
      termId = 108;
    }
    this.setState({ propertyStatus: termId });
    this.props.updatePropertyFor(termId)
  }

  openMap() {
    RNGooglePlaces.openPlacePickerModal()
      .then((place) => {
        this.setState({
          mapRegion: {
            ...this.state.mapRegion,
            latitude: place.latitude,
            longitude: place.longitude,
          },
        });
        this.props.updateLocationOnMap(this.state.mapRegion)
      })
      .catch(error => console.log(error.message)); // error is a Javascript Error object
  }

  renderRegion() {
    const { regionLo } = this.state;
    return (
      <View>
        <Picker mode="dropdown" selectedValue={regionLo} onValueChange={ (value) => {this.selectRegion(value)}}>
          <Picker.Item label="Select Region" value="key0" />
          <Picker.Item label="Min Area 1" value="selectRegion Min Area 1" />
          <Picker.Item label="Min Area 2" value="selectRegion Min Area 2" />
          <Picker.Item label="Min Area 3" value="selectRegion Min Area 3" />
        </Picker>
        {Platform.OS !== 'ios' && <View style={styles.divider} />}
      </View>
    );
  }

  renderBranch() {
    const { branchLo } = this.state;
    return (
      <View>
        <Picker mode="dropdown" selectedValue={branchLo} onValueChange={(value) => {this.selectBranch(value)}}>
          <Picker.Item label="Select Branch" value="key0" />
          <Picker.Item label="Min Area 1" value="selectBranch key1" />
          <Picker.Item label="Min Area 2" value="selectBranch key2" />
          <Picker.Item label="Min Area 3" value="selectBranch key3" />
          <Picker.Item label="Min Area 4" value="selectBranch key4" />
        </Picker>
        {Platform.OS !== 'ios' && <View style={styles.divider} />}
      </View>
    );
  }

  renderDistrict() {
    const { districtLo } = this.state;
    return (
      <View>
        <Picker mode="dropdown" selectedValue={districtLo} onValueChange={(value) => {this.selectDistrict(value)}}>
          <Picker.Item label="Select District" />
          <Picker.Item label="Min Area 1" value="key1 selectDistrict" />
          <Picker.Item label="Min Area 2" value="key2 selectDistrict" />
          <Picker.Item label="Min Area 3" value="key3 selectDistrict" />
          <Picker.Item label="Min Area 4" value="key4 selectDistrict" />
        </Picker>
        {Platform.OS !== 'ios' && <View style={styles.divider} />}
      </View>
    );
  }

  render() {
    const {
      propertyStatus, regionLo, city, districtLo, addressLo, unit, mapRegion, branchLo
    } = this.state;
    const { OS } = Platform;
    let statusSelectedIndex = 0;
    if (propertyStatus === 34) {
      statusSelectedIndex = 1;
    }
    if (propertyStatus === 108) {
      statusSelectedIndex = 2;
    }
    const { propertyFor, region, branch, district, address, unitFloor, locationOnMap, screen_1 } = this.props.propertyPost;
    return (
      <View style={styles.container}>
        <View style={styles.mainViewHead}><Text style={styles.mainViewHeadText}> Location </Text></View>
        <ScrollView style={styles.flex}>
          <KeyboardAvoidingView style={styles.flex} behavior="padding">
            {
              screen_1 && (
                Alert.alert(
                  'Required',
                  'Please fill all the fields',
                  [
                    {text: 'OK', onPress: () => this.props.updateScreen_1(false)},
                  ],
                  { cancelable: false }
                )
              )
            }
            <View style={styles.margin}>
              <SegmentedControlTab
                tabStyle={{ borderColor: backgroundColor }}
                activeTabStyle={{ backgroundColor }}
                tabTextStyle={{ color: backgroundColor }}
                values={propertyStatuses}
                selectedIndex={statusSelectedIndex}
                onTabPress={this.selectPropertyStatus}
              />
            </View>
            {OS === 'ios' ? (
              <Panel title="Region" text={regionLo}>
                {this.renderRegion()}
              </Panel>
            ) : (
              <View style={styles.margin}>
                <Text style={styles.label}>Region</Text>
                {this.renderRegion()}
              </View>
            )}
            {OS === 'ios' ? (
              <Panel title="Branch" text={branchLo}>
                {this.renderBranch()}
              </Panel>
            ) : (
              <View style={styles.margin}>
                <Text style={styles.label}>Branch</Text>
                {this.renderBranch()}
              </View>
            )}
            {OS === 'ios' ? (
              <Panel title="District" text={districtLo}>
                {this.renderDistrict()}
              </Panel>
            ) : (
              <View style={styles.margin}>
                <Text style={styles.label}>District</Text>
                {this.renderDistrict()}
              </View>
            )}
            <View style={styles.margin}>
              <Text style={styles.label}>Address</Text>
              <TextInput
                style={styles.textInput}
                value={addressLo}
                placeholder="Address"
                onChangeText={txt => this.addressUpdate(txt)}
              />
            </View>
            <View style={styles.margin}>
              <Text style={styles.label}>Unit / Floor</Text>
              <TextInput
                style={styles.textInput}
                value={unit}
                placeholder="Unit / Floor"
                onChangeText={txt => this.unitFloorUpdate(txt) }
              />
            </View>
            <View style={[{ flexDirection: 'row' }, styles.margin]}>
              <TouchableHighlight onPress={this.openMap} underlayColor="gray">
                <Text style={{ padding: 10 }}>LOCATE ON MAP</Text>
              </TouchableHighlight>
            </View>
            {mapRegion.latitude !== 0 &&
              mapRegion.longitude !== 0 && (
                <View style={[styles.margin, { height: 200 }]}>
                  <MapView style={{ flex: 1 }} region={mapRegion}>
                    <MapView.Marker
                      coordinate={{
                        latitude: mapRegion.latitude,
                        longitude: mapRegion.longitude,
                      }}
                    />
                  </MapView>
                </View>
              )}
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

Location.propTypes = {};

function mapStateToProps (state) {
  return {
    propertyPost: state.propertyPost,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updatePropertyFor: (value) => dispatch(updatePropertyFor(value)),
    updateRegion: (value) => dispatch(updateRegion(value)),
    updateBranch: (value) => dispatch(updateBranch(value)),
    updateDistrict: (value) => dispatch(updateDistrict(value)),
    updateAddress: (value) => dispatch(updateAddress(value)),
    updateUnitFloor: (value) => dispatch(updateUnitFloor(value)),
    updateLocationOnMap: (value) => dispatch(updateLocationOnMap(value)),
    updateScreen_1: (value) => dispatch(updateScreen_1(value)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Location)