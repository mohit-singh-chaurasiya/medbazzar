import { Paper,Divider, Button } from "@mui/material";
import { UseSelector,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import makeStyles from "@mui/material";
import { useCartStyles } from "./ShowCartProductsCss";

import { useState } from "react";
export default function ShowCartProducts(props){
    var classes=useCartStyles()
    var products=useSelector((state)=>state.data)
    const [isOpen,setIsOpen]=useState(false)
    var keys=Object?.keys(products)
    var products=Object?.values(products)
    var navigate=useNavigate()

    const showProducts=()=>{
        return products.map((item)=>{
            return <div style={{display:'flex',justifyContent:'space-between',marginTop:6}}><div >{item.productname}</div><div>Qty {item.qty}</div></div>
        })
    }
    // const hideDetails=()=>{
   
    //     setIsOpen(false)
    
    //   }
   
    return(

        <Paper elevation={2}  style={{display:props.isOpen?'flex':'none',position:'absolute',top:50,right:50,zIndex:3}} >
            <div className={classes.root} >
                <div className={classes.cart} >
             <div style={{fontSize:16,fontWeight:'bold',}}>Order Summary</div>
             <div style={{fontSize:16,fontWeight:'bold',}} >{keys.length} items</div>
                </div>
                <Divider />
               
                {showProducts()}
                <div className={classes.proceedbutton} onClick={()=>navigate('/cart')}>
                 <div > Proceed to Cart
                    </div>
                </div>
              
            </div>
           
        </Paper>
    )
}