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
import { ElderlySharp, LineWeight } from '@mui/icons-material';
import AdminRegistration from './AdminRegistration';


import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function AdminLogin() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
   
    var navigate = useNavigate()
    const [emailid, setEmailid] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('')


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };


    const handleClick = async () => {
        var result = await postData('adminlogin/check_admin_login', { emailid,  password })
        if (result.status) {
            localStorage.setItem('ADMIN', JSON.stringify(result.data))

            navigate('/admindashboard/dashboard ')
        }
        else {
            Swal.fire({
                icon: "warning",
                title: result.message,
                timer: 1500,
                toast: true
            });
        }

    }


     
    return (

        <Grid container style={{ background: 'rgb(141 217 253)', height: "100%" }}>
            {matches?
            <Grid xs={false} md={7} sm={4}  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , background: 'rgb(141 217 253)'}}>
                <img src="login.jpg" style={{ width: "95%", height: '98%', marginLeft: '2%', marginTop: '3%' }} />
            </Grid>:
            <div></div>}
            <Grid sm={12} md={5} style={{ height: "100vh", }}>
                <ThemeProvider theme={defaultTheme}>
                    <Container component="main" maxWidth="xs" >
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                // border: 'solid 2px #00000021',
                                background: 'rgb(141 217 253)'

                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <Box sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    // value={emailid}
                                    autoComplete="email"
                                    autoFocus
                                    onChange={(e) => setEmailid(e.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    // name="password"
                                    label="Password"
                                    // type="password"
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    // value={password}
                                    // autoComplete="current-password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />   
                              
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" onClick={togglePasswordVisibility} > {showPassword ? 'Hide' : 'Show'}</Checkbox>}
                                    label="Show Password"
                                />

                                <Button
                                    onClick={handleClick}
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>

                            </Box>
                            <Link style={{ cursor: 'pointer', textAlign: 'center', fontSize: 15 }} onClick={() => navigate('/register')}>
                                Don't have an account? Sign Up</Link>
                            <Copyright sx={{ mt: 3 }} />
                        </Box>

                    </Container>
                </ThemeProvider>
            </Grid>
        </Grid>
    );
}

