import { Subtitles, Title } from "@mui/icons-material";
import React from "react";
import {Chart} from "react-google-charts"


export const data =[
    ["Country","Sales"],
    ["Germany",2085610],
    ["India",5060566],
    ["United States",10000],
    ["Canada",1050046],
    ["Australia",400060],
    ["Russia",450160],
    
]

export const options ={
     
    colorAxis: { colors: ["#00853f", "#e74c3c", "#2bcbba"] },
//   backgroundColor: "#ced6e0",
//   defaultColor: "#009432",
  datalessRegionColor: "#b2bec3",
}


export default function GeoChart(){
    return(
        <Chart 
        chartEvents={[
            {
                eventName:"select",
                callback:({chartWrapper})=>{
                    const chart = chartWrapper.getChart();
                    const selection = chart.getSelection();
                    if (selection.length === 0) 
                        return;
                    const region = data[selection[0].row + 1];
                    console.log("Selected:"+region)

                },
            },
        ]}
        chartType="GeoChart"
        width="100%"
        height="350px"
        data={data}
        options={options}
        />
    )

}