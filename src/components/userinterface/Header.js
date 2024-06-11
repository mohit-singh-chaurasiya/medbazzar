import { AppBar, Box, Toolbar, Typography, Button, IconButton, Grid } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import mainlogo from '../../../src/assets/MedBazzar-Logo.png'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';


import Drawer from '@mui/material/Drawer';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import Avatar from '@mui/material/Avatar';

import { useStyles } from '../../screen/userinterface/HomeCss'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import DashboardIcon from '@mui/icons-material/Dashboard';

import { useNavigate } from "react-router-dom";
import { getData, postData, serverURL } from "../../Services/FetchNodeServices";
import MaterialTable from "@material-table/core";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useState } from "react";
import Badge from '@mui/material/Badge';
import { UseSelector, useSelector } from "react-redux";
import ShowCartProducts from "./ShowCartProducts";
import LoginScreen from "../../screen/userinterface/LoginScreen";
import UserHeader from "./UserHeader";
import LoginIcon from '@mui/icons-material/Login';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import Swal from "sweetalert2";

import Stack from '@mui/material/Stack';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}
export default function Header(props) {
  var products = useSelector((state) => state.data)


  var keys = Object?.keys(products)

  // console.log(keys.length+"HHH")
  const classes = useStyles()
  const navigate = useNavigate()
  const [status, setStatus] = useState(false)
  const [pattern, setPattern] = useState('')
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [isOpen, setIsOpen] = useState(false)
  const [isStatus, setIsStatus] = useState(false)
  const [userAddress, setUserAddress] = useState('')

  // var userData = Object.values(useSelector(state => state.user))[0]

  var products = useSelector((state) => state.data)
  var user = useSelector((state) => state.user)
  var keys = Object?.keys(products)
  var userData = ''
  var userInformation = ''
  try {
    userData = Object.values(user)[0].username.split(' ')
    userData = userData[0]
    userInformation = Object.values(user)[0].username.split({})
    userInformation=userInformation[0]

  }
  catch (e) { }

  const handleDrawer = () => {
    setStatus(true)
  }

  const handleClose = () => {
    setStatus(false)
  }
  const showCartDetails = () => {

    setIsOpen(true)

  }

  const showUserDetails = () => {
    setIsStatus(true)
  }

  const hideCartDetails = () => {

    setIsOpen(false)
    setIsStatus(false)

  }

  const handleUser = () => {
    if (userData?.length != 0) {
      navigate('/order')
      console.log("arrr", props?.userAddress)
    }
    else {



    }
  }

  const handleLogin = () => {
    if (userData?.length == 0) {
      navigate('/loginscreen')


    }
    else {


    }
  }

  useEffect(function () {

  }, [userData?.mobileno, props?.pageReferesh])

  const handleLogout = () => {
    if (userData?.length != 0) {
      //logout method
      navigate('/home')
    }
  }
  const handleFilterPage = () => {
    navigate(`/filterdetails/${pattern}`)
  }

  const handleEnterKey = (e) => {
    if (e.key == 'Enter')
      navigate(`/filterdetails/${e.target.value}`)
  }




  // const hideUserDetails=()=>{

  //   setIsStatus(false)
  // }


  const DrawerList = () => {
    return (
      <Paper >
        <div className={classes.leftBarStyle}>
          {userData != 0 ?
           
           <Avatar alt="Remy Sharp" variant="rounded" style={{ borderRadius: 20 }} />
:
          <div></div>}
          {userData != 0 ?  
          
         <div style={{fontWeight:'bold',color:'#000'}}>{userInformation}</div>:
         <div></div>}
          
          
        
          {/* <Stack direction="row" spacing={2}> <Avatar {...stringAvatar("Jack Singh")} /></Stack> */}
        </div>
        <div className={classes.menuStyle}>
          <List>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/order')}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary={<span className={classes.menuItemStyle}> Your Order List</span>} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/')} style={{ color: '#000' }}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={<span className={classes.menuItemStyle}> View Users</span>} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding >
              <ListItemButton onClick={() => navigate('/cart')}>
                <ListItemIcon>
                  <ShoppingCartIcon style={{ color: 'darkgreen' }} />
                </ListItemIcon>
                <ListItemText primary={<span className={classes.menuItemStyle}>Cart</span>} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding >
              <ListItemButton onClick={handleLogin}>
                <ListItemIcon>
                  <LoginIcon style={{ color: 'darkblue' }} />
                </ListItemIcon>
                <ListItemText primary={<span className={classes.menuItemStyle}>Login</span>} />
              </ListItemButton>
            </ListItem>


            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <ExitToAppIcon style={{ color: 'red' }} />
                </ListItemIcon>
                <ListItemText primary={<span className={classes.menuItemStyle}>Logout</span>} />
              </ListItemButton>
            </ListItem>
          </List>
        </div>
      </Paper>
    )
  }
  const secondarySearchBar = () => {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar style={{ background: '#fff' }} position="static">
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
            <MenuOutlinedIcon onClick={handleDrawer} style={{ fontSize: 30, color: '#000' }} userInformation={userInformation} />

            {searchBarComponent()}
            <div style={{ display: 'flex', width: 70, justifyContent: 'space-between' }}>
              <div style={{ width: '100%', fontSize: '2vw', color: '#000', fontWeight: 'bolder', textAlign: 'center', display: 'flex', alignItems: 'center' }}>{userData}</div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <PermIdentityOutlinedIcon userAddress={props?.userAddress} setUserAddress={props?.setUserAddress} onClick={handleUser} /*onMouseOver={showUserDetails}*/ style={{ fontSize: 30, color: '#000', cursor: 'pointer' }} />
              </div>
              <LoginIcon style={{ fontSize: 30, color: '#000', cursor: 'pointer', marginRight: '5%' }} onClick={handleLogin} />
            </div>
          </Toolbar>
        </AppBar><div>

        </div>

      </Box>)


  }
  console.log(props?.userAddress)

  const searchBarComponent = () => {

    return (
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '60%', margin: 0.6 }}>
        <IconButton sx={{ p: '10px' }} aria-label="menu">

        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Products"
          inputProps={{ 'aria-label': 'search google maps' }}
          onChange={(e) => setPattern(e.target.value)}
          onKeyDown={(e) => handleEnterKey(e)}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon onClick={handleFilterPage} />
        </IconButton>

      </Paper>
    );
  }
  return (<Box sx={{ flexGrow: 1, position: 'relative' }} onMouseLeave={hideCartDetails} >
    <AppBar style={{ background: '#fff' }} position="static">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <img src={mainlogo} onClick={() => navigate("/home")} style={{ width: 150, cursor: "pointer" }} />
        {!matches ? searchBarComponent() : <div></div>}

        <div style={{ display: 'flex', width: !matches ? 180 : 50, justifyContent: 'space-between' }}>


          {!matches ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ fontSize: '1vw', color: '#000', fontWeight: 'bold', }}>
                {userData}
              </div>
              <PermIdentityOutlinedIcon onClick={handleUser} /*onMouseOver={showUserDetails}*/ style={{ fontSize: 30, color: '#000', cursor: 'pointer' }} />

            </div>

          </div> : <div></div>}
          {/* <div style={{display:'flex'}}> */}
          <Badge badgeContent={keys?.length} color="primary">
            <ShoppingCartOutlinedIcon onMouseOver={showCartDetails} onClick={() => navigate('/cart')} style={{ fontSize: 30, color: '#000', cursor: 'pointer', }} />
          </Badge>

          {!matches ? <div>


            <LoginIcon style={{ fontSize: 30, color: '#000', marginLeft: '40%', cursor: 'pointer', }} onClick={handleLogin} />

          </div> : <div></div>}

          {/* </div>   */}
        </div>
      </Toolbar>
    </AppBar>
    <div>
      {matches ? secondarySearchBar() : <div></div>}

    </div>
    <Drawer
      anchor={'left'}
      open={status}
      onClose={handleClose}
    >
      {DrawerList()}

    </Drawer>
    <ShowCartProducts isOpen={isOpen} />
    <UserHeader isStatus={isStatus} />

  </Box>
  )
}