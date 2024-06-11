import { Button,AppBar,Box,Toolbar,Menu,MenuItem } from "@mui/material";
import { useState,useEffect } from "react";
import * as React from 'react';
import { serverURL,getData,postData } from "../../Services/FetchNodeServices";
export default function MenuBar()
{
    const [categoryList,setCategoryList]=useState([])
    const [subCategoryList,setSubCategoryList]=useState([])
    const [brandList,setBrandList]=useState([])
    const  [productList,setProductList]=useState([])
     const [anchorEl, setAnchorEl] = useState(null);
     const [anchorE2, setAnchorE2] = useState(null);
     const open = Boolean(anchorEl);
     const openBrand = Boolean(anchorE2);
     
 
    const fetchAllCategory=async()=>{
        var result=await getData('userinterface/show_all_category')
    
        if(result.status)
        { setCategoryList(result.data)}
       
    }
    useEffect(function(){
        fetchAllCategory()
    },[])

    const fetchAllSubCategory=async(cid)=>{
        var result=await postData("userinterface/fetch_all_subcategory_by_categoryid",{categoryid:cid})
       
        if(result.status)
    {
        setSubCategoryList(result.data)
    } 
    }

    const fetchAllBrand=async()=>{
        var result =await getData('userinterface/show_all_brands')
        if(result.status)
       
        {setBrandList(result.data)}
       }
      
    useEffect(function(){fetchAllBrand()},[])

    

    const handleClick=(categoryid,event)=>{
       
       fetchAllSubCategory(categoryid)
       
       setAnchorEl(event.currentTarget)
    }

    const handleSubClick=(subcategoryid,event)=>{
        fetchAllBrand(subcategoryid)
        setAnchorE2(event.currentTarget)
    }

    // const handleLeave=(item)=>{
    //     setAnchorEl(item.categoryid,null)
    // }
   

    
    const handleClose = () => {
        setAnchorEl(null);
      };

    const showAllCategory=()=>{
        return categoryList.map((item)=>{
           return<Button onClick={(event)=>handleClick(item.categoryid,event)}  style={{color:'#000' ,fontSize:'70%',fontWeight:'bold'}}>{item.categoryname}</Button>
        })
       } 

    const showAllSubCategory=()=>{
        return subCategoryList.map((item)=>{

            return<Button onClick={(event)=>handleSubClick(item.subcategoryid,event)} style={{color:'#000',fontSize:'70%',fontWeight:'bolder',width:'100%',display:'flex'}}>{item.subcategoryname}</Button>
        })
    }

    const showAllBrand=()=>{
        
        return brandList.map((item)=>{
            return<MenuItem onClick={(event)=>handleClick(item.brandid,event)} style={{color:'#000'}}>{item.brandname}</MenuItem>
        })
 
    }

   
    return(<div>
        <Box sx={{ flexGrow: 1 }}>
        <AppBar style={{background:'#fff' }} position="static">
        <Toolbar style={{display:'flex',justifyContent:'center'}}>
        {showAllCategory()}
          
          <Menu
        
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
         {showAllSubCategory()}            
      </Menu>
         
          </Toolbar>
        </AppBar>
      </Box>
    </div>)
}
