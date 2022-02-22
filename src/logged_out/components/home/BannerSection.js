import React from 'react'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { makeStyles } from '@material-ui/core/styles'
import bannerSrc from '../../../assets/img/bannerImage.png'
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
    color: 'green'
  },
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
  },
  IndexProductsMenuArea: {
   
  },
  ButtonGroup:{
    backgroundColor: '#ff0000'
  },
  selecedBtnStyle:{
    backgroundColor: '#71bc43',
    padding: '7px 35px',
    color: '#fff',
    textTransform: 'none',
    fontSize: '16px',
    '&:hover':{
      backgroundColor: '#71bc43',
    }
  },
  nonSelecedBtnStyle:{
    color: '#71bc43',
    padding: '7px 35px',
    textTransform: 'none',
    fontSize: '16px'
  },
  buttonLeft: {
    borderTopLeftRadius:'25px',
    borderBottomLeftRadius:'25px'
  },
  buttonRight: {
    borderTopRightRadius:'25px',
    borderBottomRightRadius:'25px'
  },
  sliderArea:{
    height: '350px',
    backgroundColor: '#ff00ff',
    margin: '0% 200px',
    marginTop: '25px'
  }
}))
const BannerSection = () => {
  const classes = useStyles()
  const [selectedBtn, setSelectedBtn] = React.useState(-1);
  return (
    <>
      <div className={classes.bannerArea}>
        <img className={classes.bannerImage} src={bannerSrc} alt="" />
      </div>
      <div className={`${classes.root} ${classes.IndexProductsMenuArea}`}>
          <ButtonGroup disableElevation variant="outlined" aria-label="outlined button group">
            <Button className={selectedBtn === 1 ? `${classes.selecedBtnStyle} ${classes.buttonLeft}` : `${classes.nonSelecedBtnStyle} ${classes.buttonLeft}`} onClick={()=>setSelectedBtn(1)}>Hats</Button>
            <Button className={selectedBtn === 2 ? classes.selecedBtnStyle : classes.nonSelecedBtnStyle} onClick={()=>setSelectedBtn(2)}>Shirts</Button>
            <Button className={selectedBtn === 3 ? classes.selecedBtnStyle : classes.nonSelecedBtnStyle} onClick={()=>setSelectedBtn(3)}>Hoodies</Button>
            <Button className={selectedBtn === 4 ? classes.selecedBtnStyle : classes.nonSelecedBtnStyle} onClick={()=>setSelectedBtn(4)}>Drinkware</Button>
            <Button className={selectedBtn === 5 ? `${classes.selecedBtnStyle} ${classes.buttonRight}` : `${classes.nonSelecedBtnStyle} ${classes.buttonRight}`} onClick={()=>setSelectedBtn(5)}>Stickers</Button>
          </ButtonGroup>
      </div>
    </>
  )
}

export default BannerSection
