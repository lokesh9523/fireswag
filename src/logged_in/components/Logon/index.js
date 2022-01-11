import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
    Box,
    Grid,
    Button,
    TextField,
    Link,
    Typography,
    InputAdornment,
    IconButton,
    CircularProgress
} from '@material-ui/core';
// import Alert from '@material-ui/lab/Alert';
import clsx from 'clsx';
import * as md5 from 'md5';
// import { login, reCaptchaSiteKey } from 'actions/api';
// import { clearErrors } from 'actions/error';

const schema = {
    email: {
        presence: { allowEmpty: false, message: 'is required' },
        email: true
    },
    password: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 128
        }
    }
};

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.white,
        height: '100%'
    },
    grid: {
        height: '100%'
    },
    logoContainer: {
        [theme.breakpoints.down('md')]: {
            display: 'none'
        }
    },
    logo: {
        backgroundColor: theme.palette.neutral,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(/images/svg/splash_bg_new.svg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    content: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    contentBody: {
        maxWidth: '650px',
        margin: 'auto',
        [theme.breakpoints.down('md')]: {
            maxWidth: '600px',
        }
    },
    form: {
        paddingLeft: 50,
        paddingRight: 50,
        paddingBottom: 50,
        flexBasis: 700,
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        }
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        fontWeight: '600',
        lineHeight: '2.5rem',
        marginTop: theme.spacing(0),
        marginBottom: theme.spacing(3),
        textAlign: 'center'
    },
    inputHeader: {
        fontWeight: '600',
    },
    textField: {
        marginBottom: theme.spacing(4),
        [theme.breakpoints.down('md')]: {
            marginBottom: theme.spacing(3),
        }
    },
    box: {
        padding: '20px 40px'
    },
    logonButton: {
        width: '150px',
        height: '35px',
        fontWeight: '600',
        display: 'flex',
        // margin: 'auto',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: '24px 0px'
    },
    logonButtonDisabled: {
        backgroundColor: theme.palette.white,
        border: `1.5px solid ${theme.palette.brand}`
    },
    forgotPassword: {
        color: theme.palette.brandDark,
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
        textDecoration: 'underline'
    },
    captchaError: {
        color: theme.palette.brandRed,
        paddingTop: 20
    },
    addCredential: {
        position: 'absolute',
        marginTop: theme.spacing(1)
    },
}));

const Logon = props => {
    const {  } = props;
    const classes = useStyles();
    // hooks
    //   const [loading, setLoading] = useState(false);
    //   const [showPassword, setShowPassword] = useState(false);
    //   const [formState, setFormState] = useState({
    //     isValid: false,
    //     captchaVerified: false,
    //     captchaError: null,
    //     values: {},
    //     touched: {},
    //     errors: {}
    //   });

    //   // on component changes
    //   useEffect(() => {
    //     const errors = validate(formState.values, schema);
    //     // check errors on user entering keys
    //     setFormState(formState => ({
    //       ...formState,
    //       isValid: errors ? false : true,
    //       errors: errors || {}
    //     }));
    //     // login success will update isAuthenticated value to true
    //     if (isAuthenticated) {
    //       if (promptWelcome) {
    //         history.push('/welcome');
    //       } else {
    //         let route = pages.find(page => page.module_name === modules[0].name);
    //         history.push(route.href ? route.href : route.children[0].href);
    //       }
    //     }
    //   }, [formState.values, isAuthenticated, promptWelcome, error, history, modules]);

    //   const handleClickShowPassword = () => setShowPassword(!showPassword);
    //   const handleMouseDownPassword = () => setShowPassword(!showPassword);

    //   const handleChange = event => {
    //     event.persist();
    //     setFormState(formState => ({
    //       ...formState,
    //       values: {
    //         ...formState.values,
    //         [event.target.name]:
    //           event.target.type === 'checkbox'
    //             ? event.target.checked
    //             : event.target.value
    //       },
    //       touched: {
    //         ...formState.touched,
    //         [event.target.name]: true
    //       }
    //     }));
    //   };

    //   const handleReCaptchaChange = (value) => {
    //     setFormState(formState => ({
    //       ...formState,
    //       captchaVerified: true,
    //       captchaError: null,
    //       values: {
    //         ...formState.values,
    //         captcha_token: value
    //       },
    //     }));
    //   };

    //   const handleLogon = async event => {
    //     event.preventDefault();
    //     // mark as touched
    //     setFormState(formState => ({
    //       ...formState,
    //       touched: {
    //         email: true,
    //         password: true
    //       }
    //     }));
    //     // validate captcha
    //     if (!formState.captchaVerified) {
    //       setFormState(formState => ({
    //         ...formState,
    //         captchaError: 'Please enter captcha!',
    //       }));
    //       return;
    //     }
    //     // validate form
    //     if (formState.isValid) {
    //       setLoading(true);
    //       clearErrors();
    //       let body = {
    //         email: formState.values.email,
    //         password: md5(formState.values.password),
    //         captcha_token: formState.values.captcha_token,
    //       };
    //       let res = await login(body);
    //       setLoading(false);
    //       if (!res.success) {
    //         recaptchaRef.current.reset();
    //       }
    //     }
    //   };

    //   const hasError = field => formState.touched[field] && formState.errors[field] ? true : false;

    return (
        <div className={classes.root}>
            <Grid
                className={classes.grid}
                container
            >
                <Grid
                    className={classes.logoContainer}
                    item
                    lg={6}
                >
                    <div className={classes.logo}></div>
                </Grid>
                <Grid
                    className={classes.content}
                    item
                    lg={6}
                    xs={12}
                >
                    <div className={classes.content}>
                        <div className={classes.contentBody}>
                            <form
                                className={classes.form}

                            >
                                <Typography>I ma hereeeeeeeee</Typography>


                            </form>
                        </div>
                    </div>
                </Grid>
            </Grid >
        </div >
    );
};

const mapStateToProps = state => ({
    //   isAuthenticated: state.auth.isAuthenticated,
    //   promptWelcome: state.auth.promptWelcome,
    //   error: state.error,
    //   modules: state.auth.modules,
});

Logon.propTypes = {
    //   history: PropTypes.object,
    //   login: PropTypes.func.isRequired,
    //   isAuthenticated: PropTypes.bool,
    //   promptWelcome: PropTypes.bool,
    //   error: PropTypes.object.isRequired,
    //   clearErrors: PropTypes.func.isRequired,
    //   modules: PropTypes.array.isRequired
};

export default connect(mapStateToProps, {  })(withRouter(Logon));
