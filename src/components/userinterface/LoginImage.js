import { Grid } from "@mui/material"

export default function LoginImage() {

    return (<div>

        <Grid container item xs={12} style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center',marginTop:'8%', alignItems: 'center' }}>

                <img src="shop.jpeg" style={{ width: '70%', background: 'transparent' }} />


            </Grid>
        </Grid>
    </div>)
}