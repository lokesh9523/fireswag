import React from "react";
import { makeStyles } from '@material-ui/core/styles'
import sliderImg from '../../../assets/img/hats.png'
import myTheme from '../../../theme' 
const useStyles = makeStyles((theme) => ({
    sliderArea:{
      margin: '0% 15%',
      marginTop: '25px',
      border: `2px solid ${myTheme.border.borderColor}`,
      marginBottom: '0px',
      padding: '0px'
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
