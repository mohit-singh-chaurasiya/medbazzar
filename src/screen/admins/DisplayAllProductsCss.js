import { makeStyles } from '@mui/styles';

export const useProductStyles = makeStyles({
  root: {
    display: 'flex',
    width: '100%',
    height: '100vh',
    justifyContent: 'center',
    fontFamily:'kanit',
    alignItems: 'center',
    background: '#fff',
   

  

  },

  boxdisplay: {
    width: "80%",
    height: "auto",
    background: 'red',
    borderRadius: 10,
    padding:100,
    boxShadow:'3px 5px 8px 5px grey'


  },
  box: {
    width: 600,
    height: 'auto',
    background: '#fff',
    borderRadius: 10,
    padding:10,
    // boxShadow:'3px 3px 8px 5px grey',
   
   


  },

  
});