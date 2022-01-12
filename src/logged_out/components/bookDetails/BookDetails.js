
import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
// import classNames from "classnames";
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/styles';

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
    const [selectedBook, setSelectedBook] = useState({});
    const [selectedBookId, setSelectedBookId] = useState(null);

    // useEffect(() => {
    //     // if (!selectedBook) {
    //     setSelectedBookId(books[props.match.params.productid])
    //     console.log("iam heree")
    //     // }
    // }, [props.match.params.productid]);

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
        temp.push(selectedBook);
        setCart(temp);
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

                        <Grid item style={{ padding: '8px' }}>
                            <Button variant="outlined" style={{ color: '#95cd33' }} onClick={handleAddCart}>ADD TO CART</Button>
                        </Grid>

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