import { Grid } from "@mui/material"
import Header from "../../components/userinterface/Header";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import LoginVerify from "../../components/userinterface/LoginVerify"
import LoginOtp from "../../components/userinterface/LoginOtp";
import LoginImage from "../../components/userinterface/LoginImage";
import UserDetails from "../../components/userinterface/UserDetails";
import {useLocation} from "react-router-dom"

export default function LoginScreen(){
    const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  var location =useLocation()
  
    return(<div >
        <Header/>
        <Grid container item xs={12} style={{display:'flex',justifyContent:'space-evenly',alignItems:'center'}}>
            

        {!matches? <Grid  item xs={6}>
                <LoginImage/>
            </Grid>:<div></div>}
            <Grid  item xs={12} sm={6}  >
                <LoginOtp  />
                      {/* <UserDetails/> */}
                {/* <LoginVerify/> */}
            </Grid>
            
       
            </Grid>

    </div>)
}