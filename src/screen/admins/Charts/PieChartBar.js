import React from "react";
import {Chart} from "react-google-charts"


export const data = [
    ["Items", "Demand"],
    ["Medicines", 3000],
    ["Gloceries & Food", 4066],
    ["Dog Food", 2060],
    ["Eduipments", 22],
    ["Reviews", 500],
  ];
  
  export const options = {
    title: "Customer Daily Activities",
    is3D: true,
  };
  
  export function PieChartBar() {
    return (
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    );
  }
  