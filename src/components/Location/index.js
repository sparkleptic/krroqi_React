import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Picker,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import RNGooglePlaces from 'react-native-google-places';
import { Navigation } from 'react-native-navigation';
import styles from './styles';
import { backgroundColor, propertyStatuses } from '../../constants/config';
import Panel from '../Panel';
import Map from '../Map';

Navigation.registerComponent('krooqi.Map', () => Map);
class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      propertyStatus: '',
      region: '',
      city: '',
      district: '',
      address: '',
      unit: '',
      latitude: '',
      longitude: '',
    };
    this.selectPropertyStatus = this.selectPropertyStatus.bind(this);
    this.selectRegion = this.selectRegion.bind(this);
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
    this.openMap = this.openMap.bind(this);
  }

  selectRegion() {
    alert('select region');
  }

  openMap() {
    RNGooglePlaces.openPlacePickerModal()
      .then((place) => {
        console.log(place);
        // place represents user's selection from the
        // suggestions and it is a simplified Google Place object.
      })
      .catch(error => console.log(error.message)); // error is a Javascript Error object
  }

  renderRegion() {
    const { region } = this.state;
    return (
      <View>
        <Picker mode="dropdown" selectedValue={region} onValueChange={this.selectMinArea}>
          <Picker.Item label="Min Area" />
        </Picker>
        {Platform.OS !== 'ios' && <View style={styles.divider} />}
      </View>
    );
  }

  render() {
    const {
      propertyStatus, region, city, district, address, unit,
    } = this.state;
    const { OS } = Platform;
    let statusSelectedIndex = 0;
    if (propertyStatus === 34) {
      statusSelectedIndex = 1;
    }
    if (propertyStatus === 108) {
      statusSelectedIndex = 2;
    }
    return (
      <View style={styles.container}>
        <ScrollView style={styles.flex}>
          <KeyboardAvoidingView style={styles.flex} behavior="padding">
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
              <Panel title="Region" text={region}>
                {this.renderRegion()}
              </Panel>
            ) : (
              <View style={styles.margin}>
                <Text style={styles.label}>Region</Text>
                {this.renderRegion()}
              </View>
            )}
            {OS === 'ios' ? (
              <Panel title="City" text={city}>
                {this.renderRegion()}
              </Panel>
            ) : (
              <View style={styles.margin}>
                <Text style={styles.label}>City</Text>
                {this.renderRegion()}
              </View>
            )}
            {OS === 'ios' ? (
              <Panel title="District" text={district}>
                {this.renderRegion()}
              </Panel>
            ) : (
              <View style={styles.margin}>
                <Text style={styles.label}>District</Text>
                {this.renderRegion()}
              </View>
            )}
            <View style={styles.margin}>
              <Text style={styles.label}>Address</Text>
              <TextInput
                style={styles.textInput}
                value={address}
                placeholder="Address"
                onChangeText={txt => this.setState({ address: txt })}
              />
            </View>
            <View style={styles.margin}>
              <Text style={styles.label}>Unit / Floor</Text>
              <TextInput
                style={styles.textInput}
                value={unit}
                placeholder="Unit / Floor"
                onChangeText={txt => this.setState({ unit: txt })}
              />
            </View>
            <View style={[{ flexDirection: 'row' }, styles.margin]}>
              <TouchableHighlight onPress={this.openMap} underlayColor="gray">
                <Text style={{ padding: 10 }}>LOCATE ON MAP</Text>
              </TouchableHighlight>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

Location.propTypes = {};

export default Location;
