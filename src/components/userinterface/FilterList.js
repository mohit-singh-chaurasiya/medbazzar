import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React from 'react';
import { useState, useEffect } from "react";
import { getData } from '../../Services/FetchNodeServices';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { AppBar, Box, Toolbar, Typography, Button, IconButton } from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';
import { postData } from '../../Services/FetchNodeServices';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';
import FormControlLabel from '@mui/material/FormControlLabel';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function FilterList(props) {
  const [categoryList, setCategoryList] = useState([])
  const [brandList, setBrandList] = useState([])
  const [subCategoryList, setSubCategoryList] = useState([])
  const [categoryId, setCategoryId] = useState('')
  const [anchorEl, setAnchorEl] = useState(null);
  const [pattern, setPattern] = useState('')
  var navigate = useNavigate()
  const fetchAllCategory = async () => {
    var result = await getData('userinterface/show_all_category')
    if (result.status) {
      setCategoryList(result.data)
    }
  }
  useEffect(function () { fetchAllCategory() }, [])


  const fetchAllSubCategory = async (cid) => {
    var result = await postData('subcategory/fetch_all_subcategory_by_categoryid', { categoryid: cid })
    if (result.status) {
      //  alert(JSON.stringify(result.data))
      setSubCategoryList(result.data)
    }

  }
  useEffect(function () { fetchAllSubCategory() }, [])

  const handleSubCategory = (categoryid, event) => {
    fetchAllSubCategory(categoryid)
    setAnchorEl(event.currentTarget)

  }



  const fillAllSubCategory = () => {
    return subCategoryList.map((item) => {

      return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
    })
  }





  const showAllCategory = () => {
    return categoryList.map((item) => {

      return <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            value={item.categoryid}
            onClick={(event) => handleSubCategory(item.categoryid, event)}
            
          >
            {item.categoryname}
          </AccordionSummary>
          <AccordionDetails>
            {fillAllSubCategory()}
          </AccordionDetails>
        </Accordion>
      </div>


    })
  }
  const handleFilterPage = () => {
    navigate(`/filterdetails/${pattern}`)
  }

  const handleEnterKey = (e) => {
    if (e.key == 'Enter')
      navigate(`/filterdetails/${e.target.value}`)
  }

  const fetchAllBrand = async () => {
    var result = await getData('brand/display_all_brand')
    if (result.status) {
      setBrandList(result.data)
    }
  }
  useEffect(function () { fetchAllBrand() }, [])

  const showAllBrands = () => {
    return brandList.map((item) => {
      return <MenuItem value={item.brandid}> <span> <FormControlLabel control={<Checkbox />} /></span>
        {item.brandname}

      </MenuItem>
    })
  }

  const showAllBrand = () => {
    return brandList.map((item) => {
      return <div style={{ color: '#000' }}>  <Checkbox {...label} />{item.brandname}</div>
    })
  }

  return (
    <Grid spacing={1} container style={{ background: '#fff', margin: '1%', width: '100%', boxShadow: "2px solid " }} >

      <div style={{ margin: 10, width: '100%' }}>

        <Grid style={{ margin: '3px ', fontWeight: 'bold', fontSize: 20, height: 45, width: '92%', borderRadius: 5, display: 'flex', alignItems: 'center', background: '#fff' }}>
          {props?.title}
        </Grid>

        {/* 
              <ListItem>
                <Grid item xs={12} style={{ color: "#636e72" }}> */}
        <div>Categories</div>

        <Paper style={{ border: "1px solid grey" }}
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '90%', height: 28, margin: 0.6, borderRadius: 20 }}>

          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Category"
            inputProps={{ 'aria-label': 'search category' }}
            onChange={(e) => setPattern(e.target.value)}
            onKeyDown={(e) => handleEnterKey(e)}

          />

          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>

        </Paper>

        <Grid>


          {showAllCategory()}
        </Grid>

        < Divider style={{ borderWidth: 0.5, color: "Black" }} />

        <Grid item xs={12} style={{ color: "#636e72" }}>
          <div>
            Brands
          </div>
          <Paper style={{ border: "1px solid grey" }}
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '90%', margin: 0.6, borderRadius: 20, height: 28 }}>
            {/* <IconButton sx={{ p: '10px' }} aria-label="menu">
      khgj
        </IconButton> */}
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Brand"
              inputProps={{ 'aria-label': 'search brand' }}
              onChange={(e) => setPattern(e.target.value)}
              onKeyDown={(e) => handleEnterKey(e)}

            />

            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>

          </Paper>
          <div >

          {showAllBrand()}
          </div>

          <divider />

        </Grid>

        < Divider style={{ borderWidth: 0.5, color: 'black' }} />

      </div>

    </Grid>

    //     </Grid>
  )
}

