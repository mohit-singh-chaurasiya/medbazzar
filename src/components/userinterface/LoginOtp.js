import { Grid, Paper, Input, TextField, Button, InputAdornment, TextDecoder, Dialog } from "@mui/material";
import OtpInput from 'react-otp-input';
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"
import { HandymanOutlined } from "@mui/icons-material";
import LoginVerify from "./LoginVerify";
import { postData } from "../../Services/FetchNodeServices";
import UserDetails from "./UserDetails";
import { useDispatch } from "react-redux";
export default function LoginOtp(props) {
    const [status, setStatus] = useState(true)
    const [userStatus, setUserStatus] = useState(false)
    // const [isOpen, setIsOpen] = useState(false)
    const [otp, setOtp] = useState(0)
    const [mobileno, setMobileno] = useState("")
    const [userData,setUserData]=useState([])


    var dispatch = useDispatch()


    const handleStatus = () => {
        setStatus(true)



    }
    const handleOTP = async () => {
        var result = await postData('users/check_userdata', { mobileno: mobileno })
        if (result.status == false) {

            generateOTP()
            setStatus(!status)
            setUserStatus(false)
        }

        else {


            generateOTP()
            setStatus(!status)
            setUserStatus(true)
            setUserData(result.data)
           

        }

    }
    const generateOTP = () => {
        var myotp = parseInt(Math.random() * 1899) + 1000

        // alert("OTP",myotp)
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: myotp,
            showConfirmButton: false,
            timer: 2200,
            toast: true,
            width:230,
            background: "#00391c",
            color: "#fff",

            
        });
        
        setOtp(myotp)
        
    }


    const handlePhoneSubmit = (e) => {
        e.preventDefault()

        //phone verification

        const regex = /[^0-9]/g
        if (mobileno.length < 10 || mobileno.length > 10 || regex.test(mobileno)) {
            {
                Swal.fire({
                    position: "top-end",
                    icon: "warning",
                    title: "Invalid Mobile No..",
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true,
                    width: "20%",
                    background: "#00391c",
                    color: "#fff",
                });
                return;
            }
        }
        else {

            //call backend API
            //show OTP
            setStatus(true)
        }

        handleOTP()


    }
   





    return (<div>

        <Grid item xs={12} spacing={3} style={{ display: 'flex', fontFamily: 'serif', alignItems: 'center', justifyContent: 'space-around' }} >
            {status ? <Paper item xs={12} fullWidth elevation={8} style={{ width: '70%', marginTop: '15%', boxShadow: '5px solid black', borderRadius: 18, padding: 15 }}>
                {/* <div style={{ margin: 10 }}> */}
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', fontFamily: 'serif', alignItems: 'left', marginTop: '8%', flexDirection: 'column', }}   >
                    <div style={{ fontSize: 32, fontWeight: 'bolder', textAlign: 'center', flexDirection: 'row' }}>SignIn to MedBazzar</div>
                    <div style={{ textAlign: 'center' }}>to access your Addresses, Orders & Wishlist.</div>
                </Grid>
                <Grid item xs={12} fullWidth  >
                    <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: 25, }}>
                        <Input fullWidth style={{ margin: 20 }} value={mobileno} onChange={(e) => setMobileno(e.target.value)} placeholder="Enter Your Mobile Number" id="standard-adornment-amount" startAdornment={<InputAdornment position="start" >+91 -</InputAdornment>} />


                    </div>

                </Grid>





                <Grid item xs={12} style={{ textAlign: 'center', margin: 20 }} >

                    <Button variant="contained" fullWidth style={{ marginTop: 100, padding: 12, borderRadius: 20, background: '#b6cbd5' }} onClick={handlePhoneSubmit}   >Get OTP</Button>

                </Grid>



                <Grid item xs={12} style={{ display: 'flex', fontWeight: 'bold', justifyContent: 'center', fontSize: 13, marginTop: '1%' }}>
                    <p> By continuing, you agree to our<span style={{ color: '#0c5273' }}> Terms of Service</span> and<span style={{ color: '#0c5273' }}> Privacy & Legal Policy</span></p>

                </Grid>
                {/* </div> */}
            </Paper> : userStatus ? <LoginVerify mobileno={mobileno} otp={otp} userData={userData} /> : <UserDetails mobileno={mobileno} otp={otp} />}

        </Grid>



    </div >)
}