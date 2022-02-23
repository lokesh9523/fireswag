import React from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  withWidth
} from "@material-ui/core";
import LogoBlue from "../../../assets/img/logoBlue.png";
import LogoGreen from "../../../assets/img/logoGreen.png";
import LogoOrange from "../../../assets/img/logoOrange.png";

const styles = theme => ({
  footerInner: {
    backgroundColor: "#EAFFFC",
    top:'auto',
    bottom:0,
    display: 'flex',
    alignItems:'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height:'100px',
    width:'100%',
    marginTop: '50px'
  },
  gridColumn: {
    height: 90,
    display: 'inline-block',
    marginInline: 16,
  }
});

function Footer(props) {
  const { classes } = props;

  return (
    <footer>
      <div className={classes.footerInner}>
        <div>
        <a href="http://firesea.blocmatrix.com/" target="_blank"  rel="noreferrer"><img src= {LogoBlue} alt="firesea"  className={classes.gridColumn}/></a>

        <a href="https://fireswag.org/"><img src= {LogoGreen} alt="firesea"  className={classes.gridColumn}/></a>

        <a href="https://fireswap.org/" target="_blank" rel="noreferrer"><img src= {LogoOrange} alt="firesea"  className={classes.gridColumn}/></a>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired
};

export default withWidth()(withStyles(styles, { withTheme: true })(Footer));
