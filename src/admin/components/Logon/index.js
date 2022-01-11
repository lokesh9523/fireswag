import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
    Box,
    Grid,
    Button,
    TextField,
    Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import * as md5 from 'md5';
import { login } from './../../../redux/actions/adminapi';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.white,
        height: '100%'
    },
    form: {
        paddingLeft: 50,
        paddingRight: 50,
        paddingBottom: 50,
        paddingTop: 100,
        flexBasis: 700,
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        }
    },
    title: {
        color: '#3f51b5'
    },
    box: {
        // // width: 500,
        // // height: 500,
        // backgroundColor: 'primary.dark',
        // '&:hover': {
        //     backgroundColor: 'primary.main',
        //     //   opacity: [0.9, 0.8, 0.7],
        // },
    }
}));

const Logon = props => {
    const { login, history, error, } = props;
    const classes = useStyles();
    // hooks
    const [loading, setLoading] = useState(false);
    const [formState, setFormState] = useState({
        email: "", password: ""
    });


    const handleChange = event => {
        event.persist();
        setFormState(formState => ({
            ...formState, [event.target.name]: event.target.value
        }));
    };


    const handleLogon = async event => {
        event.preventDefault();
        let body = {
            email: formState.email,
            password: md5(formState.password)
        };
        let res = await login(body);
        setLoading(false);
        if (res.success) {
            history.push('/admin/dashboard')
        }
    };

    return (
        <div className={classes.root}>

            <form
                className={classes.form} onSubmit={handleLogon}

            >
                <Box display="flex"
                    justifyContent="center"
                    alignItems="center" className={classes.box}
                    minHeight="50vh"
                >
                    <Grid container
                        direction="column"
                        justifyContent="center"
                        alignItems="center" spacing={3} >
                        <Grid item sm={4}>

                            <Typography
                                className={clsx(classes.title)}
                                variant="h4"
                            >Please Login
                        </Typography>
                        </Grid>
                        <Grid item sm={4}>
                            <TextField
                                variant="outlined"
                                margin="none"
                                required
                                label="email"
                                name="email"
                                value={formState.email}
                                onChange={handleChange}
                                fullWidth
                                // autoFocus
                                // autoComplete="off"
                                type="email"
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <TextField
                                variant="outlined"
                                margin="none"
                                required
                                label="password"
                                value={formState.password}
                                onChange={handleChange}
                                fullWidth
                                name="password"
                                // autoFocus
                                // autoComplete="off"
                                type="password"
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <Button type="submit">Logon</Button>
                        </Grid>

                        {error.message ? error.message : null}
                    </Grid>
                </Box>


            </form>
        </div >
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    //   promptWelcome: state.auth.promptWelcome,
    error: state.error,
    //   modules: state.auth.modules,
});

Logon.propTypes = {
    history: PropTypes.object,
    login: PropTypes.func.isRequired,
    //   isAuthenticated: PropTypes.bool,
    //   promptWelcome: PropTypes.bool,
    error: PropTypes.object.isRequired,
    //   clearErrors: PropTypes.func.isRequired,
    //   modules: PropTypes.array.isRequired
};

export default connect(mapStateToProps, { login })(withRouter(Logon));
