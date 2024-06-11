import React from 'react';
import FilterLists from "../../components/userinterface/FilterList";
import FilterProducts from "../../components/userinterface/FilterProducts";
import { useState, useEffect } from "react";
import { postData } from "../../Services/FetchNodeServices";
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useLocation, useParams } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/userinterface/Header';
import MenuBar from '../../components/userinterface/MenuBar';
import { Pattern } from '@mui/icons-material';

export default function FilterDetails(props) {
    const theme = useTheme();
    const matchesMd = useMediaQuery(theme.breakpoints.up("md"));
    var params = useParams()
    var location = useLocation()
    const [pageRefresh,setPageRefresh]=useState(false)
    const [products, setProducts] = useState([])
    var categoryid = ''
    var brandid=''
    try {
        if (location.state.categoryid == undefined) { categoryid = null }
        else {
            categoryid = location?.state?.categoryid
        }
    }
    catch (e) {
        categoryid = null
    }
    // var pattern =''
    // try{
    //     if(location?.state?.pattern==undefined)
    //         pattern=null
    //       else   
    //         pattern=location?.state?.pattern
    // }
    // catch(e){}


    const fetchAllProduct = async () => {
        var result = await postData('userinterface/display_all_productdetail_by_category', { 'categoryid': categoryid, 'pattern': params['pattern'] })
        setProducts(result.data)

    }
    

    
    useEffect(function () {
     
        fetchAllProduct()
       



    }, [params['pattern']])
   


    return (
        // <Grid container   >

        <Grid container xs={12} style={{ display: 'flex', justifyContent: 'center', height: 'auto', fontWeight: 'bold', }}>
            <Grid item xs={12}>
                < Header />
                <MenuBar />
            </Grid>
            <Grid item xs={2.5} width={'100%'} style={{ marginTop: 40 }} >

                <FilterLists title="Filter By"  />

            </Grid>

            <Grid item xs={8} style={{ marginLeft: '0.5%', margin: "4%" }}>

                <FilterProducts data={products} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} />

            </Grid>

        </Grid>
        //  </Grid>


    )
}