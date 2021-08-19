import { combineReducers } from 'redux';

import profileReducer from './profile';
import jobsReducer from './jobs';

const rootReducer = combineReducers({
  profile: profileReducer,
  jobs: jobsReducer
})

export default rootReducer;