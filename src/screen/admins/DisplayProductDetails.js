import { useDetailStyles } from "./ProductDetailsCss";
import MaterialTable from "@material-table/core";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { makeStyles } from "@mui/styles";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useDisplayDetailStyles } from "./DisplayProductDetailsCss";
import { DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getData,postData,serverURL } from "../../Services/FetchNodeServices";
import {Button,Grid,TextField,Avatar,InputLabel,FormControl,MenuItem} from "@mui/material";
import {Select} from "@mui/material"
import TitleComponent from "../../components/admin/TitleComponent";
import ReactQuill from "react-quill";
import { useMemo } from "react";
import 'react-quill/dist/quill.snow.css';



export default function DisplayProductDetails(){
    var classes=useDisplayDetailStyles()
    var navigate=useNavigate()

    const modules = useMemo(() => ({
      toolbar: {
        container: [
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', "strike"],
          [{ 'list': 'ordered' }, { 'list': 'bullet' },
          { 'indent': '-1' }, { 'indent': '+1' }],
          ['image', "link","video"],
          [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'] }]
        ],
        
      },
    }), [])

    const [categoryId,setCategoryId]=useState('')
    const [categoryList,setCategoryList]=useState([])
    const [categoryData,setCategoryData]=useState([])

    const [subCategoryId,setSubCategoryId]=useState('')
    const [subCategoryList,setSubCategoryList]=useState([])
    const [subCategoryData,setSubCategoryData]=useState([])

    const [brandId,setBrandId]=useState('')
    const [brandList,setBrandList]=useState([])
    const [brandData,setBrandData]=useState([])

    const [productId,setProductId]=useState('')
    const [productList,setProductList]=useState([])
    const [productData,setProductData]=useState([])

    const [error,setError]=useState({})

    const [productDetailData,setproductDetailData]=useState([])
    
    const [productSubname,setProductSubname]=useState('')

    const [concernId,setConcernId]=useState('')
    const [concernList,setConcernList]=useState([])
    const [concernData,setConcernData]=useState([])

    const [description,setDescription]=useState('')
    const [productDetailsId,setProductDetailsId]=useState('')
    const [weight,setWeight]=useState('')
    const [weightType,setWeightType]=useState('')
    const [type,setType]=useState('')
    const [packaging,setPackaging]=useState('')
    const [quantity,setQuantity]=useState('')
    const [offerType,setOfferType]=useState('')
    const [price,setPrice]=useState('')
    const [offerPrice,setOfferPrice]=useState('')
    const [picture,setPicture]=useState({file:[],bytes:''})
   
    const [tempPicture,setTempPicture]=useState()

    const [showBtn,setShowBtn]=useState(false)

    const [open,setOpen]=useState(false)    

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
  if(result.data)
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



const fetchAllProduct=async(bid)=>{

  var result=await postData('product/fetch_all_product_by_brandid',{brandid:bid})
//  alert("HELLO"+result.status)
  if(result.status)
  {
      setProductList(result.data)
  }
}
useEffect(function(){fetchAllProduct()},[])

const fillAllProduct=()=>{
  return productList.map((item)=>{

      return <MenuItem value={item.productid}>{item.productname}</MenuItem>
  })
}

const fetchAllProductDetails=async()=>{
  var result=await getData('productdetails/display_all_productdetails')
  if(result.data)
  {
    setproductDetailData(result.data)
  }
}
useEffect(function(){fetchAllProductDetails()},[])

// const fetchAllConcern=async()=>{
//   var result=await getData('concern/display_all_concern')
//   if(result.status)
//   {
//       setConcernList(result.data)
//   }
// }
// useEffect(function(){fetchAllConcern()},[])


// const fillAllConcern=()=>{
//   return concernList.map((item)=>{
//       return <MenuItem value={item.concernid}>{item.concernname}</MenuItem>
//   })
// }

const handleOpen=(rowData)=>{
  setOpen(true)
  setProductDetailsId(rowData.productdetailsid)
  fetchAllSubCategory(rowData.categoryid)
  setCategoryId(rowData.categoryid)
    setSubCategoryId(rowData.subcategoryid)

    fetchAllProduct(rowData.brandid)
    setBrandId(rowData.brandid)
    setProductId(rowData.productid)

    setProductSubname(rowData.productsubname)

    setConcernId(rowData.concernid)
    setDescription(rowData.description)
    setWeight(rowData.weight)
    setWeightType(rowData.weighttype)
    setType(rowData.type)
    setPackaging(rowData.packaging)
    setQuantity(rowData.quantity)

    setOfferType(rowData.offertype)
    setPrice(rowData.price)
    setOfferPrice(rowData.offerprice)
    setPicture({file:`${serverURL}/images/${rowData.picture.split(",")[0]}`,bytes:''})
    setTempPicture(`${serverURL}/images/${rowData.picture}`)


}


const handleError=(label,msg)=>{
  setError((prev)=>({...prev,[label]:msg}))
}

const handlePicture=(event)=>{

 
  setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
  setShowBtn(true)
  fetchAllProductDetails()
  
}


const handleCategoryChange=(event)=>{
  setCategoryId(event.target.value)
  fetchAllSubCategory(event.target.value)
 
}

const handleBrandChange=(event)=>{
  setBrandId(event.target.value)
  fetchAllProduct(event.target.value)
}


const handleClose=()=>{
  setOpen(false)
}

const handleEditData=async()=>{
  var submit=true
 
  if(submit)
  {
    var body={productdetailsid:productDetailsId,categoryid:categoryId,subcategoryid:subCategoryId,brandid:brandId,productid:productId,productsubname:productSubname,description:description,weight:weight,weighttype:weightType,type:type,packaging:packaging,quantity:quantity,offertype:offerType,price:price,offerprice:offerPrice}
    var result=await postData('productdetails/update_productdetails_data',body)
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
    fetchAllProductDetails()

  }  
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
          var body={productdetailsid:rowData.productdetailsid}
         var result=await postData('productdetails/delete_productdetails_data',body)
         if(result.status){
        Swal.fire({toast:true,title:"Deleted!",icon: "success"});}
      else{
      Swal.fire({toast:true,title:"Fail to delete Record",icon: "error"});}
      } else if (result.isDenied) {
      
        Swal.fire({toast:true,title:"Your Record is safe",icon: "info"});
      }
      fetchAllProductDetails()
    });
  }



  const handleEditPicture=async()=>{
    var formData=new FormData()
    formData.append('productdetailsid',productDetailsId)
    formData.append('picture',picture.bytes)
    var result=await postData('productdetails/edit_productdetails_picture',formData)
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
   
fetchAllProductDetails()

  }

  const handleCancel=()=>{
    setPicture({file:tempPicture,bytes:''})
    setShowBtn(false)
    fetchAllProductDetails()
  }




