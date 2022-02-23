import { combineReducers } from 'redux';
import auth from './auth';
import error from './error';
import dialog from './dialog';
import data from './data';
import theme from './theme';

const rootReducer = combineReducers({
    auth: auth,
    error:error,
    dialog: dialog,
    data:data,
    theme:theme
});

export default rootReducer;