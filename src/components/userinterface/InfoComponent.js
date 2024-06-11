import { Grid, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../../Services/FetchNodeServices";
import { createRef, useState } from "react";
import React from 'react';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import parse from 'html-react-parser';
import Radio from '@mui/material/Radio';
import PlusMinusComponent from "./PlusMinusComponent";
import PaymentDetails from "./PaymentDetails";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
 
export default function InfoComponent(props) {
  var navigate = useNavigate()
  var dispatch = useDispatch()

  const [selectedValue, setSelectedValue] = React.useState('a');
  const [status, setStatus] = useState(true)


  var productFromRedux = useSelector(state => state.data)
  var values = Object.values(productFromRedux)
  var product
  if (values?.length == 0) {
    product = props?.item
    product['qty'] = 0
  }
  else {
    // alert("data exist")
    var prd = productFromRedux[props.item?.productdetailsid]
    if (prd === undefined) {
      product = props?.item
      product['qty'] = 0

    }
    else {
      product = prd
    }

  }
  // alert(props?.item)

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const payment = () => {
    setStatus(!status)
  }

  
  const handleChangeValue = (v, item) => {
    if (v > 0) {
      item['qty'] = v
      dispatch({ type: 'ADD_PRODUCT', payload: [item.productdetailsid, item] })
    }
    else {
      dispatch({ type: 'DELETE_PRODUCT', payload: [item.productdetailsid] })
    }
    props.setPageRefresh(!props.pageRefresh)
    // alert(v)


  }




  return (
    <div style={{ width: '100%', height: '100%', background: '#fff' }}>
      {/* <Grid item xs={12} spacing={2} style={{width:'100%',height:'100%'}}> */}
      {status ? <div style={{ marginLeft: '5%' }}>
        <Paper elevation={3} style={{ background: 'transparent', color: '#000' }}>
          <Grid item xs={12}>{product?.productname},{product?.weight},{product?.weighttype}</Grid>
          <Grid item xs={12}>{product?.productsubname}</Grid>

          <Grid item xs={12} style={{ display: 'flex' }} ><div style={{ textDecoration: 'line-through', color: '#95a5a6' }}>MRP:&#x20B9;{product?.offerprice != 0 ? product?.price : product?.offerprice}</div>&nbsp;<span> (save &#x20B9; {product?.offerprice != 0 ? product?.price - product?.offerprice : product?.price} )</span></Grid>

          <Grid item xs={12} >
            &#x20B9; {product?.offerprice}
            <div style={{ fontSize: 10, color: '#00391c', textDecoration: 'underline' }}>
              (Incl. all Taxes)
            </div>

          </Grid>

        </Paper>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ background: 'transparent', color: '#000', flexDirection: 'row', marginTop: 25 }} spacing={1}>
            <Grid item xs={12}>
              <Radio
                checked={selectedValue === 'a'}
                onChange={handleChange}
                value="a"
                name="radio-buttons"
                inputProps={{ 'aria-label': 'A' }}
                style={{ color: '#00391c' }}
              />
              Without Exchange</Grid>
            <Grid item xs={12}>
              <Button fullWidth variant="contained" style={{ background: '#00391c', color: '#fff', width: '60%', height: 40, marginLeft: '7%' }}><h5>Choose medicine for Exchange</h5></Button>
              <h4 style={{ marginLeft: '7%', color: '#00391c', cursor: 'pointer' }}><u>How does exchange work</u></h4></Grid>
            <Grid item xs={12}>
              <Radio
                checked={selectedValue === 'b'}
                onChange={handleChange}
                value="b"
                name="radio-buttons"
                inputProps={{ 'aria-label': 'B' }}
                style={{ color: '#00391c' }}
              />
              With Exchange
            </Grid>
          </Paper>
        </Grid>
        <div style={{ fontWeight: 'bold', color: '#000' }}>
          {/* <Grid item xs={12}>
                  <div >Weight Type</div>

                    <Button style={{width:'13%',height:50,background:'transparent',boxShadow:'.1px .1px 1px 1px #000',margin:10}} >ML</Button>
                    <Button style={{width:'13%',height:50,background:'transparent',boxShadow:'.1px .1px 1px 1px #000',margin:10}} >KG</Button>
                    <Button style={{width:'13%',height:50,background:'transparent',boxShadow:'.1px .1px 1px 1px #000',margin:10}} >Gram</Button>
                    
                </Grid> */}
          {/* <Grid item xs={12}>
                  <div>Packaging</div>
                    <Button style={{width:'13%',height:50,background:'transparent',boxShadow:'.1px .1px 1px 1px #fff',margin:10}} >4</Button>
                    <Button style={{width:'13%',height:50,background:'transparent',boxShadow:'.1px .1px 1px 1px #fff',margin:10}} >6</Button>
                    <Button style={{width:'13%',height:50,background:'transparent',boxShadow:'.1px .1px 1px 1px #fff',margin:10}} >8</Button>
                    
                </Grid> */}
          {/* <Grid item xs={12} >
                  <div>Price</div>  
                    <Button style={{width:'13%',height:50,background:'transparent',boxShadow:'.1px .1px 1px 1px #000',margin:10}} >40</Button>
                    <Button style={{width:'13%',height:50,background:'transparent',boxShadow:'.1px .1px 1px 1px #000',margin:10}} >80</Button>
                    <Button style={{width:'13%',height:50,background:'transparent',boxShadow:'.1px .1px 1px 1px #000',margin:10}} >120</Button>
                    
                </Grid> */}
        </div>

        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', marginTop: '2%' }} >

          <Grid item xs={6} style={{ marginLeft: '5%' }} >

            < PlusMinusComponent qty={product?.qty} onChange={(v) => handleChangeValue(v, product)} width={'70%'} />

          </Grid>
          <Grid item xs={6}  >
            <Button size="large" style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '70%',
              height: 30,
              background: '#00391c',
              fontWeight: 'bold',
              color: '#fff',
              borderRadius: 5,
              cursor: 'pointer',
              fontSize: '60%',
              margin: 10
            }}
            // onClick={payment} status={status} setStatus={setStatus} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh}
            onClick={()=>navigate('/cart')}>Buy Product</Button>
          </Grid>

        </Grid>



        <Paper elevation={4} style={{ background: 'transparent', height: 'auto', color: '#000', border: 'grey 1px light', flexDirection: 'row', marginTop: 25 }}>


          <div><b>Product Description</b></div>
          <div >
            {parse(product?.pd_description)}

          </div>
          


        </Paper>

        {/* </Grid> */}




      </div> : <PaymentDetails />}
    </div>

  )
}