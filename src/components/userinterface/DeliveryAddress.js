import { Button, Divider, Grid, Paper, List, Radio, ListItem, TextField, ListItemButton, DialogContent, Dialog } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState, useEffect } from "react";
import { json, useNavigate } from "react-router-dom";
import Address from "./Address";
import EditIcon from '@mui/icons-material/Edit';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import { postData } from "../../Services/FetchNodeServices";
import React from "react";
import { useSelector } from "react-redux";
import { Add } from "@mui/icons-material";
import MultiAddress from "./MultiAddress";
import Swal from "sweetalert2";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
export default function DeliveryAddress(props) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = useState(false)
    const [openAddress, setOpenAddress] = useState(false)
    const [status, setStatus] = useState(false)
    const [addressStatus, setAddressStatus] = useState(false)
    // const [userData, setUserData] = useState('')
    const [userAddress, setUserAddress] = useState('')
    const [state, setState] = useState([])
    const [address, setAddress] = useState('')
    const [addressid, setAddressId] = useState('')
    const [landmark, setLandmark] = useState([])
    const [pincode, setPincode] = useState([])
    const [city, setCity] = useState([])
    var navigate = useNavigate()
    const [pageRefresh, setPageRefresh] = useState(false)

    var userData = Object.values(useSelector(state => state.user))[0]
     
  

    const handleDelete = () => {
        Swal.fire({
            title: "Do you want to delete Address",
            toast: true,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Don't Delete`
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                var payload = { addressid: props?.userAddress?.addressid }
                var result = await postData('users/delete_user_address', payload)
                if (result.status) {
                    alert(result.status)
                    // console.log("sdsadsa", body)

                    Swal.fire({ toast: true, title: "Deleted!", icon: "success" });
                }

                else {
                    Swal.fire({ toast: true, title: "Fail to delete Record", icon: "error" });
                }
            } else if (result.isDenied) {

                Swal.fire({ toast: true, title: "Your Record is safe", icon: "info" });
            }
        });
    }

    const showAllAddress = (userAddress) => {
        return userAddress?.map((item) => {
            return <div style={{ border: "1px solid #006269", display: 'flex', flexDirection: 'column', padding: 10, margin: 10, width: 250 }}>
                <div style={{ display: 'flex', width: 200 }}>

                    <DeleteForeverIcon style={{ color: 'red', cursor: 'pointer' }} onClick={handleDelete} serData={props?.userData} setUserData={props?.setUserData} userAddress={userAddress} setUserAddress={setUserAddress} /> <div>{item?.address}</div>
                    
                    <div style={{ border: "2px solid #006266", borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '5%', width: '30%', height: 20, cursor: 'pointer', }}>  <EditIcon style={{ width: 22, height: 22, marginLeft: '2%' }} onClick={handleOpen} userData={props?.userData} setUserData={props?.setUserData} userAddress={props?.userAddress} setUserAddress={props?.setUserAddress} />

                        Edit
                    </div>
                  

                    {/* <Radio/> */}


                </div>
                
                {/* <div><Checkbox {...label} />{item?.landmark}</div> */}
                <div>{item?.city},{item?.state},{item?.pincode}</div>
                <div>Phone: +91 {props?.userData?.mobileno}</div>


            </div>
        })
    }

    //========================================handle Submit Address==============================================================\\

    const handleSubmit = async () => {
        var body = { mobileno: props?.userData?.mobileno, address: address, landmark, state, city, pincode }
        var result = await postData('users/submit_user_address', body)
        if (result.status) {
            alert("ok")
            props.setPageRefresh(!props.pageReferesh)
            props.setStatus(false)
        }
        else {
            alert("Fail")
        }

    }

    const check_user_address = async () => {
        if (props?.userData?.mobileno == undefined) {
            setStatus(false)
        }
        else {
            var result = await postData('users/check_user_address', { mobileno: props?.userAddress?.mobileno })
            if (result.status == false) {
                setStatus(true)
            }
            else {
                setStatus(false)
            }
        }
    }

    useEffect(function () {
        check_user_address()
    }, [userData?.mobileno, props?.pageReferesh])


    const handleClose = () => {
        setStatus(false)
        setAddressStatus(false)

    }

    const closeEditHandle = () => {
        setOpen(false)
    }


    //************** Address Drawer Open ]**************************************************** */
    const handleDrawer = () => {

        if (props?.userAddress == 0) {
            setStatus(true)

        }
        else {

            setAddressStatus(true)
            setStatus(false)

        }



    }







    //============================***********************[ Edit Address Dialog ]***************************==============================================\\

    const handleOpen = () => {
        setOpen(true)
      
        // setUserAddress(props?.userAddress)
        // console.log("CHANGE", props?.userAddress?.address)


    }


    const handleEditAddress = () => {

    }





    const handleEditData = () => {
        return (

            <Grid container style={{ paddingInlineStart: 5, margin: '1%', fontFamily: 'kanit' }} >
                <Grid fullWidth item xs={12} >
                    <List>
                        {/* <Paper style={{ width:'100%', height: 'auto' }}> */}

                        <Grid item xs={12} fullWidth style={{ display: 'flex', justifyContent: 'space-between', color: '#006266', fontSize: 18, fontWeight: 'bold', marginTop: '2%', marginBottom: '2%' }}>
                            <div>Edit/Update Address</div>

                            <CloseIcon style={{ cursor: 'pointer' }} onClick={closeEditHandle} />
                        </Grid>

                        <Grid item xs={12} style={{ fontWeight: 'bold', fontSize: 20, }}>
                            {props?.userData?.username} Enter Your Address Details
                        </Grid>



                        <ListItem>
                            <Grid item xs={12} >
                                <TextField id="standard-basic" value={{ "address": address }} fullWidth required label="Address " variant="standard" />
                            </Grid>
                        </ListItem>


                        <ListItem>
                            <Grid item xs={12} >
                                <TextField id="standard-basic" value={props?.userAddress?.landmark} fullWidth label="Landmark/Area " required variant="standard" />
                            </Grid>
                        </ListItem>


                        <ListItem>
                            <Grid item xs={12} >
                                <TextField id="standard-basic" value={pincode} fullWidth label="Pincode " required variant="standard" />
                            </Grid>
                        </ListItem>


                        <ListItem>
                            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Grid item xs={6}>
                                    <TextField id="standard-basic" value={city} required fullWidth label="City" variant="standard" />

                                </Grid>
                                <Grid item xs={6}>
                                    <TextField id="standard-basic" value={userAddress?.state} required fullWidth label="State" style={{ marginLeft: '1%' }} variant="standard" />
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
                                <div label="Reciever's Name" style={{ border: "1px solid #006269", margin: '1%' }} variant="standard" >{props?.userData?.username}</div>
                            </Grid>
                        </ListItem>


                        <ListItem>
                            <Grid item xs={12} >
                                <div label="Reciever's Number" variant="standard" style={{ border: "1px solid #006269", margin: '1%' }}>{props?.userData?.mobileno}</div>
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
                                <Button fullWidth style={{ borderRadius: 20, background: '#006266' }} onClick={handleEditAddress} variant="contained">Update Address</Button>
                            </Grid>
                        </ListItemButton>

                    </List>


                </Grid>
            </Grid>

        )
    }





    //========================*****************[ Add More Than one Address and Update Drawer ]*********************=======================================\\
    const handleMoreAddress = () => {
        setStatus(true)

        setUserAddress(userAddress)


    }

    const showAddressDrawer = () => {
        return (


            <div >

                <List >
                    <Grid container style={{ paddingInlineStart: 5, fontFamily: 'kanit', boxSizing: 'border-box', border: 'red' }} >
                        <Grid fullWidth item xs={12} >


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
                                        <div>{props?.userData?.username},
                                            {showAllAddress(props?.userAddress)}
                                            
               
                                        </div>
                                        <Drawer
                    anchor={'right'}
                    open={open}
                    onClose={handleClose}
                >
                    {handleEditData()}
                </Drawer>
                                    </Grid>

                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button variant="contained" size="small" style={{ display: 'flex', background: '#00391c', borderRadius: 30, padding: 'auto', fontFamily: 'kanit', fontSize: '.8vw', fontWeight: 'bolder', justifyContent: 'center', alignItems: 'center', marginBottom: 10, width: '13vw', height: '4vh' }}
                                        userAddress={userAddress} setUserAddress={setUserAddress}
                                        onClick={handleMoreAddress} >
                                        Add More Address
                                    </Button>
                                </Grid>
                            </ListItem>


                            {/* <Address status={status} setStatus={setStatus}  setAddressStatus={setAddressStatus} addressStatus={addressStatus} /> */}



                        </Grid>
                        <Address userData={props?.userData} setUserData={props?.setUserData} userAddress={userAddress} setUserAddress={setUserAddress} status={status} setStatus={setStatus} pageReferesh={pageRefresh} setPageRefresh={setPageRefresh} />

                    </Grid>


                </List>



            </div>

        )
    }



    //====================********************[ Main Delievery Address Component ]****************************==================================\\


    return (<div style={{ display: 'flex', width: '80%', border: 'solid 2px #00000021', boxShadow: '5px ', height: 'auto', borderRadius: 15, padding: 10, fontFamily: 'kanit' }}>
        <Grid container spacing={3}>


            <Grid item xs={12} style={{ fontWeight: 'bold', fontSize: 22, display: 'flex',justifyContent:'space-evenly' }}>
                <Grid xs={6}>
                    Delivery Address
                </Grid>
                <Grid xs={6}>
                    <Button variant="contained" startIcon={<AddIcon />}
                        size="small" style={{ display: 'flex', background: '#00391c', borderRadius: 30, padding: matches ? <></> : 10, marginLeft: matches ? <></> : 'auto', fontFamily: 'kanit', fontSize: '.9vw', fontWeight: 'bolder', justifyContent: 'center', alignItems: 'center', marginBottom: 10, width: '15vw', height: '4vh' }}
                        address={address} setAddress={setAddress} userAddress={userAddress} setUserAddress={setUserAddress} pageReferesh={pageRefresh} setPageRefresh={setPageRefresh}
                        onClick={handleDrawer}

                    >
                        Add Your Address

                    </Button>
                </Grid>
            </Grid>
            <Grid xs={12}>
                <Divider style={{ marginLeft: '3%', borderWidth: 0.7 }} />
            </Grid>

            <Grid item xs={12} style={{ fontSize: matches ? 10 : 13, fontWeight: 'bolder', alignItems: 'center', display: 'flex' }}>
                {props?.userAddress?.length == 0 ? <span>
                    Please add your address to continue</span> : <div>
                    <div>{props?.userData?.username},</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>

                        {showAllAddress(props?.userAddress)}
                    </div>

                </div>}
                <Drawer
                    anchor={'right'}
                    open={open}
                    onClose={handleClose}
                >
                    {handleEditData()}
                </Drawer>



            </Grid>



            <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>


            </Grid>


            {props.userAddress == 0 ?
                <Address userAddress={userAddress} setUserAddress={setUserAddress} userData={userData} status={status} />
                :
                <Drawer
                    anchor={'right'}
                    open={addressStatus}
                    onClose={handleClose}>

                    {showAddressDrawer()}
                </Drawer>


            }

        </Grid>
    </div>)
}