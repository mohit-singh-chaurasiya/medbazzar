import { useState } from "react";
import { useStyles } from "./AdminDashboardCss";
import { Avatar, AppBar, Box, Toolbar, IconButton, Typography, Grid, Paper, Button } from "@mui/material";
import InputBase from '@mui/material/InputBase';

import CategoryIcon from '@mui/icons-material/Category';
import ExtensionIcon from '@mui/icons-material/Extension';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import MedicationIcon from '@mui/icons-material/Medication';
import NoteIcon from '@mui/icons-material/Note';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getData, postData, serverURL } from "../../Services/FetchNodeServices";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Categories from "./Categories";
import DisplayAllCategory from "./DisplayAllCategory";
import Brands from "./Brands"
import DisplayAllBrands from "./DisplayAllBrands";
import SubCategory from "./SubCategory";
import DisplayAllSubCategory from "./DisplayAllSubCategory";
import Products from "./Products";
import DisplayAllProducts from "./DisplayAllProducts"
import ProductDetails from "./ProductDetails";
import DisplayProductDetails from "./DisplayProductDetails";
import Banners from "./Banners";
import Concern from "./Concern";
import DisplayAllConcern from "./DisplayAllConcern";
import DisplayUsers from "./DisplayUsers";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import SearchIcon from '@mui/icons-material/Search';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import { useEffect } from "react";
import Dashboard from "./Dashboard";
//import Summary from "./Summary";
//import Chart from "../../components/DashboardComponent/Chart";
import mainlogo from "../../assets/MedBazzar-Logo.png"
import EqualizerIcon from '@mui/icons-material/Equalizer';
 

