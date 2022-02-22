import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { Provider } from 'react-redux'
import store from './../src/redux/store'
import Theme from './Themes'

ReactDOM.render(
  
    <Provider store={store}>
      <Theme>
      <App />
      </Theme>
    </Provider>
  ,
  document.getElementById('root'),
)

serviceWorkerRegistration.register()
