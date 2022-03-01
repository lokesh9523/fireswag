
import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
// import classNames from "classnames";
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {
    Button,
    Typography,
    Grid
} from "@material-ui/core";
import { connect } from 'react-redux';
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

function BookDetails(props) {
    const { history, setCart, cart, getProductsById } = props;
    const classes = useStyles();

    const [selectedBook, setSelectedBook] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [errorMsg, setErrorMsg] = useState(null)

    useEffect(() => {
        let checkProductExists = cart.findIndex(e => e._id === selectedBook._id);
        console.log(checkProductExists, "==============================checkProductExists")
        if (checkProductExists !== -1) {
            console.log("iam here", cart[checkProductExists]['quantity'])
            setQuantity(cart[checkProductExists]['quantity']);
        }
    }, [cart, selectedBook]);

    useEffect(() => {
        (async () => {
            // if (selectedBookId) {
            let res = {};
            res = await getProductsById(props.match.params.productid);
            if (res.success) {
                setSelectedBook(res.data || {})
            }

            // }
        })();
        // eslint-disable-next-line
    }, [props.match.params.productid]);

    const handleAddCart = (event) => {
        event.preventDefault();
        let temp = [...cart];
        let checkProductExists = temp.findIndex(e => e._id === selectedBook._id);
        if (checkProductExists !== -1) {
            temp[checkProductExists]['quantity'] = quantity;
        } else {
            selectedBook.quantity = quantity;
            temp.push(selectedBook);
        }
        setCart(temp);
    }
    const handleQuantity = (type) => {
        setErrorMsg(null);
        if (type === 'add') {
            if ((quantity + 1) > selectedBook.total_count) {
                setErrorMsg('Required Quantity Not Available')
            } else {
                setQuantity(quantity === 0 ? 1 : quantity + 1)
            }
        }

        if (type === 'sub') {
            setQuantity(quantity === 0 ? 1 : quantity - 1)
        }
    }
    return (
        <Fragment>
            <div className={classes.root}>
                <Grid container
                    direction="row"
                    justifyContent="center"
                    alignItems="center" spacing={4}>
                    <Grid item sm={6}>
                        <img src={`${apiUrl}${selectedBook.image_url}`} alt="book" className={classes.image} style={{ width: '60%' }}></img>
                    </Grid>
                    <Grid item sm={6}>
                        <Typography variant="h4" className={classes.textcolor}>{selectedBook.name}</Typography>
                        <Typography variant="h4">${selectedBook.price}</Typography>
                        {/* <Typography variant="h5"><span className={classes.textcolor}>Author: </span>{selectedBook.author}</Typography>
                        <Typography variant="h5"><span className={classes.textcolor}>Published: </span>{selectedBook.published}</Typography> */}
                        <Typography variant="h5"><span className={classes.textcolor}>Description: </span>{selectedBook.description}</Typography>
                        <Typography variant="h5"><span className={classes.textcolor}>Available Quantity: </span>{selectedBook.total_count}</Typography>
                        <Grid item style={{ padding: '8px', display: 'inline-flex' }}>
                            {/* <Typography variant="h6"> */}
                            <span className={classes.textcolor}>Quantity: </span>&nbsp;&nbsp;
                                    <span><RemoveIcon style={{ cursor: 'pointer', color: 'red' }} onClick={(e) => handleQuantity('sub')} /></span>&nbsp;&nbsp;<span>{quantity}</span>&nbsp;&nbsp;<span><AddIcon style={{ cursor: 'pointer', color: 'green' }} onClick={(e) => handleQuantity('add')} /></span>
                            {/* </Typography> */}
                        </Grid>
                        <Grid item style={{ padding: '8px' }}>
                            <Button variant="outlined" style={{ color: '#95cd33' }} onClick={handleAddCart}>ADD TO CART</Button>
                        </Grid>

                        {errorMsg && <Grid><Typography variant="h6" style={{ color: 'red' }}>{errorMsg}</Typography></Grid>}

                    </Grid>
                </Grid>
            </div>
            {/* </>}
            </Grid> */}
        </Fragment>
    );
}

const mapStateToProps = state => ({
    // userProductTypesData: state.data.userProductTypesData
});

BookDetails.propTypes = {
    width: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    getProductsById: PropTypes.func.isRequired
};
// export default withRouter(withStyles(styles)(LoginDialog));
// export default withStyles(styles, { withTheme: true })(
//   withWidth()(PricingSection)
// );
export default connect(mapStateToProps, { getProductsById })(withRouter(BookDetails));