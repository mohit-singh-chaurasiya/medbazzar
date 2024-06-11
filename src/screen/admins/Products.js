import { FormControl,Button,Avatar, Grid, InputLabel, TextField } from "@mui/material";
import { useState,useEffect } from "react";
import Swal from "sweetalert2";
import {Select,MenuItem} from "@mui/material"
import {useProductStyles} from "./ProductsCss"
import TitleComponent from "../../components/admin/TitleComponent";
import { getData, postData } from "../../Services/FetchNodeServices";
export default function Products(props) {
    var classes=useProductStyles()

    const [categoryId,setCategoryId]=useState('')
    const [categoryList,setCategoryList]=useState([])
    const [subCategoryId,setSubCategoryId]=useState('')
    const [subCategoryList,setSubCategoryList]=useState([])
    const [picture,setPicture]=useState({file:'icon.jpg' , bytes:'100'})
    const [error,setError]=useState({})
  //  const [subCategory,setSubCategory]=useState([])
  
    const [product,setProduct]=useState('')                  //const [productId,setProductId]=useState('') [instead this]
    const [brandId,setBrandId]=useState('')
    const [brandList,setBrandList]=useState([])
    const [description,setDescription]=useState('')

    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))
    }

    const handlePicture=(event)=>{
        handleError('picture',null)
        setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }

    const handleReset=()=>{
        setCategoryId('')
        setSubCategoryId('')
        setBrandId('')
        setProduct('')
        setDescription('')
        setPicture({files:'icon.jpg',bytes:''})

    }
     
    const handleSubmit=async()=>{
        var submit=true

        if(categoryId.length==0)
        {
            handleError('categoryId','Pls Choose Category')
            submit=false
        }
      if(subCategoryId.length==0)
      {
         handleError('subCategoryId','Pls Choose SubCategory')
         submit=false
      }

      if(brandId.length==0)
      {
        handleError('brandId','Pls Choose Brand')
      }
       

        if(product.length==0)
        {
            handleError('product','Pls Input Product Name ')
            submit=false
        }
        if(description.length==0)
        {
            handleError('description','Pls Input Description... ')
            submit=false
        }
        if(picture.bytes.length==0)
        {
            handleError('picture','Pls choose Icon...')
            submit=false
        }
        if(submit)
        {
            var formData=new FormData()
            formData.append('categoryid',categoryId)
            formData.append('subcategoryid',subCategoryId)
            formData.append('brandid',brandId)
            formData.append('productname',product)
            formData.append('description',description)
            formData.append('picture',picture.bytes)

            var result=await postData('product/submit_products',formData)
            if(result.status)
            {
              Swal.fire({
                  icon: "Success",
                  title: result.message,
                  timer:1500
                
                });
            }
            else{
              Swal.fire({
                  icon: "error",
                  title: result.message,  
                  timer:1500         
              });
            }
        }
       
    }

//......................................................................................................

const fetchAllCategory=async()=>{
    var result=await getData('category/display_all_category')
    //alert("HELLO"+ result.status)
    if(result.status)
    { setCategoryList(result.data)}
    
    }

    useEffect(function(){fetchAllCategory()},[])

//........................................................    

        const fillAllCategory=()=>{
            return categoryList.map((item)=>{
     
                 return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
             })
             
         }

//...................................................................................................
     const fetchAllSubCategory=async(cid)=>{
        var result=await postData("subcategory/fetch_all_subcategory_by_categoryid",{categoryid:cid})
        //alert("HELLO"+ result.status)

        if(result.status)
    {
        setSubCategoryList(result.data)
    } 
    }
     useEffect(function(){fetchAllSubCategory()},[])


//....................................................................................................
        
    
            const fillAllSubCategory=()=>{
                return subCategoryList.map((item)=>{
         
                     return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
                 })
                 
             }

