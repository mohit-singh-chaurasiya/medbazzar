import { useNavigate } from "react-router-dom"
import { Divider, Grid, Paper } from "@mui/material"
import { serverURL } from "../../Services/FetchNodeServices"
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

import PlusMinusComponent from "./PlusMinusComponent";
import { useState } from "react";
import { UseSelector, useSelector, useDispatch } from "react-redux";


export default function ShowCart(props) {
  var navigate = useNavigate()
  var dispatch = useDispatch()
  const [value, setValue] = useState(0)
  var productFromRedux = props.products
  var productDetails = Object.values(productFromRedux)
  var keys = Object?.keys(productFromRedux)



  const handleChange = (v) => {
    // props.setPageRefresh(!props.pageRefresh)
    var value = v

    // alert(v)
  }
  const handlePlus = () => {
    setValue((prev) => prev + 1)
    var v = value
    v = v + 1
    props.onChange(v)

  }
  const handleMinus = () => {
    setValue((prev) => prev - 1)
    var v = value
    v = v - 1
    props.onChange(v)
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

  const showProduct = () => {
    return productDetails.map((item, i) => {
      return (<div style={{ display: 'flex', justifyContent: 'center' }}>
        <Grid item xs={12} style={{ display: 'flex' }}>
          <Grid item xs={4} fullwidth   >

            <img src={`${serverURL}/images/${item.picture}`} style={{ width: '50%', height: '50%', margin: 'auto', marginTop: '2%', aspectRatio: 3.5 / 3.5, borderRadius: 5, display: 'Block', cursor: 'pointer' }} />

          </Grid>
          <Grid item xs={8} fullwidth spacing={4} style={{ width: '100%', marginLeft: "2%" }}>
            <Grid item xs={12} style={{ display: 'flex' }}>
              <div class='col-12' fullwidth style={{ width: '100%', fontSize: 14, fontWeight: 'bold' }}>{item.productname} {item.weight}{item.weighttype}
              </div>


            </Grid>

            <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
              <div class='col-12' fullwidth style={{ width: '100%' }}>
                {item.offerprice == 0 ? <span>&#x20B9;{item.price}</span> :
                  <div>
                    <span style={{ fontWeight: 600, color: 'grey', fontSize: '1rem', textDecoration: "line-through" }}>&#x20B9;{item.price}</span>
                    <span style={{ fontWeight: 'bold' }}> &#x20B9;{item.offerprice}</span>
                  </div>}

              </div>
              <div class='col-4' fullwidth style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginLeft: '50%' }}>


                < PlusMinusComponent qty={item?.qty} onChange={(v) => handleChangeValue(v, item)} width={'60%'} />

              </div>




              {/* <div style={{ fontSize: '1 rem', textDecoration: 'line-through', color: 'grey' }}>MRP:&#x20B9;{item.price} </div>
              <div style={{ fontWeight: 'bold' }}>&#x20B9;{item.offerprice}</div> */}
            </Grid>
            <Grid item xs={12} style={{ display: 'flex', fontSize: '0.9rem', marginTop: '1%', alignItems: 'center' }} >
              <AccessTimeOutlinedIcon style={{ color: 'red', width: '2.5%', height: '2.5%' }} /> Delivery within <b> 2-3 days</b>
            </Grid>
            <Grid item xs={12} >
              <Divider fullwidth style={{ borderWidth: 1.8, marginTop: '1%', width: '100%', color: '#000' }}></Divider>
            </Grid>
            <Grid item xs={10} style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center' }}>
              <DeleteForeverOutlinedIcon style={{ color: 'red' }} /> Remove

              <span style={{ marginLeft: '4%', display: 'flex', alignItems: 'center' }}>
                < BookmarkAddOutlinedIcon />Add to fav
              </span>
            </Grid>




          </Grid>
          <Grid item>
                <Divider style={{ borderWidth: 1.5 }}></Divider>
              </Grid>
        </Grid>
      </div>)
    })

  }

  return (<div>
    <div item xs={12} container spacing={2} style={{ marginLeft: '3%', height: 'auto' }} >

      <Grid item xs={12}  >

        <h2>
          Item {keys?.length} in Your Cart
        </h2>
        <p style={{ fontSize: '.7rem', color: 'grey' }}>
          Prescription Not Required
        </p>
      </Grid>

      <Paper elevation={2} style={{ flexDirection: 'row' }}>
        <Grid class='col-12' fullwidth style={{ margin: '1%', marginBottom: '2%' }}>
          {showProduct()}

        </Grid>

      </Paper>
      <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
        <AddBoxOutlinedIcon style={{ cursor: 'pointer' }} onClick={() => navigate('/home')} />Add new Items
      </Grid>



    </div>
  </div>

  )
}