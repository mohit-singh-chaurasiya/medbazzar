import MaterialTable from "@material-table/core";
import { useBrandStyles } from "./DisplayAllBrandsCss";
import { useState,useEffect } from "react";
import { getData, postData, serverURL } from "../../Services/FetchNodeServices";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from "sweetalert2";
import { Button,Grid,TextField,Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TitleComponent from "../../components/admin/TitleComponent";
export default function DisplayAllBrands(){
    var classes = useBrandStyles()
    var navigate=useNavigate()

    
    const [brand,setBrand]=useState('')
    const [brandid,setBrandid]=useState('')

    const [picture,setPicture]=useState({file:'icon.jpg',bytes:''})
    const [tempPicture,setTempPicture]=useState('')

    const [error,setError]=useState({})
    const [showBtn,setShowBtn]=useState(false)

    const handlePicture=(event)=>{
        handleError('picture',null)
        setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        setShowBtn(true)
    }

    const handleError=(label,msg)=>{

        setError((prev)=>({...prev,[label]:msg}))
    }


    const handleEditData=async()=>{
        var submit=true 
        if(brand.length==0)
        {
            handleError('brand','Pls input Brand Name.... ')
            submit=false
        }

        

        if(submit)
        {

        var body={brandid:brandid,brandname:brand}
        var result=await postData('brand/edit_brand_data',body)
      
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

        fetchAllBrand()
        } 
        

     
           
    }
  

    

    const handleEditPicture=async()=>{
 
       
        var formData=new FormData()
        formData.append('brandid',brandid)
        formData.append('picture',picture.bytes)
     
        var result=await postData('brand/edit_brand_picture',formData)
      
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

        fetchAllBrand()
        
        
    }

    const handleDelete=(rowData)=>{
       
      
        Swal.fire({
            title: "Do you want to delete brand?",
            toast:true,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Don't Delete`
          }).then(async(result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                var body={brandid:rowData.brandid}
               var result=await postData('brand/delete_brand_data',body)
               if(result.status){
              Swal.fire({toast:true,title:"Deleted!",icon: "success"});}
            else{
            Swal.fire({toast:true,title:"Fail to delete Record",icon: "error"});}
            } else if (result.isDenied) {
            
              Swal.fire({toast:true,title:"Your Record is safe",icon: "info"});
            }
          });
            
                  

        fetchAllBrand()
        
    }

    const [brandData,setBrandData]=useState([])
    const [open,setOpen]=useState(false)

    const fetchAllBrand=async()=>{
        var result=await getData('brand/display_all_brand')
    
        if(result.status)
        { setBrandData(result.data)}
       
    }
    useEffect(function(){
        fetchAllBrand()
    },[])

    const handleClose=()=>{
        setOpen(false)
    }
    const handleCancel=()=>{
        setPicture({file:tempPicture,bytes:''})
        setShowBtn(false)
    }

    const handleOpen=(rowData)=>{

        setOpen(true)
        setBrandid(rowData.brandid)
        setBrand(rowData.brandname)
        setPicture({'file':`${serverURL}/images/${rowData.picture}`,bytes:''})
        setTempPicture(`${serverURL}/images/${rowData.picture}`)
    }

    const showBrandForm=()=>{
        return(
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth={"md"}>

                <DialogContent>
                <div className={classes.box}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <TitleComponent title="Edit Brand Data" logo="MedBazzar-Logo.png" listicon="list.png"/>
                </Grid>

                <Grid item xs={12}>
                    <TextField value={brand} onFocus={()=>handleError('brand',null)} error={error.brand} helperText={<span  style={{fontFamily:'Kanit',color:'#d32f2f',fontSize:13}}>{error.brand}</span>} onChange={(event)=>setBrand(event.target.value)} label="Brand Name" fullWidth/>
                </Grid>

                <Grid item xs={6}>
                    {showBtn?<div style={{width:'100% ',display:'flex',height:100,justifyContent:'space-evenly',alignItems:'center'}}><Button variant="contained" onClick={handleEditPicture}>Save</Button>
                    <Button variant="contained" onClick={handleCancel} >Cancel</Button></div>  :<div style={{width:'100% ',display:'flex',height:100,justifyContent:'space-evenly',alignItems:'center'}}>
                    <Button variant="contained" component="label" fullWidth>
                         Set New Brand Picture
                        <input onClick={()=>handleError('picture',null)} onChange={handlePicture} type='file' hidden accept="images/*" multiple />
                    </Button>
                    {error.picture?<span style={{marginLeft:'4%', color:'red',fontSize:12}}>{error.picture}</span>:<></>}
                   </div>}
                </Grid>

                <Grid item xs={6} style={{display:'flex' ,justifyContent:'center' }}>
                <Avatar alt="Remy Sharp" src={picture.file} variant="rounded" style={{width:100,height:100}} />
                </Grid>

                
            </Grid>

        </div>
                </DialogContent>
                <DialogActions>
                
                    <Button onClick={handleEditData}>Edit Data </Button>
                    <Button onClick={handleClose}>Close </Button>
                </DialogActions>
            </Dialog>
        )
    }
    function showBrand() {
        return (
          <MaterialTable
            title="Brand Data "
            style={{ color: '#000',background:'#95a5a6',fontWeight:'bold',width:"100%" }}
            columns={[
              { title: 'Brand Id', field: 'brandid' },
              { title: 'Brand Name', field: 'brandname' },
              { title: 'Icon', field: 'picture',render:(rowData)=><><img src={`${serverURL}/images/${rowData.picture}`} style={{width:55,height:55,borderRadius:30}} /></> },

            ]}

            options={{
              paging:true,
              pageSize:3,       // make initial page size
              emptyRowsWhenPaging: false,   // To avoid of having empty rows
              pageSizeOptions:[3,5,7,10],    // rows selection options
            }}
           

            data={brandData}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Brand ',
                onClick: (event, rowData) => handleOpen(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Brand',
                onClick: (event, rowData) => handleDelete(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add User',
                isFreeAction: true,
                onClick: (event) => navigate ('/admindashboard/brands')
              }
             
              
            ]}
          />
          

        )
      }
      return(<div className={classes.root}> 
        <div className={classes.boxdisplay}>

        {showBrand()  }
        </div>
        {showBrandForm()}
      </div>)

}