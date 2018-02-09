import { combineReducers } from 'redux';
import properties from './properties.reducer';
import connection from './connection.reducer';
import propertiesByCategory from './propertiesByCategory.reducer';
import filteredProperties from './filteredProperties.reducer';
import propertyStatus from './propertyStatus.reducer';
import propertyTypes from './propertyTypes.reducer';
import search from './search.reducer';
import savedSearch from './savedSearch.reducer';
import auth from './auth.reducer';
import favorites from './favorites.reducer';
import like from './like.reducer';
import agents from './agents.reducer';
import propertyPost from './propertyPost.reducer';

const rootReducer = combineReducers({
  properties,
  propertiesByCategory,
  filteredProperties,
  connection,
  propertyStatus,
  propertyTypes,
  search,
  savedSearch,
  auth,
  favorites,
  like,
  agents,
  propertyPost
});

export default rootReducer;
