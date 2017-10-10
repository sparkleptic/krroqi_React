import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import properties from './properties.reducer';
import connection from './connection.reducer';
import propertiesByCategory from './propertiesByCategory.reducer';

const rootReducer = combineReducers({
  properties,
  propertiesByCategory,
  connection,
  form: formReducer,
});

export default rootReducer;
