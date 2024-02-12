import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

function BarChartLocal({ course }) {
  return (
    <BarChart
      xAxis={[
        {
          scaleType: "band",
          data: ["A", "B", "C", "D", "F", "W", "Pass", "No Pass"],
        },
      ]}
      yAxis={[
        {
          min: 0,
          max: 100,
          label: "Percent of total students",
        },
      ]}
      colors={["#1a7da3"]}
      series={[
        {
          data: [
            +course.percentA,
            +course.percentB,
            +course.percentC,
            +course.percentD,
            +course.percentF,
            +course.percentW,
            +course.percentP,
            +course.percentNP,
          ],
        },
      ]}
      width={500}
      height={300}
    />
  );
}

export default BarChartLocal;
