import React, { useState } from "react";
import PropTypes from "prop-types"
import { getValue } from "@testing-library/user-event/dist/utils";
import { myStore } from "..";
import LoginPage from "./login/loginPage"
import ProfilePage from "./profile/profilePage";
import { BrowserRouter as Router,
    Routes,
    Route,
    Link } from "react-router-dom";

const appHomeComponent = ({value}) => {
    
    console.log("value",value.accountNumber);
    console.log("value",value.balance);
    console.log("value of minted nfts",value.mintedNFTs);
    const actionBalance = (type,account) => myStore.dispatch({type,account})
    const actionMint = (type,tokenUri,domainName) => myStore.dispatch({type,tokenUri,domainName})
    const action = type => myStore.dispatch({type})
    
    function clickLogin(){
      action('LOGIN')
    }

    function clickGetBalance(){
        actionBalance('GETBALANCE',value.accountNumber)
    }


    function clickMintNFT(tokenUri,domainName){
        console.log("clickmintnft")
        actionMint('MINT',tokenUri,domainName);
    }

    function clickFetchNFT(){
        console.log("clickfetchnft")
        action('GET_NFTS');
    }
    
    if(value.accountNumber == null){
        return(
           <LoginPage value={value.accountNumber} onLoginClick={clickLogin}/>
        )
    }else{
        return(
            <Router>
            <ProfilePage accountNumber={value.accountNumber}
                        balance={value.balance}
                        nfts={value.mintedNFTs }
                        onBalanceClick={clickGetBalance} 
                        onMintingClick={clickMintNFT}
                        fetchingAllClick={clickFetchNFT}/>
            </Router>
        )
    }
    
}
appHomeComponent.propTypes = {
    value:PropTypes.object.isRequired
}

export default appHomeComponent
  