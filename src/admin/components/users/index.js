import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
    Box,
    Grid,
    Typography,
} from '@material-ui/core';
import clsx from 'clsx';
// import { login } from './../../../redux/actions/adminapi';

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
    }
}));

const Users = props => {
    // const { } = props;
    const classes = useStyles();
    // hooks
    // const [loading, setLoading] = useState(false);

    return (
        <div className={classes.root}>
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
                        >Coming Soon......
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </div >
    );
};

const mapStateToProps = state => ({
    // isAuthenticated: state.auth.isAuthenticated
});

Users.propTypes = {
    history: PropTypes.object,
};

export default connect(mapStateToProps, {})(withRouter(Users));
