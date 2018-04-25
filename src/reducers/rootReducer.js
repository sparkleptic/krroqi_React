import { combineReducers } from 'redux';
import properties from './properties.reducer';
import connection from './connection.reducer';
import propertiesByCategory from './propertiesByCategory.reducer';
import filteredProperties from './filteredProperties.reducer';
import propertyStatus from './propertyStatus.reducer';
import propertyTypes from './propertyTypes.reducer';
import search from './search.reducer';
import savedSearch from './savedSearch.reducer';
import updatedSavedSearch from './UpdatedSavedSearch.reducer';
import auth from './auth.reducer';
import favorites from './favorites.reducer';
import like from './like.reducer';
import agents from './agents.reducer';
import propertyPost from './propertyPost.reducer';
import mapSearch from './commonReducers';

const rootReducer = combineReducers({
  properties,
  propertiesByCategory,
  filteredProperties,
  connection,
  propertyStatus,
  propertyTypes,
  search,
  savedSearch,
  updatedSavedSearch,
  auth,
  favorites,
  like,
  agents,
  propertyPost,
  mapSearch
});

export default rootReducer;
