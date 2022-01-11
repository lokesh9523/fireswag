import axios from 'axios';
import * as appConstants from './../../constants/appConstants';



export const apiUrl = `http://localhost:3001/api`;

const setToken = () => {
  axios.defaults.headers.common['fireswag-jwt-auth'] = localStorage.getItem(appConstants.ADMIN_FS_TOKEN);
}
// set token when page refreshes 
axios.defaults.headers.common['fireswag-jwt-auth'] = localStorage.getItem(appConstants.ADMIN_FS_TOKEN);

const dispatchError = (dispatch, type, error) => {
  dispatch({
    type: type,
    payload: error.response ? error.response.data : error,
    status: error.response ? error.response.status : error.status
  });
}

export const login = reqPayload => dispatch =>
  axios.post(`${apiUrl}/login`, reqPayload).then(res => {
    dispatch({ type: appConstants.ADMIN_FS_LOGIN_SUCCESS, payload: res.data });
    axios.defaults.headers.common['fireswag-jwt-auth'] = localStorage.getItem(appConstants.ADMIN_FS_TOKEN);
    return { success: true, promptWelcome: res.data.promptWelcome };
  }).catch(error => {
    dispatchError(dispatch, appConstants.API_ERROR, error);
    return { success: false };
  });

export const logout = () => dispatch => {
  delete axios.defaults.headers.common['fireswag-jwt-auth'];
  dispatch({ type: appConstants.ADMIN_FS_LOGOUT_SUCCESS });
}

export const addProductType = (reqPayload) => dispatch =>
  axios.post(`${apiUrl}/product-type`, reqPayload).then(res => {
    return res.data;
  }).catch(error => {
    dispatchError(dispatch, appConstants.SHOW_ALERT_DIALOG, error);
    return { success: false };
  });

export const getProductType = () => dispatch =>
  axios.get(`${apiUrl}/product-type`).then(res => {
    dispatch({ type: appConstants.FETCH_ADMIN_PRODUCT_TYPES, payload: res.data });
    return res.data;
  }).catch(error => {
    dispatchError(dispatch, appConstants.SHOW_ALERT_DIALOG, error);
    return { success: false };
  });

export const getProductTypeById = (id) => dispatch =>
  axios.get(`${apiUrl}/product-type/${id}`).then(res => {
    return res.data;
  }).catch(error => {
    dispatchError(dispatch, appConstants.SHOW_ALERT_DIALOG, error);
    return { success: false };
  });

export const getProductType1 = (query) => dispatch =>
  axios.get(`${apiUrl}/product-type`).then(res => {
    return res.data;
  }).catch(error => {
    dispatchError(dispatch, appConstants.SHOW_ALERT_DIALOG, error);
    return { success: false };
  });

export const updateProductType = (id, reqPayload) => dispatch =>
  axios.put(`${apiUrl}/product-type/${id}`, reqPayload).then(res => {
    return res.data;
  }).catch(error => {
    dispatchError(dispatch, appConstants.SHOW_ALERT_DIALOG, error);
    return { success: false };
  });
export const uploadImage = (reqPayload) => dispatch =>
  axios.post(`${apiUrl}/upload-image`, reqPayload).then(res => {
    return res.data;
  }).catch(error => {
    dispatchError(dispatch, appConstants.SHOW_ALERT_DIALOG, error);
    return { success: false };
  });

export const addProducts = (reqPayload) => dispatch =>
  axios.post(`${apiUrl}/products`, reqPayload).then(res => {
    return res.data;
  }).catch(error => {
    dispatchError(dispatch, appConstants.SHOW_ALERT_DIALOG, error);
    return { success: false };
  });

export const getProducts = () => dispatch =>
  axios.get(`${apiUrl}/products`).then(res => {
    dispatch({ type: appConstants.FETCH_ADMIN_PRODUCT_TYPES, payload: res.data });
    return res.data;
  }).catch(error => {
    dispatchError(dispatch, appConstants.SHOW_ALERT_DIALOG, error);
    return { success: false };
  });

export const getProductsById = (id) => dispatch =>
  axios.get(`${apiUrl}/products/${id}`).then(res => {
    return res.data;
  }).catch(error => {
    dispatchError(dispatch, appConstants.SHOW_ALERT_DIALOG, error);
    return { success: false };
  });

export const getProducts1 = (query) => dispatch =>
  axios.get(`${apiUrl}/products`).then(res => {
    return res.data;
  }).catch(error => {
    dispatchError(dispatch, appConstants.SHOW_ALERT_DIALOG, error);
    return { success: false };
  });

export const updateProducts = (id, reqPayload) => dispatch =>
  axios.put(`${apiUrl}/products/${id}`, reqPayload).then(res => {
    return res.data;
  }).catch(error => {
    dispatchError(dispatch, appConstants.SHOW_ALERT_DIALOG, error);
    return { success: false };
  });
