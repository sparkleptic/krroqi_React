import { combineReducers } from 'redux';
import properties from './properties.reducer';
import connection from './connection.reducer';
import propertiesByCategory from './propertiesByCategory.reducer';

const rootReducer = combineReducers({
	properties,
	propertiesByCategory,
	connection
});

export default rootReducer;