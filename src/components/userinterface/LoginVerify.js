import { Grid, TextField, Input, Button, Paper, InputAdornment, Divider } from "@mui/material";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import LoginOtp from "./LoginOtp";
import OtpInput from 'react-otp-input';
import { useState,useRef,useEffect } from "react";
import Countdown from 'react-countdown';
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
export default function LoginVerify(props) {
    const [otp, setOtp] = useState("")
    const [status, setStatus] = useState(true)
    const [mobileno, setMobileno] = useState("")
    const inputRefs = useRef([])
    const [seconds, setSeconds] = React.useState(10);
   const Completionist = () => <span style={{ color: '#0c5273', cursor: 'pointer', fontSize: 12, fontWeight: 'bold' }} onClick={generateOTP}>Resend OTP...</span>;

   var dispatch=useDispatch()
    var navigate = useNavigate()
    const handleVerify = async () => {
        if (props.otp == otp) {
            {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "You are Login Success ",
                    showConfirmButton: false,
                    timer: 1800
                  });
                  dispatch({ type: 'ADD_USER', payload: [props?.mobileno,props?.userData] })

                  navigate('/cart')
            }
           
            // navigate('/home')
        }
        else
        {
            {
                Swal.fire({
                    position: "top-end",
                    icon: "reject",
                    title: "Invalid OTP...",
                    showConfirmButton: false,
                    timer: 1500,
                    toast:true
                  });
            }
            // alert ("Invalid OTP...")
        }


    }

   
    const generateOTP=()=>{
        var myotp= parseInt(Math.random()*1899)+1000

        // alert(myotp)
        Swal.fire({
            position: "top-end",
            icon: "success",
            title:  myotp,
            showConfirmButton: false,
            timer: 1800,
            toast:true
          });
        setOtp(myotp)
    }
    
  

  
  

    
    return (<div>
        <Grid container item xs={12} style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', fontFamily: 'Kanit' }} >

            {status ? <Paper item xs={12} fullWidth elevation={8} style={{ width:'80%', marginTop: '15%', paperShadow: '15px solid black', borderRadius: 18, padding: 15 }}>
                <Grid item xs={12}  >
                    <div style={{ fontWeight: 'bolder', fontSize: 30, display: 'flex', alignItems: 'center' }}>
                        Verify Phone Number
                    </div>
                    <div style={{ marginTop: '3%', color: 'grey' }} >
                        An SMS with 4-digit OTP was sent to

                    </div>
                    <div style={{ marginTop: '3%', fontWeight: 'bold', fontSize: 12 }} >
                        +91{props.mobileno} <span style={{ color: '#0c5273', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => setStatus(!status)}  >Change</span>


                    </div>


                </Grid>
                <Grid item xs={12}>
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={4}
                        renderSeparator={<span>-</span>}
                        renderInput={(props) => <input {...props} />}
                        inputStyle={{ width: '10%', height: 40, margin: 5, marginTop: 20 }}
                    />
                </Grid>
                <Grid item xs={12} style={{ textAlign: 'right' }}>

                    < Countdown date={Date.now() + 10000} >
                        <Completionist  />
                    </Countdown>
                </Grid>

                <Grid item xs={12} style={{ display: 'flex' }} fullWidth>
                    <Button variant="contained" fullWidth style={{ marginTop: '15%', padding: 12, borderRadius: 25, width: '100%' }} onClick={handleVerify} >Verify</Button>
                </Grid>
                <Grid item xs={12} style={{ display: 'flex', fontWeight: 'bold', justifyContent: 'center', fontSize: 13, marginTop: '1%' }}>
                    <p> By continuing, you agree to our<span style={{ color: '#0c5273' }}> Terms of Service</span> and<span style={{ color: '#0c5273' }}> Privacy & Legal Policy</span></p>

                </Grid>
            </Paper> : <LoginOtp />}
        </Grid >

    </div >)
}