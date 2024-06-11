import { Grid, Paper, Radio, Button } from "@mui/material";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { createRef } from "react";
import React from 'react';
import ProductShowComponent from "../../components/userinterface/ProductShowComponent"
import InfoComponent from "../../components/userinterface/InfoComponent";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useLocation } from "react-router-dom";
import Header from "../../components/userinterface/Header";
import { useState } from "react";
import ReactImageMagnify from "react-image-magnify";
import MenuBar from "../../components/userinterface/MenuBar";
import ProductComponent from "../../components/userinterface/ProductComponet";
import { useEffect } from "react";
import { postData } from "../../Services/FetchNodeServices";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


export default function ProductDetailsComponent() {
  // var navigate=useNavigate()
  var location = useLocation()
  var item = location?.state?.data
  // alert(JSON.stringify(item))
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [pageRefresh, setPageRefresh] = useState(false)

  
  return (
    <div>
      <Header />
      <MenuBar />

      <Grid xs={12} style={{ width: '100%', height: 'auto', background: '#fff', color: '#fff', fontFamily: 'kanit' }}>
        <Grid container spacing={3} style={{ display: 'flex', justifyContent: 'center', marginTop: '1%', width: '90%', height: '100%' }} >
          <Grid item xs={12} md={6}  >
            <ProductShowComponent item={item} />





          </Grid>

          <Grid item xs={12} md={6} >

            <InfoComponent item={item} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} />






          </Grid>





        </Grid>
      

      </Grid>
    </div>


  )
}
