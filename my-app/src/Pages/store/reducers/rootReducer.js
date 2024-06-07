import authReducer from './authReducer';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import userReducer from './userReducer';
const commomConfig = {
  storage,
  stateReconciler: autoMergeLevel2,
};

const authConfig = {
  ...commomConfig,
  key: 'auth',
  whitelist: ['isLoggedIn', 'token'],
};
const rootReducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  user: userReducer,
});
export default rootReducer;
