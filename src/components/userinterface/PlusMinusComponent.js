import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Swal from "sweetalert2";
export default function PlusMinusComponent(props) {
    const [value, setValue] = useState(props.qty)
    useEffect(function () {
        setValue(props.qty)
    }, [props.qty, value])
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    const handlePlus = () => {
        setValue((prev) => prev + 1)
        var v = value
        v = v + 1
        props.onChange(v)
        Swal.fire({
           
            position: "bottom-end",
            background:"#00391c",
            color:"#fff",
            width:230,
            icon: "success",
            title: "Add Cart",
            showConfirmButton: false,
            timer: 1800,
            toast: true
        });


    }
    const handleMinus = () => {
        if (value >= 1) {
            setValue((prev) => prev - 1)
            var v = value
            v = v - 1
            props.onChange(v)
        }
    }

    return (
        <div style={{ display: 'flex', width: '100%' }}>
            {value == 0 ?

                <IconButton style={{ width: props.width }} fullWidth onClick={handlePlus} color="primary" aria-label="add to shopping cart">
                    <Button
                        variant="outlined"
                        endIcon={<AddShoppingCartIcon />}
                        size='small'

                        style={{ color: "#000", width: "100%", borderColor: "darkgreen", height: 27 }}>
                        ADD
                    </Button>
                </IconButton> :
                <div style={{ display: 'flex', justifyContent: 'space-around', background: '#00391c', width: props.width, height: 27, borderRadius: 5 }}>
                    <span style={{ color: "#fff", fontSize: 15, fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={handleMinus}>-</span>
                    <span style={{ color: "#fff", fontSize: 15, fontWeight: 'bold', cursor: 'default', display: 'flex', alignItems: 'center' }} >{value}</span>
                    <span style={{ color: "#fff", fontSize: 15, fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={handlePlus}>+</span>

                </div>}


        </div>
    )

}