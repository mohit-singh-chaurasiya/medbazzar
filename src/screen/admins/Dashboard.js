import { Grid, Paper } from "@mui/material";
import { useDashboardStyles } from "./DashboardCss";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BadgeIcon from '@mui/icons-material/Badge';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
// import { BarChart } from '@mui/x-charts/BarChart';

import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import AddIcon from '@mui/icons-material/Add';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import DisplayProductDetails from "./DisplayProductDetails";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import BarChart from "./Charts/BarChart";
import SecondBarChart from "./Charts/SecondBarChart";
import GeoChart from "./Charts/GeoChart";
import { PieChartBar } from "./Charts/PieChartBar";
import { useState, useEffect } from "react";
import { AttachMoneyOutlined, CurrencyRupeeOutlined } from "@mui/icons-material";
// import BarChart from "./Charts/BarChart";
import CountUp from 'react-countup';

export default function Dashboard(props) {
    var classes = useDashboardStyles()
    const [userData, setUserData] = useState([])
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };


    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
        },
    }));



    return (
        <div className={classes.maindiv}>



            <div className={classes.boxdiv}>

                <div className={classes.dashboardbox1} >

                    <div className="col1">

                        <h4 className={classes.h4}>Total Users</h4>
                        <span className={classes.span} >$<CountUp
                            start={0}
                            end={16527.012}
                            duration={.7} /></span>
                        <h5 style={{ color: "#ced6e0", fontWeight: 'bold', display: 'flex', alignItems: 'center', fontSize: '100%' }}>Last Month 90%  </h5>
                    </div>

                    <div className={classes.mlauto}>
                        <span className={classes.icon}>
                            <AccountCircleIcon style={{ fontSize: 50, background: 'grey', opacity: 0.8, borderRadius: 6, color: '#c7ecee' }} />
                        </span>
                    </div>
                </div>
                <div className={classes.dashboardbox2}>
                    <div className="col1">
                        <h4 className={classes.h4}>Products</h4>
                        <span className={classes.span}><CountUp
                            start={0}
                            end={1652}
                            duration={.8} /></span>
                        <h5 style={{ color: "#ced6e0", fontWeight: 'bold', display: 'flex', alignItems: 'center', fontSize: "100%" }}>Last Month 80%  </h5>


                    </div>
                    <div className={classes.mlauto}>
                        <span className={classes.icon}>
                            <ShoppingCartIcon style={{ fontSize: 50, background: 'grey', opacity: 0.7, borderRadius: 6, color: "#c7ecee" }} />
                        </span>
                    </div>
                </div>
                <div className={classes.dashboardbox3}>

                    <div className="col1">
                        <h4 className={classes.h4}>Total Progress</h4>
                        <span className={classes.span}><CountUp
                            start={0}
                            end={75}
                            duration={.7} />%</span>

                        <h4><Stack spacing={2} sx={{ flexGrow: 1 }}>

                            <BorderLinearProgress variant="determinate" value={80} style={{ width: "100%" }} />
                        </Stack>
                        </h4>

                    </div>

                    <div className={classes.mlauto}>
                        <span className={classes.icon}>
                            <AccountBalanceWalletIcon style={{ fontSize: 50, background: 'grey', opacity: 0.7, borderRadius: 6, color: "#c7ecee" }} />
                        </span>
                    </div>
                </div>
                <div>

                </div>



            </div>
            <div className={classes.maindiv2}>


                <BarChart />
                {/* <GeoChart /> */}

                <SecondBarChart />


            </div>
            <div className={classes.maindiv3}>


                <GeoChart />
                {/* <BarChart /> */}

                <PieChartBar />



            </div>
            {/* <div className={classes.maindiv3}>
                <DisplayProductDetails  />
            </div> */}

            <div>

            </div>
        </div>



    )
}