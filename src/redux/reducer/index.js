import { combineReducers } from 'redux';
import auth from './auth';
import error from './error';
import dialog from './dialog';
import data from './data'

const rootReducer = combineReducers({
    auth: auth,
    error:error,
    dialog: dialog,
    data:data

});

export default rootReducer;