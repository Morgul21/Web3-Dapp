import React, { useCallback, useState } from "react";
import { AppBar, Box, Button, Grid, TextField, ThemeProvider, Toolbar, Typography } from "@mui/material";
import { darkTheme } from "../../style/mui-theme";
import { useDispatch } from 'react-redux';

const MintPage = () => {
    const dispatch = useDispatch();
    const actionMint = useCallback((type,tokenUri,domainName) => dispatch({type,tokenUri,domainName}),[dispatch]);
    const [tokenUri,setTokenUri] = useState("");
    const [domainName,setDomainName] = useState("");
    
    function mintNFT () {
        console.log("mintNFT");
        actionMint('MINT',tokenUri,domainName);
    }


    const handleTokenUri = useCallback((e) => {
        setTokenUri(e.target.value);
    },
    []);
    
    const handleDomain = useCallback((e) => {
        setDomainName(e.target.value);
    },
    []);

   
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

            <Grid container direction="column" alignItems="center" justifyContent="center" 
                                                                    sx={{borderBottom:20}}>
                <Typography color="secondary" variant="body1" alignItems="center" 
                        justifyContent="center" component="div" sx={{ flexGrow: 1}}>
                <TextField id="outlined-basic" label="Token Uri" variant="outlined"  
                    value={tokenUri} onChange={handleTokenUri} /> <br></br>

                <TextField id="outlined-basic" label="Domain Name" variant="filled" 
                    value={domainName} onChange={handleDomain}/> <br></br>

                <Button size="large" color="secondary"  
                        variant="outlined" onClick={mintNFT}>Mint a new domain!
                    </Button> <br></br>
                
                </Typography>
            </Grid>
        </ThemeProvider>
        
        </Box>
    )
}

export default MintPage;