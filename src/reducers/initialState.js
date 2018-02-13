import * as config from '../constants/config';

let array = [{"term_id":12,"name":"Air Conditioning","slug":"air-conditioning","term_group":0,"term_order":0,"term_taxonomy_id":12,"taxonomy":"property_feature","description":"","parent":0,"count":13},{"term_id":14,"name":"Barbeque","slug":"barbeque","term_group":0,"term_order":0,"term_taxonomy_id":14,"taxonomy":"property_feature","description":"","parent":0,"count":7},{"term_id":30,"name":"Dryer","slug":"dryer","term_group":0,"term_order":0,"term_taxonomy_id":30,"taxonomy":"property_feature","description":"","parent":0,"count":9},{"term_id":37,"name":"Gym","slug":"gym","term_group":0,"term_order":0,"term_taxonomy_id":37,"taxonomy":"property_feature","description":"","parent":0,"count":6},{"term_id":46,"name":"Laundry","slug":"laundry","term_group":0,"term_order":0,"term_taxonomy_id":46,"taxonomy":"property_feature","description":"","parent":0,"count":9},{"term_id":47,"name":"Graden","slug":"garden","term_group":0,"term_order":0,"term_taxonomy_id":47,"taxonomy":"property_feature","description":"","parent":0,"count":5},{"term_id":57,"name":"Microwave","slug":"microwave","term_group":0,"term_order":0,"term_taxonomy_id":57,"taxonomy":"property_feature","description":"","parent":0,"count":11},{"term_id":76,"name":"Refrigerator","slug":"refrigerator","term_group":0,"term_order":0,"term_taxonomy_id":76,"taxonomy":"property_feature","description":"","parent":0,"count":10},{"term_id":79,"name":"Sauna","slug":"sauna","term_group":0,"term_order":0,"term_taxonomy_id":79,"taxonomy":"property_feature","description":"","parent":0,"count":4},{"term_id":82,"name":"Swimming Pool","slug":"swimming-pool","term_group":0,"term_order":0,"term_taxonomy_id":82,"taxonomy":"property_feature","description":"","parent":0,"count":5},{"term_id":87,"name":"TV Cable","slug":"tv-cable","term_group":0,"term_order":0,"term_taxonomy_id":87,"taxonomy":"property_feature","description":"","parent":0,"count":11},{"term_id":90,"name":"Washer","slug":"washer","term_group":0,"term_order":0,"term_taxonomy_id":90,"taxonomy":"property_feature","description":"","parent":0,"count":10},{"term_id":92,"name":"WiFi","slug":"wifi","term_group":0,"term_order":0,"term_taxonomy_id":92,"taxonomy":"property_feature","description":"","parent":0,"count":11},{"term_id":308,"name":"Shared Pool","slug":"shared-pool","term_group":0,"term_order":0,"term_taxonomy_id":308,"taxonomy":"property_feature","description":"","parent":0,"count":3}]

export default {
  common: {
    loading: false,
    error: false,
    success: false,
  },
  search: config.search,
  PostProperty: {
  	propertyFor: 33,
  	region: '',
  	branch: '',
  	district: '',
  	address: '',
  	unitFloor: '',
  	locationOnMap: '',
  	propertyTitle: '',
  	propertyDescription: '',
  	ownerName: '',
  	ownerPhone: '',
  	agency: '',
  	agent: '',
  	rentPerMonth: '',
  	dateAvailable: 'Select Date',
  	propertyType: '',
  	rooms: '1',
  	bathrooms: '1',
  	meterSq: '',
  	yearBuild: '',
  	features_services: [],
    screen_1: false,
    screen_2: false,
    screen_3: false,
    screen_4: false,
    screen_5: false,
    screen_6: false,
    features_data: [],
  }
};