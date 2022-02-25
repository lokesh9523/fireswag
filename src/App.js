import React, { Fragment, Suspense, lazy, useEffect, useState } from 'react'
import { ThemeProvider, CssBaseline, Paper } from '@material-ui/core'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import theme from './theme'
import NightTheme from './NighTheme'
import DayTheme from './DayTheme'
import GlobalStyles from './GlobalStyles'
import Pace from './shared/components/Pace'
import ReduxDialogAlert from './shared/components/ReduxDialogAlert'
import { connect } from 'react-redux'
const LoggedInComponent = lazy(() => import('./logged_in/components/Main'))
const AdminComponent = lazy(() => import('./admin/main'))
const LoggedOutComponent = lazy(() => import('./logged_out/components/Main'))

function App(props) {
  const { themeSetting } = props;
  let [myTheme, setMyTheme] = useState()
  useEffect(()=>{
    setMyTheme(themeSetting.theme)
  },[themeSetting])

  return (
    <BrowserRouter>
      <ThemeProvider theme={myTheme !== true ? NightTheme : DayTheme}>
        <Paper className="main-papar">
          <CssBaseline />
          <GlobalStyles />
          {/* <Pace color={theme.palette.primary.light} /> */}
          <Suspense fallback={<Fragment />}>
            <Switch>
              {/* <Route path="/admin">
              <ReduxDialogAlert />
              <AdminComponent />
            </Route> */}
              <Route path="/">
                <LoggedOutComponent />
              </Route>
            </Switch>
          </Suspense>
        </Paper>
      </ThemeProvider>
    </BrowserRouter>
  )
}

const mapStateToProps = (state) => {
  return{
    themeSetting: state.theme
  }
}
export default connect(mapStateToProps,null)(App)
