import { useDetailStyles } from "./ProductDetailsCss"
import { useState,useEffect } from "react";
import{ Grid ,TextField,FormControl,Avatar, InputLabel, Select,MenuItem, Button} from"@mui/material";
import { makeStyles } from '@mui/styles';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import TitleComponent from "../../components/admin/TitleComponent";
import { getData,postData } from "../../Services/FetchNodeServices";
import ReactQuill from 'react-quill';
import { useMemo } from "react";
import 'react-quill/dist/quill.snow.css';

export default function ProductDetails(props){
    var classes = useDetailStyles()
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

    const [subCategoryId,setSubCategoryId]=useState('')
    const [subCategoryList,setSubCategoryList]=useState([])

    const [brandId,setBrandId]=useState('')
    const [brandList,setBrandList]=useState([])

    const [concernId,setConcernId]=useState('')
    
    const [concernList,setConcernList]=useState([])

    
    const [productId,setProductId]=useState('')
    const [productList,setProductList]=useState([])

    const [productSubname,setProductsubname]=useState('')
    const [description,setDescription]=useState('')
    const [error,setError]=useState({})
    const [picture,setPicture]=useState({file:[],bytes:''})

    const [weight,setWeight]=useState('')
    const [weightType,setWeightType]=useState('')
    const [type,setType]=useState('')

    const [offerType,setOfferType]=useState('')
    const [quantity,setQuantity]=useState('')
    const [price,setPrice]=useState('')
    const [offerPrice,setOfferPrice]=useState('')
    const [packaging,setPackaging]=useState('')

    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))
    }

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
        var result= await postData("subcategory/fetch_all_subcategory_by_categoryid",{categoryid:cid})
      //  alert("HELLO"+ result.status)
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

    const fetchAllConcern=async()=>{
        var result=await getData('concern/display_all_concern')
        if(result.status)
        {
            setConcernList(result.data)
        }
    }
    useEffect(function(){fetchAllConcern()},[])


    const fillAllConcern=()=>{
        return concernList.map((item)=>{
            return <MenuItem value={item.concernid}>{item.concernname}</MenuItem>
        })
    }

    const handlePicture=(event)=>{
        // alert(JSON.stringify(event.target.files))

        if(Object.values(event.target.files).length<=3)
    {alert("Pls Upload 3 or more files")

    }
    else{
    setPicture({file:Object.values(event.target.files),bytes:event.target.files})
    }

    }
    const showImages=()=>{
        return picture?.file?.map((item) => {

            return (<div style={{ margin: 2 }}><Avatar alt="Remy Sharp" src={URL.createObjectURL(item)} variant="Rounded" /></div>)

        })

    }
    
    const handleReset=()=>{
        setCategoryId('')
        setSubCategoryId('')
        setBrandId('')
        setProductId('')
        setProductsubname('')
        setDescription('')
        setWeight('')
        setWeightType('')
        setType('')
        setPackaging('')
        setQuantity('')
        setOfferType('')
        setPrice('')
        setOfferPrice('')
        setPicture({files:[],bytes:''})

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
            handleError('subCategoryId','Pls Choose subcategory')
            submit=false
        }
        if(brandId.length==0)
        {
            handleError('brandId','Pls Choose Brand')
            submit=false
        }
        if(productId.length==0)
        {
            handleError('productId','Pls Choose Product')
            submit=false
        }
        if(productSubname.length==0)
        {
            handleError('productSubname','Pls Fill Product subname')
            submit=false
        }
        if(description.length==0)
        {
            handleError('description','Pls Fill Description')
            submit=false
        }
        if(weight.length==0)
        {
            handleError('weight','Pls Fill Product Weight')
            submit=false
        }
        if(weightType.length==0)
        {
            handleError('weightType','Pls Choose Product WeightType')
            submit=false
        }
        if(type.length==0)
        {
            handleError('type','Pls Choose Product type')
            submit=false
        }

        if(packaging.length==0)
        {
            handleError('packaging','Pls Choose Packaging')
            submit=false
        }
        if(offerType.length==0)
        {
            handleError('offerType','Pls Choose OfferType')
            submit=false
        }


        if(quantity.length==0)
        {
            handleError('quantity','Pls Fill Product quantity')
            submit=false
        }
        if(price.length==0)
        {
            handleError('price','Pls Fill Product price')
            submit=false
        }
       
        if(offerPrice.length==0)
        {
            handleError('offerPrice','Pls Fill Product OfferPrice')
            submit=false
        }
       
        if(submit)
        {
            var formData=new FormData()
            formData.append('categoryid',categoryId)
            formData.append('subcategoryid',subCategoryId)
            formData.append('brandid',brandId)
            formData.append('productid',productId)
            formData.append('productsubname',productSubname)
            formData.append('concernid',concernId)
            formData.append('description',description)
            formData.append('weight',weight)
            formData.append('weighttype',weightType)
            formData.append('type',type)
            formData.append('packaging',packaging)
            formData.append('quantity',quantity)
            formData.append('offertype',offerType)
            formData.append('price',price)
            formData.append('offerprice',offerPrice)
            formData.append('picture',picture.bytes)
        
            picture.file.map((item,i)=>{
                formData.append('picture'+i,item)
            })

            var result = await postData('productdetails/submit_details',formData)
            if(result.status)
            {
                Swal.fire({
                    icon: "Success",
                    title: result.message,
                    timer:1500
                  });
    
            }
            else
            {
                Swal.fire({
                    icon: "Error",
                    title: result.message,
                    timer:1500
                  });
            }
        }
        

    }
    

    const handleCategoryChange=(event)=>{

        setCategoryId(event.target.value)
        fetchAllSubCategory(event.target.value)
      
        
    }
    const handleBrandChange=(event)=>{
        setBrandId(event.target.value)
        fetchAllProduct(event.target.value)

    }
   
   const handleConcernChange=(event)=>{
    setConcernId(event.target.value)
   }


