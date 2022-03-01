import * as appConstants from './../../constants/appConstants';

const initialState = {
  isAuthenticated: false,
  isSuperAdmin: false,
  token: null,
  account: null
};

try {
  initialState.isAuthenticated = localStorage.getItem(appConstants.ADMIN_FS_TOKEN) ? true : false;
  initialState.isSuperAdmin = localStorage.getItem(appConstants.FS_ACCOUNT_TYPE) === 'ADMIN';
  initialState.token = localStorage.getItem(appConstants.ADMIN_FS_TOKEN);
  initialState.account = localStorage.getItem(appConstants.ADMIN_FS_ACCOUNT);
} catch (error) {
  initialState.isAuthenticated = false;
}

export default (state = initialState, action) => {
  switch (action.type) {
    case appConstants.ADMIN_FS_LOGIN_SUCCESS:
      localStorage.setItem(appConstants.ADMIN_FS_TOKEN, action.payload.token);
      localStorage.setItem(appConstants.FS_ACCOUNT_TYPE, action.payload.data.account.role_id.name);
      localStorage.setItem(appConstants.ADMIN_FS_ACCOUNT, JSON.stringify(action.payload.data.account))
      return {
        isAuthenticated: true,
        token: action.payload.token,
        isSuperAdmin: true,
        account: action.payload.data.account
      }
    case appConstants.USER_FS_LOGIN_SUCCESS:
      console.log(action.payload)
      localStorage.setItem(appConstants.USER_FS_TOKEN, action.payload.token);
      localStorage.setItem(appConstants.FS_ACCOUNT_TYPE, action.payload.data.user.role_id?.name);
      localStorage.setItem(appConstants.USER_FS_ID, action.payload.data.user?._id);
      return {
        isAuthenticated: true,
        token: action.payload.token,
        isSuperAdmin: false
      }

    case appConstants.ADMIN_FS_LOGOUT_SUCCESS:
      localStorage.removeItem(appConstants.ADMIN_FS_TOKEN);
      localStorage.removeItem(appConstants.FS_ACCOUNT_TYPE);
      localStorage.removeItem(appConstants.ADMIN_FS_ACCOUNT);
      return {
        isAuthenticated: false,
        isSuperAdmin: false,
        token: null,
        account: null
      }
    case appConstants.USER_FS_LOGOUT_SUCCESS:
      localStorage.removeItem(appConstants.USER_FS_TOKEN);
      localStorage.removeItem(appConstants.FS_ACCOUNT_TYPE);
      return {
        isAuthenticated: false,
        isSuperAdmin: false,
        token: null,
      }
    default:
      return state;
  }
}