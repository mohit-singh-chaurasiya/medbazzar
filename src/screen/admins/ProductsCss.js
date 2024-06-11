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
      box: {
        width: 600,
        height: 'auto',
        background: '#fff',
        boxShadow:'3px 3px 8px 5px grey',
        borderRadius: 10,
        padding:10,
      },
})