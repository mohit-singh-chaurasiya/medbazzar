import { Paper, Divider, Button, Grid, List, ListItem } from "@mui/material";
import { UseSelector, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import makeStyles from "@mui/material";
import { useCartStyles } from "./ShowCartProductsCss";

import { useState } from "react";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import NotesIcon from '@mui/icons-material/Notes';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import DisplayUsers from "../../screen/admins/DisplayUsers";
export default function UserHeader(props) {
    var classes = useCartStyles()
    var products = useSelector((state) => state.data)
    const [isStatus, setIsStatus] = useState(false)
    var keys = Object?.keys(products)
    var products = Object?.values(products)
    var navigate = useNavigate()
    const [userData,setUserData]=useState('')
    const [userAddress,setUserAddress]=useState('')

    const handleUser = () => {
        navigate('/userdata')
       
    }
    const handleOrder = () => {
        navigate('/order')
    }


    return (

        <div style={{ display: 'flex' }}>
            <Paper elevation={2} style={{ display: props.isStatus ? 'block' : 'none', position: 'absolute', top: 50, right: 50, zIndex: 3, width: 250 }}  >
              
                        <Grid item xs={12} style={{ color: 'grey', display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: 3, cursor: 'pointer' }} onClick={handleUser}  userData={userData}
        setUserData={setUserData}
        userAddress={userAddress}
        setUserAddress={setUserAddress} >
                            <div style={{ color: 'grey', display: 'flex', alignItems: 'center' }}>
                                <PersonOutlineIcon />
                                View Users Details
                            </div>
                            <ArrowForwardIosIcon />
                        </Grid>
                 
                        <Grid item xs={12} style={{ color: 'grey', display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: 3, cursor: 'pointer' }} onClick={handleOrder}>
                            <div style={{ color: 'grey', display: 'flex', alignItems: "center" }}>
                                <NotesIcon />

                                My Orders
                            </div>
                            <ArrowForwardIosIcon />
                        </Grid>
                 
                        {/* <Grid item xs={12} style={{ color: 'grey', display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: 3, cursor: 'pointer' }}>
                            <div style={{ color: 'red', display: 'flex', alignItems: "center" }}>
                                <LogoutIcon />

                                LogOut
                            </div>
                           
                            <ArrowForwardIosIcon  />
                           
                        </Grid> */}
                   
            </Paper>
        </div>
    )
}