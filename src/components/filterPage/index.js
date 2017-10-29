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

  TouchableOpacity,
  Platform,
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import { backgroundColor, minArea, maxArea, minPrice, maxPrice } from '../../constants/config';
import MultiSelect from '../../inputControls/MultiSelect';
import I18n from '../../i18n';
import styles from './styles';

class filterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: props.search,
      propertyStatus: props.propertyStatus,
      propertyTypes: props.propertyTypes,
      selectedIndex: 0,
      language: 'java',
      showAll: false,
    };
    this.handleIndexChange = this.handleIndexChange.bind(this);
    this.selectPropertyType = this.selectPropertyType.bind(this);
    this.selectPropertyStatus = this.selectPropertyStatus.bind(this);
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

  selectPropertyType(value) {
    const { search } = this.state;
    const newVal = { ...search, propertyType: value };
    this.setState({ search: newVal });
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
    const { search } = this.state;
    const newVal = { ...search, propertyStatus: termId };
    this.setState({ search: newVal });
  }

  render() {
    const { propertyTypes } = this.props;
    const { search } = this.state;
    const pl = propertyTypes.map(item => ({
      key: item.term_id,
      value: item.name,
    }));
    let statusSelectedIndex = 0;
    if (search.propertyStatus === 34) {
      statusSelectedIndex = 1;
    }
    if (search.propertyStatus === 108) {
      statusSelectedIndex = 2;
    }
    const years = Array(100).fill().map((_, i) => moment().year() - i);
    return (
      <View style={styles.container}>
        <ScrollView style={styles.flex}>
          <KeyboardAvoidingView style={styles.flex} behavior="padding">
            <View style={styles.margin}>
              <SegmentedControlTab
                tabStyle={{ borderColor: backgroundColor }}
                activeTabStyle={{ backgroundColor }}
                tabTextStyle={{ color: backgroundColor }}
                values={['For Rent', 'For Sale', 'Development']}
                selectedIndex={statusSelectedIndex}
                onTabPress={this.selectPropertyStatus}
              />
            </View>
            <View style={styles.margin}>
              <Text>Price Range</Text>
              <View style={styles.rowSpaceBetween}>
                <View style={styles.halfWidth}>
                  <Picker
                    mode="dropdown"
                    selectedValue={this.state.language}
                    onValueChange={itemValue => this.setState({ language: itemValue })}
                  >
                    <Picker.Item label="Min Price" />
                    {minPrice.map(item => (
                      <Picker.Item key={item} value={`${item}`} label={`${I18n.toNumber(item, { precision: 0 })} SAR`} />
                    ))}
                  </Picker>
                  <View
                    style={styles.divider}
                  />
                </View>
                <View style={styles.halfWidth}>
                  <Picker
                    mode="dropdown"
                    selectedValue={this.state.language}
                    onValueChange={itemValue => this.setState({ language: itemValue })}
                  >
                    <Picker.Item label="Max Price" />
                    {maxPrice.map(item => (
                      <Picker.Item key={item} value={`${item}`} label={`${I18n.toNumber(item, { precision: 0 })} SAR`} />
                    ))}
                  </Picker>
                  <View
                    style={styles.divider}
                  />
                </View>
              </View>
            </View>
            <View style={styles.margin}>
              <Text style={styles.margin}>Property Type</Text>
              <MultiSelect
                multiSelectData={pl}
                selectedValues={search.propertyType}
                onSelect={this.selectPropertyType}
              />
            </View>
            <View style={styles.margin}>
              <Text style={styles.margin}>Rooms</Text>
              <SegmentedControlTab
                tabStyle={{ borderColor: backgroundColor }}
                activeTabStyle={{ backgroundColor }}
                tabTextStyle={{ color: backgroundColor }}
                values={['Any', '1+', '2+', '3+', '4+']}
                selectedIndex={this.state.selectedIndex}
                onTabPress={this.handleIndexChange}
              />
            </View>
            <View style={styles.margin}>
              <Text style={styles.margin}>Baths</Text>
              <SegmentedControlTab
                tabStyle={{ borderColor: backgroundColor }}
                activeTabStyle={{ backgroundColor }}
                tabTextStyle={{ color: backgroundColor }}
                values={['Any', '1+', '2+', '3+', '4+']}
                selectedIndex={this.state.selectedIndex}
                onTabPress={this.handleIndexChange}
              />
            </View>
            <View style={styles.margin}>
              <Text>Square Meter Range</Text>
              <View style={styles.rowSpaceBetween}>
                <View style={styles.halfWidth}>
                  <Picker
                    mode="dropdown"
                    selectedValue={this.state.language}
                    onValueChange={itemValue => this.setState({ language: itemValue })}
                  >
                    <Picker.Item label="Min Area" />
                    {minArea.map(item => (
                      <Picker.Item key={item} value={`${item}`} label={`${I18n.toNumber(item, { precision: 0 })} Sq m`} />
                    ))}
                  </Picker>
                  <View
                    style={styles.divider}
                  />
                </View>
                <View style={styles.halfWidth}>
                  <Picker
                    mode="dropdown"
                    selectedValue={this.state.language}
                    onValueChange={itemValue => this.setState({ language: itemValue })}
                  >
                    <Picker.Item label="Max Area" />
                    {maxArea.map(item => (
                      <Picker.Item key={item} value={`${item}`} label={`${I18n.toNumber(item, { precision: 0 })} Sq m`} />
                    ))}
                  </Picker>
                  <View
                    style={styles.divider}
                  />
                </View>
              </View>
            </View>
            {this.state.showAll && (
              <View>
                <View style={styles.margin}>
                  <Text>Year Built</Text>
                  <View style={styles.rowSpaceBetween}>
                    <View style={styles.halfWidth}>
                      <Picker
                        mode="dropdown"
                        selectedValue={this.state.language}
                        onValueChange={itemValue =>
                          this.setState({ language: itemValue })}
                      >
                        <Picker.Item label="Min Built Year" />
                        {years.map(item => (
                          <Picker.Item key={item} value={`${item}`} label={`${item}`} />
                        ))}
                      </Picker>
                      <View
                        style={styles.divider}
                      />
                    </View>
                    <View style={styles.halfWidth}>
                      <Picker
                        mode="dropdown"
                        selectedValue={this.state.language}
                        onValueChange={itemValue => this.setState({ language: itemValue })}
                      >
                        <Picker.Item label="Max Built Year" />
                        {years.map(item => (
                          <Picker.Item key={item} value={`${item}`} label={`${item}`} />
                        ))}
                      </Picker>
                      <View
                        style={styles.divider}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.margin}>
                  <Text>District</Text>
                  <TextInput />
                </View>
              </View>
            )}
            <View
              style={styles.rowCenter}
            >
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() =>
                  this.setState({
                    showAll: !this.state.showAll,
                  })}
              >
                <View>
                  <Text style={styles.padding}>
                    {this.state.showAll ? 'Show Less' : 'Show More'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        <View
          style={styles.tabBar}
        >
          <TouchableOpacity>
            <View>
              <Text>Reset</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{ flexDirection: 'row' }}
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
  propertyStatus: PropTypes.array.isRequired,
  propertyTypes: PropTypes.array.isRequired,
  navigator: PropTypes.object.isRequired,
};

export default filterPage;