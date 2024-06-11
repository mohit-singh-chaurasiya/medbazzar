import { Grid, TextField, Input, Button, Paper, InputAdornment, Divider } from "@mui/material";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import LoginOtp from "./LoginOtp";
import OtpInput from 'react-otp-input';
import { useState } from "react";
import Countdown from 'react-countdown';
import { postData } from "../../Services/FetchNodeServices";
import Swal from "sweetalert2";
import Address from "./Address";
import { useDispatch } from "react-redux";
// import Home
export default function UserDetails(props) {
    const [otp, setOtp] = useState('');
    const Completionist = () => <span style={{ color: '#0c5273', cursor: 'pointer', fontSize: 12, fontWeight: 'bold' }}>Resend OTP...</span>;
    const [status, setStatus] = useState(true)
    const [mobileno, setMobileno] = useState('')
    const [emailId, setEmailId] = useState('')
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    var navigate = useNavigate()
    var dispatch=useDispatch()


    const handleSubmit = async () => {
        if (props.otp == otp) {
            var body={mobileno:props.mobileno,emailid:emailId,username:(firstname+" "+lastname)}
            var result= await postData('users/submit_user',body)
            if(result.status)
            {
                Swal.fire({
                    position: "bottom-right",
                    icon: "success",
                    title: "You are registered now...",
                    showConfirmButton: false,
                    timer: 1500,
                    toast:true
                  });
                  dispatch({type:'ADD_USER',payload:[props.mobileno,body]})
                  navigate('/cart')
            }
            
            
        }
        else
        {
            alert ("Invalid OTP...")
        }

    }
    return (
        <div >


            <Grid container item xs={12} style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', fontFamily: 'serif' }} >

                {status ? <Paper item xs={12} fullWidth elevation={8} style={{ width: 400, marginTop: '15%', boxShadow: '15px solid black', borderRadius: 18, padding: 15 }}>
                    {/* <Grid item xs={5} spacing={3} style={{ display: 'flex', alignItems: 'center', textAlign: 'left', flexDirection: 'column',boxShadow:'2px gery solid' }}> */}

                    <Grid item xs={12} >
                        <div style={{ fontWeight: 'bolder', fontSize: 30, display: 'flex', alignItems: 'center', }}>
                            Welcome to MedBazzar
                        </div>
                        <div style={{ marginTop: '1%', color: 'grey', fontSize: 12 }}>
                            Please enter your details for a better shopping experience

                        </div>

                    </Grid>

                    <Grid item xs={12} style={{ display: 'flex', marginTop: '2%', justifyContent: 'flex-start' }}>

                        <TextField fullWidth id="standard-basic" label="Enter First Name" onChange={(e) => setFirstName(e.target.value)} variant="standard" style={{ color: '#fff', caretColor: 'red' }} />
                    </Grid>
                    <Grid item xs={12} style={{ border: 'none', outline: 'none', textAlign: 'left' }}>
                        <TextField fullWidth id="standard-basic" onChange={(e) => setLastName(e.target.value)} label="Enter Last Name (optional)" variant="standard" />
                    </Grid>
                    <Grid item xs={12} style={{ border: 'none', outline: 'none', textAlign: 'left' }}>
                        <TextField fullWidth id="standard-basic" onChange={(e) => setEmailId(e.target.value)} label="Enter Email (optional)" variant="standard" />
                    </Grid>

                    <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '3%' }}>

                        <Grid item xs={8} style={{ display: 'flex', alignItems: 'center', fontSize: 12, marginBottom: '5%' }} fullWidth>

                            <WhatsAppIcon style={{ color: 'green', width: 40, height: 40 }} />
                            Enable order updates & important information on Whatsapp

                        </Grid>
                        <Grid item xs={2} fullWidth style={{ display: 'flex', justifyContent: 'flex-end' }}>

                            <Checkbox />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} >
                        <div style={{ fontWeight: 'bolder', fontSize: 30, display: 'flex', alignItems: 'center', }}>
                            Verify Phone Number
                        </div>
                        <div style={{ marginTop: '3%', color: 'grey' }} >
                            An SMS with 6-digit OTP was sent to

                        </div>
                        <div style={{ marginTop: '3%', fontWeight: 'bold', fontSize: 12 }} >
                            +91 {props.mobileno} <span style={{ color: '#0c5273', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => setStatus(!status)}  >Change</span>


                        </div>


                    </Grid>
                    <Grid item xs={12}>
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={4}
                            renderSeparator={<span>-</span>}
                            renderInput={(props) => <input {...props} />}
                            inputStyle={{ width: 40, height: 40, margin: 5, marginTop: 20 }}
                        />
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: 'right' }}>

                        < Countdown date={Date.now() + 3000} >
                            <Completionist />
                        </Countdown>
                    </Grid>

                    <Grid item xs={12} style={{ display: 'flex' }} fullWidth>
                        <Button variant="contained" fullWidth style={{ marginTop: '15%', padding: 12, borderRadius: 25, width: '100%' }} onClick={handleSubmit} >Get Started</Button>
                    </Grid>
                    <Grid item xs={12} style={{ display: 'flex', fontWeight: 'bold', justifyContent: 'center', fontSize: 13, marginTop: '1%' }}>
                        <p> By continuing, you agree to our<span style={{ color: '#0c5273' }}> Terms of Service</span> and<span style={{ color: '#0c5273' }}> Privacy & Legal Policy</span></p>

                    </Grid>

                </Paper> : <LoginOtp />}

            </Grid>


            {/* </Grid> */}
        </div>
    )
}