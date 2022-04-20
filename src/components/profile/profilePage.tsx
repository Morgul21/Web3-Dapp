import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import FormMinting from "./formMinting/formMinting";
import Item from "./Item/Item";

import ItemDetails from "./Item/ItemDetails";

 const ProfilePage = ({accountNumber,
                        balance,
                        nfts,
                        onBalanceClick,
                        onMintingClick,
                        fetchingAllClick}) => {
        const dispatch = useDispatch();
        function showNFT(){
            if(nfts != null)
                return(
                    <ul>
                        {nfts.map( (nft) => <Item value={nft.tokenName}/> )}
                    </ul>
                )
        }

        useEffect(() => {
            const loadBalance = async () => {
                try{
                    await dispatch({type:"GETB",data:onBalanceClick()});
                }catch(error){console.log(error)}
            }

            const loadNFTs = async () => {
                try{
                    await dispatch({type:"GETNFTs",data:fetchingAllClick()});
                }catch(error){console.log(error)}
            }
            
            loadNFTs();
            showNFT();
            loadBalance();
        },[])

        showNFT();
    return(
        <div>
            <div>Welcome!</div>
            <button onClick={onBalanceClick}>GetBalance</button>
            <button onClick={fetchingAllClick}>FETCH NFT!</button>
            <FormMinting onMintingClick={onMintingClick}/>
            
            <div>Account: {accountNumber}</div>
            <div>Balance: {balance}</div>
            <h3>NFTs:</h3>
            {
                showNFT()
            }
        </div>
    )
}



export default ProfilePage;