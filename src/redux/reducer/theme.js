import * as appConstants from './../../constants/appConstants'
const initialState = {
  theme:true,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case appConstants.SET_THEME_DARK:
      return {
        theme: true,
      }
    case appConstants.SET_THEME_LIGHT:
      return {
        theme: false,
      }
    default:
      return state
  }
}
