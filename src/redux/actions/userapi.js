import axios from 'axios';
import * as appConstants from './../../constants/appConstants';



export const apiUrl = `http://localhost:3001/api`;

const setToken = () => {
    axios.defaults.headers.common['fireswag-jwt-store-auth'] = localStorage.getItem(appConstants.USER_FS_TOKEN);
}
// set token when page refreshes 
axios.defaults.headers.common['fireswag-jwt-store-auth'] = localStorage.getItem(appConstants.USER_FS_TOKEN);

const dispatchError = (dispatch, type, error) => {
    dispatch({
        type: type,
        payload: error.response ? error.response.data : error,
        status: error.response ? error.response.status : error.status
    });
}

export const register = reqPayload => dispatch =>
    axios.post(`${apiUrl}/store/signup`, reqPayload).then(res => {
        dispatch({ type: appConstants.USER_FS_REGSTER_SUCCESS, payload: res.data });
        axios.defaults.headers.common['fireswag-jwt-store-auth'] = localStorage.getItem(appConstants.USER_FS_TOKEN);
        return { success: true, promptWelcome: res.data.promptWelcome };
    }).catch(error => {
        dispatchError(dispatch, appConstants.API_ERROR, error);
        return { success: false, reason: error.response.data.message };
    });

export const login = reqPayload => dispatch =>
    axios.post(`${apiUrl}/store/login`, reqPayload).then(res => {
        dispatch({ type: appConstants.USER_FS_LOGIN_SUCCESS, payload: res.data });
        axios.defaults.headers.common['fireswag-jwt-store-auth'] = localStorage.getItem(appConstants.USER_FS_TOKEN);
        //window.location.href = '/'
        return { success: true, promptWelcome: res.data.promptWelcome };
    }).catch(error => {
        dispatchError(dispatch, appConstants.API_ERROR, error);
        return { success: false, error };
    });

export const logout = () => dispatch => {
    delete axios.defaults.headers.common['fireswag-jwt-store-auth'];
    dispatch({ type: appConstants.USER_FS_LOGOUT_SUCCESS });
}

export const getProductType = () => dispatch =>
    axios.get(`${apiUrl}/store/product-type`).then(res => {
        dispatch({ type: appConstants.FETCH_USER_PRODUCT_TYPES, payload: res.data });
        return res.data;
    }).catch(error => {
        dispatchError(dispatch, appConstants.SHOW_ALERT_DIALOG, error);
        return { success: false };
    });

export const getProductsById = (id) => dispatch =>
    axios.get(`${apiUrl}/store/products/${id}`).then(res => {
        return res.data;
    }).catch(error => {
        dispatchError(dispatch, appConstants.SHOW_ALERT_DIALOG, error);
        return { success: false };
    });

export const getProducts = (query) => dispatch =>
    axios.get(`${apiUrl}/store/products?${query}`).then(res => {
        return res.data;
    }).catch(error => {
        dispatchError(dispatch, appConstants.SHOW_ALERT_DIALOG, error);
        return { success: false };
    });

export const getUserAddress = (id) => dispatch =>
    axios.get(`${apiUrl}/store/user/${id}/address`).then(res => {
        return res.data;
    }).catch(error => {
        dispatchError(dispatch, appConstants.SHOW_ALERT_DIALOG, error);
        return { success: false };
    });

export const addUserAddress = (id, reqPayload) => dispatch =>
    axios.post(`${apiUrl}/store/user/${id}/address`, reqPayload).then(res => {
        return res.data;
    }).catch(error => {
        dispatchError(dispatch, appConstants.SHOW_ALERT_DIALOG, error);
        return { success: false };
    });

export const addorder = (id, reqPayload) => dispatch =>
    axios.post(`${apiUrl}/store/user/${id}/order`, reqPayload).then(res => {
        return res.data;
    }).catch(error => {
        dispatchError(dispatch, appConstants.SHOW_ALERT_DIALOG, error);
        return { success: false };
    });