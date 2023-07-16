import { combineReducers } from 'redux';
import authReducer from './authReducer';
import cocktailReducer from './cocktailsReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    cocktails: cocktailReducer,
});

export default rootReducer;