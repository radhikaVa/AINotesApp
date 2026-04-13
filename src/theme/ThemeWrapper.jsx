
import { createTheme,CssBaseline,ThemeProvider } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';

const ThemeWrapper = ({children}) => {
    const {mode}=useSelector((state)=>state.notes)
     const theme= createTheme({
            palette: {
              mode: mode||"light",
              primary: {
                main: "#6366f1"
              },
              secondary: {
                main: "#22c55e"
              },
              background: {
                default: mode === "dark" ? "#121212" : "#f5f5f5"
              }
            }
          });
  return (
    <ThemeProvider theme={theme}>
<CssBaseline/>
{children}
        </ThemeProvider>
  )
}

export default ThemeWrapper