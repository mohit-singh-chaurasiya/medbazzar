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


export default function userDataDetail(props) {

    const showUserData = (userAddress) => {
        return userAddress?.map((item) => {
            return <div style={{ border: "1px solid #006269", display: 'flex', flexDirection: 'column', padding: 10, margin: 10, width: 250 }}>
                <div style={{ display: 'flex', width: 200 }}>

                    {/* <DeleteForeverIcon style={{ color: 'red',cursor:'pointer' }} onClick={handleDelete} />  */}
                    <div>{item?.address}</div>

                    {/* <div style={{ border: "2px solid #006266", borderRadius: 5, display: 'flex', alignItems: 'center',justifyContent:'center', marginLeft: '5%', width: '30%',height:20, cursor: 'pointer', }}>  <EditIcon style={{ width: 22, height: 22, marginLeft: '2%' }} onClick={handleOpen} userData={props?.userData} setUserData={props?.setUserData} userAddress={props?.userAddress} setUserAddress={props?.setUserAddress} />

                        Edit</div> */}
                    {/* <Radio/> */}


                </div>
                <div>{item?.landmark}</div>
                <div>{item?.city},{item?.state},{item?.pincode}</div>
                <div>Phone: +91 {props?.userData?.mobileno}</div>

            </div>
        })
    }

    return (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'grey' }}>
        <Grid xs={12} style={{ border: "2px solid #006266", display: 'flex', alignItems: 'center', margin: '2%', borderRadius: 10 }}>
            <Grid xs={12} fullWidth style={{ display: 'flex', fontSize: 12, fontWeight: 'bold', fontFamily: 'kanit' }}>
                <div>{props?.userData?.username},
                    {showUserData(props?.userAddress)}
                </div>
            </Grid>

        </Grid>
    </div>)
}