import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function BarChartLocal({ course }) {
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
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
          colors={["#90caf9"]}
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
      </ThemeProvider>{" "}
    </div>
  );
}

export default BarChartLocal;
