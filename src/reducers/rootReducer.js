import { combineReducers } from 'redux';
import properties from './properties.reducer';
import connection from './connection.reducer';

const rootReducer = combineReducers({
	properties,
	connection
});

export default rootReducer;