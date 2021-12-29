import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  Grid,
  Typography,
  // isWidthUp,
  withWidth,
  withStyles
} from "@material-ui/core";
import PriceCard from "./PriceCard";
import calculateSpacing from "./calculateSpacing";
import { withRouter } from "react-router-dom";

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
  }
});

function PricingSection(props) {
  const { width, classes, history } = props;
  const [selectedBookDetails, setSelectedBookDetails] = useState('')
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

  const handleChange = (book, e) => {
    setSelectedBookDetails(e);
    history.push(`book/${e}`);
  }

  return (
    <div className="lg-p-top" style={{ backgroundColor: "#FFFFFF" }}>
      <Typography variant="h3" align="center">
        PRODUCTS
      </Typography>
      <div className={classNames("container-fluid", classes.containerFix)}>
        <Grid
          container
          spacing={calculateSpacing(width)}
          className={classes.gridContainer}
        >
          {books.map((book, index) => (
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
                imageUrl={book.url}
                title={book.name}
                pricing={
                  <span>
                    $14.99
                  <Typography display="inline"> / month</Typography>
                  </span>
                }
                features={["Feature 1", "Feature 2", "Feature 3"]}

              />
            </Grid>
          ))}
          {/* <Grid
            item
            xs={12}
            sm={6}
            lg={3}
            className={classes.cardWrapper}
            data-aos="zoom-in-up"
          >
            <PriceCard
              title="Starter"
              pricing={
                <span>
                  $14.99
                  <Typography display="inline"> / month</Typography>
                </span>
              }
              features={["Feature 1", "Feature 2", "Feature 3"]}
            />
          </Grid>
          <Grid
            item
            className={classes.cardWrapperHighlighted}
            xs={12}
            sm={6}
            lg={3}
            data-aos="zoom-in-up"
            data-aos-delay="200"
          >
            <PriceCard
              highlighted
              title="Premium"
              pricing={
                <span>
                  $29.99
                  <Typography display="inline"> / month</Typography>
                </span>
              }
              features={["Feature 1", "Feature 2", "Feature 3"]}
            />
          </Grid>
          <Grid
            item
            className={classes.cardWrapper}
            xs={12}
            sm={6}
            lg={3}
            data-aos="zoom-in-up"
            data-aos-delay={isWidthUp("md", width) ? "400" : "0"}
          >
            <PriceCard
              title="Business"
              pricing={
                <span>
                  $49.99
                  <Typography display="inline"> / month</Typography>
                </span>
              }
              features={["Feature 1", "Feature 2", "Feature 3"]}
            />
          </Grid>
          <Grid
            item
            className={classes.cardWrapper}
            xs={12}
            sm={6}
            lg={3}
            data-aos="zoom-in-up"
            data-aos-delay={isWidthUp("md", width) ? "600" : "200"}
          >
            <PriceCard
              title="Tycoon"
              pricing={
                <span>
                  $99.99
                  <Typography display="inline"> / month</Typography>
                </span>
              }
              features={["Feature 1", "Feature 2", "Feature 3"]}
            />
          </Grid> */}
        </Grid>
      </div>
    </div>
  );
}

PricingSection.propTypes = {
  width: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired
};
// export default withRouter(withStyles(styles)(LoginDialog));
// export default withStyles(styles, { withTheme: true })(
//   withWidth()(PricingSection)
// );
export default withRouter(withStyles(styles, { withTheme: true })(withWidth()(PricingSection)));
