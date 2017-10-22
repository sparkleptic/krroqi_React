import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {
  View,
  ScrollView,
  Text,
  Picker,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { backgroundColor } from './../constants/config';
import MultiSelect from '../inputControls/MultiSelect';

const { width } = Dimensions.get('window');

class filterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: props.search,
      selectedIndex: 0,
      language: 'java',
      showAll: false,
    };
    this.handleIndexChange = this.handleIndexChange.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'cancel') {
        this.props.navigator.dismissModal({
          animationType: 'slide-down',
        });
      }
      if (event.id === 'apply') {
        this.props.navigator.dismissModal({
          animationType: 'slide-down',
        });
      }
    }
  }

  handleIndexChange = (index) => {
    this.setState({
      ...this.state,
      selectedIndex: index,
    });
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'space-around', backgroundColor: 'white' }}>
        <ScrollView style={{ flex: 1 }}>
          <KeyboardAvoidingView style={{ flex: 1, margin: 10 }} behavior="padding">
            <View style={{ marginBottom: 10, marginTop: 10 }}>
              <SegmentedControlTab
                tabStyle={{ borderColor: backgroundColor }}
                activeTabStyle={{ backgroundColor }}
                tabTextStyle={{ color: backgroundColor }}
                values={['For Sale', 'For Rent', 'Development']}
                selectedIndex={this.state.selectedIndex}
                onTabPress={this.handleIndexChange}
              />
            </View>
            <View style={{ marginBottom: 10, marginTop: 10 }}>
              <Text>Price Range</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ width: width / 2 - 15 }}>
                  <Picker
                    mode="dropdown"
                    selectedValue={this.state.language}
                    onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}
                  >
                    <Picker.Item label="Any" value="any" />
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                  </Picker>
                  <View
                    style={{
                      borderBottomColor: 'gray',
                      borderBottomWidth: 1,
                      position: 'absolute',
                      bottom: 10,
                      left: 0,
                      width: '100%',
                    }}
                  />
                </View>
                <View style={{ width: width / 2 - 15 }}>
                  <Picker
                    mode="dropdown"
                    selectedValue={this.state.language}
                    onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}
                  >
                    <Picker.Item label="Any" value="any" />
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                  </Picker>
                  <View
                    style={{
                      borderBottomColor: 'gray',
                      borderBottomWidth: 1,
                      position: 'absolute',
                      bottom: 10,
                      left: 0,
                      width: '100%',
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={{ marginBottom: 10, marginTop: 10 }}>
              <Text style={{ marginBottom: 10 }}>Property Type</Text>
              <MultiSelect multiSelectData={['Villa', 'Apartment']} selectedValues={[]} />
            </View>
            <View style={{ marginBottom: 10, marginTop: 10 }}>
              <Text style={{ marginBottom: 10 }}>Rooms</Text>
              <SegmentedControlTab
                tabStyle={{ borderColor: backgroundColor }}
                activeTabStyle={{ backgroundColor }}
                tabTextStyle={{ color: backgroundColor }}
                values={['Any', '1+', '2+', '3+', '4+']}
                selectedIndex={this.state.selectedIndex}
                onTabPress={this.handleIndexChange}
              />
            </View>
            <View style={{ marginBottom: 10, marginTop: 10 }}>
              <Text style={{ marginBottom: 10 }}>Baths</Text>
              <SegmentedControlTab
                tabStyle={{ borderColor: backgroundColor }}
                activeTabStyle={{ backgroundColor }}
                tabTextStyle={{ color: backgroundColor }}
                values={['Any', '1+', '2+', '3+', '4+']}
                selectedIndex={this.state.selectedIndex}
                onTabPress={this.handleIndexChange}
              />
            </View>
            <View style={{ marginBottom: 10, marginTop: 10 }}>
              <Text>Square Meter Range</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ width: width / 2 - 15 }}>
                  <Picker
                    mode="dropdown"
                    selectedValue={this.state.language}
                    onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}
                  >
                    <Picker.Item label="Any" value="any" />
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                  </Picker>
                  <View
                    style={{
                      borderBottomColor: 'gray',
                      borderBottomWidth: 1,
                      position: 'absolute',
                      bottom: 10,
                      left: 0,
                      width: '100%',
                    }}
                  />
                </View>
                <View style={{ width: width / 2 - 15 }}>
                  <Picker
                    mode="dropdown"
                    selectedValue={this.state.language}
                    onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}
                  >
                    <Picker.Item label="Any" value="any" />
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                  </Picker>
                  <View
                    style={{
                      borderBottomColor: 'gray',
                      borderBottomWidth: 1,
                      position: 'absolute',
                      bottom: 10,
                      left: 0,
                      width: '100%',
                    }}
                  />
                </View>
              </View>
            </View>
            {this.state.showAll && (
              <View>
                <View style={{ marginBottom: 10, marginTop: 10 }}>
                  <Text>Year Built</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ width: width / 2 - 15 }}>
                      <Picker
                        mode="dropdown"
                        selectedValue={this.state.language}
                        onValueChange={(itemValue, itemIndex) =>
                          this.setState({ language: itemValue })}
                      >
                        <Picker.Item label="Any" value="any" />
                        <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" />
                      </Picker>
                      <View
                        style={{
                          borderBottomColor: 'gray',
                          borderBottomWidth: 1,
                          position: 'absolute',
                          bottom: 10,
                          left: 0,
                          width: '100%',
                        }}
                      />
                    </View>
                    <View style={{ width: width / 2 - 15 }}>
                      <Picker
                        mode="dropdown"
                        selectedValue={this.state.language}
                        onValueChange={(itemValue, itemIndex) =>
                          this.setState({ language: itemValue })}
                      >
                        <Picker.Item label="Any" value="any" />
                        <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" />
                      </Picker>
                      <View
                        style={{
                          borderBottomColor: 'gray',
                          borderBottomWidth: 1,
                          position: 'absolute',
                          bottom: 10,
                          left: 0,
                          width: '100%',
                        }}
                      />
                    </View>
                  </View>
                </View>
                <View style={{ marginBottom: 10, marginTop: 10 }}>
                  <Text>District</Text>
                  <TextInput />
                </View>
              </View>
            )}
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                margin: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  borderColor: 'gray',
                  borderWidth: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 100,
                }}
                onPress={() =>
                  this.setState({
                    showAll: !this.state.showAll,
                  })}
              >
                <View>
                  <Text style={{ padding: 8 }}>
                    {this.state.showAll ? 'Show Less' : 'Show More'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            height: 40,
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: 1,
            borderColor: '#ddd',
            borderBottomWidth: 0,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 1,
          }}
        >
          <TouchableOpacity>
            <View>
              <Text>Reset</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <Icon
                name={Platform.OS === 'ios' ? 'ios-heart-outline' : 'md-heart-outline'}
                size={20}
              />
              <Text style={{ marginLeft: 8 }}>Save Search</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View>
              <Text>Search</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

filterPage.propTypes = {
  search: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
};

export default filterPage;
