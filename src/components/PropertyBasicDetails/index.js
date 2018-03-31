import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, View, Text, TextInput, KeyboardAvoidingView, Platform, Picker, ScrollView, TouchableOpacity } from 'react-native';
import { DatePickerDialog } from 'react-native-datepicker-dialog'
import moment from 'moment';
import styles from './styles';
import { connect } from 'react-redux'
import {
  updateRentPerMonth,
  updateDateAvailable,
  updatePropertyType,
  updateRooms,
  updateBathrooms,
  updateMeterSq,
  updateYearBuild,
  updateScreen_4,
} from '../../Actions/propertyPostAction'
import I18n from '../../i18n';
import Panel from '../Panel';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.toProperCase = function() {
  return this.toLowerCase().replace(/^(.)|\s(.)/g, 
    function($1) { return $1.toUpperCase(); });
}

var typeProperty = [
  {
    type: 'Apartment',
    value: '13',
  },
  {
    type: 'Building',
    value: '107',
  },
  {
    type: 'Office',
    value: '221',
  },
  {
    type: 'Showroom',
    value: '219',
  },
  {
    type: 'Villa',
    value: '89',
  },
];

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
      DateText: `${I18n.t('pp_date_avlbl').capitalize()}`,      
      DateHolder: null,
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
          <Picker.Item label={I18n.t('pp_pro_type').capitalize()} value="Select Type" />
          {
            typeProperty.map((type, i) => {
              return <Picker.Item key={i} label={type.type} value={type.value}/>
            })
          }
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
          <Picker.Item label="5" value="5"/>
          <Picker.Item label="6" value="6"/>
          <Picker.Item label="7" value="7"/>
          <Picker.Item label="8" value="8"/>
          <Picker.Item label="9" value="9"/>
          <Picker.Item label="10" value="10"/>
          <Picker.Item label="10+" value="10+"/>
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
          <Picker.Item label="5" value="5"/>
          <Picker.Item label="6" value="6"/>
          <Picker.Item label="7" value="7"/>
          <Picker.Item label="8" value="8"/>
          <Picker.Item label="9" value="9"/>
          <Picker.Item label="10" value="10"/>
          <Picker.Item label="10+" value="10+"/>
        </Picker>
        {Platform.OS !== 'ios' && <View style={styles.divider} />}
      </View>
    );
  }

  /**
   * Textbox click listener
   */
  DatePickerMainFunctionCall = () => {
  
    let DateHolder = this.state.DateHolder;
  
    if(!DateHolder || DateHolder == null){
  
      DateHolder = new Date();
      this.setState({
        DateHolder: DateHolder
      });
    }
  
    //To open the dialog
    this.refs.DatePickerDialog.open({
  
      date: DateHolder,
  
    });
  
  }
  
  /**
   * Call back for dob date picked event
   *
   */
  onDatePickedFunction = (date) => {
    this.setState({
      dobDate: date,
      DateText: moment(date).format('DD-MMM-YYYY')
    });    
    this.props.updateDateAvailable(this.state.DateText)
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
        <View style={styles.mainViewHead}><Text style={styles.mainViewHeadText}>{I18n.t('ppt_basic').toProperCase()} </Text></View>
        <ScrollView style={styles.flex}>
          <KeyboardAvoidingView style={styles.flex} behavior="padding">
            {
              screen_4 && (
                Alert.alert(
                  `${I18n.t('ppa_required').capitalize()}`,
                  `${I18n.t('ppa_content').capitalize()}`,
                  [
                    {text: `${I18n.t('ppa_ok').capitalize()}`, onPress: () => this.props.updateScreen_4(false)},
                  ],
                  { cancelable: false }
                )
              )
            }
            <View style={styles.margin}>
              <Text style={styles.label}>  {I18n.t('pp_rent').capitalize()}  <Text style={{ color: 'red' }}>*</Text></Text>
              <TextInput
                style={styles.textInput}
                value={rent}
                keyboardType={'numeric'}
                placeholder=  {I18n.t('pp_rent').capitalize()}
                onChangeText={txt => this.rentUpdate(txt)}
              />
            </View>
            <View style={styles.margin}>
              <Text style={styles.label}>{I18n.t('pp_date_avlbl').capitalize()}</Text>
                <TouchableOpacity onPress={this.DatePickerMainFunctionCall.bind(this)} >              
                  <View style={styles.datePickerBox}>              
                    <Text style={styles.datePickerText}>{this.state.DateText}</Text>              
                  </View>              
                </TouchableOpacity>   
              
              <DatePickerDialog ref="DatePickerDialog" onDatePicked={this.onDatePickedFunction.bind(this)} />
            </View>
            {Platform.OS === 'ios' ? (
              <Panel title={I18n.t('pp_pro_type').capitalize()} text={propertyTypeLo}>
                {this.propertyTypeFunc()}
              </Panel>
            ) : (
              <View style={styles.margin}>
                <Text style={styles.label}>{I18n.t('pp_pro_type').capitalize()}</Text>
                {this.propertyTypeFunc()}
              </View>
            )}
            <View style={{flexDirection: 'column'}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '50%'}}>
                  {Platform.OS === 'ios' ? (
                    <Panel title={I18n.t('pp_rooms').capitalize()} text={roomsLo}>
                      {this.roomsFunc()}
                    </Panel>
                  ) : (
                    <View style={styles.margin}>
                      <Text style={styles.label}>{I18n.t('pp_rooms').capitalize()}</Text>
                      {this.roomsFunc()}
                    </View>
                  )}
                </View>
                <View style={{width: '50%'}}>
                  {Platform.OS === 'ios' ? (
                    <Panel title={I18n.t('pp_bathrooms').capitalize()} text={bathroomsLo}>
                      {this.bathroomsFunc()}
                    </Panel>
                  ) : (
                    <View style={styles.margin}>
                      <Text style={styles.label}>{I18n.t('pp_bathrooms').capitalize()}</Text>
                      {this.bathroomsFunc()}
                    </View>
                  )}
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '50%'}}>
                  <View style={styles.margin}>
                    <Text style={styles.label}>{I18n.t('pp_meter_sq').capitalize()}</Text>
                    <TextInput
                      style={styles.textInput}
                      value={meterSqLo}
                      keyboardType={'numeric'}
                      placeholder={I18n.t('pp_meter_sq').capitalize()}
                      onChangeText={txt => this.meterSqUpdate(txt)}
                    />
                  </View>
                </View>
                <View style={{width: '50%'}}>
                  <View style={styles.margin}>
                    <Text style={styles.label}>{I18n.t('pp_year_build').capitalize()}</Text>
                    <TextInput
                      style={styles.textInput}
                      value={yearBuildLo}
                      keyboardType={'numeric'}
                      placeholder={I18n.t('pp_year_build').capitalize()}
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
    updateScreen_4: (value) => dispatch(updateScreen_4(value)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertyBasicDetails)
