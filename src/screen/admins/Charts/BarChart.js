import { Subtitles, Title } from "@mui/icons-material";
import React from "react";
import {Chart} from "react-google-charts"


export const data =[
    ["Year","Salse","Expenses","Profit"],
    ["2021",1000,400,200],
    ["2022",1170,460,250],
    ["2023",660,1120,300],
    ["2024",1030,540,350],
]
export const options ={
    Chart: {
        Title:"Company Perfomance",
        Subtitles:"Sales , Expenses, and Profit: 2021-2024"
    },
    colors:["#2980b9","#e67e22","#81ecec"],
}



export default function BarChart(){
    return(
        <Chart 
        chartType="Bar"
        width="100%"
        height="350px"
        data={data}
        options={options}
        />
    )

}