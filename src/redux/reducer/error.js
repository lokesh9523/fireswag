import * as appConstants from './../../constants/appConstants';
const initialState = {
  error: null,
  message: null,
  status: null,
}
 
export default (state = initialState, action) => {
  switch (action.type) {
    case appConstants.API_ERROR:
      console.log("iam hereeeeeee",action,'===================')
      return {
        error: action.payload,
        message: action.payload.message || 'Unknown Error',
        status: action.status,
      }
    case appConstants.CLEAR_ERROR:
      return {
        error: null,
        message: null,
        status: null,
      }
    default:
      return state;
  }
}