return (<div className={classes.root}>
    <div className={classes.box}> 
    <Grid container spacing={1}>
        <Grid item xs={12}>
            <TitleComponent title="Add Product Details" logo="MedBazzar-Logo.png" listicon="list.png" page="/admindashboard/displayproductdetails" />
        </Grid>
        <Grid item xs={3}>
            <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select label="Category" value={categoryId} error={error.categoryId} onFocus={()=>handleError('categoryId',null)} onChange={handleCategoryChange}  > {fillAllCategory()}</Select>
                {error.categoryId?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.categoryId}</span>:<></>}
            </FormControl>
        </Grid>
        <Grid item xs={3}>
            <FormControl fullWidth>
                <InputLabel>Subcategory</InputLabel>
                <Select label="Subcategory" onChange={(event)=>setSubCategoryId(event.target.value)} error={error.subCategoryId} onFocus={()=>{handleError('subCategoryId',null)}} >{fillAllSubCategory()}</Select>
            {error.subCategoryId?<span style={{fontFamily:"kanit",color:"#d32f2f",fontSize:13,margin:'2%'}}>{error.subCategoryId}</span>:<></>}
            </FormControl>
         </Grid>
         <Grid item xs={3}>
            <FormControl fullWidth>
                <InputLabel>Brand</InputLabel>
                <Select label="Brand" value={brandId} error={error.brandId} onFocus={()=>handleError('brandId',null)} onChange={handleBrandChange}>{fillAllBrand()}</Select>
            {error.brandId?<span style={{fontFamily:'kanit',color:'#d32f2f',fontSize:13,margin:'2%'}}>{error.brandId}</span>:<></>}
            </FormControl>
         </Grid>
         <Grid item xs={3}>
            <FormControl fullWidth>
                <InputLabel>Product</InputLabel>
                <Select label="Product" 
                error={error.productId} onFocus={()=>handleError('productId',null)}
                onChange={(event)=>setProductId(event.target.value)}>
                    {fillAllProduct()}
                </Select>
                {error.productId?<span style={{fontFamily:'kanit',fontSize:13,color:'#d32f2f',margin:'2%'}}>{error.productId}</span>:<></>}
            </FormControl>
         </Grid>
         <Grid item xs={6}>
            <TextField label="Product Subname" value={productSubname} onFocus={()=>handleError('productSubname',null)} error={error.productsubname} helperText={<span style={{fontFamily:'kanit',fontSize:13,color:'#d32f2f',margin:'2%'}}>{error.productsubname}</span>} onChange={(event)=>setProductsubname(event.target.value)} fullWidth />
         </Grid>
         <Grid item xs={6}>
            <FormControl fullWidth>
                <InputLabel>Concern</InputLabel>
                <Select label="Concern" value={concernId} error={error.concernId} onFocus={()=>handleError('concernId',null)} onChange={(handleConcernChange)} >{fillAllConcern()}</Select>
            {error.concernId?<span style={{fontFamily:'kanit',color:'#d32f2f',fontSize:13,margin:'2%'}}>{error.concernId}</span>:<></>}
            </FormControl>
         </Grid>
         <Grid item xs={12}>
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
                <MenuItem value={'kg'}>Kilo Gram</MenuItem>
                <MenuItem value={'gm'}>Gram</MenuItem>
            </Select>
            {error.weightType?<span style={{fontFamily:'kanit',fontSize:13,color:'#d32f2f',margin:'2%'}}>{error.weightType}</span>:<></>}
            </FormControl>
         </Grid>
         <Grid item xs={2.4}>
            <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select label="Type" value={type} error={error.type} onFocus={()=>handleError('type',null)}  onChange={(event)=>setType(event.target.value)}>
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
            <Select label="Offertype" value={offerType} error={error.offerType} onFocus={()=>handleError('offertype',null)} onChange={(event)=>setOfferType(event.target.value)}>
            <MenuItem value={'Sell'}>Sell</MenuItem>
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
                <Button variant="contained" error={error.picture} onChange={handlePicture} helperText={error.picture} component="label" fullWidth>
                    Upload
                    <input onClick={()=>handleError('picture',null)} onChange={handlePicture} type="file" hidden  multiple></input>
                </Button>
                {error.picture?<span style={{color:'#d32f2f',fontFamily:'Kanit',fontSize:13,margin:'2%'}}>{error.picture}</span>:<></>}
           
            </Grid>
         <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
         <Avatar alt="Remy Sharp" src={picture.file}  variant="rounded"/>

        
   {showImages()}
         </Grid>
         <Grid item xs={6}>
            <Button variant="contained" onClick={handleSubmit} fullWidth>
                Submit
            </Button>
         </Grid>
         <Grid item xs={6}>
            <Button variant="contained" onClick={handleReset} fullWidth>
                Reset
            </Button>
         </Grid>
       

    </Grid>
    </div>
</div>)
  }  