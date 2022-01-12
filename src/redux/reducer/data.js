import * as appConstants from './../../constants/appConstants';

const initialState = {
  productTypesData: null,
  userProductTypesData: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case appConstants.FETCH_ADMIN_PRODUCT_TYPES:
      return {
        ...state,
        productTypesData: action.payload.data,
      }
    case appConstants.FETCH_USER_PRODUCT_TYPES:
      return {
        ...state,
        userProductTypesData: action.payload.data,
      }
    // clear
    case appConstants.CLEAR_ADMIN_PRODUCT_TYPES:
      return {
        ...state,
        productTypesData: null
      }
    case appConstants.CLEAR_USER_PRODUCT_TYPES:
      return {
        ...state,
        userProductTypesData: null,
      }
    case appConstants.CLEAR_ALL_DATA:
      return {
        productTypesData: null,
        userProductTypesData: null
      }
    default:
      return state;
  }
}