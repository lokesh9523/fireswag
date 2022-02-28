import React, { memo, useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Popover from '@mui/material/Popover'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import { withStyles } from '@material-ui/core'
import myTheme from '../../../theme'
//import typography from '../../../theme/typography'
import clsx from 'clsx'
import TextField from '@mui/material/TextField'
import { connect, useDispatch } from 'react-redux'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import { Grid, Box } from '@mui/material'
import RegisterPopup from './RegisterPopup'
import { login } from '../../../redux/actions/userapi'

const LoginPopup = (props) => {
  const { classes, success } = props
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  let errorsObj = { email: '', password: '' }
  const [errors, setErrors] = useState(errorsObj)
  const [showForm, setShowForm] = useState(false)

  const formSubmit = async (event) => {
    event.stopPropagation()
    event.preventDefault()

    let error = false
    const errorObj = { ...errorsObj }

    if (password === '' || password === null) {
      errorObj.password = 'Please enter Password'
    } else if (password.length < 4) {
      errorObj.password = 'Password min 4 Charcters'
    }

    if (email === '' || email === null) {
      errorObj.email = 'Please enter Email'
      error = true
    } else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email,
      )
    ) {
      errorObj.email = 'Please enter valid Email'
      error = true
    }
    setErrors(errorObj)
    if (error) return
    const userData = {
      email:email,
      password: password
    }
    dispatch(login(userData))
  }

  const [showEye, setShowEye] = React.useState(false)
  const handleEye = (event) => setShowEye((value) => !value)
  const handleForm = (event) => {
    if (event.target.id === 'Login') {
      setShowForm(false)
    } else {
      setShowForm(true)
    }
  }

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div className={classes.btnArea}>
          <Button
            color="secondary"
            size="large"
            variant="contained"
            {...bindTrigger(popupState)}
            className={clsx(classes.menuButtonText, classes.signInBtn)}
          >
            Sign In
          </Button>

          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            className={classes.loginPopupArea}
          >
            <div className={classes.loginPopup}>
              {/* <div className="margin10pxBottom">
                {errorMessage && (
                  <div className="errorMsgDiv">{errorMessage}</div>
                )}
                {successMessage && (
                  <div className="successMsgDiv">{successMessage}</div>
                )}
              </div> */}
              <Box>
                {showForm === false ? (
                  <>
                    <Typography className={`${classes.loginPopupText}`}>
                      Email
                    </Typography>
                    <div>
                      <TextField
                        className={`${classes.loginPopupTextBox} loginInput`}
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errors.email && (
                        <span className={classes.formErrors}>
                          {errors.email}
                        </span>
                      )}
                    </div>
                    <Typography className={`${classes.loginPopupText}`}>
                      Password
                    </Typography>
                    <div className={classes.positionRelative}>
                      <TextField
                        className={`${classes.loginPopupTextBox} loginInput`}
                        variant="outlined"
                        type={showEye === false ? 'password' : 'text'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span
                        onClick={handleEye}
                        className={classes.passwordSpan}
                      >
                        {showEye === false ? (
                          <VisibilityOffIcon className={classes.eyeIcon} />
                        ) : (
                          <VisibilityIcon className={classes.eyeIcon} />
                        )}
                      </span>
                      {errors.password && (
                        <span className={classes.formErrors}>
                          {errors.password}
                        </span>
                      )}
                    </div>
                    <Typography className={`${classes.loginPopupLink}`}>
                      Forgot Password?
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={12}>
                        <Button
                          onClick={formSubmit}
                          className={classes.loginBtn}
                          variant="contained"
                        >
                          Sign In
                        </Button>
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <RegisterPopup />
                )}
                <div className="margin10pxTop">
                  {showForm === false ? (
                    <Typography className={classes.linkText}>
                      Not a member?
                      <span
                        id="Register"
                        onClick={handleForm}
                        className={classes.linkTextHref}
                      >
                        Sign Up
                      </span>
                    </Typography>
                  ) : (
                    <Typography className={classes.linkText}>
                      Already a member?
                      <span
                        id="Login"
                        onClick={handleForm}
                        className={classes.linkTextHref}
                      >
                        Sign In
                      </span>
                    </Typography>
                  )}
                </div>
              </Box>
            </div>
          </Popover>
        </div>
      )}
    </PopupState>
  )
}

const styles = (theme) => ({
  menuButtonText: {
    fontSize: '18px !important',
    fontWeight: theme.typography.h6.fontWeight,
    textTransform: 'none !important',
    color: myTheme.palette.common.green,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  signInBtn: {
    borderRadius: ' 15px !important',
    marginLeft: '25px !important',
    marginRight: '25px !important',
    paddingLeft: '35px !important',
    paddingRight: '35px !important',
    paddingTop: '7px !important',
    paddingBotom: '5px !important',
    height: '44px !important',
    background: myTheme.gradient.greenGradient,
    color: myTheme.palette.common.white,
    float: 'left',
    position: 'relative',
    top: '7px',
  },
  btnArea: {
    float: 'left',
    borderRadius: 10,
  },
  loginPopup: {
    width: 335,
    border: '2px solid #707070',
    borderRadius: 10,
    padding: '15px',
  },
  loginPopupText: {
    fontSize: '16px !important',
    fontWeight: '600 !important',
    marginTop: 5,
    fontFamily: 'Montserrat !important',
  },
  loginPopupLink: {
    fontSize: '16px !important',
    fontWeight: '600 !important',
    marginTop: '0px  !important',
    marginBottom: '10px  !important',
    //Color: '#41c4db',
    color: myTheme.palette.common.green,
  },
  loginPopupTextBox: {
    borderRadius: 10,
    width: '100%',
    marginBottom: '20px !important',
  },
  loginPopupSignIn: {
    width: '100%',
    backgroundColor: '#41c4db',
    fontWeight: 500,
    textTransform: 'none',
    color: '#fff',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#41c4db',
      boxShadow: 'none',
    },
  },
  loginPopupSignUp: {
    width: 135,
    backgroundColor: '#f4842c',
    fontWeight: 500,
    textTransform: 'none',
    color: '#fff',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#f4842c',
      boxShadow: 'none',
    },
  },
  passwordSpan: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  formErrors: {
    fontSize: 12,
    color: 'red',
    lineHeight: '15px',
    float: 'right',
    position: 'relative',
    top: '-15px'
  },
  positionRelative: {
    position: 'relative',
  },
  loginBtn: {
    width: '100%',
    textTransform: 'none !important',
    background:
      'linear-gradient(180deg, rgba(16,107,54,1) 0%, rgba(113,188,67,1) 100%)',
    borderRadius: '15px !important',
    lineHeight: '34px !important',
    fontSize: '18px !important',
  },
  linkText: {
    width: '100%',
    textAlign: 'center',
    marginTop: '10px !important',
    color: myTheme.palette.common.gray,
  },
  linkTextHref: {
    fontWeight: '600',
    marginLeft: '5px !important',
    cursor: 'pointer',
    color: myTheme.palette.common.black,
  },
})

const mapStateToProps = (state) => {
  return {
    // errorMessage: state.Auth.errorMessage,
    // successMessage: state.Auth.successMessage,
    // showLoading: state.Auth.showLoading,
    success: state
  }
}

export default connect(
  mapStateToProps,
  {login},
)(withStyles(styles, { withTheme: true })(memo(LoginPopup)))
