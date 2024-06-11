import { useState } from "react";
import { postData } from "../../Services/FetchNodeServices";
import { Grid, TextField, Input, Button, Paper, InputAdornment, Divider, ListItem, ListItemButton, List } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
// import { Anchor } from "@mui/icons-material";
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Radio from '@mui/material/Radio';




export default function Address(props) {
    const [address, setAddress] = useState('')
    const [houseNo, setHouseNo] = useState('')
    const [floorNo, setFloorNo] = useState('')
    const [landmark, setLandmark] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [pincode, setPincode] = useState('')
    const [pageRefresh,setPageRefresh]=useState(false)
     
    
    const handleClose = () => {
        props?.setStatus(false)
        
        
        // props.setPageRefresh(props.pageRefresh)
    }
   

    const handleSubmit = async () => {
        var body = { mobileno: props?.userData?.mobileno, address: address, landmark, state, city, pincode }
        var result = await postData('users/submit_user_address', body)
        if (result.status) {
            alert("ok")
            props.setPageRefresh(!props.pageReferesh)
            // props.setStatus(false)
        }
        else {
            alert("Fail")
            // props?.setStatus(false)
            // props.setPageRefresh(!props.pageRefresh)
            
        }

    }


    const drawerList = () => (

        <div>
           
            <Grid container style={{ paddingInlineStart: 5, margin: '1%', fontFamily: 'kanit', }} >
                <Grid fullWidth item xs={12} >
                    <List>
                        {/* <Paper style={{ width:'100%', height: 'auto' }}> */}

                        <Grid item xs={12} fullWidth style={{ display: 'flex', justifyContent: 'space-between', color: '#006266', fontSize: 18, fontWeight: 'bold', marginTop: '2%', marginBottom: '2%' }}>
                            <div>Add Address</div>

                            <CloseIcon style={{ cursor: 'pointer' }}    onClick={handleClose}  />
                        </Grid>

                        <Grid item xs={12} style={{ fontWeight: 'bold', fontSize: 20, }}>
                            {props?.userData?.username} Enter Your Address Details
                        </Grid>


                        {/* <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>

                        <GpsFixedIcon style={{ color: '#006266' }} />

                        <div style={{ textAlign: 'left', marginLeft: '1%' }}>
                            <div fullWidth style={{ color: '#006266', fontWeight: 'bold', width: '100%', marginLeft: '1%', display: 'flex' }}>Using Current Location</div>
                            <div sty8le={{ fontSize: 10 }}>Using GPS</div>
                        </div>
                    </Grid> */}
                        {/* <ListItem>
                            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Grid item xs={6}>
                                    <TextField id="standard-basic" onChange={(event)=>setHouseNo(event.target.value)} required fullWidth label="House No." variant="standard" />

                                </Grid>
                                <Grid item xs={6}>
                                    <TextField id="standard-basic" onChange={(event)=>setFloorNo(event.target.value)} required fullWidth label="Floor No." style={{ marginLeft: '1%' }} variant="standard" />
                                </Grid>
                            </Grid >
                        </ListItem> */}


                        <ListItem>
                            <Grid item xs={12} >
                                <TextField id="standard-basic" onChange={(event) => setAddress(event.target.value)} fullWidth required label="Address " variant="standard" />
                            </Grid>
                        </ListItem>


                        <ListItem>
                            <Grid item xs={12} >
                                <TextField id="standard-basic" onChange={(event) => setLandmark(event.target.value)} fullWidth label="Landmark/Area " required variant="standard" />
                            </Grid>
                        </ListItem>


                        <ListItem>
                            <Grid item xs={12} >
                                <TextField id="standard-basic" onChange={(event) => setPincode(event.target.value)} fullWidth label="Pincode " required variant="standard" />
                            </Grid>
                        </ListItem>


                        <ListItem>
                            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Grid item xs={6}>
                                    <TextField id="standard-basic" onChange={(event) => setCity(event.target.value)} required fullWidth label="City" variant="standard" />

                                </Grid>
                                <Grid item xs={6}>
                                    <TextField id="standard-basic" onChange={(event) => setState(event.target.value)} required fullWidth label="State" style={{ marginLeft: '1%' }} variant="standard" />
                                </Grid>
                            </Grid >
                        </ListItem>


                        <Grid item xs={12} >
                            <div style={{ fontWeight: 'bold', fontSize: 20, marginTop: '5%' }}>
                                Delivery Contact Details
                            </div>

                            <div style={{ fontSize: 12 }}>
                                This mobile number will receive an OTP, required for collecting the order.
                            </div>
                        </Grid>


                        <ListItem>
                            <Grid item xs={12}  >
                                <div  style={{border: "1px solid #006269",margin:'1%',fontWeight:'bold'}}  variant="standard" >Reciever's Name: {props?.userData?.username}</div>
                            </Grid>
                        </ListItem>


                        <ListItem>
                            <Grid item xs={12} >
                                <div   variant="standard"  style={{border: "1px solid #006269",margin:'1%',fontWeight:'bold'}}>Reciever's Number: {props?.userData?.mobileno}</div>
                            </Grid>
                        </ListItem>


                        <Grid item xs={12} style={{ marginTop: '5%' }}>
                            <div style={{ fontWeight: 'bold' }}>Save As</div>
                            <Button style={{ margin: '1%', borderRadius: 10, border: true, color: '#006266' }} variant="text">Work</Button>
                            <Button style={{ margin: '1%', borderRadius: 10, border: true, color: '#006266' }} variant="text">Home</Button>
                            <Button style={{ margin: '1%', borderRadius: 10, border: true, color: '#006266' }} variant="text">Other</Button>
                        </Grid>


                        <ListItemButton>
                            <Grid item xs={12} >
                                <Button fullWidth style={{ borderRadius: 20, background: '#006266' }} onClick={handleSubmit} variant="contained">Save Address</Button>
                            </Grid>
                        </ListItemButton>

                    </List>


                </Grid>
            </Grid>
            

        </div>)







    return (<div >
        {/* <Button onClick={handleOpen}>jkj</Button> */}

        <Drawer
            anchor={'right'}
            open={props.status}
            onClose={handleClose}
        >
            {drawerList()}
        </Drawer>

    </div>)
}