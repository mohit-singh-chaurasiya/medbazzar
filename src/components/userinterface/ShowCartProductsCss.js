
import makeStyles from "@mui/styles/makeStyles"

export const useCartStyles = makeStyles({
   
    root:{
        width:280,
        height:'auto',
        display:'flex',
        flexDirection:'column',
        padding:5,
        fontFamily:'kanit'
    },
    cart:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    proceedbutton:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:260,
        height:35,
        background:'#00391c',
        color:'#fff',
        borderRadius:5,
        margin:10,
        cursor:'pointer'


    },
   
    
})