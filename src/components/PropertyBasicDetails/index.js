import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, Picker, ScrollView } from 'react-native';
import styles from './styles';

class PropertyBasicDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rent: '',
      date: '',
      propertyType: '',
      rooms: '',
      bathrooms: '',
      meterSq: '',
      yearBuild: '',
    };
    this.selectpropertyType = this.selectpropertyType.bind(this);
    this.selectbathrooms = this.selectbathrooms.bind(this);
    this.selectRooms = this.selectRooms.bind(this);
  }

  selectpropertyType(propertyType) {
    this.setState({ propertyType });
  }
  selectbathrooms(bathrooms) {
    this.setState({ bathrooms });
  }
  selectRooms(rooms) {
    this.setState({ rooms });
  }

  propertyTypeFunc() {
    const { propertyType } = this.state;
    return (
      <View>
        <Picker mode="dropdown" selectedValue={propertyType} onValueChange={this.selectpropertyType}>
          <Picker.Item label="Select Type" />
          <Picker.Item label="Personal" />
        </Picker>
        {Platform.OS !== 'ios' && <View style={styles.divider} />}
      </View>
    );
  }
  roomsFunc() {
    const { rooms } = this.state;
    return (
      <View>
        <Picker mode="dropdown" selectedValue={rooms} onValueChange={this.selectRooms}>
          <Picker.Item label="1" />
          <Picker.Item label="2" />
        </Picker>
        {Platform.OS !== 'ios' && <View style={styles.divider} />}
      </View>
    );
  }
  bathroomsFunc() {
    const { bathrooms } = this.state;
    return (
      <View>
        <Picker mode="dropdown" selectedValue={bathrooms} onValueChange={this.selectbathrooms}>
          <Picker.Item label="1" />
          <Picker.Item label="2" />
        </Picker>
        {Platform.OS !== 'ios' && <View style={styles.divider} />}
      </View>
    );
  }

  render() {
    const {
      rent, date, propertyType, rooms, bathrooms, meterSq, yearBuild,
    } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.mainViewHead}><Text style={styles.mainViewHeadText}> Basic Details </Text></View>
        <ScrollView style={styles.flex}>
          <KeyboardAvoidingView style={styles.flex} behavior="padding">
            <View style={styles.margin}>
              <Text style={styles.label}>Rent Per Month / Price</Text>
              <TextInput
                style={styles.textInput}
                value={rent}
                placeholder="Rent Per Month/Price"
                onChangeText={txt => this.setState({ rent: txt })}
              />
            </View>
            <View style={styles.margin}>
              <Text style={styles.label}>Date Available</Text>
              <TextInput
                style={styles.textInput}
                value={date}
                placeholder="Date Available"
                onChangeText={txt => this.setState({ date: txt })}
              />
            </View>
            {Platform.OS === 'ios' ? (
              <Panel title="Property Type" text={propertyType}>
                {this.propertyTypeFunc()}
              </Panel>
            ) : (
              <View style={styles.margin}>
                <Text style={styles.label}>Property Type</Text>
                {this.propertyTypeFunc()}
              </View>
            )}
            <View style={{flexDirection: 'column'}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '50%'}}>
                  {Platform.OS === 'ios' ? (
                    <Panel title="Rooms" text={rooms}>
                      {this.roomsFunc()}
                    </Panel>
                  ) : (
                    <View style={styles.margin}>
                      <Text style={styles.label}>Rooms</Text>
                      {this.roomsFunc()}
                    </View>
                  )}
                </View>
                <View style={{width: '50%'}}>
                  {Platform.OS === 'ios' ? (
                    <Panel title="Bathrooms" text={bathrooms}>
                      {this.bathroomsFunc()}
                    </Panel>
                  ) : (
                    <View style={styles.margin}>
                      <Text style={styles.label}>Bathrooms</Text>
                      {this.bathroomsFunc()}
                    </View>
                  )}
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '50%'}}>
                  <View style={styles.margin}>
                    <Text style={styles.label}>Meter Square</Text>
                    <TextInput
                      style={styles.textInput}
                      value={meterSq}
                      placeholder="Meter Square"
                      onChangeText={txt => this.setState({ meterSq: txt })}
                    />
                  </View>
                </View>
                <View style={{width: '50%'}}>
                  <View style={styles.margin}>
                    <Text style={styles.label}>Year Build</Text>
                    <TextInput
                      style={styles.textInput}
                      value={yearBuild}
                      placeholder="Year Build"
                      onChangeText={txt => this.setState({ yearBuild: txt })}
                    />
                  </View>
                </View>
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