const showProductDetailsForm=()=>{
  return(
    <Dialog 
    open={open}
   // onClose={handleClose}
    maxWidth={'md'}>
      <DialogTitle>Edit Daataa</DialogTitle>
      <DialogContent>
        <div className={classes.box}>
      <Grid container spacing={2}>
          <Grid item xs={12}>
              <TitleComponent title="Add New Product" logo="MedBazzar-Logo.png" listicon="list.png"  />
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select label="Category" value={categoryId}   
              onChange={handleCategoryChange}>
                {fillAllCategory()}
              </Select>

            </FormControl>

          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
                <InputLabel>Subcategory</InputLabel>
                <Select label="Subcategory" value={subCategoryId} onChange={(event)=>setSubCategoryId(event.target.value)}>{fillAllSubCategory()}</Select>
            </FormControl>
         </Grid>
         <Grid item xs={3}>
            <FormControl fullWidth>
                <InputLabel>Brand</InputLabel>
                <Select label="Brand" value={brandId} 
                 onChange={handleBrandChange}>
                  {fillAllBrand()}
                  </Select>
            </FormControl>
         </Grid>
         <Grid item xs={3}>
            <FormControl fullWidth>
                <InputLabel>Product</InputLabel>
                <Select label="Product" value={productId}
                onChange={(event)=>setProductId(event.target.value)}>
                    {fillAllProduct()}
                </Select>
            </FormControl>
         </Grid>
         <Grid item xs={6}>
            <TextField label="Product Subname" value={productSubname} onFocus={()=>handleError('productSubame',null)} error={error.productsubname} helperText={<span style={{fontFamily:'kanit',fontSize:13,color:'#d32f2f',margin:'2%'}}>{error.productsubname}</span>} onChange={(event)=>setProductSubname(event.target.value)} fullWidth />
         </Grid>
        
         <Grid item xs={6}>
         <ReactQuill placeholder="Description" theme="snow" modules={modules} value={description} onChange={(event)=>setDescription(event)} />
         </Grid>
         <Grid item xs={2.4}>
            <TextField label="Weight" value={weight } onFocus={()=>handleError('weight',null)} error={error.weight} helperText={<span style={{fontFamily:'kanit',fontColor:"red",fontSize:13,margin:'2%' }}>{error.weight}</span>} onChange={(event)=>setWeight(event.target.value)} fullWidth />
         </Grid>
         <Grid item xs={2.4}>
            <FormControl fullWidth>
            <InputLabel>Weight Type</InputLabel>
            <Select label="weight type" value={weightType} onFocus={()=>handleError('weighttype',null)} error={error.weightType}   onChange={(event)=>setWeightType(event.target.value)} >
                <MenuItem value={'ml'}>ML</MenuItem>
                <MenuItem value={'liter'}>Liter</MenuItem>
                <MenuItem value={'kg'}>Kg</MenuItem>
                <MenuItem value={'gm'}>Gm</MenuItem>
            </Select>
            
            </FormControl>
         </Grid>
         <Grid item xs={2.4}>
            <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select label="Type" value={type} error={error.type}
             onFocus={()=>handleError('type',null)}
             onChange={(event)=>setType(event.target.value)}>
            <MenuItem value={'capsule'}>Capsule</MenuItem>
            <MenuItem value={'syruf'}>Syruf</MenuItem>
            <MenuItem value={'tablet'}>Tablet</MenuItem>
            <MenuItem value={'machine'}>Machine</MenuItem>
            <MenuItem value={'capsule'}>Capsule</MenuItem>
            <MenuItem value={'lotion'}>Lotion</MenuItem>
            <MenuItem value={'juice'}>Juice</MenuItem>
            <MenuItem value={'tube'}>Tube</MenuItem>
            <MenuItem value={'bar'}>Bar</MenuItem>
            <MenuItem value={'syruf'}>Syruf</MenuItem>
            <MenuItem value={'tablet'}>Tablet</MenuItem>
            <MenuItem value={'drop'}>Drop</MenuItem>
            <MenuItem value={'injection'}>Injection</MenuItem>
            <MenuItem value={'liquid'}>Liquid</MenuItem>
            <MenuItem value={'machine'}>Machine</MenuItem>
            <MenuItem value={'powder'}>Powder</MenuItem>
            <MenuItem value={'other'}>Other</MenuItem>
            </Select>
            {error.type?<span style={{fontFamily:'Kanit',color:"#d32f2f",fontSize:13,margin:'2%' } }>{error.type}</span>:<></>}
            </FormControl>
         </Grid>
         <Grid item xs={2.4}>
            <FormControl fullWidth>
            <InputLabel>Packaging</InputLabel>
            <Select label="packaging" value={packaging} error={error.packaging} onFocus={()=>handleError('packaging',null)} onChange={(event)=>setPackaging(event.target.value)} >
            <MenuItem value={'bundle'}>Bundle</MenuItem>
            <MenuItem value={'10pac'}>10Pac.</MenuItem>
            <MenuItem value={'packet'}>Packet</MenuItem>
            <MenuItem value={'cartoon'}>Cartoon</MenuItem>
            <MenuItem value={'blister'}>Blister</MenuItem>
            <MenuItem value={'bottle'}>Bottle</MenuItem>
            <MenuItem value={'cane'}>Cane</MenuItem>
            </Select>
            {error.packaging?<span style={{fontFamily:'Kanit',color:"#d32f2f",fontSize:13,margin:'2%' } }>{error.packaging}</span>:<></>}

            </FormControl>
         </Grid>
         <Grid item xs={2.4}>
            <TextField label="Quantity" value={quantity} onFocus={()=>handleError('quantity',null)} error={error.quantity} helperText={<span style={{fontFamily:'kanit',fontSize:13,fontColor:'red',margin:'2%'}}>{error.quantity}</span>} onChange={(event)=>setQuantity(event.target.value)} fullWidth></TextField>

         </Grid>
         <Grid item xs={4}>
            <FormControl fullWidth>
            <InputLabel>OfferType</InputLabel>
            <Select label="Offertype" value={offerType} error={error.offertype} onFocus={()=>handleError('offertype',null)} onChange={(event)=>setOfferType(event.target.value)}>
            <MenuItem value={'diwalioffer'}>DiWali Offer</MenuItem>
            <MenuItem value={'sell'}>Sell</MenuItem>
            <MenuItem value={'festivalsell'}>Festival Sell</MenuItem>
            <MenuItem value={'specialoffer'}>Special Offer</MenuItem>
            <MenuItem value={'other'}>Other</MenuItem>

            </Select>
            {error.offerType?<span style={{fontFamily:'Kanit',color:"#d32f2f",fontSize:13,margin:'2%' } }>{error.offerType}</span>:<></>}

            </FormControl>
         </Grid>
         <Grid item xs={4}>
            <TextField label="price" value={price} onFocus={()=>handleError('price',null)} error={error.price} helperText={<span style={{fontFamily:'kanit',fontSize:13,fontColor:'red',margin:'2%'}}>{error.price}</span>} onChange={(event)=>setPrice(event.target.value )} fullWidth></TextField>

         </Grid>
         <Grid item xs={4}>
            <TextField label="OfferPrice" value={offerPrice} onFocus={()=>handleError('offerPrice',null)} error={error.offerPrice} helperText={<span style={{fontFamily:'kanit' ,fontColor:'red',fontSize:13,margin:'2%'}}>{error.offerPrice}</span>} onChange={(event)=>setOfferPrice(event.target.value)} fullWidth></TextField>

         </Grid>
         <Grid item xs={6}>
         {showBtn?<div style={{width:'100%',height:100,justifyContent:'space-evenly',display:'flex',alignItems:'center'}}><Button variant="contained" onClick={handleEditPicture} >Save</Button><Button variant="contained" onClick={handleCancel} >Cancel</Button></div>:<div style={{width:'100%',height:100,display:'flex',alignItems:'center'}}>

  <Button error={error.picture} helperText={error.picture}   variant="contained"  component="label" fullWidth>
  Set New Picture
    <input onClick={()=>handleError('picture',null)} onChange={handlePicture} type='file' hidden  multiple />
  </Button>
    {error.picture?<span style={{color:'#d32f2f',fontFamily:'Kanit',fontSize:13}}>{error.picture}</span>:<></>}
      </div>}

            </Grid>
         <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
         <Avatar alt="Remy Sharp" src={picture.file}  variant="rounded"/>

         </Grid>


      </Grid>    
        
        </div> 
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditData}>Edit Data</Button>
        <Button onClick={handleClose}>Close</Button>

      </DialogActions>
    </Dialog>
  )
}




