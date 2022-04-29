import React, { useEffect, useCallback,useState } from "react";
import { useDispatch } from 'react-redux';
import Item from "./Item/Item";
import {useStore,useSelector} from "react-redux"
import { useNavigate } from "react-router-dom";
import { persistor } from "../..";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CircularProgress, Grid, Stack, TextField } from "@mui/material";
import { darkTheme } from "../style/mui-theme";

 const ProfilePage = () => {
    const store = useStore();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const action=  useCallback((type) => dispatch({type}),[dispatch]);
    const actionAccount =  useCallback((type,account) =>dispatch({type,account}),[dispatch]);
    const actionMint = useCallback((type,tokenUri,domainName) => dispatch({type,tokenUri,domainName}),[dispatch]);
    let stateAccountNumber = useSelector((state:any) => state.accountNumber)
    const nfts = useSelector((state:any) => state.mintedNFTs)
    const balance = useSelector((state:any) => parseFloat(state.balance).toFixed(4));
    const [firstCall,setFirstCall] = useState(false);
   
    const getBalance = useCallback(() => {
        setFirstCall(true);
        actionAccount('GETBALANCE',stateAccountNumber)
    },[actionAccount])

    const fetchNFT = useCallback(() => {
        action('GET_NFTS')
    },[action])

    
     const ShowNFT = useCallback(() => {
        console.log("showNFT",nfts);
        
        if(nfts != null){
            return(
                <Typography component={'div'} color="secondary" variant="body1" 
                         sx={{ flexGrow: 1}}>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
                    {nfts.map((nft) => 
                        <Grid item sx={{
                            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                            color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
                            border: '1px solid',
                            borderColor: (theme) =>
                              theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                            p: 1,
                            m: 1,
                            borderRadius: 2,
                            fontSize: '0.875rem',
                            fontWeight: '700'
                          }}  key={nft.tokenId}  onClick={() =>  navigate(`/item/:${nft.tokenId}`)}>
                            <Item value={nft.tokenName} />
                        </Grid>
                    )}
                </Box>
                </Typography>
                
            )
        }
        else{
            return(<Stack sx={{ color: 'grey.500' }} spacing={2} direction="row" alignItems="center">
            <CircularProgress color="secondary" />
          </Stack>)
        }
    },[nfts])

  
    useEffect(() => {
        if(!firstCall){
            getBalance();
            fetchNFT();
        }

        if(window.ethereum) {    
            window.ethereum.on('chainChanged', () => {
                console.log("loggin out 1")
                window.location.reload();
                
            });
            window.ethereum.on('accountsChanged', () => {
            persistor.purge();
                navigate("/")
            console.log("loggin out 2")
            window.location.reload();
            })}
    
        if (performance.navigation.type == performance.navigation.TYPE_RELOAD)
        setFirstCall(false);

        window.addEventListener("beforeunload", fetchNFT);
        return () => {
        window.removeEventListener("beforeunload", fetchNFT);
        };
          
    },[])
    
    return(
        <Box sx={{width:'100%'}}>
            <ThemeProvider theme={darkTheme}>
                <AppBar position="static">
                    <Toolbar>
                    <Typography color="secondary" variant="h6" component="div" sx={{ flexGrow: 1}}>
                        CryptoDomains
                    </Typography>
                    <Typography color="secondary">Welcome</Typography>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>

            <Grid container direction="column" alignItems="center" justifyContent="center" 
                                                                    sx={{borderBottom:20}}>
                <Typography color="secondary" variant="body1" alignItems="center" 
                        justifyContent="center" component="div" sx={{ flexGrow: 1}}>        
                    account: 1<br></br>
                    {stateAccountNumber}<br></br>
                    Balance: {balance} ETH<br></br>
                    <Button size="large" color="secondary"  
                                variant="outlined" onClick={() => navigate("/mint")}>
                    Mint a new domain!</Button>
                </Typography>
            </Grid>
            <ShowNFT/>
        </Box>
    )
}


const buttonStyle = {
    "Button:hover":{
        background:"#0000"
    }
    
}



export default ProfilePage;