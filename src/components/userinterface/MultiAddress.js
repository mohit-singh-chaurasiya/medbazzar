import { Button, Divider, Grid, Paper, List, Radio, ListItem, TextField, ListItemButton, DialogContent, Dialog } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Address from "./Address";
import EditIcon from '@mui/icons-material/Edit';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import { postData } from "../../Services/FetchNodeServices";
import React from "react";
import { Add } from "@mui/icons-material";
export default function MultiAddress(props){
    const [userData, setUserData] = useState('')
    const [addressStatus,setAddresStatus]=useState(false)
    const [address,setAddress] =useState('')
    const [userAddress, setUserAddress] = useState('')

    const showAllAddress = (userAddress) => {
        return userAddress?.map((item) => {
            return <div style={{ display: 'flex', flexDirection: 'column', padding: 10, margin: 10 }}>
                <div>{item?.address}</div>
                <div>{item?.landmark}</div>
                <div>{item?.city},{item?.state},{item?.pincode}</div>
                <div>Phone: +91 {props?.userData?.mobileno}</div>
            </div>
        })
    }

    const handleClose = () => {
        // setStatus(false)
        setAddresStatus(false)

    }

    const  handleOpen=()=>{
setAddresStatus(true)
    }

    const handleDrawerList=()=>{
        <div >

        <List >
            <Grid container style={{ paddingInlineStart: 5, fontFamily: 'kanit', boxSizing: 'border-box', border: 'red' }} >
                <Grid fullWidth item xs={12} >

                    {/* <Paper style={{ width:'100%', height: 'auto' }}> */}
                    <ListItem>
                        <Grid item xs={12} fullWidth style={{ display: 'flex', justifyContent: 'space-between', color: '#006266', fontSize: 22, fontWeight: 'bolder', marginTop: '2%', marginBottom: '2%', alignItems: 'center' }}>
                            <div>Select Address</div>

                            <CloseIcon style={{ cursor: 'pointer', color: '#000' }} onClick={handleClose} />
                        </Grid>
                    </ListItem>
                    <ListItem>
                        <Grid item xs={12} style={{ fontWeight: 'bold', fontSize: 20, }}>
                            {props?.userData?.username} Please Choose Your Address
                        </Grid>
                    </ListItem>
                    <ListItem>
                        <Grid xs={12} style={{ border: "2px solid #006266", display: 'flex', alignItems: 'center', margin: '2%', borderRadius: 10 }}>
                            <Grid xs={12} fullWidth style={{ display: 'flex', fontSize: 12, fontWeight: 'bold', fontFamily: 'kanit' }}>
                                <EditIcon style={{ margin: '1%', border: "2px solid #006266", borderRadius: 5, width: 30, height: 30, cursor: 'pointer' }} onClick={handleOpen}     userData={userData} address={address} setAddress={setAddress} setUserData={setUserData} userAddress={userAddress} setUserAddress={setUserAddress}  />
                                <div>{props?.userData?.username},
                                    {showAllAddress(props?.userAddress)}</div>
                            </Grid>
                            {/* <Grid item xs={2}>
                            <Button variant="contained" size="small" style={{ display: 'flex', background: '#00391c', borderRadius: 30, padding: 'auto', fontFamily: 'kanit', fontSize: '.8vw', fontWeight: 'bolder', justifyContent: 'center', alignItems: 'center', marginBottom: 10, width: '13vw', height: '4vh' }} >
                                Edit Address
                            </Button>
                        </Grid> */}
                        </Grid>
                    </ListItem>
                    <ListItem>
                        <Grid xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button variant="contained" size="small" style={{ display: 'flex', background: '#00391c', borderRadius: 30, padding: 'auto', fontFamily: 'kanit', fontSize: '.8vw', fontWeight: 'bolder', justifyContent: 'center', alignItems: 'center', marginBottom: 10, width: '13vw', height: '4vh' }}  >
                                Add More Address
                            </Button>
                        </Grid>
                    </ListItem>

                    {/* <Address setAddresStatus={setAddresStatus} addressStatus={addressStatus} /> */}

                </Grid>
            </Grid>


        </List>
        <div>
            {/* {handleEditData()} */}
          


        </div>

    </div>

    }
    
    return (

        <Drawer
        anchor={'right'}
        open={props.addressStatus}
        onClose={handleClose}
    >
        {handleDrawerList()}
       
    </Drawer>
   

       
    )
}