import I18n from '../i18n';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.toProperCase = function() {
  return this.toLowerCase().replace(/^(.)|\s(.)/g, 
    function($1) { return $1.toUpperCase(); });
}

// export const PUBLIC_URL = 'http://krooqi.step-stp.net/api/public/krooqi/';
export const PUBLIC_URL = 'http://krooqinew.gvmsoftware.in/api/public/krooqi/';

export const krooqi_URL = 'http://krooqinew.gvmsoftware.in/';

export const backgroundColor = '#f7941e';
export const textColor = 'white';

export const savedSearch = 'savedSearch';

export const USER_DATA = 'USER_DATA';

let For_Rent = `${I18n.t('pp_for_rent').toProperCase()}`;
let For_Sale = `${I18n.t('pp_for_sale').toProperCase()}`;
let Devlopment = `${I18n.t('pp_for_development').toProperCase()}`;
let New_Construction = "New_Construction";
let Sold = "Sold";
let Rented = "Rented";
let property_type =  [For_Rent, For_Sale, Devlopment, New_Construction, Sold, Rented];

export let propertyStatuses = property_type;

// export const propertyStatuses = [  'demo 1', 'demo 2', 'demo 3'];

export const minArea = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 3000, 4000, 5000];
export const maxArea = [150, 250, 350, 450, 550, 650, 750, 850, 950, 1500, 2500, 3500, 4500, 5500];

export const minPrice = [
  1000,
  5000,
  10000,
  50000,
  100000,
  200000,
  300000,
  400000,
  500000,
  600000,
  700000,
  800000,
  900000,
  1000000,
  1500000,
  2000000,
  2500000,
  5000000,
];

export const maxPrice = [
  5000,
  10000,
  50000,
  100000,
  200000,
  300000,
  400000,
  500000,
  600000,
  700000,
  800000,
  900000,
  1000000,
  1500000,
  2000000,
  2500000,
  5000000,
  10000000,
];

export const search = {
  propertyStatus: 33,
  priceRange: {
    start: '',
    end: '',
  },
  propertyType: [],
  rooms: 0,
  baths: 0,
  squareMeterRange: {
    start: '',
    end: '',
  },
  yearBuilt: {
    start: '',
    end: '',
  },
  district: '',
  region: '',
};
