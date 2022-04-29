import React, { useCallback, useEffect, useState } from "react";
import { ethers} from 'ethers'
import { useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Grid, Modal  } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { darkTheme } from "../../style/mui-theme";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { abifile } from "../../../sagas/mynft.abi";
import { contractAddress } from "../../../contracts/contractAddress";

const ItemDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const action=  useCallback((type) => dispatch({type}),[dispatch]);

    const {id} = useParams();
    const tokenId = id.substring(1);
    const [tokenUri,setTokenUri] = useState();
    const [domainName,setDomainName] = useState();
    const [open,setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }
    useEffect(() =>{
        async function getTokenUri(){
            try{
                if(window.ethereum){
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    const signer = provider.getSigner();
                    const nftContract = new ethers.Contract(contractAddress, abifile, signer); 
                    setTokenUri(await nftContract.tokenURI(tokenId))
    
                }
            }catch(error){
                console.log(error);
            }
        }
        async function getDomainName(){
            try{
                if(window.ethereum){
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    const signer = provider.getSigner();
                    const nftContract = new ethers.Contract(contractAddress, abifile, signer); 
                    setDomainName(await nftContract.printDomainName(tokenId))
                }
            }catch(error){
                console.log(error);
            }
        }
        console.log();
        getTokenUri();
        getDomainName();
    },[tokenUri])
    
    const editURI = useCallback(() => {
        action('UPDATE_URI');
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
            <Grid container direction="column" alignItems="center" 
                                                justifyContent="center" >
                <Typography component={'div'} color="secondary" variant="body1" 
                            sx={{ flexGrow: 1}} alignItems="center" justifyContent="center">
                    <h4>{domainName}</h4>
                    <Button onClick={handleOpen}>Open Metadata</Button>
                    <Modal
                        hideBackdrop
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="child-modal-title"
                        aria-describedby="child-modal-description"
                    >
                        <Box sx={{ ...modalStyle, width: 1000 }}>
                        <Typography component={'div'} color="secondary" variant="body1" 
                            sx={{ flexGrow: 1}} alignItems="center" justifyContent="center">
                            <h2 id="child-modal-title">{domainName} metadata</h2>
                            <p id="child-modal-description">
                                TokenId: {tokenId}
                            </p>
                            <p id="child-modal-description">
                                TokenUri: {tokenUri} <Button onClick={() => navigate(`/edit/:${tokenId}`)}>edit</Button>
                            </p>
                            <Button onClick={handleClose}>Close</Button>
                        </Typography>
                        </Box>
                    </Modal>
                </Typography>
            </Grid>
        </Box>
    )
}

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: ' #000',
    border: '2px solid #39ff14',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };


export default ItemDetails;