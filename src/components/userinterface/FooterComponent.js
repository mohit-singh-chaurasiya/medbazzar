import { Grid,Box, Container, Divider } from "@mui/material";
import { getData } from "../../Services/FetchNodeServices";
import { serverURL,postData } from "../../Services/FetchNodeServices";
import { useState,useEffect } from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import WifiCalling3OutlinedIcon from '@mui/icons-material/WifiCalling3Outlined';
import {MenuItem,Button} from "@mui/material";


export default function FooterComponent(props){
  
  const [categoryList,setCategoryList]=useState([])
  const [concernList,setConcernList]=useState([])
  const [brandList,setBrandList]=useState([])

  const fetchAllCategory=async()=>{
    var result=await getData('userinterface/show_all_category')

    if(result.status)
    { setCategoryList(result.data)}
   
}
useEffect(function(){
    fetchAllCategory()
},[])

const showAllCategory=()=>{
  return categoryList.map((item)=>{
    // < item.categoryname />
     return<div  style={{color:'#dff9fb'}}>{item.categoryname}</div>
  })
 } 

 const fetchAllConcern=async()=>{
  var result=await getData('userinterface/show_all_concern')
  if(result.data)
  {
    setConcernList(result.data)
  }
 }
 useEffect(function(){
  fetchAllConcern()
 },[])

 const showAllConcern=()=>{
  return concernList.map((item)=>{
    return<div style={{color:'#dff9fb'}}>{item.concernname}</div>
  })
 }

 const fetchAllBrand=async()=>{
  var result=await getData('userinterface/show_all_brands ')
  if(result.data)
  {
    setBrandList(result.data)
  }
 }
 useEffect(function(){
  fetchAllBrand()
 },[])

 const showAllBrand=()=>{
   return brandList.map((item)=>{
    return<div style={{color:'#dff9fb'}}>{item.brandname}</div>
   })
 }

  return(
    
        <Grid container style={{width:'100%',height:'60%',background:'#535c68',color:'#a5b1c2',marginTop:70,display:'flex'}} >


           <Grid item xs={6}  style={{width:'100%',height:'80%',marginTop:'1%'}}>
              <h3 style={{marginLeft:'12%'}} >Follow us</h3>
              <Grid style={{width:'100%',marginLeft:'15%', height:'100%',size:'4%'}}>
                <img src={`${serverURL}/images/${'facebook.png'}`} style={{width:40,height:40,marginRight:'2%',borderRadius:20,color:'#ced6e0'}}/> 
                <img src={`${serverURL}/images/${'instagram.png'}`} style={{width:40,height:40,marginRight:'1.5%',color:'#ced6e0'}} /> 
                <img src={`${serverURL}/images/${'twitter.png'}`} style={{width:40,height:40,marginRight:'1.5%',color:'#ced6e0'}} /> 
                <img src={`${serverURL}/images/${'linkedin.png'}`} style={{width:40,height:40,marginRight:'1.5%',borderRadius:20,color:'#CAD3C8'}} />
                
                </Grid >
                </Grid>
                
                <Grid item xs={6} style={{width:'100%',height:'100%',marginTop:'2%',justifyContent:'end'}}>
            <h4>Download the Moble App</h4>
               <Grid style={{display:'flex',flexDirection:'row'}}>
               <img src={`${serverURL}/images/${'playstore.png'}`} style={{width:'22%',height:44,borderRadius:5,marginRight:20,border:'solid 1px '}}/>
               <img src={`${serverURL}/images/${'appstore.png'}`} style={{width:'22%',height:44,borderRadius:5,border:'solid 1px'}}/>
            </Grid>
            </Grid>
            
            
            <Grid item xs={6} style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly',marginTop:30}}>
                <Grid item xs={2} style={{size:'100%'}} ><h3>Categories</h3>
               {showAllCategory() }
                </Grid>
                <Grid item xs={2} style={{size:'100%'}}><h3 >Concern</h3>
                {showAllConcern()}
                </Grid>
                <Grid item xs={2} style={{size:'100%'}}><h3>Others</h3>
                {showAllBrand()}
                </Grid>
              </Grid>
        
            



              <Grid item xs={6} style={{display:'flex',marginTop:20,flexDirection:'column'}}>         
                <Grid item xs={6}>
                  <EmailOutlinedIcon style={{width:35,height:35,marginTop:20,color:'#fff'}} />
              
                <Grid  style={{fontWeight:'bold'}}>Email us</Grid>
                  <Grid   style={{color:"#dff9fb"}}>ddsfsd@gmail.com</Grid>
                </Grid>

              <Grid item xs={6}>
                <WifiCalling3OutlinedIcon style={{width:35,height:35,marginTop:20,color:'#fff'}} />
              
                <Grid  style={{fontWeight:'bold'}}>Give us a missed call</Grid>
                  <Grid   style={{color:"#dff9fb"}}>+91 1800 366 5225</Grid>
              </Grid>
              <Divider sx={{ bgcolor: "#ced6e0" }}/>
  
             
              <Grid item xs={12}>
              <p style={{fontSize:18,color:'#dff9fb',fontWeight:'bold',fontFamily:'Bold'}}>15 Years Of Trust</p>
              {/* </Grid> */}
              <Grid item xs={12} style={{color:'#dff9fb',fontWeight:400,marginBottom:'7%'}}>
              <span>"Over the last 15 years, we have touched the lives of lakhs of Indian families by serving them with only the best quality and genuine healthcare products. With over 300+ stores, a comprehensive website and an easy-to-use app, it is only true to say that 
                MaeBazzar is the one-stop destination for your wellness,medicines needs be it online or offline. Copyright MedBazzar Forever 2024"</span>
                </Grid>
                </Grid>
                
             
             
                </Grid>


         
            {/* <Grid item xs={6}style={{width:'100%',height:'auto%',margin:'6%',marginLeft:'10%',marginTop:'1%'}}>
              <h3>Follow us</h3>
              <Grid style={{width:'100%',height:'100%',size:'4%'}}>
                <FacebookIcon style={{width:45,height:45,color:'#ced6e0'}}/> <InstagramIcon style={{width:45,height:45,color:'#ced6e0'}} /> <TwitterIcon style={{width:45,height:45,color:'#ced6e0'}} /> <LinkedInIcon style={{width:45,height:45,color:'#CAD3C8'}} />
                
                </Grid >
                <Grid item xs={6} style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:30}}>
                <Grid item xs={2} style={{size:'100%'}} ><h3>Categories</h3>
               {showAllCategory() }
                </Grid>
                <Grid item xs={2} style={{size:'100%'}}><h3 >Madicines</h3>
                {showAllSubCategory()}</Grid>
                <Grid item xs={2} style={{size:'100%'}}><h3>Others</h3>
                {showAllBrand()}
                </Grid>
              </Grid>
            </Grid>


            <Grid item xs={6} style={{width:'100%',height:'100%',margin:'6%',marginTop:'2%'}}>
            <h4>Download the Moble App</h4>
               <Grid style={{display:'flex',flexDirection:'row'}}>
               <img src={`${serverURL}/images/${'playstore.png'}`} style={{width:165,height:44,borderRadius:5,marginRight:20,border:'solid 1px '}}/>
               <img src={`${serverURL}/images/${'appstore.png'}`} style={{width:165,height:44,borderRadius:5,border:'solid 1px'}}/>
            </Grid>
            </Grid>

           

            <Grid item xs={6} style={{display:'flex',flexDirection:'row',marginTop:20}}>         
              
            <EmailOutlinedIcon style={{width:35,height:35,marginTop:20,color:'#fff'}} />
            <div style={{marginLeft:20,marginTop:10,fontSize:20}} >
            <Grid item xs={6} style={{fontWeight:'bold'}}>Email us</Grid>
            <Grid item xs={6} style={{color:"#dff9fb"}}>ddsfsd@gmail.com</Grid>
            </div>
           

            <div class='col-10' style={{display:'flex',flexDirection:'row',marginTop:20,marginBottom:22}}>         
              
            <WifiCalling3OutlinedIcon style={{width:35,height:35,marginTop:20,color:'#fff'}} />
            <div style={{marginLeft:20,marginTop:10,fontSize:20}} >
            <Grid item xs={10} style={{fontWeight:'bold'}}>Give us a missed call</Grid>
            <Grid item xs={10} style={{color:"#dff9fb"}}>1800 589 3215</Grid>
            </div>
            
           </div>
           
           <hr/>

           <div style={{display:'flex',flexDirection:'column',fontWeight:'bold'}}>
            <Grid item xs={6}>15 Years of Trust</Grid>
            <Grid item xs={6} style={{color:'#dff9fb',fontWeight:'lighter'}}>
            <p>"Over the last 15 years, we have touched the lives of lakhs of Indian families by serving them with only the best quality and genuine healthcare products. With over 300+ stores, a comprehensive website and an easy-to-use app, it is only true to say that 
              Wellness Forever is the one-stop destination for your wellness needs be it online or offline. Copyright Wellness Forever 2023"</p>
              </Grid>
              
           
              </div>
              </Grid>
              
            */}
</Grid>



            
   
  )
}