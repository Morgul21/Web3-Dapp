import React, { useCallback, useEffect, useMemo } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useStore } from "react-redux";
import "./css/loginpage.css"
import { useSelector } from "react-redux";

const LoginPage = () => {
  const navigate= useNavigate();
  const store = useStore();
  const dispatch = useDispatch();
  const action =  useCallback((type) => dispatch({type}),[dispatch])
  const stateAccountNumber = useSelector((state:any) => state.accountNumber)
  
  function CircularIndeterminate() {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }
 
  const clickLogin = useCallback(() => {
    action('LOGIN')
    
  },[action])

  useEffect(() => {
    if(stateAccountNumber == null){
      navigate("/")
    }
    else{
      navigate("/home")
    }
  },[stateAccountNumber])

  

const ButtonAppBar = useMemo(() => {
 console.log("login");
  return (
    <Box sx={{ flexGrow: 1 }}>
    <ThemeProvider theme={darkTheme}>
        <AppBar position="static">
            <Toolbar>
            <Typography color="secondary" variant="h6" component="div" sx={{ flexGrow: 1}}>
                CryptoDomains
            </Typography>
            <Button color="secondary" onClick={clickLogin}>Login</Button>
            </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
},[stateAccountNumber]);

console.log("val",stateAccountNumber)
    return(
      <div>
        {ButtonAppBar}
      </div>
)}

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
      secondary:{
          main:"#39ff14"
      }
    },
});


export default LoginPage

