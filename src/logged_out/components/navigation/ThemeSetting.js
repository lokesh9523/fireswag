import { Button, withStyles } from '@material-ui/core'
import React, { memo } from 'react'
import NightMode from '../../../assets/img/nightMode.svg'
const ThemeSettings = (props) => {
  let active = false
  const { classes } = props
  const handleClick = () => {
    localStorage.removeItem('theme')
    active = !active
    localStorage.setItem('theme', active)
  }
  return (
    <Button onClick={handleClick}>
      <img src={NightMode} className={classes.nightMode} alt="Night Mode" />
    </Button>
  )
}
const styles = (theme) => ({
  nightMode: {
    height: 36,
  },
})

export default withStyles(styles, { withTheme: true })(memo(ThemeSettings))
