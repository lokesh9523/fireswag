
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
    const books = [
        {
            link: "/book1",
            name: "Crypto Currency",
            url: `${process.env.PUBLIC_URL}/images/logged_out/book1.jpeg`,
            author: 'Alex',
            published: '2012',
            description: 'Most cryptocurrencies use blockchain technology to record transactions. For example, the bitcoin network and Ethereum network are both based on blockchain. ',
            price: '$14.99'
        },
        {
            link: "/book2",
            name: "Block Chain Technology",
            url: `${process.env.PUBLIC_URL}/images/logged_out/book2.jpeg`,
            author: 'Alex',
            published: '2012',
            description: 'Most cryptocurrencies use blockchain technology to record transactions. For example, the bitcoin network and Ethereum network are both based on blockchain. ',
            price: '$14.99'
        },
        {
            link: "/book3",
            name: "Mastering Crypto",
            url: `${process.env.PUBLIC_URL}/images/logged_out/book3.jpg`,
            author: 'Alex',
            published: '2012',
            description: 'Most cryptocurrencies use blockchain technology to record transactions. For example, the bitcoin network and Ethereum network are both based on blockchain. ',
            price: '$14.99'
        },
    ];
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
                                            <img src={row.url} alt="book" style={{ width: '10%' }}></img>
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