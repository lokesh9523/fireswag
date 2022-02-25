import React, {
  memo,
  useEffect,
  useState,
  useCallback,
  //useContext,
} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  //Typography,
  Button,
  Hidden,
  IconButton,
  withStyles,
  Badge,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
//import HomeIcon from '@material-ui/icons/Home'
//import ShoppingCartIcon from '@material-ui/icons//ShoppingCart'
//import ShoppingCartIcon from '../../../assets/img/svg/cart-icon.svg'
import CartIcon from '../../../assets/img/svg/cart-icon.svg'
// import HowToRegIcon from "@material-ui/icons/HowToReg";
// import LockOpenIcon from "@material-ui/icons/LockOpen";
// import BookIcon from "@material-ui/icons/Book";
// import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import NavigationDrawer from '../../../shared/components/NavigationDrawer'
import SearchIcon from '@material-ui/icons/Search'
import PhoenixLogo from '../../../assets/img/phoenix.svg'
import Logo from '../../../assets/img/logoGreen.png'
import NightMode from '../../../assets/img/nightMode.svg'
import LightMode from '../../../assets/img/lightMode.svg'
import { connect, useDispatch } from 'react-redux'
import { setThemeDark, setThemeLight } from '../../../redux/actions/theme'
//import { ContactlessOutlined } from '@material-ui/icons'
//import DayTheme from '../../../DayTheme'
//import NightTheme from '../../../NighTheme'
import myTheme from '../../../theme'
import typography from '../../../theme/typography'
const styles = (theme) => ({
  appBar: {
    //boxShadow: '0px 1px 6px 0px #17bb43ad',
    //backgroundColor: theme.palette.warning.light,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginLeft: 0,
    },
  },
  appBarDay: {
    backgroundColor: myTheme.palette.common.colorDark,
  },
  appBarNight: {
    backgroundColor: theme.palette.common.white,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  phoenixLogo: {
    height: 36,
  },
  searchbox: {
    position: 'relative',
    minWidth: '40px',
    width: '0%',
    height: '40px',
    float: 'right',
    overflow: 'hidden',
    transition: 'width 0.3s',
  },
  searchboxInput: {
    top: 10,
    left: '5%',
    width: '25%',
    border: `1px solid ${myTheme.border.borderColor}`,
    height: 40,
    margin: 0,
    outline: 0,
    padding: '0px 5px 0px 44px',
    position: 'absolute',
    fontSize: 18,
    borderRadius: 4,
  },
  searchboxSubmit: {
    width: '40px',
    height: '40px',
    display: 'block',
    position: 'absolute',
    top: 0,
    fontFamily: 'Montserrat',
    fontSize: '22px',
    left: 12,
    padding: 0,
    margin: 0,
    border: 0,
    outline: 0,
    lineHeight: '50px',
    textAlign: 'center',
    cursor: 'pointer',
    color: '#FFFFFF',
    background: '#fff',
    zIndex: -1,
  },
  searchboxIcon: {
    top: 11,
    left: '5.2%',
    color: '#707070',
    width: 40,
    cursor: 'pointer',
    height: 36,
    margin: 0,
    display: 'block',
    outline: 0,
    padding: 0,
    position: 'absolute',
    background: '#fff',
    textAlign: 'center',
    fontFamily: 'Montserrat',
    lineHeight: 0,
  },
  searchIcon: {
    fontSize: '1.5rem',
    marginTop: 8,
    marginLeft: 2,
    color: theme.palette.blueDark,
  },
  logo: {
    height: 100,
    position: 'absolute',
    left: '50%',
    top: 10,
    [theme.breakpoints.down('xs')]: {
      height: 64,
      left: '44%',
    },
  },
  signIn: {
    background: 'linear-gradient(to bottom, #106B36, #71BB43);',
    padding: '8px 18px',
    color: '#FFFFFF',
  },
  nightMode: {
    height: 36,
  },
  nightModeBtn:{
    padding: '0px',
    margin: '0px',
    width: '30px !important',
    height: '30px',
    '&:hover':{
      backgroundColor: 'transparent !important'
    }
  },
  menuButtonText: {
    fontSize: typography.body1.fontSize,
    fontWeight: theme.typography.h6.fontWeight,
    textTransform: typography.textTransformNone.textTransform,
    color: myTheme.palette.common.green,
  },
  brandText: {
    fontFamily: "'Baloo Bhaijaan', cursive",
    fontWeight: 400,
  },
  noDecoration: {
    textDecoration: 'none !important',
    color: 'green',
  },
})

