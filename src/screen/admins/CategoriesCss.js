import { makeStyles } from '@mui/styles';

export const useCategoryStyles = makeStyles({
  root: {
    display: 'flex',
    width:"100%",
    height:"100vh",
    justifyContent: 'center',
    fontFamily:'kanit',
    alignItems: 'center',
    background: '#fff',
  },
  box: {
    width: 600,
    height: 300,
    background: '#fff',
    borderRadius: 10,
    padding:10,
    boxShadow:'3px 3px 8px 5px grey',

  },

 
});