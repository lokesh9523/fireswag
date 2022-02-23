
import * as appConstants from './../../constants/appConstants';

export const setThemeDark = () => dispatch => {
    dispatch({type: appConstants.SET_THEME_DARK,payload: true});
}
export const setThemeLight = () => dispatch => {
    dispatch({type: appConstants.SET_THEME_LIGHT,payload: false});
}

  