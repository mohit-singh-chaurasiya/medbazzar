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
import {Skeleton} from "@mui/material";


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
  var settings = {
    //dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: !matches ? 5 : 2,
    slidesToScroll: 1,
    arrow:false



  };


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
  const handleForward = () => {
    Psld.current.slickNext()
    
  }
  const handleBackward = () => {
    Psld.current.slickPrev()
  }

  const handleProductDetailsComponent = (item) => {
    navigate('/productdetailscomponent', { state: { data: item } })
  }

  var product = props?.data || [];
  // alert(JSON.stringify(product))

  const showProductSlideShimmer = () =>{
    return ["","","","",""]?.map((item)=>{
      return (
        <div>
          <Skeleton height={400} width={400} animation="wave">
            <div
              style={{
                display: "flex",
                marginLeft: 12,
                marginRight: 12,
                boxShadow: "1px 1px 10px 0px #00000010",
              }}
            >
              <img
                src={`${serverURL}/images/${item.picture}`}
                style={{
                  width: 400,
                  padding: 3,
                  borderRadius: 10,
                  height:400,

                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
            </div>
          </Skeleton>
        </div>
      );
  
    })
  }

  const showSlide = (item) => {
    const images = item.picture
   
    return (
      <div style={{ display: 'flex', justifyContent: 'center', margin: 10, boxShadow: '1px 1px 10px 0px #00010' }}>
        <img src={`${serverURL}/images/${item.picture}`} onClick={() => handleProductDetailsComponent(item)} style={{ width: "85%", borderRadius: 0, height: 'auto', aspectRatio: 3 / 3 }} />
      </div>
    );
  }
  


  const ProductDetails = () => {
    return product?.map((item, index) => {
      return (
        <div >
          {/* <div style={{background:'blue' ,height:'100%'}}> */}
          <div style={{
            width: '80%',
            height: '100%',
            background: '#fff',
            display: 'flex',
            justifyContent: 'center',
            // background:'red',
            marginLeft: '1%',

          }}>
            <Grid container spacing={1}  >
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'end' }}>

                <BookmarkAddOutlinedIcon style={{ marginLeft: 'auto', display: 'flex', cursor: 'pointer', weight: '95%', height: '95%' }} />

              </Grid>

              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }} >

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
                  WebkitLineClamp: "1",
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
                <Grid  fullWidth spacing={5} item xs={6}    >
                  <div style={{ marginLeft: '5%', }} >
                    <PlusMinusComponent qty={productFromRedux[item?.productdetailsid]?.qty === undefined ? 0 : productFromRedux[item?.productdetailsid]?.qty} onChange={(v) => handleChange(v, item)} width={'50%'}  
                      />
                  </div>
                </Grid>

                <Grid item xs={6} style={{ display: 'flex' }}>

                  <Button variant="text"
                    style={{ color: '#fff', textTransform: 'lowercase', background: '#000', height: 28, width: '70%', marginLeft: '30%' }}
                    size='small'
                    onClick={()=>navigate('/cart')}
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
    <div style={{ width: '98%', position: 'relative', padding: '1%', boxRadius: 20 }}>
      <div style={{ fontWeight: 'bold', fontSize: 17, margin: '5px 0px 15px 15px' }}>{props?.title}</div>
      {!matches ? <div style={{ display: 'flex', width: 35, height: 35, borderRadius: 19, background: '#bdc3c7', alignItems: 'center', justifyContent: 'center', opacity: 0.6, position: 'absolute', zIndex: 2, top: '50%', left: '0.09%' }}>
        <ArrowBackIosIcon onClick={handleBackward} />
      </div> : <div></div>}

      <Slider ref={Psld} {...settings} >
        {product.length ? ProductDetails() : showProductSlideShimmer()}
      </Slider>
      {!matches ? <div style={{ display: 'flex', width: 35, height: 35, borderRadius: 19, background: '#bdc3c7', alignItems: 'center', justifyContent: 'center', opacity: 0.6, position: 'absolute', zIndex: 2, top: '50%', right: '0.09%' }}>
        <ArrowForwardIosIcon onClick={handleForward} />


      </div> : <div></div>}

    </div>
  )

}













{/* ..........................................................................            */ }
{/* <div
           style={{ width:'12%',
           height:'auto',
           background:'#fff',
           display:'flex',
           justifyContent:'center'}}>
             <Grid container spacing={2} >
             <Grid item xs={4} style={{display:'flex',justifyContent:'end'}}>
                
                <BookmarkAddOutlinedIcon style={{marginLeft:'auto',display:'flex',cursor:'pointer',weight:'95%',height:'95%'}}/>
                
             </Grid>
    
             <Grid item xs={12} style={{display:'flex',justifyContent:'center'}}>
                
            {showImage1()}
           
          
                
             </Grid>
            
    
             <Grid item xs={12} style={{display:'flex'}}>
             <img src={mainlogo} style={{width:'30%',marginLeft:'auto'}} />
             </Grid>
    
             <Grid item xs={12} style={{fontWeight:'bolder',fontStyle:'kanit',fontSize:14}}>
              {showDescription1() }
             
             </Grid>
    
             <Grid item xs={12} style={{fontWeight:'bolder',fontStyle:'kanit',display:'flex',marginBottom:9,alignItems:'center',position:'relative'}}>
             <div style={{ position:'absolute',display:'flex',justifyContent:'center'}}>&#8377;{showPrice1()}</div>
               </Grid>
    
               <Divider/>
    
               <Grid item xs={12} style={{fontSize:12,display:'flex',marginRight:3,}}>
                <WatchLaterIcon style={{width:20}}  /> Dilevery within 2-3 days
               </Grid>
    
             
                <Grid item xs={12} style={{fontSize:12,marginLeft:5,display:'flex',justifyContent:'center'}}>
               Add <ShoppingCartOutlinedIcon style={{width:20}} />  
              
               <Button style={{marginLeft:50,backgroundColor:'darkgreen',weight:'20%',margin:'0px 1px 5px 15px'}}variant="contained"  fullWidth> Buy</Button>
              
               </Grid>
    
             </Grid>
           
          
      </div> 
  </div>*/}

