import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import bannerSrc from '../../../assets/img/bannerImage.png'
const useStyles = makeStyles((theme) => ({
  bannerArea: {
    backgroundColor: '#0c0807',
    padding: '0px',
    margin: '0px',
    position: 'relative',
    top: '-6px',
  },
  bannerImage: {
    width: '100%',
    position: 'relative',
    top: '6px',
  }
}))

const BannerSection = () => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.bannerArea}>
        <img className={classes.bannerImage} src={bannerSrc} alt="" />
      </div>
    </>
  )
}

export default BannerSection
