import ShowCart from "../../components/userinterface/ShowCart"
import PaymentDetails from "../../components/userinterface/PaymentDetails"
import { Grid } from "@mui/material"
import FooterComponent from "../../components/userinterface/FooterComponent"
import Header from "../../components/userinterface/Header"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector } from "react-redux"
import { postData } from "../../Services/FetchNodeServices"
import UserLoginPage from "../../components/userinterface/UserLoginPage"
import { useEffect, useState } from "react"
import Address from "../../components/userinterface/Address"
import DeliveryAddress from "../../components/userinterface/DeliveryAddress"
import MenuBar from "../../components/userinterface/MenuBar"
export default function Cart(props) {
    const [pageRefresh, setPageRefresh] = useState(false)
    var products = useSelector(state => state.data)
    const [status, setStatus] = useState(false)
    
    // const [user, setUser] = useState([])
    var userData = Object.values(useSelector(state => state.user))[0]
    const [userAddress,setUserAddress]=useState([])
    console.log("User DATAAA",userData)
    const check_user_address = async () => {
        // alert(userData?.mobileno)
        if(userData?.mobileno == undefined)
        
        {setStatus(false)}
        else{
        var result = await postData('users/check_user_address', { mobileno: userData?.mobileno })
        if (result.status == false) {

            setStatus(true)
        }
        else {


            setStatus(false)
            setUserAddress(result.data)
           
        }
    }

    }
    useEffect(function () {
        check_user_address()
    }, [userData?.mobileno,pageRefresh])   //[userData?.mobileno,pageRefresh]) 


    return (
        <div container style={{ height: 'auto' }}>
            <Grid item xs={12}>
                < Header />
                <MenuBar  />
            </Grid>
            <Grid container style={{ display: 'flex', justifyContent: 'space-evenly', flexDirection: 'row' }}>
            
      
                <Grid item xs={12} md={7} style={{ marginLeft: '3%', width: '100%' }} fullwidth>
                    {userData?.mobileno != undefined ?
                    <Grid item xs={12}  style={{marginTop:20,marginLeft: '3%'}}>
                        <DeliveryAddress status={status} setStatus={setStatus} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} userData={userData} userAddress={userAddress} />
                    </Grid>:<div></div>}
                    <ShowCart products={products} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} />
                </Grid>
                <Grid item xs={12} md={4} style={{ width: '55%', marginRight: '5%' }} fullwidth>
                    <PaymentDetails products={products} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} userAddress={userAddress} userData={userData}/>
                </Grid>
            </Grid>

            <Address userData={userData} status={status} setStatus={setStatus} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh}  />

        </div>
    )
}