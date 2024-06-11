import MaterialTable from "@material-table/core";
import { useStyles } from "./CategoriesCss";
import { useState,useEffect } from "react";
import { getData, postData, serverURL } from "../../Services/FetchNodeServices";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from "sweetalert2";
import { useConcernStyles } from "./DisplayAllConcernCss";
import { useNavigate } from "react-router-dom";
import { Button,Grid,TextField,Avatar } from "@mui/material";
import TitleComponent from "../../components/admin/TitleComponent";
export default function DisplayAllConcern(){
    var classes = useConcernStyles()

    var navigate = useNavigate()

    
    const [concern,setConcern]=useState('')
    const [concernId,setConcernId]=useState('')

    const [picture,setPicture]=useState({file:'icon.jpg',bytes:''})
    const [tempPicture,setTempPicture]=useState('')

    const [error,setError]=useState({})
    const [showBtn,setShowBtn]=useState(false)
    const [categoryData,setCategoryData]=useState([])

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
        if(concern.length==0)
        {
            handleError('concern','Pls input Concern Name.... ')
            submit=false
        }

        

        if(submit)
        {

        var body={concernid:concernId,concernname:concern}
        var result=await postData('concern/edit_concern_data',body)
      
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

        fetchAllConcern()
        } 
      }
  

    const handleEditPicture=async()=>{
 
       
        var formData=new FormData()
        formData.append('concernid',concernId)
        formData.append('picture',picture.bytes)
     
        var result=await postData('concern/edit_concern_picture',formData)
      
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

        fetchAllConcern()
        
        
    }

    const handleDelete=(rowData)=>{
       
      
        Swal.fire({
            title: "Do you want to delete concern?",
            toast:true,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Don't Delete`,
            
          }).then(async(result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                var body={concernid:rowData.concernid}
               var result=await postData('concern/delete_concern_data',body)
               if(result.status){
              Swal.fire({toast:true,title:"Deleted!",icon: "success"});}
            else{
            Swal.fire({toast:true,title:"Fail to delete Record",icon: "error"});}
            } else if (result.isDenied) {
            
              Swal.fire({toast:true,title:"Your Record is safe",icon: "info"});
            }
            fetchAllConcern()
          });
            
                  

        
        
    }

    const [concernData,setConcernData]=useState([])
    const [open,setOpen]=useState(false)

    const fetchAllConcern=async()=>{
        var result=await getData('concern/display_all_concern')
    
        if(result.status)
        { setConcernData(result.data)}
       
    }
    useEffect(function(){
        fetchAllConcern()
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
        setConcernId(rowData.concernid)
        setConcern(rowData.concernname)
        setPicture({'file':`${serverURL}/images/${rowData.picture}`,bytes:''})
        setTempPicture(`${serverURL}/images/${rowData.picture}`)
    }

    const showConcernForm=()=>{
      return(
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={"md"}>

            <DialogContent>
            <div className={classes.box}>
        <Grid container spacing={3}>
            <Grid item xs={12}>
            <TitleComponent title="Edit Concern Data" logo="MedBazzar-Logo.png" listicon="list.png" />
            </Grid>

            <Grid item xs={12}>
                <TextField value={concern} onFocus={()=>handleError('concern',null)} error={error.concern} helperText={<span  style={{fontFamily:'Kanit',color:'#d32f2f',fontSize:13}}>{error.concern}</span>} onChange={(event)=>setConcern(event.target.value)} label="Concern Name" fullWidth/>
            </Grid>

            <Grid item xs={6}>
                {showBtn?<div style={{width:'100% ',display:'flex',height:100,justifyContent:'space-evenly',alignItems:'center'}}><Button variant="contained" onClick={handleEditPicture}>Save</Button>
                <Button variant="contained" onClick={handleCancel} >Cancel</Button></div>  :<div style={{width:'100% ',display:'flex',height:100,justifyContent:'space-evenly',alignItems:'center'}}>
                <Button variant="contained" component="label" fullWidth>
                     Set New Picture
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
       
    function showConcern() {
        return (
          <MaterialTable
            title="Main Concern"
            style={{ color: '#000',background:'#95a5a6',fontWeight:'bold' }}
            columns={[
              { title: 'Concern Id', field: 'concernid' },
              { title: 'Concern ', field: 'concernname' },
              { title: 'Icon', field: 'picture',render:(rowData)=><><img src={`${serverURL}/images/${rowData.picture}`} style={{width:60,height:60,borderRadius:30}} /></> },
            //{ title: 'Icon', field: 'picture',render:(rowData)=><>{rowData.categoryname=="Medicines"?MOHIT<><img src={`${serverURL}/images/${rowData.picture}`} style={{width:60,height:60,borderRadius:30}} /></>}</>},

            ]}
            options={{
              paging:true,
              pageSize:3,       // make initial page size
              emptyRowsWhenPaging: false,   // To avoid of having empty rows
              pageSizeOptions:[3,5,7,10],    // rows selection options
            }}
           

            data={concernData}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Concern',
                onClick: (event, rowData) => handleOpen(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Concern',
                onClick: (event, rowData) => handleDelete(rowData)
              },
            
                {
                  icon: 'add',
                  tooltip: 'Add User',
                  isFreeAction: true,
                  onClick: (event) => navigate ('/admindashboard/concern')
                }
                          
              
            ]}
          />
          

        )
      }
      return(<div className={classes.root}> 
        <div className={classes.boxdisplay}>

        {showConcern()  }
        </div>
        {showConcernForm()} 
      </div>)

}