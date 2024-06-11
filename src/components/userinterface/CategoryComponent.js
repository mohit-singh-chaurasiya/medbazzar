import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../Services/FetchNodeServices";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { createRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Skeleton } from "@mui/material";
export default function CategoryComponent(props){
var navigate= useNavigate()
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  var Csld=createRef()
    var settings = {
        //dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: !matches?7:4,
        slidesToScroll: 1,
        arrows:false,
        autoplay:false
       
      };

      const handleGotoFilterPage=(item)=>
     {
      // alert(JSON.stringify(item.categoryid))
      navigate('/filterdetails/null',{state:{categoryid:item.categoryid}})  
     }
      
      var images=props?.data 
      const showCategorySlideShimmer = () =>{
        return ["","","","","","",""]?.map((item)=>{

          return(   
            <div>
            <Skeleton height={190} width={190} animation="wave">
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
                    width: "80%",
                    padding: 3,
                    borderRadius: 10,
                    height: "auto",
  
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                />
              </div>
            </Skeleton>
          </div>
           
          )
        })
      }


    //  console.log(images)
 
      const showCategorySlide=()=>{
        return images?.map((item)=>{
            return(<div style={{display:'flex',justifyContent:'center'}} onClick={()=>handleGotoFilterPage(item)}><img src={`${serverURL}/images/${item.picture}`} style={{width:'82%',aspectRatio:3/3,height:'82%',margin:'auto',borderRadius:5,display:'Block'}}  />
            <div style={{textAlign:'center',width:'90%',fontWeight:'bold'}}>{item.categoryname}</div>
            </div>)
        })
      }
      const handleForward=()=>{
        Csld.current.slickNext()
     }
     const handleBackward=()=>{
     Csld.current.slickPrev()
     
     }  
      return(<div style={{wight:'100%',position:'relative',cursor:'pointer'}}>
    <div style={{margin:'10px 0px 15px 15px', fontWeight:'bold',fontSize:16}}>{props?.title}</div>

      {!matches?<div style={{zIndex:2,top:'40%',position:'absolute',display:'flex',justifyContent:'center',alignItems:'center',width:34,height:34,borderRadius:17,background:'#95a5a6',opacity:0.6}}>
        <ArrowBackIosIcon onClick={handleBackward} />
    </div>:<div></div>}
        <Slider ref={Csld} {...settings}>
        {images.length ? showCategorySlide() : showCategorySlideShimmer()}</Slider>
      {!matches?  <div style={{zIndex:2,top:'40%',left:'97.5%',position:'absolute',display:'flex',justifyContent:'center',alignItems:'center',width:34,height:34,borderRadius:17,background:'#95a5a6',opacity:0.6}}>
        <ArrowForwardIosIcon onClick={handleForward} />
    </div>  :<div></div>}
        </div>       
      );
}