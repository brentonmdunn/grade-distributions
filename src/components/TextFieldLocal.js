import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
function TextFieldLocal({ text }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <TextField id="outlined-basic" label={text} variant="outlined" />
    </ThemeProvider>
  );
}

export default TextFieldLocal;