export default function AdminDashboard(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  var adminData = JSON.parse(localStorage.getItem('ADMIN'))
  const [status, setStatus] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const [pattern, setPattern] = useState('')
  const [color, setColor] = useState('light');
  const [darkMode,setDarkMode]=useState('dark')
  const [lightMode,setLightMode]=useState('')


  console.log(DisplayAllCategory())

  const handleClose = () => {
    setStatus(false)
  }
  const handleDrawer = () => {
    setStatus(true)
  }

 
  
  

  const secondaryHeader = () => {
    return (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <AppBar position="sticky">
        <Toolbar variant="dense">

          <Drawer
            anchor={'left'}
            open={status}
            onClose={handleClose}

          >
            {secondDashboard()}

          </Drawer>


          <Typography variant="h6" color="inherit" component="div" style={{ fontWeight: 'bold' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#000' }}>
              <MenuIcon onClick={handleDrawer} style={{ marginRight: '3%', cursor: 'pointer' }} />
              <div style={{ width: 150, display: 'flex', color: '#000', width: 200 }}>
                <img src={mainlogo} style={{ width: '70%', borderRadius: 5, marginRight: 5 }} />
               
              </div>

            </div>


          </Typography>
        </Toolbar>
      </AppBar>
    </div>)
  }

  const secondDashboard = () => {
    return (<div style={{ background: "#dff9fb", color: '#1B1464'}}>

      <div className={classes.leftBarStyle}>
        <img src={`${serverURL}/images/${adminData.picture}`} style={{ width: 70, height: 70, borderRadius: 35 }} />
        <div className={classes.nameStyle}>{adminData.adminname}</div>
        <div className={classes.emailStyle}>{adminData.emailid}</div>
        <div className={classes.phoneStyle}>{adminData.mobileno}</div>
      </div>
      <div className={classes.menuStyle}>
        <List>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton >
              <ListItemIcon>
                <EqualizerIcon style={{ color: "#0984e3" }} />
              </ListItemIcon>
              <ListItemText primary={<span className={classes.menuItemStyle}>Overview</span>} />
            </ListItemButton>
          </ListItem>


          <ListItem disablePadding >
            <ListItemButton onClick={() => navigate('/admindashboard/displayallcategory')}>
              <ListItemIcon>
                <CategoryIcon style={{ color: '#ff9f43' }} />
              </ListItemIcon>
              <ListItemText primary={<span className={classes.menuItemStyle}>Category List</span>} />
            </ListItemButton>
          </ListItem>


          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/admindashboard/displayallsubcategory')} >
              <ListItemIcon>
                <CategoryIcon style={{ color: '#ee5253' }} />
              </ListItemIcon>
              <ListItemText primary={<span className={classes.menuItemStyle}>SubCategory List</span>} />
            </ListItemButton>
          </ListItem>


          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/admindashboard/displayallbrands')} >
              <ListItemIcon>
                <ExtensionIcon style={{ color: '#c23616' }} />
              </ListItemIcon>
              <ListItemText primary={<span className={classes.menuItemStyle}>Brands List</span>} />
            </ListItemButton>
          </ListItem>


          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/admindashboard/displayallproducts')}>
              <ListItemIcon>
                <ProductionQuantityLimitsIcon style={{ color: '#1289A7' }} />
              </ListItemIcon>
              <ListItemText primary={<span className={classes.menuItemStyle}>Products List</span>} />
            </ListItemButton>
          </ListItem>


          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/admindashboard/displayproductdetails')}>
              <ListItemIcon>
                <DraftsIcon style={{ color: '#c23616' }} />
              </ListItemIcon>
              <ListItemText primary={<span className={classes.menuItemStyle}>ProductDetails List</span>} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/admindashboard/displayallconcern')}>
              <ListItemIcon>
                <MedicationIcon style={{ color: '#ff3838' }} />
              </ListItemIcon>
              <ListItemText primary={<span className={classes.menuItemStyle}>Concern</span>} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/admindashboard/banners')}>
              <ListItemIcon>
                <NoteIcon style={{ color: '#ffaf40' }} />
              </ListItemIcon>
              <ListItemText primary={<span className={classes.menuItemStyle}>Banners</span>} />
            </ListItemButton>
          </ListItem>


          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/admindashboard/displayuser')}>
              <ListItemIcon>
                <GroupIcon style={{ color: "blue" }} />
              </ListItemIcon>
              <ListItemText primary={<span className={classes.menuItemStyle}>Users</span>} />
            </ListItemButton>
          </ListItem>


          <Divider />
          <ListItem disablePadding>
            <ListItemButton >
              <ListItemIcon>
                <LogoutIcon style={{ color: '#000' }} />
              </ListItemIcon>
              <ListItemText primary={<span className={classes.menuItemStyle}>Logout</span>} />
            </ListItemButton>
          </ListItem>
        </List>
      </div>

    </div>)
  }


  

  const searchBarComponent = () => {

    return (
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "60%", height: 35, margin: 0.6, borderRadius: 6 }}>
        <IconButton sx={{ p: '10px' }} aria-label="menu">

        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search here"
          inputProps={{ 'aria-label': 'search google maps' }}
          onChange={(e) => setPattern(e.target.value)}
        // onKeyDown={(e) => handleEnterKey(e)}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>

      </Paper>
    );
  }

  const  DarkMode =()=>{
    const setDarkMode=()=>{
      document.querySelector("body").setAttribute('data-theme','dark')
    }
    const setLghtMode=()=>{
      document.querySelector("body").setAttribute('data-theme','light')
    }
 
  }
  
  return (

    <Box sx={{ flexGrow: 1 }} >
      {matches ?
        <AppBar position="sticky" style={{ background: "grey" }}>
          <Toolbar variant="dense">



            <Typography variant="h6" color="inherit" component="div" style={{ textDecoration: "underline", textDecorationColor: "red", fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 150, display: 'flex', color: '#000', width: 200 }}>
                <img src={mainlogo} style={{ width: '70%', borderRadius: 5, marginRight: 5 }} />
               
              </div>

            


            </Typography>
            {/* <div style={{ marginLeft: 50 }}> */}
            {/* {searchBarComponent()} */}

            <div style={{ marginLeft: '8%', display: 'flex', alignItems: 'center', width: "98%", justifyContent: 'end' }}>
              {/* <Button style={{ color: "#000", borderRadius: 50 }}  onClick={DarkMode}>
            
              <WbSunnyOutlinedIcon style={{ color: "#000", }} />
              
                
              
              </Button> */}


             
              <Button style={{ color: "#000", borderRadius: 50 }}>
                <Badge badgeContent={12} color="primary">
                  <NotificationsIcon onClick={() => navigate('/order')} style={{ color: "#000", }} /> 
                </Badge>
              </Button>
              <Button style={{ color: "#000", borderRadius: 50 }}>
                <LogoutIcon style={{ color: "#000", }} onClick={() => navigate('/adminlogin')} />
              </Button>
            </div>


          </Toolbar>
        </AppBar> :
        <div>{secondaryHeader()}</div>}

      <Grid container style={{ paddingInlineStart: 5, }} >
        {matches ?
          <Grid item md={2.2} style={{ background: "#dff9fb", color: '#1B1464' ,height:"100vh"}} >
            {/* <Paper > */}
            <div className={classes.leftBarStyle}>
              <img src={`${serverURL}/images/${adminData.picture}`} style={{ width: 70, height: 70, borderRadius: 35, border: "1px solid blue" }} />
              <div className={classes.nameStyle}>{adminData.adminname}</div>
              <div className={classes.emailStyle}>{adminData.emailid}</div>
              <div className={classes.phoneStyle}>{adminData.mobileno}</div>
            </div>
            <div className={classes.menuStyle}>
              <List>
                <Divider />
                <ListItem disablePadding>
                  <ListItemButton onClick={() => navigate('/admindashboard/dashboard')} >
                    <ListItemIcon>
                      <EqualizerIcon style={{ color: "#0984e3" }} />
                    </ListItemIcon>
                    <ListItemText primary={<span className={classes.menuItemStyle}>Overview</span>} />
                  </ListItemButton>
                </ListItem>


                <ListItem disablePadding >
                  <ListItemButton onClick={() => navigate('/admindashboard/displayallcategory')}>
                    <ListItemIcon>
                      <CategoryIcon style={{ color: '#ff9f43' }} />
                    </ListItemIcon>
                    <ListItemText primary={<span className={classes.menuItemStyle}>Category List</span>} />
                  </ListItemButton>
                </ListItem>


                <ListItem disablePadding>
                  <ListItemButton onClick={() => navigate('/admindashboard/displayallsubcategory')} >
                    <ListItemIcon>
                      <CategoryIcon style={{ color: '#ee5253' }} />
                    </ListItemIcon>
                    <ListItemText primary={<span className={classes.menuItemStyle}>SubCategory List</span>} />
                  </ListItemButton>
                </ListItem>


                <ListItem disablePadding>
                  <ListItemButton onClick={() => navigate('/admindashboard/displayallbrands')} >
                    <ListItemIcon>
                      <ExtensionIcon style={{ color: '#c23616' }} />
                    </ListItemIcon>
                    <ListItemText primary={<span className={classes.menuItemStyle}>Brands List</span>} />
                  </ListItemButton>
                </ListItem>


                <ListItem disablePadding>
                  <ListItemButton onClick={() => navigate('/admindashboard/displayallproducts')}>
                    <ListItemIcon>
                      <ProductionQuantityLimitsIcon style={{ color: '#1289A7' }} />
                    </ListItemIcon>
                    <ListItemText primary={<span className={classes.menuItemStyle}>Products List</span>} />
                  </ListItemButton>
                </ListItem>


                <ListItem disablePadding>
                  <ListItemButton onClick={() => navigate('/admindashboard/displayproductdetails')}>
                    <ListItemIcon>
                      <DraftsIcon style={{ color: '#c23616' }} />
                    </ListItemIcon>
                    <ListItemText primary={<span className={classes.menuItemStyle}>ProductDetails List</span>} />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton onClick={() => navigate('/admindashboard/displayallconcern')}>
                    <ListItemIcon>
                      <MedicationIcon style={{ color: '#ff3838' }} />
                    </ListItemIcon>
                    <ListItemText primary={<span className={classes.menuItemStyle}>Concern</span>} />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton onClick={() => navigate('/admindashboard/banners')}>
                    <ListItemIcon>
                      <NoteIcon style={{ color: '#ffaf40' }} />
                    </ListItemIcon>
                    <ListItemText primary={<span className={classes.menuItemStyle}>Banners</span>} />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton onClick={() => navigate('/admindashboard/displayuser')}>
                    <ListItemIcon>
                      <GroupIcon style={{ color: "blue" }} />
                    </ListItemIcon>
                    <ListItemText primary={<span className={classes.menuItemStyle}>Users</span>} />
                  </ListItemButton>
                </ListItem>


                <Divider />
                <ListItem disablePadding>
                  <ListItemButton >
                    <ListItemIcon>
                      <LogoutIcon style={{ color: '#000' }} />
                    </ListItemIcon>
                    <ListItemText primary={<span className={classes.menuItemStyle}>Logout</span>} />
                  </ListItemButton>
                </ListItem>
              </List>
            </div>
            {/* </Paper> */}


          </Grid>
          :
          <div>

          </div>}

        <Grid item xs={12} md={9.8} style={{ padding: 20,background:"" }}>


          <Routes>

            <Route element={< Categories />} path={'/category'} ></Route>
            <Route element={< DisplayAllCategory />} path={'/displayallcategory'} ></Route>
            <Route element={< Brands />} path={'/brands'}></Route>
            <Route element={< DisplayAllBrands />} path={'/displayallbrands'} />
            <Route element={< SubCategory />} path='/subcategory' />
            <Route element={< DisplayAllSubCategory />} path='/displayallsubcategory' />
            <Route element={< Products />} path='/products' />
            <Route element={< DisplayAllProducts />} path='/displayallproducts' />
            <Route element={< ProductDetails />} path='/productdetails' />
            <Route element={< DisplayProductDetails />} path='/displayproductdetails' />
            <Route element={< Banners />} path='/banners' />
            <Route element={< Concern />} path='/concern' />
            <Route element={< DisplayAllConcern />} path='/displayallconcern' />
            <Route element={<DisplayUsers />} path='/displayuser' />
            <Route element={<Dashboard />} path='/dashboard' />

          </Routes>


        </Grid>
      </Grid>


    </Box>
  )
}