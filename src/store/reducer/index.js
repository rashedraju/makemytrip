import { combineReducers } from 'redux';
import searchTrip from './searchTrip';
import auth from './auth';
import admin from './admin';

export default combineReducers({
    searchTrip,
    auth,
    admin
})