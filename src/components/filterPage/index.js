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
import {
  backgroundColor,
  minArea,
  maxArea,
  minPrice,
  maxPrice,
  propertyStatuses,
} from '../../constants/config';
import MultiSelect from '../../inputControls/MultiSelect';
import I18n from '../../i18n';
import styles from './styles';
import InitialState from '../../reducers/initialState';
import Panel from '../Panel';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.toProperCase = function() {
  return this.toLowerCase().replace(/^(.)|\s(.)/g, 
    function($1) { return $1.toUpperCase(); });
}

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
      propertyTypeLo: '',
    };
    this.selectMinPrice = this.selectMinPrice.bind(this);
    this.selectMaxPrice = this.selectMaxPrice.bind(this);
    this.selectRooms = this.selectRooms.bind(this);
    this.selectBaths = this.selectBaths.bind(this);
    this.selectMinArea = this.selectMinArea.bind(this);
    this.selectMaxArea = this.selectMaxArea.bind(this);
    this.selectMinYear = this.selectMinYear.bind(this);
    this.selectMaxYear = this.selectMaxYear.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.searchForm = this.searchForm.bind(this);
    this.handleIndexChange = this.handleIndexChange.bind(this);
    this.selectPropertyType = this.selectPropertyType.bind(this);
    this.selectPropertyStatus = this.selectPropertyStatus.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

    renderPropertyType() {
    const { propertyTypeLo } = this.state;
    let For_Rent = `${I18n.t('pp_for_rent').toProperCase()}`;
    let For_Sale = `${I18n.t('pp_for_sale').toProperCase()}`;
    let Devlopment = `${I18n.t('pp_for_development').toProperCase()}`;
    let New_Construction = `${I18n.t('pp_for_construction').toProperCase()}`;
    let Sold = `${I18n.t('pp_for_sold').toProperCase()}`;
    let Rented = `${I18n.t('pp_for_rented').toProperCase()}`;
    let PropertyTypeArr =  [For_Rent, For_Sale, Devlopment, New_Construction, Sold, Rented];
    return (
      <View>
        <Picker mode="dropdown" selectedValue={propertyTypeLo} onValueChange={ (value) => {this.selectPropertyStatus(value)}}>
          {
            PropertyTypeArr.length > 0 && (
              PropertyTypeArr.map((proType, i) => {
               return <Picker.Item key={i} label={proType} value={i} />     
              })
            )
          }
        </Picker>
        {Platform.OS !== 'ios' && <View style={styles.divider} />}
      </View>
    );
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

  resetForm() {
    this.setState({ search: InitialState.search });
  }

  searchForm() {
    this.props.onFilter(this.state.search);
    this.props.navigator.dismissModal({
      animationType: 'slide-down',
    });
  }

  selectMinPrice(value) {
    const { search } = this.state;
    const newVal = {
      ...search,
      priceRange: { ...search.priceRange, start: value },
    };
    this.setState({ search: newVal });
  }

  selectMaxPrice(value) {
    const { search } = this.state;
    const newVal = {
      ...search,
      priceRange: { ...search.priceRange, end: value },
    };
    this.setState({ search: newVal });
  }

  selectMinArea(start) {
    const { search } = this.state;
    const newVal = {
      ...search,
      squareMeterRange: { ...search.squareMeterRange, start },
    };
    this.setState({ search: newVal });
  }

  selectMaxArea(end) {
    const { search } = this.state;
    const newVal = {
      ...search,
      squareMeterRange: { ...search.squareMeterRange, end },
    };
    this.setState({ search: newVal });
  }

  selectMinYear(start) {
    const { search } = this.state;
    const newVal = {
      ...search,
      yearBuilt: { ...search.yearBuilt, start },
    };
    this.setState({ search: newVal });
  }

  selectMaxYear(end) {
    const { search } = this.state;
    const newVal = {
      ...search,
      yearBuilt: { ...search.yearBuilt, end },
    };
    this.setState({ search: newVal });
  }

  selectRooms(rooms) {
    const { search } = this.state;
    this.setState({ search: { ...search, rooms } });
  }

  selectBaths(baths) {
    const { search } = this.state;
    this.setState({ search: { ...search, baths } });
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
  // selectPropertyStatus(index) {
  //   let termId = 0;
  //   if (index === 0) {
  //     termId = 33;
  //   } else if (index === 1) {
  //     termId = 34;
  //   } else {
  //     termId = 108;
  //   }
  //   const { search } = this.state;
  //   const newVal = { ...search, propertyStatus: termId };
  //   this.setState({ search: newVal });
  // }
  selectPropertyStatus(index) {
    let termId = 0;
    if (index === 0) {
      termId = 33;
    } else if (index === 1) {
      termId = 34;
    } else if (index === 2) {
      termId = 108;
    } else if (index === 3) {
      termId = 319;
    } else if (index === 4) {
      termId = 217;
    } else if (index === 5) {
      termId = 218;
    }
    const { search } = this.state;
    const newVal = { ...search, propertyStatus: termId };
    this.setState({ search: newVal, propertyTypeLo: index  });
  }

  renderArea() {
    const { search } = this.state;
    return (
      <View style={styles.rowSpaceBetween}>
        <View style={styles.halfWidth}>
          <Picker
            mode="dropdown"
            selectedValue={search.squareMeterRange.start}
            onValueChange={this.selectMinArea}
          >
            <Picker.Item label={I18n.t('min_area').toProperCase()} />
            {minArea.map(item => (
              <Picker.Item
                key={item}
                value={`${item}`}
                label={`${I18n.toNumber(item, { precision: 0 })} Sq m`}
              />
            ))}
          </Picker>
          {Platform.OS !== 'ios' && <View style={styles.divider} />}
        </View>
        <View style={styles.halfWidth}>
          <Picker
            mode="dropdown"
            selectedValue={search.squareMeterRange.end}
            onValueChange={this.selectMaxArea}
          >
            <Picker.Item label={I18n.t('max_area').toProperCase()} />
            {maxArea.map(item => (
              <Picker.Item
                key={item}
                value={`${item}`}
                label={`${I18n.toNumber(item, { precision: 0 })} Sq m`}
              />
            ))}
          </Picker>
          {Platform.OS !== 'ios' && <View style={styles.divider} />}
        </View>
      </View>
    );
  }

  renderPriceRange() {
    const { search } = this.state;
    return (
      <View style={styles.rowSpaceBetween}>
        <View style={styles.halfWidth}>
          <Picker
            mode="dropdown"
            selectedValue={search.priceRange.start}
            onValueChange={this.selectMinPrice}
          >
            <Picker.Item label={I18n.t('min_price').toProperCase()} />
            {minPrice.map(item => (
              <Picker.Item
                key={item}
                value={`${item}`}
                label={`${I18n.toNumber(item, { precision: 0 })} SAR`}
              />
            ))}
          </Picker>
          {Platform.OS !== 'ios' && <View style={styles.divider} />}
        </View>
        <View style={styles.halfWidth}>
          <Picker
            mode="dropdown"
            selectedValue={search.priceRange.end}
            onValueChange={this.selectMaxPrice}
          >
            <Picker.Item label={I18n.t('max_price').toProperCase()} />
            {maxPrice.map(item => (
              <Picker.Item
                key={item}
                value={`${item}`}
                label={`${I18n.toNumber(item, { precision: 0 })} SAR`}
              />
            ))}
          </Picker>
          {Platform.OS !== 'ios' && <View style={styles.divider} />}
        </View>
      </View>
    );
  }

  renderYearBuilt(years) {
    const { search } = this.state;
    return (
      <View style={styles.rowSpaceBetween}>
        <View style={styles.halfWidth}>
          <Picker
            mode="dropdown"
            selectedValue={search.yearBuilt.start}
            onValueChange={this.selectMinYear}
          >
            <Picker.Item label={I18n.t('min_built_yr').toProperCase()} />
            {years.map(item => <Picker.Item key={item} value={`${item}`} label={`${item}`} />)}
          </Picker>
          {Platform.OS !== 'ios' && <View style={styles.divider} />}
        </View>
        <View style={styles.halfWidth}>
          <Picker
            mode="dropdown"
            selectedValue={search.yearBuilt.end}
            onValueChange={this.selectMaxYear}
          >
            <Picker.Item label={I18n.t('max_built_yr').toProperCase()} />
            {years.map(item => <Picker.Item key={item} value={`${item}`} label={`${item}`} />)}
          </Picker>
          {Platform.OS !== 'ios' && <View style={styles.divider} />}
        </View>
      </View>
    );
  }

  render() {
    const { OS } = Platform;
    const { propertyTypes } = this.props;
    const { search, propertyTypeLo } = this.state;
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
    const years = Array(100)
      .fill()
      .map((_, i) => moment().year() - i);

    const pp_propertyType = `${I18n.t('pp_propertyType').capitalize()}`;
    let For_Rent = `${I18n.t('pp_for_rent').toProperCase()}`;
    let For_Sale = `${I18n.t('pp_for_sale').toProperCase()}`;
    let Devlopment = `${I18n.t('pp_for_development').toProperCase()}`;
    let property_type_Location =  [For_Rent, For_Sale, Devlopment];
    return (
      <View style={styles.container}>
        <ScrollView style={styles.flex}>
          <KeyboardAvoidingView style={styles.flex} behavior="padding">
            {/* <View style={styles.margin}>
              <SegmentedControlTab
                tabStyle={{ borderColor: backgroundColor }}
                activeTabStyle={{ backgroundColor }}
                tabTextStyle={{ color: backgroundColor }}
                values={property_type_Location}
                selectedIndex={statusSelectedIndex}
                onTabPress={this.selectPropertyStatus}
              />
            </View> */}
            {OS === 'ios' ? (
              <Panel title={pp_propertyType} text={propertyTypeLo}>
                {this.renderPropertyType()}
              </Panel>
            ) : (
              <View style={styles.margin}>
                <Text style={styles.label}>{pp_propertyType}</Text>
                {this.renderPropertyType()}
              </View>
            )}
            {OS === 'ios' ? (
              <Panel title="Price Range" data={search.priceRange}>
                {this.renderPriceRange()}
              </Panel>
            ) : (
              <View style={styles.margin}>
                <Text style={styles.label}>{I18n.t('price_range').toProperCase()}</Text>
                {this.renderPriceRange()}
              </View>
            )}
            <View style={styles.margin}>
              <Text style={styles.label}>{I18n.t('pp_pro_type').toProperCase()}</Text>
              <MultiSelect
                multiSelectData={pl}
                selectedValues={search.propertyType}
                onSelect={this.selectPropertyType}
              />
              {OS === 'ios' && <View style={[styles.divider, { bottom: 0 }]} />}
            </View>
            <View style={styles.margin}>
              <Text style={styles.label}>{I18n.t('pp_rooms').toProperCase()}</Text>
              <SegmentedControlTab
                tabStyle={{ borderColor: backgroundColor }}
                activeTabStyle={{ backgroundColor }}
                tabTextStyle={{ color: backgroundColor }}
                values={['Any', '1+', '2+', '3+', '4+']}
                selectedIndex={search.rooms}
                onTabPress={this.selectRooms}
              />
            </View>
            <View style={styles.margin}>
              <Text style={styles.label}>{I18n.t('baths').toProperCase()}</Text>
              <SegmentedControlTab
                tabStyle={{ borderColor: backgroundColor }}
                activeTabStyle={{ backgroundColor }}
                tabTextStyle={{ color: backgroundColor }}
                values={['Any', '1+', '2+', '3+', '4+']}
                selectedIndex={search.baths}
                onTabPress={this.selectBaths}
              />
            </View>
            {OS === 'ios' ? (
              <Panel title="Square Meter Range" data={search.squareMeterRange}>
                {this.renderArea()}
              </Panel>
            ) : (
              <View style={styles.margin}>
                <Text style={styles.label}>{I18n.t('sq_m_range').toProperCase()}</Text>
                {this.renderArea()}
              </View>
            )}

            {this.state.showAll && (
              <View>
                {OS === 'ios' ? (
                  <Panel title="Year Built" data={search.yearBuilt}>
                    {this.renderYearBuilt(years)}
                  </Panel>
                ) : (
                  <View style={styles.margin}>
                    <Text style={styles.label}>{I18n.t('yr_built').toProperCase()}</Text>
                    {this.renderYearBuilt(years)}
                  </View>
                )}
                <View style={styles.margin}>
                  <Text style={styles.label}>{I18n.t('pp_district').toProperCase()}</Text>
                  <TextInput
                    style={styles.textInput}
                    value={search.district}
                    placeholder={I18n.t('pp_district').toProperCase()}
                    onChangeText={district => this.setState({ search: { ...search, district } })}
                    autoCapitalize={'words'}
                  />
                </View>
              </View>
            )}
            <View style={styles.rowCenter}>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() =>
                  this.setState({
                    showAll: !this.state.showAll,
                  })}
              >
                <View>
                  <Text style={styles.padding}>
                    {this.state.showAll ? `${I18n.t('show_less').toProperCase()}` : `${I18n.t('show_more').toProperCase()}`}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        <View style={styles.tabBar}>
          <TouchableOpacity onPress={this.resetForm}>
            <View>
              <Text style={styles.label}>{I18n.t('reset').toProperCase()}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
              <Icon
                style={{ marginRight: 10 }}
                name={Platform.OS === 'ios' ? 'ios-heart-outline' : 'md-heart-outline'}
                size={20}
              />
              <Text style={styles.label}>{I18n.t('save_search').toProperCase()}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.searchForm}>
            <View>
              <Text style={styles.label}>{I18n.t('ft_search').toProperCase()}</Text>
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
  onFilter: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
};

export default filterPage;
