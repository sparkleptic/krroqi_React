import { combineReducers } from 'redux';
import properties from './properties.reducer';

const rootReducer = combineReducers({
	properties
});

export default rootReducer;