import { makeStyles } from '@mui/styles';

export const useDashboardStyles = makeStyles({
    maindiv: {
        width: '100%',
        

    },

    boxdiv: {
        gap: 15,
        display: 'flex',
        width: '100%',
        height: 'auto',
        fontFamily:"sans-serif"
        // flexWrap:"wrap"

    },
    dashboardbox1: {
        width: 350,
        height: 140,
        // backgroundImage: "linear-gradient(#1da256, #48d483)",
        background:"#22a6b3",
        display: 'flex',
        justifyContent: 'space-between',
        borderRadius:8,
        padding:10,
        boxShadow:"2px solid grey",
        
       
       




    },
    h4: {
        fontSize: "100%" ,
        // fontWeight: 400,
        color: '#34495e',
        
        lineHeight: 1,
        fontWeight:"bolder",
        flexWrap:'wrap',
        display:'flex'


    },
    span: {
        fontSize: 33,
        fontWeight: 'bold',
        lineHeight: 0,
        color:'#222f3e',
        display:'flex',
        alignItems:'center'
    },
    icon:{
        lineHeight: 4,
        marginRight:'90%',
        
        
    },
    dashboardbox2: {
        width:350,
        height: 140,
        // backgroundImage: "linear-gradient( #c012e2,  #eb64fe)",
        background:"#22a6b3",
        display: 'flex',
        justifyContent: 'space-between',
        borderRadius:8,
        padding:10
    },
    dashboardbox3: {
        width: 350,
        height: 140,
        // backgroundImage: "linear-gradient( #8c7ae6,#192a56)",
        background:"#22a6b3",
        display: 'flex',
        justifyContent: 'space-between',
        borderRadius:8,
        padding:10

    },

    maindiv2:{
        width:"100%",
        // height:140,
        display:'flex',
        alignItems:'center',
        justifyContent:"space-evenly",
        
        marginTop:"3%",
        // margin:5
        
    },
    maindiv3:{
        width:"100%",
        // height:140,
        display:'flex',
        alignItems:'center',
        justifyContent:"space-evenly",
        
        marginTop:"3%",
        // background:'red'
    }
   



})