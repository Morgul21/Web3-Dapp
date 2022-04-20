
import { useState } from 'react';
import { put, takeEvery,all } from 'redux-saga/effects'
import {BigNumber, ethers} from 'ethers'
import { abifile } from './mynft.abi';
const contractAddress = "0x907F7a5B87EFfDC7C6da6C1742fCFd1d818F9039"
const addReceiver = "0x1bBFA1Bd92687A70B843218608DE6afb8F916Be7";
//const tokenURI = "https://github.com/Bi0nicman/metadata/blob/7b0b045fc1356b36bd11ab9f347a95b7f05f45ab/metadata.json";
interface NFTMETADATA {
    tokenId:string;
    tokenUri:string;
    tokenName:string;
};


const ConnectWalletHandler = async () => {
    
    if (window.ethereum && window.ethereum.isMetaMask) {
        console.log('MetaMask Here!');

        try {const resp = await window.ethereum.request({ method: 'eth_requestAccounts'})
        //console.log("respAcc: " ,resp[0])
        return resp;
        }catch(error){
            alert("Pending Request, please connect from the browser or from open window!")
        }
    } else {
        console.log('Need to install MetaMask');
        console.log('Please install MetaMask browser extension to interact');
    }
}

const getAllMintedNfts = async() => {
    var nftsmetadata:NFTMETADATA[] = [];
    try{
        if(window.ethereum){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log("1)provider:",provider);
            const signer = provider.getSigner();
            console.log("2)signer: ",signer);
            console.log(abifile);
            const nftContract = new ethers.Contract(contractAddress, abifile, signer);

            let nftIDs = await nftContract.getAllTokens();
            
           
            console.log("ids",nftIDs);
           
            for(const nftID of nftIDs){
                nftsmetadata.push({
                    tokenId:nftID["_hex"],
                    tokenUri:await nftContract.tokenURI(nftID),
                    tokenName:await nftContract.printDomainName(nftID)
                });
            }
           return nftsmetadata
            //return nfts;
            //console.log(nfts);
        }
    }catch(error){
        console.log(error);
    }
}

const mintNftHandler = async (tokenUri,domainName) => {
    console.log("enter");
    try {
    
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log("1)provider:",provider);
        const signer = provider.getSigner();
        console.log("2)signer: ",signer);
        console.log(abifile);
        const nftContract = new ethers.Contract(contractAddress, abifile, signer);

        console.log("3)nftContract: ",nftContract);
        console.log("Payment");

        let nftToken = await nftContract.mintNFTPayable(tokenUri,domainName,{value:ethers.utils.parseEther("0.01")});

        console.log("NFT TOKEN", nftToken);
        console.log("Mining... please wait");
        await nftToken.wait();

        console.log(`Mined, see transaction: https://ropsten.etherscan.io/tx/${nftToken.hash}`);

      } else {
        console.log("Ethereum object does not exist");
      }

    } catch (err) {
      console.log(err);
    }
  }

const getAccountBalance = async (account) =>  {

    try {
        console.log("account address inside balance,",account)
        const resp = await window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
        const balance = ethers.utils.formatEther(resp)
    
        console.log("respBal: " ,balance)
        return balance;
        }catch(error){
            console.log(error)
        }
};

export function* setAccount(){
    yield put({type:'SET',payload:yield ConnectWalletHandler()});
}

export function* setBalance(params){
    yield put({type:'GETVAL',payload:yield getAccountBalance(params.account)});
}

export function* payForMint(params){
    console.log("attempting to pay\n");
    mintNftHandler(params.tokenUri,params.domainName);
}

export function* fetchNfts(){
    console.log("attempting to fetch\n");
    yield put({type:'FETCH',payload:yield getAllMintedNfts()});
    
}


export function* waitMint(){
    //console.log("wait mint");
    yield takeEvery('MINT', payForMint)
}

export function* waitLogin() {
    yield takeEvery('LOGIN', setAccount)
}

export function* waitBalance(){
    //console.log("wait balance");
    yield takeEvery('GETBALANCE', setBalance)
}

export function* waitGetAllMintedNfts(){
    //console.log("wait mint");
    yield takeEvery('GET_NFTS', fetchNfts)
}


export default function* allMySagas(){
    yield all([
        waitLogin(),
        waitBalance(),
        waitMint(),
        waitGetAllMintedNfts(),
    ]);
}

