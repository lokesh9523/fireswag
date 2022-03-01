import React, { memo, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Button,
  Hidden,
  IconButton,
  withStyles,
  Badge,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import CartIcon from '../../../assets/img/svg/cart-icon.svg'
import NavigationDrawer from '../../../shared/components/NavigationDrawer'
import SearchIcon from '../../../assets/img/svg/search-icon.svg'
import PhoenixLogo from '../../../assets/img/phoenix.svg'
import Logo from '../../../assets/img/logoGreen.png'
import NightMode from '../../../assets/img/nightMode.svg'
import LightMode from '../../../assets/img/lightMode.svg'
import { connect, useDispatch } from 'react-redux'
import { setThemeDark, setThemeLight } from '../../../redux/actions/theme'
import myTheme from '../../../theme'
import typography from '../../../theme/typography'
import clsx from 'clsx'
// import MaxWidthDialog from '../register_login/Child'
import LoginPopup from '../register_login/LoginPopup'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

const styles = (theme) => ({
  appBar: {
    [theme.breakpoints.down('xs')]: {
      width: myTheme.widthPercentage.width100,
      marginLeft: myTheme.margin.marginLeft0px,
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
    alignItems: myTheme.align.alignCenter,
  },
  phoenixLogo: {
    height: 36,
    cursor: 'pointer',
  },
  searchboxInput: {
    top: 10,
    left: '5%',
    width: '40%',
    border: `1px solid ${myTheme.border.borderColor}`,
    height: 40,
    margin: 0,
    color: myTheme.border.borderColor,
    outline: 0,
    padding: '0px 5px 0px 44px',
    position: 'absolute',
    fontWeight: 300,
    fontSize: 18,
    borderRadius: 10,
    backgroundColor: 'transparent',
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
    textAlign: 'center',
    fontFamily: 'Montserrat',
    lineHeight: 0,
  },
  searchIcon: {
    marginTop: 8,
    marginLeft: 2,
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
    height: 44,
  },
  nightModeBtn: {
    padding: '0px',
    margin: '0px',
    width: '44px !important',
    height: '44px',
    marginTop: '8px',
    '&:hover': {
      backgroundColor: 'transparent !important',
    },
  },
  menuButtonText: {
    float: 'left',
    marginTop: '5px',
    fontSize: typography.body1.fontSize,
    fontWeight: theme.typography.h6.fontWeight,
    textTransform: typography.textTransformNone.textTransform,
    color: myTheme.palette.common.green,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  noDecoration: {
    textDecoration: 'none !important',
    color: 'green',
  },
  cartIconStyle: {
    width: '40px',
  },
  userIcon: {
    float: 'left'
  }
})

function NavBar(props) {
  const {
    classes, openLoginDialog,
    handleMobileDrawerOpen,
    handleMobileDrawerClose,
    mobileDrawerOpen,
    selectedTab,
    cart,
    themeSetting,
  } = props
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const userToken = localStorage.getItem('USER_FS_TOKEN');

  const [count, setCount] = useState(0);
  // const [isMobileOpen, setIsMobileOpen] = useState(false);
  // const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
  const [showThemeIcon, setShowThemeIcon] = useState(themeSetting.theme);

  // const handleOpen = () => {
  //   setIsOpen(!isOpen)
  // }
  const [currentTheme, setCurrentTheme] = useState()

  const menuItems = [
    {
      link: '/',
      name: 'Home',
      // icon: <HomeIcon />
    },
    {
      link: '/cart',
      name: '.',
      icon: <img src={CartIcon} alt="" className={classes.cartIconStyle} />,
    },
    {
      //link: "",
      name: 'Sign In',
      onClick: openLoginDialog,
    },
    // {
    //   name: "Register",
    //   onClick: openRegisterDialog,
    //   //icon: <HowToRegIcon className="text-white" />
    // },
    // {
    //   name: 'Sign In',
    //   onClick: openLoginDialog,
    //   icon: <LockOpenIcon className="text-white" />
    // },
  ]

  // const openMobileDrawer = useCallback(() => {
  //   setIsMobileOpen(true)
  // }, [setIsMobileOpen])

  // const closeMobileDrawer = useCallback(() => {
  //   setIsMobileOpen(false)
  // }, [setIsMobileOpen])

  // const openDrawer = useCallback(() => {
  //   setIsSideDrawerOpen(true)
  // }, [setIsSideDrawerOpen])

  // const closeDrawer = useCallback(() => {
  //   setIsSideDrawerOpen(false)
  // }, [setIsSideDrawerOpen])

  useEffect(() => {
    setCount(cart.length)
    setShowThemeIcon(themeSetting.theme)
    setCurrentTheme(themeSetting.theme)
  }, [cart, themeSetting])

  const handleClick = (value) => {
    localStorage.setItem('theme', value)
    if (value === false) {
      dispatch(setThemeDark())
    } else {
      dispatch(setThemeLight())
    }
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const logOut = () => {
    localStorage.clear()
    window.location.href = '/'
  }

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={
          currentTheme === true
            ? clsx(classes.appBar, classes.appBarNight)
            : clsx(classes.appBar, classes.appBarDay)
        }
      >
        <Toolbar className={classes.toolbar}>
          <Link to={'/'}>
            <img
              src={PhoenixLogo}
              className={classes.phoenixLogo}
              alt="Phoenix Icon"
              to={'/'}
            />
          </Link>
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
                <img src={SearchIcon} className={classes.searchIcon} alt="" />
              </span>
            </div>
          </Hidden>
          <div>
            <Link to={'/'}>
              <img src={Logo} className={classes.logo} alt="Logo" />
            </Link>
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
              {menuItems.map((element, index) => {
                if (element.link) {
                  return (
                    <Link
                      key={index}
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
                        {element.name === '.' ? (
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
                if (userToken !== null) {
                  return (
                    <Box className={classes.userIcon} sx={{ flexGrow: 0, display: { xs: 'block' } }} key={index}>
                      <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                        </IconButton>
                      </Tooltip>
                      <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                      >
                        <MenuItem onClick={handleCloseNavMenu}>
                          <Typography onClick={logOut} textAlign="center">
                            Logout
                          </Typography>
                        </MenuItem>
                      </Menu>
                    </Box>
                  )
                } else {
                  return (<LoginPopup
                    isDialogOpened={isOpen}
                    handleCloseDialog={() => setIsOpen(false)}
                  />)
                }
              })}
              {/* <Button className={classes.signIn}>
                Sign In
              </Button> */}
              {showThemeIcon === true ? (
                <Button
                  className={classes.nightModeBtn}
                  onClick={() => handleClick(true)}
                >
                  <img
                    src={NightMode}
                    className={classes.nightMode}
                    alt="Light Mode"
                  />
                </Button>
              ) : (
                <Button
                  className={classes.nightModeBtn}
                  onClick={() => handleClick(false)}
                >
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
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(memo(NavBar)),
)