function showProductDetails(){
    return (
        <MaterialTable
          title="Product Details"
          style={{ color: '#000',background:'#95a5a6',fontWeight:'bold',width:"100%" }}
          columns={[
            { title: 'ProductDetailsId',field: 'productdetailsid'},
            { title: 'Category', render:(rowData)=><div><div><b>{rowData.categoryname}</b></div><div>{rowData.subcategoryname}</div><b><div>{rowData.concernname}</div></b></div> },
           
            { title: 'Product', render:(rowData)=><div><div><b>{rowData.brandname}</b></div><div>{rowData.productname} {rowData.productsubname} <div> {rowData.weight} {rowData.weighttype}</div></div></div> },
           // { title: 'Description', field: 'description' },
            { title: 'Type',render:(rowData)=><div><div>{rowData.quantity}</div><div><b> {rowData.type}</b></div><div>{rowData.packaging}</div></div> },
            { title: 'Price', render:(rowData)=><div><div><s>&#8377;{rowData.price}</s></div><div>&#8377;{rowData.offerprice}</div></div> },
            { title: 'OfferType', field: 'offertype' },
            { title: 'Picture', field: 'picture',render:(rowData)=><><img src={`${serverURL}/images/${rowData.picture.split(",")[0]}`} style={{height:60, weight:60,borderRadius:50}} /></>},
            
          ]}

          options={{
            paging:true,
            pageSize:2,       // make initial page size
            emptyRowsWhenPaging: false,   // To avoid of having empty rows
            pageSizeOptions:[2,3,10,12],    // rows selection options
          }}
          data={productDetailData}        
          actions={[
            {
              icon: 'edit',
              tooltip: 'Edit ProductDetails',
              onClick: (event, rowData) =>handleOpen(rowData)},
            {
                icon: 'delete',
                tooltip: 'Delete ProductDetails',
                onClick: (event, rowData) => handleDelete(rowData)},
            {
                  icon: 'add',
                  tooltip: 'Add User',
                  isFreeAction: true,
                  onClick: (event) => navigate ('/admindashboard/productdetails')
                }
          ]}
        />
      )
    

}



return(<div className={classes.root}> 
   
    <div className={classes.boxdisplay}>
    { showProductDetails() }
   
        </div>  
        {showProductDetailsForm()}   
        </div>)
}