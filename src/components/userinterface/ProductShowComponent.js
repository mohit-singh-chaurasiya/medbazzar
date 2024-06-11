import { Grid, Paper, Radio, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { serverURL } from "../../Services/FetchNodeServices";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { createRef, useEffect } from "react";
import React from 'react';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ReactImageMagnify from 'react-image-magnify';
import { useState } from "react";
import mainlogo from "../../assets/disc.png"

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };





export default function ProductShowComponent(props) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  var productdetails = props?.item
  var images = productdetails?.multi_picture?.split(",")
  console.log('aaaaaa', images[0])

  const [mainImage, setMainImage] = useState([])

  var navigate = useNavigate()
  var PDsld = createRef()

  var settings = {

    //dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: !matches ? 5 : 5,
    slidesToScroll: 1,
    vertical: true,
    arrows: false,
    autoplay: false

  }
  var settings2 = {

    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    vertical: true,
    arrows: true,


  }
  //  alert(mainImage)

  const handleChangePicture = (item) => {

    setMainImage(item)


  }

  useEffect(function () {
    setMainImage(images[0])
  }, [props])

  var picture = <img src={`${serverURL}/images/${mainImage}`} />





  const showDetailSlide = () => {
    return images.map((item, index) => {
      return (<div ><img src={`${serverURL}/images/${item}`} onMouseOver={() => handleChangePicture(item)} style={{ width: '40%', height: '40%', aspectRatio: 2 / 2, margin: 'auto', borderRadius: 5, display: 'Block', cursor: 'pointer' }} /></div>)

    })

  }
  // const showImage = (index) => {
  //   var slider = images[index]
  //   return (<div><img src={`${serverURL}/images/${mainImage}`} onClick={(e)=>setMainImage(e)} style={{ width: '90%', height: '90%', margin: 'auto' }} /></div>)
  // }



 



  return (





    <div container spacing={2} style={{ display: 'flex', width: '100%', height: '100%' }}>
      <Grid item xs={12} >
        <Grid item xs={12} variant="contained" >
          <div item xs={12} f variant="contained" style={{ display: 'flex', width: '100%', justifyContent: 'end', color: "#000" }}>
            < FavoriteBorderOutlinedIcon style={{ marginRight: 15 }} />
            < ShareOutlinedIcon />
          </div>
        </Grid>
        <div>
          <Grid item xs={12} style={{ width: '100%', display: 'flex', position: 'sticky' }}>

            <Grid item xs={4} style={{ display: 'block', marginTop: '3.5%', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ fontWeight: 'bold', fontSize: 17, margin: '5px 0px 15px 15px' }}>{props?.title}</div>

              {!matches ? < Slider ref={PDsld} {...settings} style={{ marginTop: '15%', }}>{showDetailSlide()}</Slider> :
                < Slider ref={PDsld} {...settings} style={{ marginTop: '40%' }}>{showDetailSlide()}</Slider>}

            </Grid>
            {!matches ? <Grid item xs={8} style={{ marginTop: '10%' }}  >


              {/* {showImage()} */}
              <div style={{ background: '#fff', }} >
               
                {/* {showImage()} */}
         
                 <ReactImageMagnify {...{
                  smallImage: {
                    alt: 'Wristwatch by Versace',
                    isFluidWidth: true,
                    // srcSet: this.srcSet,
                     width:600,
                     height:800,
                     tint:"#300",
                     xoffset:15,
                    src: `${serverURL}/images/${mainImage}`,
                    // sizes: '(min-width: 800px) 33.5vw, (min-width: 415px) 50vw, 100vw',


                  },

                  largeImage: {
                    src: `${serverURL}/images/${mainImage}`,
                    width: 1200,
                    height: 1800,
                     color: "red",
                    border: 'solid 2px #00000021',


                  },
                  enlargedImagePosition:'over',
                  lensStyle:{color :"rgba(0,0,0,.8" },
                   

                }} /> 
                </div>
            </Grid> :
              <Grid item xs={8} style={{ marginTop: '15%' }}>

                <div>

                  <img src={`${serverURL}/images/${mainImage}`} style={{ width: '80%', height: '80%' }} />
                </div>


              </Grid>}


          </Grid>
        </div>
      </Grid>



    </div>


  )
}