//........................................................


       const fetchAllBrand=async()=>{
        var result =await getData('brand/display_all_brand')
        if(result.status)
       // console.log("EOOOORRO",result.status)
        {setBrandList(result.data)}
       }
       useEffect(function(){fetchAllBrand()},[])

       const fillAllBrand=()=>{
        return brandList.map((item)=>{
            return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>

        })
       }

//...............................................................................................

             const handleCategoryChange=(event)=>{
                setCategoryId(event.target.value)
                 fetchAllSubCategory(event.target.value)
             }


            
//..........................................................................................................   






return(<div className={classes.root}>
    <div className={classes.box}>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <TitleComponent title="Add New Product" logo="MedBazzar-Logo.png" listicon="list.png" page="/admindashboard/displayallproducts" />
            </Grid>
            <Grid item xs={4}>
              
            <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                    <Select
                      label="Category" value={categoryId}
                       onChange={handleCategoryChange}
                       error={error.categoryId} onFocus={()=>handleError('categoryId',null)} >
                        {fillAllCategory()}

                    </Select>
                    {error.categoryId?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.categoryId}</span>:<></>}
            </FormControl>
            </Grid>
            <Grid item xs={4}>
            <FormControl fullWidth>
                <InputLabel>SubCategory</InputLabel>
                <Select
                label="SubCategory" 
                        onChange={(event)=>setSubCategoryId(event.target.value)}
                        error={error.subCategoryId} onFocus={()=>handleError('subCategoryId',null)} >
                          {fillAllSubCategory()}
                </Select>
                {error.subCategoryId?<span style={{fontFamily:'kanit',fontSize:13,color:'red'}}>{error.subCategoryId}</span>:<></>}

            </FormControl>
            </Grid>
            <Grid item xs={4}>
            <FormControl fullWidth>
                <InputLabel>Brands</InputLabel>
                <Select label="Brands" value={brandId}
                error={error.brandId} onFocus={()=>handleError('brandId',null)}
                   onChange={(event)=>setBrandId(event.target.value)} >

                    {fillAllBrand()}
                </Select>
                {error.brandId?<span style={{fontFamily:'kanit',color:'red',fontSize:13}}>{error.brandId}</span>:<></>}

            </FormControl>
            </Grid>
            <Grid item xs={12}>
                <TextField label="Product Name" value={product} onFocus={()=>handleError('product',null)} error={error.product} helperText={<span style={{fontFamily:'Kanit',color:'#d32f2f',fontSize:13}}>{error.product}</span>} onChange={(event)=>setProduct(event.target.value)} fullWidth />

            </Grid>
            <Grid item xs={12}>
                <TextField label="Description" value={description} onFocus={()=>handleError('description',null)} error={error.description} helperText={<span style={{fontFamily:'Kanit',color:'#d32f2f',fontSize:13}}>{error.description}</span>} onChange={(event)=>setDescription(event.target.value)} fullWidth />

            </Grid>
            <Grid item xs={6}>
                <Button variant="contained" error={error.picture} onChange={handlePicture} helperText={error.picture} component="label" fullWidth>
                    Upload
                    <input onClick={()=>handleError('picture',null)} onChange={handlePicture} type="file" hidden accept="images/*" multiple></input>
                </Button>
                {error.picture?<span style={{color:'#d32f2f',fontFamily:'Kanit',fontSize:13}}>{error.picture}</span>:<></>}

            </Grid>
            <Grid item xs={6} style={{display:'flex',justifyContent:'center', alignItems:'center',width:'80' ,height:'80'}}>
            <Avatar alt="Remy Sharp" src={picture.file}  variant="rounded"/>

            </Grid>
            <Grid item xs={6}>
                <Button onClick={handleSubmit} variant="contained" fullWidth>
                    Submit
                </Button>
            </Grid>
            <Grid item xs={6}>
                <Button onClick={handleReset} variant="contained" fullWidth>
                    Reset
                </Button>
            </Grid>

        </Grid>
    </div>
</div>)}