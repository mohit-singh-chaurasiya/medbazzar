import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../Services/FetchNodeServices";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { createRef } from "react";
import { Button, Grid, Paper } from "@mui/material";
import mainlogo from "../../assets/MedBazzar-Logo.png"
import { useNavigate } from "react-router-dom";
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import PlusMinusComponent from "./PlusMinusComponent";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Skeleton } from "@mui/material";


//import ProductDetailsComponent from "./ProductDetailsComponent";
export default function ProductComponent(props) {
  var product = props?.data
  var productFromRedux = useSelector(state => state.data)
  var productRedux = Object.values(productFromRedux)
  var dispatch = useDispatch()
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  var navigate = useNavigate()
  var Psld = createRef();
  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
 
 var product = props?.data

  const handleChange = (v, item) => {
    if (v > 0) {
      item['qty'] = v
      dispatch({ type: 'ADD_PRODUCT', payload: [item.productdetailsid, item] })

    }
    else {
      dispatch({ type: 'DELETE_PRODUCT', payload: [item.productdetailsid] })
    }


    props.setPageRefresh(!props.pageRefresh)
    // alert(v)


  }


  const handleProductDetailsComponent = (item) => {
    navigate('/productdetailscomponent', { state: { data: item } })
  }

  var product = props?.data || [];
  // alert(JSON.stringify(product))



  const showSlide = (item) => {
const image=item.picture

    return (
      <div style={{ display: 'flex', justifyContent: 'center', margin: 10, boxShadow: '1px 1px 10px 0px #00010',width:'90%'}}>
        <img src={`${serverURL}/images/${item.picture}`} onClick={() => handleProductDetailsComponent(item)} style={{ width: "80%", borderRadius: 0, height: 'auto', aspectRatio: 3 / 3  }} />
      </div>
    );
  }



  const filterProduct = () => {
    return product?.map((item, index) => {
      return (
        <div >
          {/* <div style={{background:'blue' ,height:'100%'}}> */}
          <div style={{
          width:"40%",
            // background: 'red',
            display: 'flex',
            justifyContent: 'center',
            // flexWrap:"wrap",
          
            margin:"auto",
            flexDirection:'row'
           

            

          }}>
            <Grid container spacing={1}  >
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'end' }}>

                <BookmarkAddOutlinedIcon style={{ marginLeft: 'auto', display: 'flex', cursor: 'pointer', weight: '95%', height: '95%' }} />

              </Grid>

              <Grid item xs={12}   >

                {showSlide(item)}


              </Grid>


              <Grid item xs={12} style={{
                fontSize: matchesMd ? "0.7em" : "1.0em",
                display: "flex",
                fontWeight: "bold",
                margin: 2,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                //  aspectRatio:1/3
              }}>
                <img src={mainlogo} style={{ width: '40%', marginLeft: 'auto' }} />
              </Grid>




              <Grid item xs={12} >
                <div style={{
                  fontSize: matchesMd ? "0.7em" : "1.0em",
                  display: "flex",
                  fontWeight: "bold",
                  margin: 2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical"
                }} >
                  {item.productname}</div>
                <div style={{
                  fontSize: matchesMd ? "0.7em" : "0.9em",
                  display: "flex",
                  //  fontWeight: "bold",
                  margin: 2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                }}>

                  {item.description.length >= 20 ? <div>{item.description}<div>&nbsp;</div></div> : item.description}
                </div>
                <div style={{ fontWeight: 600 }}>
                  {item.weight} {item.weighttype}
                </div>
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  fontSize: matchesMd ? "0.7em" : "1.0em",
                  display: "flex",
                  fontWeight: "bold",
                  margin: 2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical"
                }}


              >   {item.offerprice == 0 ? <span>&#x20B9;{item.price}</span> :
                <div>
                  <span style={{ fontWeight: 600, color: 'grey', textDecoration: "line-through", marginRight: 5 }}>&#x20B9;{item.price}</span>
                  <span> &#x20B9;{item.offerprice}</span>
                </div>}


              </Grid>

              <Grid item xs={12}>
                <Divider style={{ borderWidth: 1.5 }}></Divider>
              </Grid>

              <Grid item xs={12} style={{ fontSize: 12, display: 'flex', alignItems: 'center', marginRight: 3, fontSize: '70%' }}>
                <WatchLaterIcon style={{ width: 20 }} /> Dilevery within 2-3 days
              </Grid>


              <Grid item xs={12} fullWidth style={{ fontSize: '98%', marginLeft: 5, display: 'flex', width: '100%', alignItems: 'center' }}>
                <Grid fullWidth item xs={6}  >
                  <div style={{ marginLeft: '5%' }} >
                    <PlusMinusComponent qty={productFromRedux[item?.productdetailsid]?.qty === undefined ? 0 : productFromRedux[item?.productdetailsid]?.qty} onChange={(v) => handleChange(v, item)} width={'40%'} />
                  </div>
                </Grid>

                <Grid item xs={6} style={{ display: 'flex' }}>

                  <Button variant="text"
                    style={{ color: '#fff', textTransform: 'lowercase', background: '#000', height: 28, width: '10%', marginLeft: '50%' }}
                    size='small'
                    onClick={() => navigate('/cart')}
                  >
                    Buy Now
                  </Button>
                </Grid>

              </Grid>

            </Grid>
          </div>





        </div>
        // </div>

      )
    })
  }

  return (
    <div style={{ display:'flex',right:'50%',marginLeft:'2%',justifyContent:'flex-start',height:'auto',flexDirection:'column',width:"auto",marginTop:'3%'  ,flexWrap:'wrap'}}>
     
     <span>All Product</span>
     <div style={{display:'flex',flexWrap:'wrap',justifyContent:"flex-start",alignItems:'stretch',marginTop:'5%' ,flexDirection:'row' }}>
      
        { filterProduct()}
        </div>



    </div>
  )

}

