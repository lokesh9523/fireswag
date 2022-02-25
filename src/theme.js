import { responsiveFontSizes } from '@material-ui/core'
import { createTheme } from '@material-ui/core/styles'

// colors
const primary = '#b3294e'
const secondary = '#4829B2'
const black = '#343a40'
const white = '#ffffff'
const green = '#71BC43'
const colorDark = '#121212'
const darkBlack = 'rgb(36, 40, 44)'
const background = '#f5f5f5'
const warningLight = 'rgba(253, 200, 69, .3)'
const warningMain = 'rgba(253, 200, 69, .5)'
const warningDark = 'rgba(253, 200, 69, .7)'
const footerBg = '#eef7e8'
const footerBga = '#2d4420'

//align
const alignLeft = 'left'
const alignRight = 'right'
const alignCenter = 'center'

//border
const borderWidth = 2
const borderColor = '#707070'
const searchBorder = '#707070'

//gradient
const greenGradient = 'linear-gradient(180deg, rgba(16,107,54,1) 0%, rgba(113,188,67,1) 100%)'

// width
const width100 = '100%'

//margin
const marginLeft0px = '0px'

// breakpoints
const xl = 1920
const lg = 1280
const md = 960
const sm = 600
const xs = 0

// spacing
const spacing = 8

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: { main: primary },
    secondary: { main: secondary },
    common: {
      black,
      darkBlack,
      white,
      green,
      colorDark,
      searchBorder,
      footerBg,
      footerBga
    },
    warning: {
      light: warningLight,
      main: warningMain,
      dark: warningDark
    },
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
    background: {
      default: background,
    },
    spacing
  },
  breakpoints: {
    // Define custom breakpoint values.
    // These will apply to Material-UI components that use responsive
    // breakpoints, such as `Grid` and `Hidden`. You can also use the
    // theme breakpoint functions `up`, `down`, and `between` to create
    // media queries for these breakpoints
    values: {
      xl,
      lg,
      md,
      sm,
      xs,
    },
  },
  border: {
    borderColor: borderColor,
    borderWidth: borderWidth,
    searchBorder: searchBorder
  },
  overrides: {
    MuiExpansionPanel: {
      root: {
        position: 'static',
      },
    },
    MuiTableCell: {
      root: {
        paddingLeft: spacing * 2,
        paddingRight: spacing * 2,
        borderBottom: `${borderWidth}px solid ${borderColor}`,
        [`@media (max-width:  ${sm}px)`]: {
          paddingLeft: spacing,
          paddingRight: spacing,
        },
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: borderColor,
        height: borderWidth,
      },
    },
    MuiPrivateNotchedOutline: {
      root: {
        borderWidth: borderWidth,
      },
    },
    MuiListItem: {
      divider: {
        borderBottom: `${borderWidth}px solid ${borderColor}`,
      },
    },
    MuiDialog: {
      paper: {
        width: '100%',
        maxWidth: 430,
        marginLeft: spacing,
        marginRight: spacing,
      },
    },
    MuiTooltip: {
      tooltip: {
        backgroundColor: darkBlack,
      },
    },
    MuiExpansionPanelDetails: {
      root: {
        [`@media (max-width:  ${sm}px)`]: {
          paddingLeft: spacing,
          paddingRight: spacing,
        },
      },
    },
  },
  typography: {
    useNextVariants: true,
  },
  gradient:{
    greenGradient
  },
  align:{
    alignLeft,
    alignRight,
    alignCenter
  },
  widthPercentage:{
    width100
  },
  margin:{
    marginLeft0px
  }
})

export default theme
