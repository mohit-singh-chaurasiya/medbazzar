import MaterialTable from "@material-table/core"
import {Button,Grid,TextField,Avatar,InputLabel,FormControl,MenuItem} from "@mui/material";
import TitleComponent from "../../components/admin/TitleComponent";
import {Select} from "@mui/material"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {getData,serverURL,postData} from "../../Services/FetchNodeServices"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2";
import { useEffect, useState } from "react"
import {useProductStyles} from "./DisplayAllProductsCss"
import { DialogTitle } from "@mui/material";

export default function DisplayAllProducts (){
    var classes=useProductStyles()
    var navigate=useNavigate()

    const [error,setError]=useState({})
    const [picture,setPicture]=useState({file:'icon.jpg',bytes:''})
    const [tempPicture,setTempPicture]=useState()

   
    const [categoryId,setCategoryId]=useState('')
    const [categoryList,setCategoryList]=useState([])
    const [categorydata,setCategorydata]=useState([])

    const [subCategoryId,setSubCategoryId]=useState('')
    const [subCategoryList,setSubCategoryList]=useState([])
    const [subCategoryData,setSubcategorydata]=useState([])

    const [brandId,setBrandId]=useState('')
    const [brandList,setBrandList]=useState([])
    const [brandData,setBrandData]=useState([])
    const [showBtn,setShowBtn]=useState(false)

    
    //const [product,setProduct]=useState('')

    const [productName,setProductName]=useState([])
   const [productId,setProductId]=useState('')
    const [Description,setDescription]=useState('')
    const [productdata,setProductData]=useState([])
    const [open,setOpen]=useState(false)


    const handleError=(label,msg)=>{
      setError((prev)=>({...prev,[label]:msg}))
    }

    const handlePicture=(event)=>{

     
      setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
      setShowBtn(true)
      
    }


  const handleClose=()=>
  setOpen(false)

  const fetchAllProducts=async()=>{
    var result=await getData('product/display_all_product')
    if(result.status)
    {
      setProductData(result.data)
    }
  }
  useEffect(function(){fetchAllProducts()},[])
  
  

  const fetchAllCategory=async()=>{
    var result=await getData('category/display_all_category')
    if(result.status)
    {
      setCategoryList(result.data)
    }
  }
  useEffect(function(){fetchAllCategory()},[])

  const fillAllCategory=()=>{
    return categoryList.map((item)=>{
      return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
    })
  }


  const fetchAllSubCategory=async(cid)=>{
    var result=await postData('subcategory/fetch_all_subcategory_by_categoryid',{categoryid:cid})
    if(result.status)
    {
      setSubCategoryList(result.data)
    }
  }
  useEffect(function(){fetchAllSubCategory()},[])

  const fillAllSubCategory=()=>{
   return subCategoryList.map((item)=>{
    return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
   })
  }

  
  const fetchAllBrand=async()=>{
    var result=await getData('brand/display_all_brand')
    if(result.status)
    {
      setBrandList(result.data)
    }
  }
  useEffect(function(){fetchAllBrand()},[])

  const fillAllBrand=()=>{
    return brandList.map((item)=>{
        return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
    })
}



  const handleCategoryChange=(event)=>{
    setCategoryId(event.target.value)
    fetchAllSubCategory(event.target.value)
   
  }


  const handleOpen=(rowData)=>{
    setOpen(true)
 
    fetchAllSubCategory(rowData.categoryid)
    setCategoryId(rowData.categoryid)
    setSubCategoryId(rowData.subcategoryid)
    setBrandId(rowData.brandid)
    setProductId(rowData.productid)
    setProductName(rowData.productname)
    setDescription(rowData.description)
    setPicture({file:`${serverURL}/images/${rowData.picture}`,bytes:''})
    setTempPicture(`${serverURL}/images/${rowData.picture}`)
   
  }

  const handleDelete=(rowData)=>{
      Swal.fire({
        title: "Do you want to delete product?",
        toast:true,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Delete",
        denyButtonText: `Don't Delete`,
        
      }).then(async(result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            var body={productid:rowData.productid}
           var result=await postData('product/delete_product_data',body)
           if(result.status){
          Swal.fire({toast:true,title:"Deleted!",icon: "success"});}
        else{
        Swal.fire({toast:true,title:"Fail to delete Record",icon: "error"});}
        } else if (result.isDenied) {
        
          Swal.fire({toast:true,title:"Your Record is safe",icon: "info"});
        }
        fetchAllProducts()
      });
   
  }
  



   const handleEditData=async()=>{
    var submit=true
    

    if(submit)
    var body={productid:productId,categoryid:categoryId,subcategoryid:subCategoryId,brandid:brandId,productname:productName,description:Description}
    var result=await postData('product/update_product_data',body)
    if(result.status)
    {
      Swal.fire({
          icon: "Success",
          title: result.message,
          timer:1500,
          toast:true
        
        });
    }
    else{
      Swal.fire({
          icon: "error",
          title: result.message,  
          timer:1500 ,
          toast:true        
      });
    }
    fetchAllProducts()

  }  


  const handleEditPicture=async()=>{
    var formData=new FormData()
    formData.append('productid',productId)
    formData.append('picture',picture.bytes)
    var result=await postData('product/edit_product_picture',formData)
    if(result.status)
    {
        Swal.fire({
            icon: "Success",
            title: result.message,
            timer:1500,
            toast:'true'
          });
    }
    else
    {
        Swal.fire({
            icon:"Error",
            title:result.message,
            timer:1500,
            toast:'true'
           });
    }
    fetchAllProducts()

}

  const handleCancel=()=>{
   
  setPicture({file:tempPicture,bytes:''})
  setShowBtn(false)
fetchAllProducts()

  }

  const showProductForm=()=>{
    return(
      <Dialog 
      open={open}
      onClose={handleClose}
      maxWidth={'md'}>
        <DialogTitle>Edit Daataa</DialogTitle>
        <DialogContent>
          <div className={classes.box}>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <TitleComponent title="Add New Product" logo="MedBazzar-Logo.png" listicon="list.png"  />
            </Grid>
            <Grid item xs={4}>
              
            <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                    <Select
                      label="Category" value={categoryId}
                      onChange={handleCategoryChange}
                      error={error.categoryid}
                      onFocus={()=>handleError('categoryId',null)}>
                        {fillAllCategory()}

                    </Select>
                {error.categoryid?<span style={{fontFamily:'kanit',fontSize:13,color:'#d32f2f'}}>{error.categoryid}</span>:<></>}
            </FormControl>
            </Grid>
            <Grid item xs={4}>
            <FormControl fullWidth>
                <InputLabel>SubCategory</InputLabel>
                <Select
                label="SubCategory" value={subCategoryId}
                error={error.subcategoryid}
                onFocus={()=>handleError('subCategoryId',null)}
                onChange={(event)=>setSubCategoryId(event.target.value)}>
                  {fillAllSubCategory()}          
                </Select>

            </FormControl>
            </Grid>
            <Grid item xs={4}>
            <FormControl fullWidth>
                <InputLabel>Brands</InputLabel>
                <Select label="Brands" value={brandId}
                  error={error.brandId}
                  onFocus={()=>handleError('brandId',null)}
                onChange={(event)=>setBrandId(event.target.value)} >
                  {fillAllBrand()}
                  

                </Select>

            </FormControl>
            </Grid>
            <Grid item xs={12}>
                <TextField label="Product Name" value={productName} onFocus={()=>handleError('productName',null)} error={error.product} helperText={<span style={{fontFamily:'Kanit',color:'#d32f2f',fontSize:13}}>{error.product}</span>} onChange={(event)=>setProductName(event.target.value)} fullWidth />

            </Grid>
            <Grid item xs={12}>
                <TextField label="Description" value={Description} onFocus={()=>handleError('description',null)} error={error.description} helperText={<span style={{fontFamily:'Kanit',color:'#d32f2f',fontSize:13}}>{error.description}</span>} onChange={(event)=>setDescription(event.target.value)} fullWidth />

            </Grid>
            <Grid item xs={6}>
            {showBtn?<div style={{width:'100%',height:100,justifyContent:'space-evenly',display:'flex',alignItems:'center'}}><Button variant="contained" onClick={handleEditPicture} >Save</Button><Button variant="contained" onClick={handleCancel} >Cancel</Button></div>:<div style={{width:'100%',height:100,display:'flex',alignItems:'center'}}>

              <Button error={error.picture} helperText={error.picture}   variant="contained"  component="label" fullWidth>
                Set New Picture
                  <input onClick={()=>handleError('picture',null)} onChange={handlePicture} type='file' hidden accept="images/*" multiple />
                </Button>
                  {error.picture?<span style={{color:'#d32f2f',fontFamily:'Kanit',fontSize:13}}>{error.picture}</span>:<></>}
                    </div>}
            </Grid>
            <Grid item xs={6} style={{display:'flex',justifyContent:'center', alignItems:'center',width:'80' ,height:'80'}}>
            <Avatar alt="Remy Sharp" src={picture.file}  variant="rounded"/>

            </Grid>
            

        </Grid> </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditData}>Edit Data</Button>
          <Button onClick={handleClose}>Close</Button>

        </DialogActions>
      </Dialog>
    )
  }


    function showProduct(){
        return(
            <MaterialTable
            title="Product Data "
            style={{ color: '#000',background:'#95a5a6',fontWeight:'bold',width:"100%",height:"100%" }}
            columns={[

              { title: 'ProductId', field: 'productid' },
              { title: 'Category', field: 'categoryname' },
              { title: 'SubCategory', field: 'subcategoryname' },
              { title: 'Brand', field: 'brandname' },
              { title: 'ProductName', field: 'productname' },
              { title: 'Description', field: 'description' },
              { title: 'Icon', field: 'picture',render:(rowData)=><><img src={ `${serverURL}/images/${rowData.picture}`} style={{width:55,height:55,borderRadius:30}} /> </> }

            ]}

            options={{
              paging:true,
              pageSize:3,       // make initial page size
              emptyRowsWhenPaging: false,   // To avoid of having empty rows
              pageSizeOptions:[3,5],    // rows selection options
            }}
           

            data={productdata}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Product ',
                onClick: (event, rowData) => handleOpen(rowData)
              },
             
              {
                icon: 'add',
                tooltip: 'Add Product',
                isFreeAction: true,
                onClick: (event) => navigate ('/admindashboard/products')
              },
              {
                icon: 'delete',
                tooltip: 'Add Product',
            
                onClick: (event,rowData) => handleDelete(rowData)
              }
             
              
            ]}
          />
          

        )
        
    }

    return(<div className={classes.root}>
     
        <div  style={{ width: "80%",
    height: "auto",
    background: '#fff',
    borderRadius: 10,
    padding:10,
    boxShadow:'3px 5px 8px 5px grey'}}>
        {showProduct()}
       
       
        </div>
        {showProductForm()}
        
    </div>)


}