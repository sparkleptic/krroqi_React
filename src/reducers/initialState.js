export default {
  properties: {
    loading: false,
    error: false,
    success: false,
  },
  search: {
    searchLabel: '',
    searchText: '',
    propertyStatus: 0,
    priceRange: {
      start: '',
      end: '',
    },
    propertyType: [],
    rooms: '',
    baths: '',
    squareMeterRange: {
      start: '',
      end: '',
    },
    yearBuilt: {
      start: '',
      end: '',
    },
    district: '',
  },
};
