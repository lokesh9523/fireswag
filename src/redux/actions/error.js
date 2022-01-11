import * as appConstants from './../../constants/appConstants';

export const showErrors = (error) => dispatch => {
  dispatch({
    type: appConstants.API_ERROR,
    payload: error,
    status: error.status
  });
}

export const clearErrors = () => dispatch => {
  dispatch({
    type: appConstants.CLEAR_ERROR,
  });
}