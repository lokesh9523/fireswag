import React, {useState,useEffect} from 'react'
import { withStyles } from '@material-ui/core'
import LogoBlue from '../../../assets/img/logoBlue.png'
import LogoGreen from '../../../assets/img/logoGreen.png'
import LogoOrange from '../../../assets/img/logoOrange.png'
import { connect } from 'react-redux'
import myTheme from '../../../theme'
import clsx from 'clsx'

const styles = (theme) => ({
  footerInner: {
    top: 'auto',
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '150px',
    width: '100%',
    marginTop: '50px',
    paddingTop:'25px',
    paddingBottom:'25px',
  },
  footerInnerBg:{
    backgroundColor: myTheme.palette.common.footerBg
  },
  footerInnerBga:{
    backgroundColor: myTheme.palette.common.footerBga
  },
  gridColumn: {
    height: 90,
    display: 'inline-block',
    marginInline: 16
  },
})

function Footer(props) {
  const { classes, themeSetting } = props
  const [currentTheme,setCurrentTheme] = useState();
  useEffect(()=>{
    setCurrentTheme(themeSetting.theme)
  },[themeSetting])
  return (
    <footer>
      <div className={ currentTheme === true ? clsx(classes.footerInner,classes.footerInnerBg) : clsx(classes.footerInner,classes.footerInnerBga) }>
        <div>
          <a
            href="http://firesea.blocmatrix.com/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={LogoBlue} alt="firesea" className={classes.gridColumn} />
          </a>

          <a href="https://fireswag.org/">
            <img src={LogoGreen} alt="firesea" className={classes.gridColumn} />
          </a>

          <a href="https://fireswap.org/" target="_blank" rel="noreferrer">
            <img
              src={LogoOrange}
              alt="firesea"
              className={classes.gridColumn}
            />
          </a>
        </div>
      </div>
    </footer>
  )
}
const mapStateToProps = (state) => {
  return {
    themeSetting: state.theme,
  }
}

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(Footer),
)
