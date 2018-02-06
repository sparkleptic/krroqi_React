import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, Picker, ScrollView } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux'
import {
  updateRentPerMonth,
  updateDateAvailable,
  updatePropertyType,
  updateRooms,
  updateBathrooms,
  updateMeterSq,
  updateYearBuild
} from '../../Actions/propertyPostAction'

class PropertyBasicDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rent: '',
      date: '',
      propertyTypeLo: '',
      roomsLo: '',
      bathroomsLo: '',
      meterSqLo: '',
      yearBuildLo: '',
    };
    this.selectpropertyType = this.selectpropertyType.bind(this);
    this.selectbathrooms = this.selectbathrooms.bind(this);
    this.selectRooms = this.selectRooms.bind(this);
  }

  selectpropertyType(propertyType) {
    this.setState({ propertyTypeLo: propertyType });
    this.props.updatePropertyType(propertyType)
  }
  selectbathrooms(bathrooms) {
    this.setState({ bathroomsLo: bathrooms });
    this.props.updateBathrooms(bathrooms)
  }
  selectRooms(rooms) {
    this.setState({ roomsLo: rooms });
    this.props.updateRooms(rooms)
  }

  rentUpdate = (rentUpdate) => {
    this.setState({ rent: rentUpdate })
    this.props.updateRentPerMonth(rentUpdate)
  }

  dateAvailableUpdate = (avaDate) => { 
    this.setState({ date: avaDate })
    this.props.updateDateAvailable(avaDate)
  }

  meterSqUpdate = (mSqUpdate) => {
    this.setState({ meterSqLo: mSqUpdate })
    this.props.updateMeterSq(mSqUpdate)
  }

  yrBuildUpdate = (yrBUild) => {
    this.setState({ yearBuildLo: yrBUild })
    this.props.updateYearBuild(yrBUild)
  }

  propertyTypeFunc() {
    const { propertyTypeLo } = this.state;
    return (
      <View>
        <Picker mode="dropdown" selectedValue={propertyTypeLo} onValueChange={this.selectpropertyType}>
          <Picker.Item label="Select Type" value="Select Type" />
          <Picker.Item label="Personal 1" value="Personal 1" />
          <Picker.Item label="Personal 2" value="Personal 2" />
          <Picker.Item label="Personal 3" value="Personal 3" />
          <Picker.Item label="Personal 4" value="Personal 4" />
        </Picker>
        {Platform.OS !== 'ios' && <View style={styles.divider} />}
      </View>
    );
  }
  roomsFunc() {
    const { roomsLo } = this.state;
    return (
      <View>
        <Picker mode="dropdown" selectedValue={roomsLo} onValueChange={this.selectRooms}>
          <Picker.Item label="1" value="1"/>
          <Picker.Item label="2" value="2"/>
          <Picker.Item label="3" value="3"/>
          <Picker.Item label="4" value="4"/>
        </Picker>
        {Platform.OS !== 'ios' && <View style={styles.divider} />}
      </View>
    );
  }
  bathroomsFunc() {
    const { bathroomsLo } = this.state;
    return (
      <View>
        <Picker mode="dropdown" selectedValue={bathroomsLo} onValueChange={this.selectbathrooms}>
          <Picker.Item label="1" value="1"/>
          <Picker.Item label="2" value="2"/>
          <Picker.Item label="3" value="3"/>
          <Picker.Item label="4" value="4"/>
        </Picker>
        {Platform.OS !== 'ios' && <View style={styles.divider} />}
      </View>
    );
  }

  render() {
    const {
      rent, date, propertyTypeLo, roomsLo, bathroomsLo, meterSqLo, yearBuildLo,
    } = this.state;
    const { 
      rentPerMonth,
      dateAvailable,
      propertyType,
      rooms,
      bathrooms,
      meterSq,
      yearBuild,
      screen_4,
    } = this.props.propertyPost;
    return (
      <View style={styles.container}>
        <View style={styles.mainViewHead}><Text style={styles.mainViewHeadText}> Basic Details </Text></View>
        <ScrollView style={styles.flex}>
          <KeyboardAvoidingView style={styles.flex} behavior="padding">
            {
              screen_4 ? <Text style={{color: 'red', fontWeight: '600'}}>Fill All Fields</Text> : null
            }
            <View style={styles.margin}>
              <Text style={styles.label}>Rent Per Month / Price</Text>
              <TextInput
                style={styles.textInput}
                value={rent}
                placeholder="Rent Per Month/Price"
                onChangeText={txt => this.rentUpdate(txt)}
              />
            </View>
            <View style={styles.margin}>
              <Text style={styles.label}>Date Available</Text>
              <TextInput
                style={styles.textInput}
                value={date}
                placeholder="Date Available"
                onChangeText={txt => this.dateAvailableUpdate(txt)}
              />
            </View>
            {Platform.OS === 'ios' ? (
              <Panel title="Property Type" text={propertyTypeLo}>
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
                    <Panel title="Rooms" text={roomsLo}>
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
                    <Panel title="Bathrooms" text={bathroomsLo}>
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
                      value={meterSqLo}
                      placeholder="Meter Square"
                      onChangeText={txt => this.meterSqUpdate(txt)}
                    />
                  </View>
                </View>
                <View style={{width: '50%'}}>
                  <View style={styles.margin}>
                    <Text style={styles.label}>Year Build</Text>
                    <TextInput
                      style={styles.textInput}
                      value={yearBuildLo}
                      placeholder="Year Build"
                      onChangeText={txt => this.yrBuildUpdate(txt)}
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

function mapStateToProps (state) {
  return {
    propertyPost: state.propertyPost,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updateRentPerMonth: (value) => dispatch(updateRentPerMonth(value)),
    updateDateAvailable: (value) => dispatch(updateDateAvailable(value)),
    updatePropertyType: (value) => dispatch(updatePropertyType(value)),
    updateRooms: (value) => dispatch(updateRooms(value)),
    updateBathrooms: (value) => dispatch(updateBathrooms(value)),
    updateMeterSq: (value) => dispatch(updateMeterSq(value)),
    updateYearBuild: (value) => dispatch(updateYearBuild(value)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertyBasicDetails)
