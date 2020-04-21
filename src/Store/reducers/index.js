import {reducer as authReducer} from './authReducer';
import {reducer as feedReducer} from './feedReducer';

import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  feed: feedReducer,
  auth: authReducer,
});

export default rootReducer;
