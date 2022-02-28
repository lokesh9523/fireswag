import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@material-ui/styles'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import { connect, useDispatch } from 'react-redux'
import { register } from '../../../redux/actions/userapi'
import myTheme from '../../../theme'
import { Grid } from '@mui/material'
import PropTypes from 'prop-types'

const RegisterPopup = (props) => {
  const { success, isAuthenticated, error } = props
  const [regSuccess, setRegSuccess] = useState()
  const [regError, setRegError] = useState()
  const classes = useStyles()
  const dispatch = useDispatch()
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [phone, setPhone] = useState('')
  const handlePhone = (event) => {
    const re = /^[0-9\b]+$/
    if (event.target.value === '' || re.test(event.target.value)) {
      setPhone(event.target.value)
    }
  }
  console.log('regSuccess', error)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  let errorsObj = { email: '', password: '' }
  const [errors, setErrors] = useState(errorsObj)
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
    } else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email,
      )
    ) {
      errorObj.email = 'Please enter valid Email'
    }

    if (firstname === '' || firstname === null) {
      errorObj.firstname = 'Please enter Firstname'
    } else if (firstname.length < 4) {
      errorObj.firstname = 'Firstname min 4 Charcters'
    }

    if (lastname === '' || lastname === null) {
      errorObj.lastname = 'Please enter Lastname'
    } else if (lastname.length < 4) {
      errorObj.lastname = 'Firstname min 4 Lastname'
    }

    if (phone === '' || phone === null) {
      errorObj.phone = 'Please enter Phone'
      error = true
    } else if (phone.length < 10) {
      errorObj.phone = 'Phone min 10 Numbers'
      error = true
    }

    setErrors(errorObj)
    if (error) return
    const userData = {
      firstname: firstname,
      lastname: lastname,
      phone: phone,
      email: email,
      password: password,
    }
    let res = await dispatch(register(userData))
    console.log('main',res.reason)
    if (res.success) {
      messageHandle()
    }else{
        errorHandle()
        //console.log('134', res, res.error)
        setRegSuccess(false)
        setRegError(res.reason)

    }
    //dispatch(register(userData))
  }
  const [showEye, setShowEye] = React.useState(false)
  const handleEye = (event) => setShowEye((value) => !value)
  const messageHandle = () => {
    setRegSuccess(true)
  }
  const errorHandle = (msg) => {
    setRegError(msg)
  }
  return (
    <>
      <div>
        <Grid container spacing={3}>
          {/* <Grid item xs={12}> */}
          <div className={classes.msgArea}>
            {regSuccess === true ? (
              <div className={classes.successMsg}>
                You have registered successfully
              </div>
            ) :null}
            {regSuccess === false ? (
              <div className={classes.errorMsg}>
                {regError}
              </div>
            ) :null}
          </div>
          {/* </Grid> */}
          <Grid item xs={12} sm={6}>
            <Typography className={classes.loginPopupText}>
              Firstname
            </Typography>
            <TextField
              className={classes.loginPopupTextBox}
              variant="outlined"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            {errors.firstname && (
              <span className={classes.formErrors}>{errors.firstname}</span>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography className={classes.loginPopupText}>Lastname</Typography>
            <TextField
              className={classes.loginPopupTextBox}
              variant="outlined"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            {errors.lastname && (
              <span className={classes.formErrors}>{errors.lastname}</span>
            )}
          </Grid>
        </Grid>
        <Typography className={classes.loginPopupText}>Phone</Typography>
        <div>
          <TextField
            className={classes.loginPopupTextBox}
            variant="outlined"
            value={phone}
            onChange={handlePhone}
            inputProps={{ maxLength: 10 }}
          />
          {errors.phone && (
            <span className={classes.formErrors}>{errors.phone}</span>
          )}
        </div>
        <Typography className={classes.loginPopupText}>Email</Typography>
        <div>
          <TextField
            className={classes.loginPopupTextBox}
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <span className={classes.formErrors}>{errors.email}</span>
          )}
        </div>
        <Typography className={classes.loginPopupText}>Password</Typography>
        <div className={classes.positionRelative}>
          <TextField
            className={classes.loginPopupTextBox}
            variant="outlined"
            type={showEye === false ? 'password' : 'text'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span onClick={handleEye} className={classes.passwordSpan}>
            {showEye === false ? (
              <VisibilityOffIcon className={classes.eyeIcon} />
            ) : (
              <VisibilityIcon className={classes.eyeIcon} />
            )}
          </span>
          {errors.password && (
            <span className={classes.formErrors}>{errors.password}</span>
          )}
        </div>
      </div>
      <Grid container>
        <Grid item xs={12} sm={12}>
          <Button
            onClick={formSubmit}
            className={classes.loginBtn}
            variant="contained"
          >
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </>
  )
}
const useStyles = makeStyles({
  loginPopup: {
    width: 335,
    border: '2px solid #707070',
    borderRadius: 10,
  },
  loginPopupText: {
    fontSize: '20px',
    marginTop: 5,
    fontFamily: 'Montserrat',
    fontWeight: '600 !important',
  },
  loginPopupTextBox: {
    borderRadius: 10,
    width: '100%',
    marginBottom: '15px !important',
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
    top: '-15px',
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
  msgArea: {
    width: '100%',
    position: 'relative',
    top: '20px',
  },
  successMsg: {
    textAlign: 'center',
    color: myTheme.palette.common.green,
  },
  errorMsg: {
    textAlign: 'center',
    color: myTheme.palette.common.red,
  },
})

RegisterPopup.propTypes = {
    //history: PropTypes.object,
    //login: PropTypes.func.isRequired,
    //isAuthenticated: PropTypes.bool,
    //promptWelcome: PropTypes.bool,
    error: PropTypes.object.isRequired,
    //clearErrors: PropTypes.func.isRequired,
    //modules: PropTypes.array.isRequired
  };

export default withRouter(RegisterPopup)

