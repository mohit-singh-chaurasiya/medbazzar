import { useNavigate } from "react-router-dom"
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import { Button, Paper, Grid, TextField, Divider } from "@mui/material";
import { serverURL } from "../../Services/FetchNodeServices";

//........................................................................
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PhonelinkRingOutlinedIcon from '@mui/icons-material/PhonelinkRingOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Header from "./Header";
import UserDetails from "./UserDetails";


export default function UserLoginPage() {
    var navigate=useNavigate()
    return (

        <div spacing={3} item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'7%',marginBottom:'4%'}}>
            <div style={{width:'28%',height:'auto',color:'grey'}}>
            <div item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center',fontWeight:'700' }}> 
            LOG IN
            </div>
            <Paper elevation={2}>
            <div item xs={12} fullwidth style={{display:'flex',justifyContent:'center',height:50,alignContent:'center',marginTop:'3%',textTransform:'uppercase'}}>
            <div item xs={6} style={{borderTop:'2px solid grey',borderRight:'2px solid grey',borderBottom:'2px solid grey',display:'flex',justifyContent:'center',width:'100%',alignItems:'center'}}>Login With OTP</div>
                <div style={{borderTop:'2px solid grey',borderLeft:'2px solid grey',borderBottom:'2px solid grey',width:'100%',alignItems:'center',justifyContent:'center',display:'flex'}} item xs={6}>Login with Email id</div>
            </div>
            <div item xs={12} style={{display:'flex',justifyContent:'center',marginTop:'5%',marginBottom:'4%'}}>
                <GroupOutlinedIcon style={{width:'25%',height:'25%',color:'#dc5229'}} />
            </div>
            <div item xs={12} style={{display:'flex',fontSize:20}}>
                <div elevation={3} fullwidth item xs={3}>+91</div>
                <div fullwidth item xs={9} style={{display:'flex',width:'100%',height:35,marginLeft:7}}>
                    <input type='text' fullwidth placeholder="Enter Phone" style={{width:'100%',border:'none'}} />
                </div>
            </div>
            <div item xs={12} style={{display:'flex',justifyContent:'center',marginTop:'2%',marginBottom:'2%'}}>
                <Button fullWidth variant="contained" style={{background:'#002855',color:'#fff'}}>Login</Button>
            </div>
            <div item xs={12} style={{display:'flex',justifyContent:'space-around',textTransform:'uppercase',fontSize:15}}>
                <div item xs={4} style={{cursor:'pointer'}}>Forgot Password</div>
                <div item xs={5} >Not Registered User? </div>
                <div item xs={1}style={{cursor:'pointer'}}>Sign Up</div>
            </div>
            </Paper>

            </div>


        </div>




        // <div item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'4%'}}>
        //     <div style={{width:'27%',height:'auto',color:'grey'}}>
        //         <div item xs={12} style={{display:'flex',fontSize:20,justifyContent:'center',marginTop:'5%',marginBottom:'5%',marginTop:'3%'}}>
        //             Signup With
        //         </div>
        //         <div item xs={12} fullWidth style={{display:'flex',justifyContent:'initial',alignItems:'center',width:'100%',marginTop:'5%'}}>
        //             <PersonOutlineOutlinedIcon style={{width:'9%',height:'9%'}} /><input type='text' id='firstname' placeholder="Enter Name*" style={{border:'none',width:'100%',height:35,marginLeft:'2%'}} />
        //         </div>
        //         <div item xs={12} fullWidth style={{display:'flex',justifyContent:'initial',width:'100%',marginTop:'5%'}}>
        //             <MailOutlinedIcon style={{width:'9%',height:'9%'}} /><input type='email' id='email' placeholder="Your Email*" style={{border:'none',width:'100%',height:35,marginLeft:'2%'}} />
        //         </div>
        //         <div item xs={12} fullWidth style={{display:'flex',justifyContent:'initial',width:'100%',marginTop:'5%'}}>
        //             <PhonelinkRingOutlinedIcon style={{marginRight:'1%',width:'9%',height:'9%'}}/><input type='text' id='mobileno' placeholder="+91 Mobile Number*" style={{border:'none',width:'100%',height:35,marginLeft:'0.5%'}} />
        //         </div>
        //         <div item xs={12} fullWidth style={{display:'flex',justifyContent:'initial',width:'100%',marginTop:'5%'}}>
        //             <LockOutlinedIcon style={{width:'9%',height:'9%'}} /><input type='password' id='password' placeholder="Choose Password*" style={{border:'none',width:'100%',height:35,marginLeft:'2%'}} />
        //         </div>
        //         <div item xs={12} fullWidth style={{display:'flex',justifyContent:'initial',width:'100%',marginTop:'5%'}}>
        //             <CalendarMonthOutlinedIcon style={{width:'9%',height:'9%'}} /><input type='date' id='dob' placeholder="date of Birth*" style={{border:'none',width:'100%',height:35,marginLeft:'2%'}} />
        //         </div>
        //         <div item xs={12}>
        //             <Button fullWidth variant="contained" style={{background:'#002855',color:'#fff',marginTop:'5%'}}>Register</Button>
        //         </div>
        //         <div item xs={12} style={{display:'flex',justifyContent:'space-around',fontSize:15}}>
        //             <div item xs={10}>ALREADY REGISTERED?</div>
        //             <div item  style={{cursor:'pointer'}} xs={2}>LOGIN</div>

        //         </div>
        //     </div>

        // </div>

       


    )
}