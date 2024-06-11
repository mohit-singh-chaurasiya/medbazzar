import { LineWeight, Subtitles, Title } from "@mui/icons-material";
import { colors } from "@mui/material";
import React from "react";
import {Chart} from "react-google-charts"


export const data =[
    [
        {type:"number",label:"x"},
        {type:"number",label:"values"},
        {id:"i0",type:"number",role:"interval"},
        {id:"i1",type:"number",role:"interval"},
        {id:"i2",type:"number",role:"interval"},
        {id:"i2",type:"number",role:"interval"},
        {id:"i3",type:"number",role:"interval"},
        {id:"i3",type:"number",role:"interval"},

    ],
    [1,100,90,110,85,96,104,120],
    [2,120,95,130,90,113,124,120],
    [3,140,85,110,85,96,104,150],
    [4,61,55,95,97,56,104,102],
    [5,60,98,88,89,76,189,180],
    [6,90,88,82,72,88,140,118],
    [7,65,77,65,54,98,56,156],
    [8,79,90,110,85,96,104,120],
]
export const options ={
   series:[{color:"#1A8763"}],
   intervals:{ LineWeight:1,barWidth:1,style:"boxes"},
   legend:"none"
};



export default function SecondBarChart(){
    return(
        <Chart 
        chartType="LineChart"
        width="100%"
        height="350px"
        data={data}
        options={options}
        />
    )

}