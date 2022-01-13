import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  Grid,
  Typography,
  Button,
  // isWidthUp,
  withWidth,
  withStyles,
  CircularProgress,
} from "@material-ui/core";
import PriceCard from "./PriceCard";
import calculateSpacing from "./calculateSpacing";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { getProductType, getProducts,apiUrl } from './../../../redux/actions/userapi';
import clsx from 'clsx';


const styles = theme => ({
  containerFix: {
    [theme.breakpoints.down("md")]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6)
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4)
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    overflow: "hidden",
    // paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  cardWrapper: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: 340
    },
    cursor: "pointer"
  },
  cardWrapperHighlighted: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: 360
    }
  },
  products: {
    width: "40%",
    height: 100,
    display: "flex",
    position: "absolute",
    boxShadow: "0px 1px 6px 0px #17bb43ad",
    marginTop: "-8em",
    alignItems: "flex-end",
    marginLeft: "auto",
    marginBottom: "3em",
    marginRight: "2em",
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    left: "56%",
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
    [theme.breakpoints.down("xs")]: {
      left: 0,
    width: "100%",
    height: 100,
    display: "flex",
    position: "absolute",
    boxShadow: "0px 1px 6px 0px #17bb43ad",
    marginTop: "-3.5em",
    alignItems: "flex-end",
    marginLeft: "auto",
    marginRight: "2em",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,

    },

    
  },
  productClass: {
    marginInline: "1.25em",
    position: "relative",
    left: "-25%",
    [theme.breakpoints.down("xs")]: {
      left: "0",
    }
  },
  productsName: {
    color: "#71BB43",
    fontSize: "1.25em",
    fontWeight: 500,
    marginTop: "-2em",
  },
  button: {
    color: 'white',
    backgroundColor: '#3cb371',
    fontSize: '1rem',
    padding: '4px 6px',
    // minWidth: '125px',
    borderRadius: 8,
    '&:hover': {
      backgroundColor: theme.palette.brandDark,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: theme.palette.brand
      }
    },
    '&.MuiButton-containedSizeLarge': {
      fontSize: '1.4rem',
      padding: '12px 16px',
      minWidth: '140px',
    },
    '&.MuiButton-containedSizeSmall': {
      fontSize: '0.85rem',
      padding: '6px 8px',
      minWidth: '94px',
    },
  },
  spinner: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    zIndex: 9
  },
});

function PricingSection(props) {
  const { width, classes, history, getProductType, getProducts, userProductTypesData } = props;
  const [selectedBookDetails, setSelectedBookDetails] = useState('');
  const [produttypeList, setProductTypeList] = useState([]);
  const [selectedProductType, setSelectedproductType] = useState(null);
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
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


  useEffect(() => {
    async function fetchData() {
      if (!userProductTypesData) {
        await getProductType();
        setProductTypeList(userProductTypesData);
      }
      // setSelectedproductType(userProductTypesData[0]._id);
    }
    fetchData();
  }, [userProductTypesData, getProductType]);

  useEffect(() => {
    (async () => {
      if (selectedProductType) {
        let queryParams = `product_type_id=${selectedProductType}`;
        let res = {};
        setLoading(true);
        res = await getProducts(queryParams);
        setLoading(false);
        if (res.success) {
          setProductList(res.data || []);
        }

      }
    })();
    // eslint-disable-next-line
  }, [selectedProductType]);

  const handleChange = (book, e) => {
    setSelectedBookDetails(book._id);
    history.push(`product/${book._id}`);
  }
  const handleProductType = (id) => {
    setSelectedproductType(id);
  }

  return (
    <div className="lg-p-top" style={{ backgroundColor: "#FFFFFF" }}>
      <Grid direction="row" spacing={1}>
        {/* <Grid gridColumn="span 6" item sm={2}>
          <Typography variant="h5" align="center">
            Products:
          </Typography>
        </Grid> */}
        <Grid className={classes.products}>
        {userProductTypesData && userProductTypesData.length && userProductTypesData.map((book, index) => (
          
          <div className={classes.productClass} item sm={1} key={index}>
            <div className={classes.productsName} onClick={()=>handleProductType(book._id)}>
              {book.name}
            </div>
          </div>
        ))}
        </Grid>
      </Grid>
      <div className={classNames("container-fluid", classes.containerFix)}>

        <Grid
          container
          spacing={calculateSpacing(width)}
          className={classes.gridContainer}
        >{loading ? <><CircularProgress
          className={clsx(classes.spinner)}
        /></> : <>
          {productList.map((book, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              lg={4}
              className={classes.cardWrapper}
              data-aos="zoom-in-up"
              onClick={() => { handleChange(book, index) }}
              key={index}
            >
              <PriceCard
                highlighted={selectedBookDetails === index ? true : false}
                imageUrl={`${apiUrl}${book.image_url}`}
                title={book.name}
                pricing={
                  <span>
                    ${book.price}
                  </span>
                }
                features={[`available:${book.total_count}`, `Pre Booking:${book.prebooking ? 'YES':'NO'}`]}

              />
            </Grid>
          ))}
        </>
          }
        </Grid>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  userProductTypesData: state.data.userProductTypesData
});

PricingSection.propTypes = {
  width: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  getProductType: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired
};
// export default withRouter(withStyles(styles)(LoginDialog));
// export default withStyles(styles, { withTheme: true })(
//   withWidth()(PricingSection)
// );
export default connect(mapStateToProps, { getProductType, getProducts })(withRouter(withStyles(styles, { withTheme: true })(withWidth()(PricingSection))));
