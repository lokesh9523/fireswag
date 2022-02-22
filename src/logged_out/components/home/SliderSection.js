import React from "react";
import { makeStyles } from '@material-ui/core/styles'
import sliderImg from '../../../assets/img/hats.png'

const useStyles = makeStyles((theme) => ({
    sliderArea:{
      height: '390px',
      backgroundColor: '#eee',
      margin: '0% 200px',
      marginTop: '25px',
    },
    sliderImgWidth:{
        width: '100%'
    }
  }))

const SliderSection = () => {
    const classes = useStyles()

    return(
        <>
            <div className={classes.sliderArea}>
                <img className={classes.sliderImgWidth} src={sliderImg} alt="" />
            </div>
        </>
    )
}

export default SliderSection
