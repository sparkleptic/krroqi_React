import React, { Component } from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
  AsyncStorage,
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
  PUBLIC_URL,
} from '../../constants/config';
import MultiSelect from '../../inputControls/MultiSelect';
import I18n from '../../i18n';
import styles from './styles';
import InitialState from '../../reducers/initialState';
import Panel from '../Panel';
import * as commonActions from '../../Actions/commonActions';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.toProperCase = function() {
  return this.toLowerCase().replace(/^(.)|\s(.)/g, 
    function($1) { return $1.toUpperCase(); });
}

var citiesArr = ['Asir','Jeddah Province','Makkah Province','Qassim','Riyadh Province','Tabuk'];
var districtsArr = ['Al Khunayqiyah','Jeddah','Labkhah','Mecca','Riyadh'];

let string1 = "/advanced-search/?keyword=&property_id=";

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
      districtLo: '',
      branchLo: '',
      apiRegion: [],
      apiCity: [],
      isSavedSearch: false,
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

  componentDidMount() {
  AsyncStorage.getItem('lang').then((value) => {

      let lang = 'en';
      if(value == null){
        lang = 'en';
      }else{
        lang = value;
      }

      axios
        .get(`${PUBLIC_URL}getRegions/${lang}`)
        .then((response) => {
          this.setState({ apiRegion: response.data })
          // alert(JSON.stringify(response));
        })
        .catch((error) => {
          // do nothing
        });

      axios
        .get(`${PUBLIC_URL}getCities/${lang}`)
        .then((response) => {
          this.setState({ apiCity: response.data })
        })
        .catch((error) => {
          // do nothing
        });

      }).done();
      AsyncStorage.getItem('searchParaKrooqi').then((value) => {
        if(value == null){
          // do nothing
        }else{
          this.setState({ search: JSON.parse(value) })
        }        
      }).done();
  }

  renderPropertyType() {
    const { propertyTypeLo, search } = this.state;
    let For_Rent = `${I18n.t('pp_for_rent').toProperCase()}`;
    let For_Sale = `${I18n.t('pp_for_sale').toProperCase()}`;
    let Devlopment = `${I18n.t('pp_for_development').toProperCase()}`;
    let New_Construction = `${I18n.t('pp_for_construction').toProperCase()}`;
    let Sold = `${I18n.t('pp_for_sold').toProperCase()}`;
    let Rented = `${I18n.t('pp_for_rented').toProperCase()}`;
    let PropertyTypeArr =  [For_Rent, For_Sale, Devlopment, New_Construction, Sold, Rented];

    let termId = 0;
    let index = search.propertyStatus;
    if (index === `${I18n.t('proStatusValueRent')}`) {
      termId = 0;
    } else if (index === `${I18n.t('proStatusValueSale')}`) {
      termId = 1;
    } else if (index === `${I18n.t('proStatusValueFutureDev')}`) {
      termId = 2;
    } else if (index === `${I18n.t('proStatusValueNewConst')}`) {
      termId = 3;
    } else if (index === `${I18n.t('proStatusValueSold')}`) {
      termId = 4;
    } else if (index === `${I18n.t('proStatusValueRented')}`) {
      termId = 5;
    }

    return (
      <View>
        <Picker mode="dropdown" selectedValue={termId} onValueChange={ (value) => {this.selectPropertyStatus(value)}}>
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

  _saveSearch = () => {
    const { auth } = this.props;
    const { search } = this.state;

    this._convertIntoString(search);

    let dataSent = {
      "user_id": auth.success.id,
      "search_arg": "from_mobile",
      "email": auth.success.email,
      "search_url": string1
    }

    console.log("dataSent");
    console.log(dataSent);
    
    
    axios
      .post(`${PUBLIC_URL}addSearch`, dataSent)
      .then((response) => {
        if (response.data.status) {
          this.setState({ isSavedSearch: true });
          this.authsuccessFunction(auth);
        }
        string1 = "/advanced-search/?keyword=&property_id=";
      })
      .catch((error) => {
        console.log(error);        
        string1 = "/advanced-search/?keyword=&property_id=";
      });    
  }

  authsuccessFunction = (auth) => {
    if (auth.success) {
    axios
      .post(`${PUBLIC_URL}getSearch`, { "user_id": auth.success.id })
      .then((response) => {       
        this.creatingObjFromUrl(response.data);
      })
      .catch((error) => {
        console.log(error)
      });
    }
  }

  creatingObjFromUrl = (urlArr) => {

    let tempStoreUrlArr = [];  
    
    urlArr.map((dataUrl, index) => {
      
      let data = dataUrl.url;
      
      let propertyStatus = `${I18n.t('proStatusValueRent')}`,
        priceRangeStart = "",
        priceRangeEnd = "", 
        rooms = "", 
        baths = "", 
        squareMeterRangeStart = "", 
        squareMeterRangeEnd = "", 
        yearBuiltStart = "", 
        yearBuilttEnd = "", 
        district = "", 
        region = "", 
        propertyTypeKey = "", 
        propertyTypeValue = "";
      let propertyTypeArr = [];
      
      priceRangeStart = this.getQueryString('min-price', data);
      priceRangeEnd = this.getQueryString('max-price', data);
      rooms = this.getQueryString('bedrooms', data);
      baths = this.getQueryString('bathrooms', data);
      squareMeterRangeStart = this.getQueryString('min-area', data);
      squareMeterRangeEnd = this.getQueryString('max-area', data);
      yearBuiltStart = this.getQueryString('min-yrbuilt', data);
      yearBuilttEnd = this.getQueryString('max-yrbuilt', data);
      district = this._getRegion(this.getQueryString('state', data));
      region = this._getDistrict(this.getQueryString('location', data));

      let statusForPro = this.getQueryString('status', data);
      let typeProLocal = this.getQueryString('type', data);     

      propertyTypeValue = typeProLocal.toProperCase();      

      if(statusForPro === `${I18n.t('proStatusNameRent')}`) {
          propertyStatus = `${I18n.t('proStatusValueRent')}`;
      }
      if(statusForPro === `${I18n.t('proStatusNameSale')}`) {
          propertyStatus = `${I18n.t('proStatusValueSale')}`;
      }
      if(statusForPro === `${I18n.t('proStatusNameFutureDev')}`) {
          propertyStatus = `${I18n.t('proStatusValueFutureDev')}`;
      }
      if(statusForPro === `${I18n.t('proStatusNameNewConst')}`) {
          propertyStatus = `${I18n.t('proStatusValueNewConst')}`;
      }
      if(statusForPro === `${I18n.t('proStatusNameSold')}`) {
          propertyStatus = `${I18n.t('proStatusValueSold')}`;
      }
      if(statusForPro === `${I18n.t('proStatusNameRented')}`) {
          propertyStatus = `${I18n.t('proStatusValueRented')}`;
      }

      if(typeProLocal === `${I18n.t('proTypeNameApartment')}`) {
          propertyTypeKey = `${I18n.t('proTypeValueApartment')}`;
      }
      if(typeProLocal === `${I18n.t('proTypeNameBuilding')}`) {
          propertyTypeKey = `${I18n.t('proTypeValueBuilding')}`;
      }
      if(typeProLocal === `${I18n.t('proTypeNameOffice')}`) {
          propertyTypeKey = `${I18n.t('proTypeValueOffice')}`;
      }
      if(typeProLocal === `${I18n.t('proTypeNameShowroom')}`) {
          propertyTypeKey = `${I18n.t('proTypeValueShowroom')}`;
      }
      if(typeProLocal === `${I18n.t('proTypeNameVilla')}`) {
          propertyTypeKey = `${I18n.t('proTypeValueVilla')}`;
      }

      if (propertyTypeKey !== "" && propertyTypeValue !== "") {
        propertyTypeArr = [{"key": propertyTypeKey, "value": propertyTypeValue}];        
      }

      let objectPush = {
        "propertyStatus": propertyStatus,
        "priceRange": {
          "start": priceRangeStart,
          "end": priceRangeEnd
        },
        "propertyType": propertyTypeArr,
        "rooms": rooms,
        "baths": baths,
        "squareMeterRange": {
          "start": squareMeterRangeStart.replace('+Sq+m',''),
          "end": squareMeterRangeEnd.replace('+Sq+m','')
        },
        "yearBuilt": {
          "start": yearBuiltStart,
          "end": yearBuilttEnd
        },
        "district": district.replace(/-/g,' ').toProperCase(),
        "region": region.replace(/-/g,' ').toProperCase(),
        "id": dataUrl.id
      };

      tempStoreUrlArr.push(objectPush);

    })

    this.props.actions.updateSaveSearch(tempStoreUrlArr);
    // console.log("JSON.stringify(tempStoreUrlArr)");
    // console.log(JSON.stringify(tempStoreUrlArr));
  }

  getQueryString = ( field, url ) => {
    let href = url;
    let reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
    let string = reg.exec(href);
    // return string ? string[1] : null;
    return string ? (string[1]  === undefined || string[1]  === null || string[1]  === "" ? "" : string[1] ) : "";
  };

  _getDistrict = (slug) => {
    const { apiCity } = this.state;
    for (let index = 0; index < apiCity.length; index++) {
      if (slug === apiCity[index].slug) {
        return apiCity[index].name;
      }
    }
      return slug;
  }

  _getRegion = (slug) => {
    const { apiRegion } = this.state;
    for (let index = 0; index < apiRegion.length; index++) {
      if (slug === apiRegion[index].slug) {
        return apiRegion[index].name;
      }
    }
      return slug;
  }

  resetForm() {
    this.setState({ search: {...InitialState.search, propertyStatus: `${I18n.t('proStatusValueRent')}` }, isSavedSearch: false });
  }

  searchForm() {

    AsyncStorage.setItem("searchParaKrooqi", JSON.stringify(this.state.search));
    
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
    this.setState({ search: newVal, isSavedSearch: false });    
  }

  selectMaxPrice(value) {
    const { search } = this.state;
    const newVal = {
      ...search,
      priceRange: { ...search.priceRange, end: value },
    };
    this.setState({ search: newVal, isSavedSearch: false });
  }

  selectMinArea(start) {
    const { search } = this.state;
    const newVal = {
      ...search,
      squareMeterRange: { ...search.squareMeterRange, start },
    };
    this.setState({ search: newVal, isSavedSearch: false });
  }

  selectMaxArea(end) {
    const { search } = this.state;
    const newVal = {
      ...search,
      squareMeterRange: { ...search.squareMeterRange, end },
    };
    this.setState({ search: newVal, isSavedSearch: false });
  }

  selectMinYear(start) {
    const { search } = this.state;
    const newVal = {
      ...search,
      yearBuilt: { ...search.yearBuilt, start },
    };
    this.setState({ search: newVal, isSavedSearch: false });
  }

  selectMaxYear(end) {
    const { search } = this.state;
    const newVal = {
      ...search,
      yearBuilt: { ...search.yearBuilt, end },
    };
    this.setState({ search: newVal, isSavedSearch: false });
  }

  selectRooms(rooms) {
    const { search } = this.state;
    this.setState({ search: { ...search, rooms }, isSavedSearch: false });
  }

  selectBaths(baths) {
    const { search } = this.state;
    this.setState({ search: { ...search, baths }, isSavedSearch: false });
  }

  handleIndexChange = (index) => {
    this.setState({
      ...this.state,
      selectedIndex: index, 
      isSavedSearch: false
    });
  };

  selectPropertyType(value) {
    const { search } = this.state;
    const newVal = { ...search, propertyType: value };
    this.setState({ search: newVal, isSavedSearch: false });
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
      termId = `${I18n.t('proStatusValueRent')}`;
    } else if (index === 1) {
      termId = `${I18n.t('proStatusValueSale')}`;
    } else if (index === 2) {
      termId = `${I18n.t('proStatusValueFutureDev')}`;
    } else if (index === 3) {
      termId = `${I18n.t('proStatusValueNewConst')}`;
    } else if (index === 4) {
      termId = `${I18n.t('proStatusValueSold')}`;
    } else if (index === 5) {
      termId = `${I18n.t('proStatusValueRented')}`;
    }
    const { search } = this.state;
    const newVal = { ...search, propertyStatus: termId };
    this.setState({ search: { ...search, propertyStatus: termId }, propertyTypeLo: index, isSavedSearch: false  });
  }

  selectDistrict = (district) => {
    const { search } = this.state;
    this.setState({ search: { ...search, district }, districtLo: district, isSavedSearch: false });
  }

  selectBranch = (region) => {
    const { search, apiRegion } = this.state;

    // let branchLoRegion = "";

    // for (let index = 0; index < apiRegion.length; index++) {
    //   if (region === apiRegion[index].slug) {
    //     branchLoRegion = apiRegion[index].name;
    //   }      
    // }
    this.setState({ search: { ...search, region }, branchLo: region, isSavedSearch: false });
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
            <Picker.Item label={I18n.t('min_area').toProperCase()} value="" />
            {minArea.map(item => (
              <Picker.Item
                key={item}
                value={`${item}`}
                label={`${I18n.toNumber(item, { precision: 0 })} ${I18n.t('sqmWord')}`}
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
            <Picker.Item label={I18n.t('max_area').toProperCase()} value="" />
            {maxArea.map(item => (
              <Picker.Item
                key={item}
                value={`${item}`}
                label={`${I18n.toNumber(item, { precision: 0 })} ${I18n.t('sqmWord')}`}
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
            <Picker.Item label={I18n.t('min_price').toProperCase()} value="" />
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
            <Picker.Item label={I18n.t('max_price').toProperCase()} value="" />
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
            <Picker.Item label={I18n.t('min_built_yr').toProperCase()} value="" />
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
            <Picker.Item label={I18n.t('max_built_yr').toProperCase()} value="" />
            {years.map(item => <Picker.Item key={item} value={`${item}`} label={`${item}`} />)}
          </Picker>
          {Platform.OS !== 'ios' && <View style={styles.divider} />}
        </View>
      </View>
    );
  }

  renderBranch() {
    const { branchLo, apiRegion, search } = this.state;
    const pp_branch = `${I18n.t('pp_branch').capitalize()}`;
    const pp_region = `${I18n.t('pp_region').capitalize()}`;
    if (apiRegion.length > 0) {
    return (
      <View>
        <Picker mode="dropdown" selectedValue={search.region} onValueChange={(value) => {this.selectBranch(value)}}>
          <Picker.Item label={pp_region} value="" />
          {
            apiRegion.length > 0 && (
              apiRegion.map((city, i) => {
              return  <Picker.Item key={i} label={city.name} value={city.slug} />     
              })
            )
          }
        </Picker>
        {Platform.OS !== 'ios' && <View style={styles.divider} />}
      </View>
    );
    }
  }

  renderDistrict() {
    const { districtLo, apiCity, branchLo, search } = this.state;
    const pp_district = `${I18n.t('pp_district').capitalize()}`;
    const pp_city = `${I18n.t('pp_city').capitalize()}`;

    let mapRenderArray = [];

    if (apiCity.length > 0) {
      if (branchLo !== null && branchLo !== '') {

        apiCity.map((district, i) => {
          if (branchLo !== null && branchLo !== '' && branchLo === district.region_slug) {
          mapRenderArray.push(district)
          }
        })
        if (mapRenderArray.length == 0) {
          mapRenderArray.push({'name': branchLo});      
        }
      }else{
        mapRenderArray = apiCity;
      }
    }

    if (apiCity.length > 0) {
    return (
      <View>
        <Picker mode="dropdown" selectedValue={search.district} onValueChange={(value) => {this.selectDistrict(value)}}>
          <Picker.Item label={pp_city} value="" />
          {
            mapRenderArray.length > 0 && (
              mapRenderArray.map((district, i) => {
              return  <Picker.Item key={i} label={district.name} value={district.slug} />     
              })
            )
          }
        </Picker>
        {Platform.OS !== 'ios' && <View style={styles.divider} />}
      </View>
    );
    }
  }

_convertIntoString = (object1) => {
  for (let key1 in object1) {

    if((typeof object1[key1] === "object") && (key1 === "propertyType")) {
      	let finalpara = "type";
        let value = "";
        if(object1[key1][0]){
        	value = object1[key1][0].value.toLowerCase();
        }
      	string1 = string1 + `&${finalpara}=${value}`;
    }
    
  	if((typeof object1[key1] === "object") && (key1 !== "propertyType")) {
    	let object2 = object1[key1];
        let parameterPass = "";
        let areaAdditional = "";
        if (key1 === "priceRange") {
        	parameterPass = "price";
        }
        if (key1 === "squareMeterRange") {
          parameterPass = "area";
        }
        if (key1 === "yearBuilt") {
        	parameterPass = "yrbuilt";
        }
    	for (let key2 in object2) {
          let innerparaPass = "";
          if (key2 === "start") {
              innerparaPass = "min";
          }
          if (key2 === "end") {
              innerparaPass = "max";
          }
          if (parameterPass === "area") {
            if (object2[key2] !== "") {
              areaAdditional = "+Sq+m";            
            }
          }
          let finalpara = innerparaPass + "-" + parameterPass;
          string1 = string1 + `&${finalpara}=${object2[key2]}${areaAdditional}`;          
        }
    }
    
    if(typeof object1[key1] === "number") {
        if(key1 === "propertyStatus"){
        	let finalpara = "status";
            let value = "";
            if(object1[key1] === `${I18n.t('proStatusValueRent')}`) {
              value = `${I18n.t('proStatusNameRent')}`;
            }
            if(object1[key1] === `${I18n.t('proStatusValueSale')}`) {
              value = `${I18n.t('proStatusNameSale')}`;
            }
            if(object1[key1] === `${I18n.t('proStatusValueFutureDev')}`) {
              value = `${I18n.t('proStatusNameFutureDev')}`;
            }
            if(object1[key1] === `${I18n.t('proStatusValueNewConst')}`) {
              value = `${I18n.t('proStatusNameNewConst')}`;
            }
            if(object1[key1] === `${I18n.t('proStatusValueSold')}`) {
              value = `${I18n.t('proStatusNameSold')}`;
            }
            if(object1[key1] === `${I18n.t('proStatusValueRented')}`) {
              value = `${I18n.t('proStatusNameRented')}`;
            }
            string1 = string1 + `&${finalpara}=${value}`;
        }
      
      	if(key1 !== "propertyStatus"){
          let finalpara = "";
          let value = "";
          if(key1 === "rooms") {
          	finalpara = "bedrooms";
          }
          if(key1 === "baths") {
          	finalpara = "bathrooms";
          }
          if (object1[key1] !== 0) {
            value = object1[key1];
          }
          	string1 = string1 + `&${finalpara}=${value}`;
        }
    }
    
    if(typeof object1[key1] === "string") {
        let finalpara = "";
        let value = "";
        if(key1 === "district") {
          finalpara = "location";
          value = object1[key1].replace(/\s+/g, '-').toLowerCase();
        }
        if(key1 === "region") {
          finalpara = "state";
          value = object1[key1].replace(/\s+/g, '-').toLowerCase();
        }
        if(key1 === "rooms") {
          finalpara = "bedrooms";
        }
        if(key1 === "baths") {
          finalpara = "bathrooms";
        }
          string1 = string1 + `&${finalpara}=${value}`;
    }
  }
}

  render() {
    const { OS } = Platform;
    const { propertyTypes, auth } = this.props;
    const { search, propertyTypeLo, districtLo, branchLo, isSavedSearch } = this.state;
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

    let termIdValue = `${I18n.t('pp_for_rent').toProperCase()}`;
    if (search.propertyStatus === 0) {
      termIdValue = `${I18n.t('pp_for_rent').toProperCase()}`;
    } else if (search.propertyStatus === 34) {
      termIdValue = `${I18n.t('pp_for_sale').toProperCase()}`;
    } else if (search.propertyStatus === 108) {
      termIdValue = `${I18n.t('pp_for_development').toProperCase()}`;
    } else if (search.propertyStatus === 319) {
      termIdValue = `${I18n.t('pp_for_construction').toProperCase()}`;
    } else if (search.propertyStatus === 217) {
      termIdValue = `${I18n.t('pp_for_sold').toProperCase()}`;
    } else if (search.propertyStatus === 218) {
      termIdValue = `${I18n.t('pp_for_rented').toProperCase()}`;
    }
    const years = Array(100)
      .fill()
      .map((_, i) => moment().year() - i);

    const pp_propertyType = `${I18n.t('pp_propertyType').capitalize()}`;
    let For_Rent = `${I18n.t('pp_for_rent').toProperCase()}`;
    let For_Sale = `${I18n.t('pp_for_sale').toProperCase()}`;
    let Devlopment = `${I18n.t('pp_for_development').toProperCase()}`;
    const pp_region = `${I18n.t('pp_region').capitalize()}`;
    const pp_city = `${I18n.t('pp_city').capitalize()}`;    
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
              <Panel title={pp_propertyType} text={termIdValue}>
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
                {OS === 'ios' ? (
                  <Panel title={pp_region} text={branchLo}>
                    {this.renderBranch()}
                  </Panel>
                ) : (
                  <View style={styles.margin}>
                    <Text style={styles.label}>{pp_region} </Text>
                    {this.renderBranch()}
                  </View>
                )}
                {/* <View style={styles.margin}>
                  <Text style={styles.label}>{I18n.t('pp_district').toProperCase()}</Text>
                  <TextInput
                    style={styles.textInput}
                    value={search.district}
                    placeholder={I18n.t('pp_district').toProperCase()}
                    onChangeText={district => this.setState({ search: { ...search, district } })}
                    autoCapitalize={'words'}
                  />
                </View> */}
                {OS === 'ios' ? (
                  <Panel title={pp_city} text={districtLo}>
                    {this.renderDistrict()}
                  </Panel>
                ) : (
                  <View style={styles.margin}>
                    <Text style={styles.label}>{pp_city}</Text>
                    {this.renderDistrict()}
                  </View>
                )}
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
          {
            auth.success && 
            <TouchableOpacity onPress={() => this._saveSearch()} >
              <View style={{ flexDirection: 'row' }}>
                {
                  isSavedSearch ? <Icon
                    style={{ marginRight: 10 }}
                    name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'}
                    size={20}
                  /> : <Icon
                    style={{ marginRight: 10 }}
                    name={Platform.OS === 'ios' ? 'ios-heart-outline' : 'md-heart-outline'}
                    size={20}
                  />
                }
                <Text style={styles.label}>{I18n.t('save_search').toProperCase()}</Text>
              </View>
            </TouchableOpacity>
          }
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

const mapStateToProps = state => ({
  auth: state.auth,
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(commonActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(filterPage);
