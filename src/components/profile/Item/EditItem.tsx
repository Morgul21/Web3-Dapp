import React, { useCallback, useState } from "react";
import { ethers} from 'ethers'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Grid, TextField  } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from "../../style/mui-theme";
import { useParams } from "react-router-dom";
import { abifile } from "../../../sagas/mynft.abi";
import { contractAddress } from "../../../contracts/contractAddress";

const EditItem = () => {
    const [URI,setUri] = useState();
    const {id} = useParams();
    const tokenId = id.substring(1);
    
    const updateURI = async(tokenId,newURI) => {
       
        if(newURI != null){
            try{
                if(window.ethereum){
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    const signer = provider.getSigner();
                    const nftContract = new ethers.Contract(contractAddress, abifile, signer);
                    let nftToken = await nftContract.setNewURI(tokenId, newURI);
                    console.log(nftToken);
                }
            }catch(error){
                console.log(error);
            }
        }
    };

    const handleUri = useCallback((e) => {
        console.log("enter");
        setUri(e.target.value);
    },[updateURI])

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
                <p id="child-modal-description">
                    TokenId: {tokenId}
                    </p>
                </Typography>
                
                <TextField id="outlined-basic" label="Set a new Uri" variant="filled" 
                    value={URI} onChange={handleUri}/> <br></br>

                <Button size="large" color="secondary"  
                        variant="outlined" onClick={() => updateURI(tokenId,URI)}>
                    Edit!
                </Button>
            </Grid>
        </Box>
    )   
}

export default EditItem;