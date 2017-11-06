import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import properties from './properties.reducer';
import connection from './connection.reducer';
import propertiesByCategory from './propertiesByCategory.reducer';
import filteredProperties from './filteredProperties.reducer';
import propertyStatus from './propertyStatus.reducer';
import propertyTypes from './propertyTypes.reducer';
import search from './search.reducer';
import savedSearch from './savedSearch.reducer';

const rootReducer = combineReducers({
  properties,
  propertiesByCategory,
  filteredProperties,
  connection,
  propertyStatus,
  propertyTypes,
  search,
  savedSearch,
  form: formReducer,
});

export default rootReducer;
