import MaterialTable from "@material-table/core";
import { useStyles } from "./DisplayAllSubCategoryCss";
import { Button,Grid,TextField,Avatar, DialogTitle, FormControl, MenuItem } from "@mui/material";
import { useEffect,useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {Select,InputLabel} from "@mui/material"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { getData,postData,serverURL } from "../../Services/FetchNodeServices";
import TitleComponent from "../../components/admin/TitleComponent";

export default function DisplaAllSubCategory(){
  var navigate=useNavigate()
    var classes= useStyles()
   // const [category,setCategory]=useState('')
    const [error,setError]=useState({})
    const [picture,setPicture]=useState({file:'icon.jpg',bytes:''})
    const [tempPicture,setTempPicture]=useState()
    const [subCategory,setSubcategory]=useState([])
    const [categoryList,setCategoryList]=useState([])
    const [subCategoryId,setSubCategoryId]=useState('')

    const [open,setOpen]=useState(false)    
    const [categoryId,setCategoryId]=useState('')
    const [subCategoryData,setSubcategorydata] = useState([])
    const [categorydata,setCategorydata] = useState([])
    const [showBtn,setShowBtn]= useState(false)
  



    const fetchAllCategory=async()=>{
      var result=await getData('category/display_all_category')
      
      if(result.status)
      { setCategoryList(result.data)}
      
      }

  useEffect(function(){fetchAllCategory()},[])
  
  
  const fillAllCategory=()=>{
    return categoryList.map((item)=>{

         return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
     })
     
 }


  const handleError=(label,msg)=>{
    setError((prev)=>({...prev,[label]:msg}))

  }

 const handlePicture=(event)=>{
 
  setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
  setShowBtn(true)

 }


    const fetchAllSubcategory=async()=>{
     
      var result=await getData('subcategory/display_all_subcategory')
      if(result.status)
      { setSubcategorydata(result.data)}     
  }
  useEffect(function(){
    fetchAllSubcategory()
},[])



const handleClose=()=>{
  setOpen(false)
}

const handleOpen=(rowData)=>{
  setOpen(true)
 
  setSubCategoryId(rowData.subcategoryId)
  setCategoryId(rowData.categoryid)
  setSubcategory(rowData.subcategoryname)
  setPicture({file:`${serverURL}/images/${rowData.picture}`,bytes:'' } ) 
  setTempPicture(`${serverURL}/images/${rowData.picture}`)
}

const handleCancel=()=>{
  setPicture({file:tempPicture,bytes:''})
  setShowBtn(false)

}

const handleEditData=async()=>{

  

  var body={subcategoryid:subCategoryId,categoryid:categoryId,subcategoryname:subCategory}
  var result=await postData('subcategory/edit_subcategory_data',body)
console.log("RESULTFD",result)
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
  fetchAllSubcategory()

}

const handleEditPicture=async()=>{
var formData=new FormData()
formData.append('subcategoryid',subCategoryId)
formData.append('picture',picture.bytes)
var result = await postData('subcategory/edit_subcategory_picture',formData)


fetchAllSubcategory()
}

 const handleDelete=async(rowData)=>{

   Swal.fire({
            title: "Do you want to delete subcategory?",
            toast:true,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Don't Delete`,
            
            
          }).then(async(result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                var body={subcategoryid:rowData.subcategoryid}
               var result=await postData('subcategory/delete_subcategory_data',body)
               if(result.status){
              Swal.fire({toast:true,timer:1500,title:"Deleted!",icon: "success"});}
            else{
            Swal.fire({toast:true,title:"Fail to delete Record",icon: "error"});}
            } else if (result.isDenied) {
            
              Swal.fire({toast:true,timer:1500,title:"Your Record is safe",icon: "info"});
            }
            fetchAllSubcategory()
          });
            
        }

        

 


const showSubcategoryForm=()=>{
  return(
    <Dialog
    open={open} 
    onClose={handleClose}
    maxWidth={"md"}>
    
      <DialogContent>
         <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TitleComponent title=" Edit SubCategory" logo="MedBazzar-Logo.png" listicon="list.png" />

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
                  
                <TextField value={subCategory} onFocus={()=>handleError('subcategory',null)} error={error.subcategory} helperText={<span  style={{fontFamily:'Kanit',color:'#d32f2f',fontSize:13}}>{error.subcategory}</span>} onChange={(event)=>setSubcategory(event.target.value)} label="Subcategory Name" fullWidth/>
                  </Grid>
                <Grid item xs={6}>
                {showBtn?<div style={{width:'100%',height:100,justifyContent:'space-evenly',display:'flex',alignItems:'center'}}><Button variant="contained" onClick={handleEditPicture} >Save</Button><Button variant="contained" onClick={handleCancel}>Cancel</Button></div>:<div style={{width:'100%',height:100,display:'flex',alignItems:'center'}}>

                    <Button error={error.picture} helperText={error.picture}   variant="contained"  component="label" fullWidth>
                        Set New Picture
                        <input onClick={()=>handleError('picture',null)} onChange={handlePicture} type='file' hidden accept="images/*" multiple />
                    </Button>
                    {error.picture?<span style={{color:'#d32f2f',fontFamily:'Kanit',fontSize:13}}>{error.picture}</span>:<></>}
                </div>}
                 
                </Grid>

                <Grid item xs={6} style={{display:'flex' , alignItems:'center' ,justifyContent:'center', width:'60',height:'60'} }>
                <Avatar alt="Remy Sharp" src={picture.file} variant="rounded" style={{width:80,height:80}} />
                </Grid>

               

            </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditData} >Edit Data</Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
  
    function showSubcategory() {
        return (
          <MaterialTable
            title="Sub Categories"
            style={{ color: '#000',background:'#95a5a6',fontWeight:'bold' }}
            columns={[
              { title: 'SubCategoryid', field: 'subcategoryid' },
              { title: 'Category', field: 'categoryname' },
              { title: 'SubCategoryName', field: 'subcategoryname' },
              { title: 'Picture', field: 'picture',render:(rowData)=><><img src={`${serverURL}/images/${rowData.picture}`} style={{height:60, weight:60,borderRadius:50}} /></>},
              
            ]}

            options={{
              paging:true,
              pageSize:3,       // make initial page size
              emptyRowsWhenPaging: false,   // To avoid of having empty rows
              pageSizeOptions:[3,5,7,10],    // rows selection options
            }}
            data={subCategoryData}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Subcategory',
                onClick: (event, rowData) => handleOpen(rowData)},
              {
                  icon: 'delete',
                  tooltip: 'Delete Subcategory',
                  onClick: (event, rowData) => handleDelete(rowData)},
              {
                    icon: 'add',
                    tooltip: 'Add User',
                    isFreeAction: true,
                    onClick: (event) => navigate ('/admindashboard/subcategory')
                  }
            ]}
          />
        )
      }
      return(<div className={classes.root}> 
        <div className={classes.boxdisplay}>
        { showSubcategory() }
            </div>
            {showSubcategoryForm()}
            </div>)



}