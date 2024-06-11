import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { postData } from '../../Services/FetchNodeServices';
import { ElderlySharp } from '@mui/icons-material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
 
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
const defaultTheme = createTheme();
export default function AdminRegistration() {

    const [picture, setPicture] = useState({ file: '', bytes: '' })
    const [mobileno, setMobileno] = useState('')
    const [emailid, setEmailid] = useState('')
    const [adminname, setAdminname] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
  
    
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    var navigate = useNavigate()
    const handlePicture = (event) => {

        setPicture({ file: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })

    }

    const handleClick = (label, msg) => {


    }
    
    function Copyright(props) {

        return (
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
                {'Copyright © '}
                <Link color="inherit" href="http://localhost:3000/home">
                    MedBazzar.in
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const handleSubmit = async () => {
        var formData = new FormData()
        // var body ={emailid:emailid,mobileno:mobileno,adminname:adminname,picture:picture,bytes}
        formData.append('emailid', emailid)
        formData.append('adminname', adminname)
        formData.append('password', password)
        formData.append('mobileno', mobileno)
         

        formData.append('picture', picture.bytes)

        var result = await postData('adminlogin/submit_admin_data', formData)

        console.log("DSF",result)
        alert(result.status)
        if (result.status == true) {
            alert("Admin Registered")
        }

        else {
            alert("Fail")
        }

    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    

    return (
        <Grid container style={{ background: 'rgb(205 239 255)' }}>
            {matches?
            <Grid xs={false} md={7} sm={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {/* <div style={{}}> */}
                <img src="admin.webp" style={{ width: "95%", height: '90%', marginLeft: '2%' }} />
                {/* </div> */}
            </Grid>:
            <div></div>}
            <Grid sm={12} md={5} style={{display:'flex',justifyContent:'center'}}>

                <ThemeProvider theme={defaultTheme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',

                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5" style={{ color: '#000' }}>
                                Registration
                            </Typography>
                            <Box sx={{ mt: 1 }}>
                          
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="emailid"
                                    label="Email Address"
                                    name="email"
                                    value={emailid}
                                    autoComplete="email"
                                    autoFocus
                                onChange={(e)=>setEmailid(e.target.value)}
                                />
                                  <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="adminname"
                                    label="Name"
                                    name="adminname"
                                    value={adminname}
                                    autoComplete="text"
                                    autoFocus
                                    
                                onChange={(e)=>setAdminname(e.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="mobileno"
                                    label="Mobile Number"
                                    name="mobileno"
                                    type="number"
                                    value={mobileno}
                                    autoComplete="number"
                                    autoFocus
                                onChange={(e)=>setMobileno(e.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"

                                    value={password}
                                    autoComplete="current-password"
                                onChange={(e)=>setPassword(e.target.value)}
                                
                            
                                />
                         <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" onClick={togglePasswordVisibility} > {showPassword ? 'Hide' : 'Show'}</Checkbox>}
                                    label="Show Password"
                                />
                                    
                                <Grid xs={12} style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                    <Grid xs={6} fullWidth style={{ width: '100%' }}>
                                        {/* <Button
                                    // onClick={handleClick}
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    width={'100%'}
                                >Upload
                                    <input onChange={handlePicture} onClick={handleClick} type='file' hidden accept="images/*" />

                                </Button> */}
                                        <Button
                                            component="label"
                                            role={undefined}
                                            variant="contained"
                                            tabIndex={-1}
                                            startIcon={<CloudUploadIcon />}
                                            onChange={handlePicture} onClick={handleClick}
                                            id="picture"
                                        >
                                            Upload Picture
                                            <VisuallyHiddenInput type="file" />
                                        </Button>

                                    </Grid>
                                    <Grid xs={6} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                        <Avatar alt="Remy Sharp" src={picture.file} variant="rounded" />
                                    </Grid>

                                </Grid>

                                <Button
                                    // onClick={handleClick}
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={handleSubmit}
                                >
                                    Register
                                </Button>

                            </Box>
                            <Link style={{ cursor: 'pointer', textAlign: 'center', fontSize: 15, display: 'flex', justifyContent: 'center' }} onClick={() => navigate('/adminlogin')}>
                            Already Registered</Link>
                        <Copyright sx={{ mt: 3 }} />
                        </Box>
                       
                    </Container>
                </ThemeProvider>
            </Grid>
        </Grid>
    )
}