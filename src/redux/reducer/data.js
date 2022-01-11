import * as appConstants from './../../constants/appConstants';

const initialState = {
    productTypesData:null
}
 
export default (state = initialState, action) => {
  switch (action.type) {
    case appConstants.FETCH_ADMIN_PRODUCT_TYPES:
      return {
        ...state,
        productTypesData: action.payload.data,
      }
    // clear
    case appConstants.CLEAR_ADMIN_PRODUCT_TYPES:
      return {
        ...state,
        productTypesData: null
      }
    case appConstants.CLEAR_ALL_DATA:
      return {
        productTypesData: null,
      }
    default:
      return state;
  }
}