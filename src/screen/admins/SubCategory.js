import { Button, Grid, TextField,Avatar, FormControl, InputLabel, MenuItem } from "@mui/material";
import { subCategoryStyles } from "./SubCategoryCss";
import TitleComponent from "../../components/admin/TitleComponent";
import { postData,getData } from "../../Services/FetchNodeServices";
import { useEffect, useState } from "react";
import { Select} from "@mui/material"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export default function SubCategories (props){
    var classes = subCategoryStyles()
  
    const [subCategory,setSubcategory] = useState('')
   // const [category,setCategory] = useState('')
    const [picture,setPicture] = useState({file:'icon.jpg' , bytes:''})
    const [error,setError] = useState({})
    const [categoryId,setCategoryId] = useState([])
    const [categoryList,setCategoryList]=useState([])

    
    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))
        //console.log(error)
    }

    const handlePicture=(event)=>{
        handleError('picture',null)
        setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }
    const handleReset=()=>{
        setCategoryId('')
        setSubcategory('')
        setPicture({file:'icon.jpg',bytes:''})
    }

    const handleSubmit=async()=>{
        var submit=true 
       //category error

       if(categoryId.length==0)
        {
            handleError('categoryid','Pls Input CategoryId....')
            submit=false
        }
        if(subCategory.length==0)
        {
            handleError('subcategory','Pls input subcategory Name...')
            submit=false
            //console.log(error)
        }

        if(picture.bytes.length==0)
        {
            handleError('picture','Pls choose icon.... ')
            submit=false
        }
        if(submit)
        {
            var formData=new FormData()
            formData.append('categoryid',categoryId)
            formData.append('subcategoryname',subCategory)
            formData.append('picture',picture.bytes)

            var result=await postData('subcategory/submit_subcategory',formData)
            
            //console.log("dasd",submit)
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


    const fillAllCategory=()=>{
        return categoryList.map((item)=>{
 
             return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
         })
         
     }

    const fetchAllCategory=async()=>{
        var result=await getData('category/display_all_category')
        
        if(result.status)
        { setCategoryList(result.data)}
        
        }

    useEffect(function(){fetchAllCategory()},[])
  
return(
    <div className={classes.root}>
        <div className={classes.box}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TitleComponent title=" Add New SubCategory" logo="MedBazzar-Logo.png" listicon="list.png" page="/admindashboard/displayallsubcategory" />

                </Grid>
                <Grid item xs={12}>
                <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select
                        label="Category" value={categoryId}
                        onChange={(event)=>setCategoryId(event.target.value)}>
                          {fillAllCategory()}

                        </Select>

                    </FormControl>

                </Grid>
                <Grid item xs={12}>
                    <TextField label="SubCategory Name" onFocus={()=>handleError('subcategory',null)} error={error.subcategory} helperText={<span style={{fontFamily:'Kanit',color:'#d32f2f',fontSize:13}}>{error.subcategory}</span>} onChange={(event)=>setSubcategory(event.target.value)}  fullWidth /> 
                </Grid>
                <Grid item xs={6}>
                    <Button error={error.picture} helperText={error.picture} onChange={handlePicture}  variant="contained"  component="label" fullWidth>
                        Upload
                        <input onClick={()=>handleError('picture',null)} type="file" onChange={handlePicture} hidden accept="images/*" multiple></input>
                    </Button>
                    {error.picture?<span style={{color:'#d32f2f',fontFamily:'Kanit',fontSize:13}}>{error.picture}</span>:<></>}
                </Grid>

                <Grid item xs={6} style={{display:'flex' , alignItems:'center' ,justifyContent:'center', width:'60',height:'60'} }>
                <Avatar alt="Remy Sharp" src={picture.file} variant="rounded"/>
                </Grid>

                <Grid item xs={6}>
                   <Button onClick={handleSubmit} variant="contained"  fullWidth>
                    Submit
                    </Button> 
                </Grid>

                <Grid item xs={6}>
                   <Button onClick={handleReset} variant="contained"  fullWidth>
                    Reset
                    </Button> 
                </Grid>

            </Grid>
        </div>

    </div>
)}