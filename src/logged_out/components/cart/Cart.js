
import React, { Fragment } from "react";
import PropTypes from "prop-types";
// import classNames from "classnames";
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/styles';

import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    Paper,

    Grid
} from "@material-ui/core";
import { getProductsById, apiUrl } from './../../../redux/actions/userapi';


const useStyles = makeStyles(theme => ({
    root: { padding: theme.spacing(5), marginTop: theme.spacing(6) },
    image: {
        display: 'block',
        marginLeft: "auto",
        marginRight: "auto",
        width: "50 %"
    },
    textcolor: {
        color: '#95cd33'
    }
}));

function Cart(props) {
    const { history, cart } = props;
    const classes = useStyles();
    return (
        <Fragment>
            <div className={classes.root}>
                <Grid container
                    direction="row"
                    justifyContent="center"
                    alignItems="center" spacing={4}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product</TableCell>
                                    <TableCell align="right" >Name</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">Quantity</TableCell>
                                    <TableCell align="right">Total</TableCell>
                                    <TableCell align="right">Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {cart.map((row, index) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" >
                                            <img src={`${apiUrl}${row.image_url}`} alt="book" style={{ width: '10%' }}></img>
                                        </TableCell>
                                        <TableCell align="right"> {row.name}</TableCell>
                                        <TableCell align="right">{row.price}</TableCell>
                                        <TableCell align="right">{`1`}</TableCell>
                                        <TableCell align="right">{row.price}</TableCell>
                                    </TableRow>

                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {/* <Grid item sm={6}>
                        <img src={selectedBook.url} alt="book" className={classes.image}></img>
                    </Grid>
                    <Grid item sm={6}>
                        <Typography variant="h4" className={classes.textcolor}>{selectedBook.name}</Typography>
                        <Typography variant="h4">{selectedBook.price}</Typography>
                        <Typography variant="h5"><span className={classes.textcolor}>Author: </span>{selectedBook.author}</Typography>
                        <Typography variant="h5"><span className={classes.textcolor}>Published: </span>{selectedBook.published}</Typography>
                        <Typography variant="h5"><span className={classes.textcolor}>Description: </span>{selectedBook.description}</Typography>

                        <Grid item style={{ padding: '8px' }}>
                            <Button variant="outlined" style={{ color: '#95cd33' }}>ADD TO CART</Button>
                        </Grid>

                    </Grid> */}
                </Grid>
            </div>
            {/* </>}
            </Grid> */}
        </Fragment>
    );
}
Cart.propTypes = {
    history: PropTypes.object.isRequired
};

export default withRouter((Cart));
// export default withRouter(withStyles(styles)(BookDetails));