function NavBar(props) {
  const dispatch = useDispatch()
  const {
    classes,
    openRegisterDialog,
    openLoginDialog,
    handleMobileDrawerOpen,
    handleMobileDrawerClose,
    mobileDrawerOpen,
    selectedTab,
    cart,
    themeSetting,
  } = props
  const [currentTheme,setCurrentTheme] = useState();

  const menuItems = [
    {
      link: '/',
      name: 'Home',
      // icon: <HomeIcon />
    },
    {
      link: '/cart',
      //name: 'cart',
      icon: <img src={CartIcon} alt="" />,
    },
    // {
    //   link: "",
    //   name: "Sign In"
    //   //onClick: openLoginDialog
    // },
    // {
    //   name: "Register",
    //   onClick: openRegisterDialog,
    //   //icon: <HowToRegIcon className="text-white" />
    // },
    {
      name: 'Sign In',
      //onClick: openLoginDialog,
      //icon: <LockOpenIcon className="text-white" />
    },
  ]
  const [count, setCount] = useState(0)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false)

  const openMobileDrawer = useCallback(() => {
    setIsMobileOpen(true)
  }, [setIsMobileOpen])

  const closeMobileDrawer = useCallback(() => {
    setIsMobileOpen(false)
  }, [setIsMobileOpen])

  const openDrawer = useCallback(() => {
    setIsSideDrawerOpen(true)
  }, [setIsSideDrawerOpen])

  const closeDrawer = useCallback(() => {
    setIsSideDrawerOpen(false)
  }, [setIsSideDrawerOpen])
  const [showThemeIcon, setShowThemeIcon] = useState(themeSetting.theme)
  useEffect(() => {
    setCount(cart.length)
    setShowThemeIcon(themeSetting.theme)
  }, [cart, themeSetting])

  const handleClick = (value) => {
    //sconsole.log(value)
    localStorage.setItem('theme', value)
    if (value === false) {
      dispatch(setThemeDark())
    } else {
      dispatch(setThemeLight())
    }
  }
  
  useEffect(()=>{
    setCurrentTheme(themeSetting.theme)
  },[themeSetting])

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={ currentTheme === true ? `${classes.appBar} ${classes.appBarNight}` : `${classes.appBar} ${classes.appBarDay}` }>
        <Toolbar className={classes.toolbar}>
          <img
            src={PhoenixLogo}
            className={classes.phoenixLogo}
            alt="Phoenix Icon"
          />
          <Hidden smDown>
            <div>
              <input
                type="search"
                placeholder="Search for collection or items"
                name="search"
                className={classes.searchboxInput}
                required
                onChange={props.onChange}
              />
              <span className={classes.searchboxIcon}>
                <SearchIcon className={classes.searchIcon} />
              </span>
            </div>
          </Hidden>
          <div>
            <img src={Logo} className={classes.logo} alt="Logo" />
          </div>
          <div>
            <Hidden mdUp>
              <IconButton
                className={classes.menuButton}
                onClick={handleMobileDrawerOpen}
                aria-label="Open Navigation"
              >
                <MenuIcon color="primary" />
              </IconButton>
            </Hidden>
            <Hidden smDown>
              {menuItems.map((element) => {
                if (element.link) {
                  return (
                    <Link
                      key={element.name}
                      to={element.link}
                      className={classes.noDecoration}
                      onClick={handleMobileDrawerClose}
                    >
                      <Button
                        color="secondary"
                        size="large"
                        classes={{ text: classes.menuButtonText }}
                      >
                        {element.icon ? element.icon : ''}
                        {element.name === 'cart' ? (
                          <Badge badgeContent={count} color="primary">
                            {element.name}
                          </Badge>
                        ) : (
                          element.name
                        )}
                      </Button>
                    </Link>
                  )
                }
                return (
                  <Button
                    color="secondary"
                    size="large"
                    onClick={element.onClick}
                    classes={{ text: classes.menuButtonText }}
                    key={element.name}
                  >
                    {element.name}
                  </Button>
                )
              })}
              {/* <Button className={classes.signIn}>
                Sign In
              </Button> */}
              {showThemeIcon === true ? (
                <Button className={classes.nightModeBtn} onClick={() => handleClick(true)}>
                <img
                  src={NightMode}
                  className={classes.nightMode}
                  alt="Light Mode"
                />
              </Button>
              ) : (
                <Button className={classes.nightModeBtn} onClick={() => handleClick(false)}>
                  <img
                    src={LightMode}
                    className={classes.nightMode}
                    alt="Night Mode"
                  />
                </Button>
              )}
            </Hidden>
          </div>
        </Toolbar>
      </AppBar>
      <NavigationDrawer
        // menuItems={menuItems.map((element) => ({
        //   link: element.link,
        //   name: element.name,
        //   icon: element.icon.mobile,
        //   onClick: element.onClick,
        // }))}
        menuItems={menuItems}
        anchor="right"
        open={mobileDrawerOpen}
        selectedItem={selectedTab}
        onClose={handleMobileDrawerClose}
        // anchor="left"
        // open={isMobileOpen}
        // selectedItem={selectedTab}
        // onClose={closeMobileDrawer}
      />
    </div>
  )
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  handleMobileDrawerOpen: PropTypes.func,
  handleMobileDrawerClose: PropTypes.func,
  mobileDrawerOpen: PropTypes.bool,
  selectedTab: PropTypes.string,
  openRegisterDialog: PropTypes.func.isRequired,
  openLoginDialog: PropTypes.func.isRequired,
  cart: PropTypes.object,
}

const mapStateToProps = (state) => {
  return {
    themeSetting: state.theme,
  }
}

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(memo(NavBar)),
)
