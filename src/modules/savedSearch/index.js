import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AsyncStorage, View, FlatList, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import SavedSearchCard from '../../components/SavedSearchCard';
import * as PropertiesActions from './../../Actions/PropertiesAction';
import { backgroundColor, PUBLIC_URL } from "../../constants/config";
import I18n from '../../i18n';
import axios from "axios";

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.toProperCase = function() {
  return this.toLowerCase().replace(/^(.)|\s(.)/g, 
    function($1) { return $1.toUpperCase(); });
}

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: props.auth,
      isRefeshing: false,
      dummyDataArr: [],
    };
    this.onRefresh = this.onRefresh.bind(this);
    this.pushDetail = this.pushDetail.bind(this);
    this.closeModel = this.closeModel.bind(this);
    this.openLogin = this.openLogin.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  authsuccessFunction = (auth) => {    
    if (auth.success) {
    axios
      .post(`${PUBLIC_URL}getSearch`, { "user_id": auth.success.id })
      .then((response) => {
        this.setState({ urlData: response.data });        
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
      
      let propertyStatus = 33,
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
      district = this.getQueryString('state', data);
      region = this.getQueryString('location', data);

      let statusForPro = this.getQueryString('status', data);
      let typeProLocal = this.getQueryString('type', data);     

      propertyTypeValue = typeProLocal.toProperCase();      

      if(statusForPro === "for-rent") {
          propertyStatus = 33;
      }
      if(statusForPro === "for-sale") {
          propertyStatus = 34;
      }
      if(statusForPro === "future-developments") {
          propertyStatus = 108;
      }
      if(statusForPro === "new-construction-2") {
          propertyStatus = 319;
      }
      if(statusForPro === "sold") {
          propertyStatus = 217;
      }
      if(statusForPro === "rented") {
          propertyStatus = 218;
      }

      if(typeProLocal === "apartment") {
          propertyTypeKey = 13;
      }
      if(typeProLocal === "building") {
          propertyTypeKey = 107;
      }
      if(typeProLocal === "office") {
          propertyTypeKey = 221;
      }
      if(typeProLocal === "showroom") {
          propertyTypeKey = 219;
      }
      if(typeProLocal === "villa") {
          propertyTypeKey = 89;
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
        "region": region.replace(/-/g,' ').toProperCase()
      };

      tempStoreUrlArr.push(objectPush);

    })

    this.setState({ dummyDataArr: tempStoreUrlArr, isRefeshing: false });
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

  componentWillMount() {
    this.props.actions.savedSearchLoad();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth && JSON.stringify(this.state.auth) !== JSON.stringify(nextProps.auth)) {
      this.setState({ auth: nextProps.auth });
      nextProps.auth.success && this.authsuccessFunction(nextProps.auth);      
    }
  }

  onRefresh() {
    // this.props.actions.savedSearchLoad();
    this.setState({ isRefeshing: true });
    const { auth } = this.state;
    this.authsuccessFunction(auth);
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabSelected' && event.selectedTabIndex === 3) {
      if (!this.state.auth.success) {
        this.openLogin();
      }
    }
  }

  openLogin() {
    this.props.navigator.showModal({
      screen: 'krooqi.Login',
      passProps: {
        label: `${I18n.t('to_save_a_home').capitalize()}`,
      },
      navigatorStyle: {
        navBarHidden: true,
        screenBackgroundColor: 'white',
      },
      animationType: 'slide-up',
    });
  }

  closeModel() {
    this.props.navigator.dismissModal({
      animationType: 'slide-down',
    });
  }

  pushDetail(item) {
    this.props.actions.filteredPropertiesLoad(item);
    this.props.navigator.switchToTab({
      tabIndex: 0,
    });
  }

  _showUrlPara = ({item, index }) => {

    let value = "";
    if (item.propertyStatus !== "") {
      if(item.propertyStatus === 33) {
          value = "For Rent";
      }
      if(item.propertyStatus === 34) {
          value = "For Sale";
      }
      if(item.propertyStatus === 108) {
          value = "Future Developments";
      }
      if(item.propertyStatus === 319) {
          value = "New Construction";
      }
      if(item.propertyStatus === 217) {
          value = "Sold";
      }
      if(item.propertyStatus === 218) {
          value = "Rented";
      }
    }
    return <View style={{ padding: 10, }}>
      <View>
        <Text style={{ fontWeight: '600', fontSize: 18, paddingBottom: 10,  }}>{index+1}) {I18n.t('insavedSearchParameter').toProperCase()} :</Text>
        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
          {
            item.propertyStatus !== "" && <Text style={{ paddingRight: 10, }}><Text style={{ fontWeight: '600' }}>{I18n.t('inSavedSearchStatus').capitalize()} : </Text> {value}</Text>
          }
          {
            item.priceRange.start !== "" && <Text style={{ paddingRight: 10, }}><Text style={{ fontWeight: '600' }}>{I18n.t('inSavedSearchMinPrice').capitalize()} : </Text> {item.priceRange.start}</Text>
          }
          {
            item.priceRange.end !== "" && <Text style={{ paddingRight: 10, }}><Text style={{ fontWeight: '600' }}>{I18n.t('inSavedSearchMaxPrice').capitalize()} : </Text> {item.priceRange.end}</Text>
          }
          {
            item.propertyType.length > 0 && <Text style={{ paddingRight: 10, }}><Text style={{ fontWeight: '600' }}>{I18n.t('inSavedSearchPropertyType').capitalize()} : </Text> {item.propertyType[0].value}</Text>
          }
          {
            item.rooms !== "" && <Text style={{ paddingRight: 10, }}><Text style={{ fontWeight: '600' }}>{I18n.t('inSavedSearchNoOfBedrooms').capitalize()} : </Text> {item.rooms}</Text>
          }
          {
            item.baths !== "" && <Text style={{ paddingRight: 10, }}><Text style={{ fontWeight: '600' }}>{I18n.t('inSavedSearchNoOfBathrooms').capitalize()} : </Text> {item.baths}</Text>
          }
          {
            item.squareMeterRange.start !== "" && <Text style={{ paddingRight: 10, }}><Text style={{ fontWeight: '600' }}>{I18n.t('inSavedSearchMinArea').capitalize()} : </Text> {item.squareMeterRange.start}</Text>
          }
          {
            item.squareMeterRange.end !== "" && <Text style={{ paddingRight: 10, }}><Text style={{ fontWeight: '600' }}>{I18n.t('inSavedSearchMaxArea').capitalize()} : </Text> {item.squareMeterRange.end}</Text>
          }
          {
            item.yearBuilt.start !== "" && <Text style={{ paddingRight: 10, }}><Text style={{ fontWeight: '600' }}>{I18n.t('inSavedSearchMinYearBuilt').capitalize()} : </Text> {item.yearBuilt.start}</Text>
          }
          {
            item.yearBuilt.end !== "" && <Text style={{ paddingRight: 10, }}><Text style={{ fontWeight: '600' }}>{I18n.t('inSavedSearchMaxYearBuilt').capitalize()} : </Text> {item.yearBuilt.end}</Text>
          }
          {
            item.region !== "" && <Text style={{ paddingRight: 10, }}><Text style={{ fontWeight: '600' }}>{I18n.t('inSavedSearchRegion').capitalize()} : </Text> {item.region}</Text>
          }
          {
            item.district !== "" && <Text style={{ paddingRight: 10, }}><Text style={{ fontWeight: '600' }}>{I18n.t('inSavedSearchCity').capitalize()} : </Text> {item.district}</Text>
          }
        </View>
      </View>
      <View style={{ marginTop: 10 }}>
        <TouchableOpacity onPress={() => this.searcheAgain(item)}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: backgroundColor, paddingLeft: 15, paddingRight: 15}}>
              <Text style={{ fontSize: 15, padding: 5, color: "#fff", textAlign: 'center' }}>
                {I18n.t('inSavedSearchSearch').capitalize()}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  }

  searcheAgain = (search) => {
    this.props.navigator.push({
      screen: 'krooqi.FilterResultPage',
      title: `${I18n.t('result_filters').toProperCase()}`,
    });
    this.props.actions.filteredPropertiesLoadOnSearch(search);
  }

  render() {
    const { savedSearch, auth } = this.props;
    const { urlData, dummyDataArr, isRefeshing } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {/* {loading && Platform.OS === 'ios' && <Loading />} */}
        {auth.success ? (
          <View style={{ flex: 1 }}>
            {
              dummyDataArr.length > 0 ? (
              <FlatList
                data={dummyDataArr}
                renderItem={this._showUrlPara}
                ItemSeparatorComponent={() => (
                  <View style={{ borderBottomWidth: 1, borderColor: 'gray' }} />
                )}
                keyExtractor={(item, index) => index}
                refreshing={isRefeshing}
                onRefresh={this.onRefresh}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 40,
                }}
              >
                <Text style={{ lineHeight: 30, fontSize: 20 }}>{I18n.t('ft_saved_search').capitalize()}</Text>
                <Text
                  style={{
                    lineHeight: 25,
                    fontSize: 16,
                    color: 'gray',
                    textAlign: 'center',
                  }}
                >
                  {I18n.t('sav_not_msg').capitalize()}
                </Text>
                <Text
                  style={{
                    lineHeight: 25,
                    fontSize: 16,
                    color: 'gray',
                    textAlign: 'center',
                  }}
                >
                  {I18n.t('sav_search_msg').capitalize()}
                </Text>
              </View>
            )}
          </View>
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{I18n.t('sav_lg_msg').capitalize()}</Text>
            <TouchableHighlight onPress={this.openLogin} underlayColor="#f1f1f1">
              <View
                style={{
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 4,
                  margin: 10,
                  borderColor: 'gray',
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: '400' }}>{I18n.t('m_login').toProperCase()}</Text>
              </View>
            </TouchableHighlight>
          </View>
        )}
      </View>
    );
  }
}

Favorites.propTypes = {
  navigator: PropTypes.object.isRequired,
  savedSearch: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  savedSearch: state.savedSearch,
  auth: state.auth,
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(PropertiesActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
