import { useEffect, useState } from "react";
import { getData, postData, serverURL } from "../../Services/FetchNodeServices";
import MaterialTable from "@material-table/core";
import { Paper } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from "react-router-dom";
export default function DisplayOrders() {
  var navigate=useNavigate()

  const [orderData, setOrderData] = useState([])
  const [orderDetails, setOrderDetails] = useState([])
  const [open, setOpen] = useState(false)
  const orderDisplay = async () => {
    var result = await getData('users/display_all_orders')

    if (result.status) {
      setOrderData(result.data)
    }


  }

  const fetchOrderDetails = async (orderid) => {
    var result = await postData('users/display_orderdetails', { orderid: orderid })

    if (result.status) {
      setOrderDetails(result.data)
    }
  }
  useEffect(function () {
    orderDisplay()

  }, [])

  const handleOpen = (rowData) => {
    setOpen(true)
    fetchOrderDetails(rowData.orderid)
    // console.log(fetchOrderDetails())
    // alert(rowData.orderid)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleBack=()=>{
   
    navigate("/home")
  }


  function displayAllOrders() {
    return (<div>
      <KeyboardBackspaceIcon style={{cursor:"pointer"}} onClick={handleBack}/>
      <MaterialTable
style={{ color: '#000',background:'#95a5a6',fontWeight:'bold' }}

        title="Orders Details"
        columns={[
          { title: 'OrderId', field: 'orderid' },
          { title: 'UserId', field: 'userid' },
          { title: 'Order Date', field: 'orderdate' },
          { title: 'MobileNo', field: 'mobileno' },
          { title: 'EmailID', field: 'emailid' },
          { title: 'Payment Status', field: 'paymentstatus' },
          { title: 'PaymentID', field: 'paymentid' },

        ]}
        options={{
          paging: true,
          pageSize: 3,       // make initial page size
          emptyRowsWhenPaging: false,   // To avoid of having empty rows
          pageSizeOptions: [3, 5, 7, 10],
          list: true    // rows selection options
        }}
        data={orderData}
        actions={[
          {
            icon: 'link',
            tooltip: 'Order Details',
            onClick: (event, rowData) => handleOpen(rowData)
          }
        ]}
      />
    </div>
    )
  }


  function displayOrderDetails() {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={"md"}>
        <DialogContent>
          <MaterialTable
          style={{ color: '#000',background:'#95a5a6',fontWeight:'bold' }}
            title="Display Orders Details"
            columns={[
              { title: 'Order DetailsID', field: 'orderdetailid' },
              { title: 'Product DetailsID', field: 'productdetailsid' },
              { title: 'OrderID', field: 'orderid' },
              { title: 'Price', field: 'price' },
              { title: 'Offer Price', field: 'offerprice' },
              { title: 'Quantity', field: 'qty' },
              { title: 'Dilivery Status', field: 'deliverystatus' },
              { title: 'Picture', field: 'picture', render: (rowData) => <><img src={`${serverURL}/images/${rowData.picture}`} style={{ width: 60, height: 60, borderRadius: 30 }} /></> },

            ]}

            options={{
              paging: true,
              pageSize: 3,       // make initial page size
              emptyRowsWhenPaging: false,   // To avoid of having empty rows
              pageSizeOptions: [3, 5, 7, 10],    // rows selection options
            }}
            data={orderDetails}

          />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <div style={{
      display: 'flex',
      width: '100%',
      height: '100vh',
      justifyContent: 'center',
      fontFamily: 'kanit',
      alignItems: 'center',
      background: '#fff',
    }}>
      <div style={{
        width: '90%',
        height: 'auto',
        background: '#fff',
        borderRadius: 10,
        padding: 10,
        boxShadow: '3px 3px 8px 5px lightgrey',
      }}>
        <Paper>
          {displayAllOrders()}
        </Paper>
        <div >
          {displayOrderDetails()}
        </div>
      </div>

    </div>
  )

}