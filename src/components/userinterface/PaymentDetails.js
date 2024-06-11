import { Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Address from "./Address";
import { postData, serverURL } from "../../Services/FetchNodeServices";
import Brightness7OutlinedIcon from '@mui/icons-material/Brightness7Outlined';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import * as React from 'react';
import Radio from '@mui/material/Radio';
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
export default function PaymentDetails(props) {
    const [selectedValue, setSelectedValue] = React.useState('a');
    var navigate = useNavigate()
    const [caption, setCaption] = useState('Login to Proceed')

    const [cash,setCash]=useState('')

    var userData = Object.values(useSelector(state => state.user))[0]


    var productFromRedux = props.products
    var product = Object.values(productFromRedux)
    var keys = Object?.keys(productFromRedux)

    var totalamount = product.reduce((p1, p2) => {
        var amt = p2.qty * p2.price
        return p1 + amt
    }, 0)

    var amountpaid = product.reduce((p1, p2) => {
        var amt = p2.qty * (p2.offerprice > 0 ? p2.offerprice : p2.price)
        return p1 + amt
    }, 0)

    var save = totalamount - amountpaid

    

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };


    const generateOrder=async(razorpay_payment_id)=>{
        var  result=await postData('users/save_order',{userid:props?.userData?.userid,mobileno:props?.userData?.mobileno,emailid:props?.userData?.emailid,paymentstatus:'Online',paymentid:razorpay_payment_id,orderlist:product})
        alert(result)

        // console.log("DFS",generateOrder())
       }
    
    useEffect(function () {
        if (props?.userAddress?.length > 0) {
            setCaption('Make Payment')
        }
    }, [props.userAddress])

    
    const handleLogin = () => {
        if (caption.toUpperCase() === "MAKE PAYMENT")
            openPayModal()
        else
            navigate('/loginscreen')
    }

    ///********Payment Gateway********** */
    const options = {
        key: "rzp_test_GQ6XaPC6gMPNwH",
        amount: amountpaid*100, //  = INR 1
        name: "MedBazzar",
        description: 'some description',
        image: `${serverURL}/images/logo.png`,
        handler: function (response) {
             generateOrder(response.razorpay_payment_id)
            alert(response.razorpay_payment_id);
        },
        prefill: {
          name: props?.userData?.username,
          contact: props?.userData?.mobileno,
          email: props?.userData?.emailid,
        },
        notes: {
          address: "some address",
        },
        theme: {
          color: "blue",
          hide_topbar: false,
        },
      };
    
      const openPayModal = () => {
        var rzp1 = new window.Razorpay(options);
        // var rzp1 = new window.Razorpay({});
        // rzp1.createPayment(options)

        rzp1.open();
      };
      useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
      }, []);



    ////********************* */


    const handleClick=()=>{
if (userData != 0){


        
}
    }

    

    return (
        // <div>
        <div container style={{ marginLeft: '2%', marginTop: '10%', fontFamily: 'kanit',fontWeight:'bold' }}>

            <Grid item xs={12} fullwidth style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 10, background: 'yellow', borderRadius: 10, fontWeight: 'bold', marginRight: '1%', marginLeft: '0.5%',fontSize:'100%' }}>

                Payment Details


            </Grid>
            <Grid item xs={12} fullwidth style={{ display: 'flex', justifyContent: 'space-between', marginRight: '1%', marginLeft: '0.5%', marginBottom: '3%',fontSize:'90%' }}>
                <Grid item xs={6}   >
                    Total Amount
                </Grid>
                <Grid item xs={6} style={{ marginRight: '1.5%', justifyContent: 'flex-end', display: 'flex' }}>
                    &#x20B9;
                    {totalamount}
                </Grid>
            </Grid>
            <Grid item xs={12} fullwidth style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '0.5%', marginRight: '1%', marginBottom: '4%',fontSize:'80%' }}>
                <Grid item xs={6}  >
                    Amount Paid
                </Grid>
                <Grid item xs={6} style={{ marginRight: '1.5%', justifyContent: 'flex-end', display: 'flex' }}>
                    &#x20B9; {amountpaid}
                </Grid>
            </Grid>
            <Grid item xs={12} fullwidth style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '0.5%', marginRight: '1%', marginBottom: '4%',fontSize:'80%' }}>
                <Grid item xs={6}  >
                    Saving
                </Grid>
                <Grid item xs={6} style={{ marginRight: '1.5%', justifyContent: 'flex-end', display: 'flex' }}>
                    &#x20B9;{save}
                </Grid>
            </Grid>
            <Grid item xs={12} fullwidth style={{ display: 'flex', background: '#fff212', alignItems: 'center', height: 40, borderRadius: 10, justifyContent: 'space-between', marginRight: '1%' ,fontSize:'80%'}}>
                <Grid item xs={6} style={{ marginLeft: '1.5%' }} >
                    <h3>Order Total</h3>
                </Grid>
                <Grid item xs={6} style={{ marginRight: '1.5%', justifyContent: 'flex-end', display: 'flex' }}>

                    &#x20B9;{amountpaid}
                </Grid>
            </Grid>
            <Grid item xs={12} style={{ fontSize:'65%', marginTop: '2%' }}>
                <i>Price may very Depending on the product batch *</i>
            </Grid>
            <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', marginTop: '5%', marginBottom: '5%' }}>
                <Grid xs={12} style={{ display: 'flex', alignItems: 'center' ,fontSize:'80%'}}>
                    < img src="disc.png" style={{ width: 30, color: '#00391c' }} />

                    <span style={{ fontSize: '80%', marginLeft: "2%" }}> Use Coupon  Also get a gift card</span>
                </Grid>
                <Grid xs={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <ArrowForwardIosOutlinedIcon style={{ marginLeft: '15%', cursor: 'pointer' }} />

                    {/* </div> */}
                </Grid>

            </Grid>

            {/* <Grid item xs={3}>
                <ArrowForwardIosOutlinedIcon />
            </Grid> */}





            <Grid item xs={12} style={{ display: 'flex', background: '#ffc43d', alignItems: 'center', borderRadius: '10px 0px 0px 0px', marginRight: '1%', marginTop: '1%', height: 50 }} >
                < InfoOutlinedIcon style={{ marginRight: '1%', color: '#000', marginLeft: '1.5%' }} /> <span style={{ fontSize: 11, fontWeight: 'bold' }}>Shop for 926 "" more to get free delivery</span>
            </Grid>
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-around', marginRight: '1%', borderRadius: '0px 0px 10px 0px', background: '#b2bec3' }}>
                <Grid item xs={6} style={{ display: 'flex', alignItems: 'center',fontSize:'80%' }}>
                    <Radio
                        checked={selectedValue === 'a'}
                        onChange={handleChange}
                        value="a"
                        name="radio-buttons"
                        inputProps={{ 'aria-label': 'A' }}

                        style={{ color: '#00391c' }}

                    />  <span >Cash on Delivery</span>
                </Grid>
                <Grid item xs={6} style={{ display: 'flex', alignItems: 'center',fontSize:'80%' }}>
                    <Radio
                        checked={selectedValue === 'b'}
                        // onClick={handleLogin}
                        onChange={handleChange}
                        value="b"
                        name="radio-buttons"
                        inputProps={{ 'aria-label': 'B' }}
                        style={{ color: '#00391c' }}
                        defaultChecked

                    /><span>Make Payment</span>
                </Grid>
            </Grid>



            <Grid item xs={12} style={{ display: 'flex', marginTop: '1%', justifyContent: 'space-around' }}>
                <Grid item xs={7} style={{ marginTop: '1%', justifyContent: 'left' }} >
                    <div style={{ fontSize: 12 }}>{keys?.length} ITEMS</div>
                    <div style={{ fontWeight: 'bold', fontSize:'80%' }}> &#x20B9; {amountpaid}</div>
                </Grid>
                <Grid item xs={5} >
                    <Button fullwidth variant="contained" style={{ background: '#00391c', width: '100%', marginTop: '2%', height: 35, borderRadius: 7, fontSize: '60%' }} onClick={handleLogin}>{caption}</Button>
                </Grid>
            </Grid>


            <Grid item xs={12}>
                <h4>  Delivery instruction</h4>
            </Grid>
            <div item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Grid item xs={6} style={{ display: 'flex', alignItems: 'center' ,fontSize:'80%'}}>
                    < DeliveryDiningOutlinedIcon />

                    <span style={{  marginLeft: '2%' }}>Add Delivery instructions</span>
                </Grid>
                <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    < ArrowForwardIosOutlinedIcon style={{ marginLeft: '15%' }} />
                </Grid>
                {/* <Grid item xs={6} style={{justifyContent:'flex-end'}}  >
          < ArrowForwardIosOutlinedIcon style={{marginRight:'2%',display:'flex',justifyContent:'end'}}/>
            </Grid> */}

            </div>

        </div>

        // </div>
    )
}