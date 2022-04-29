import { REHYDRATE } from 'redux-persist/lib/constants'; 
import { persistor } from "..";
import { initialState } from "../initial-states/initialState";

export default function handleAccount(state=initialState,action){
    switch(action.type){
        case 'SET':{
            console.log("SET state:",state);
            console.log("SET action:",action);
            return {...state,accountNumber:action.payload[0]};
        }
        case 'PURGE':{
            persistor.purge();
            return state;
        }
        case 'GETVAL':{
            console.log("GETVAL action.state:",state)
            console.log("GETVAL action.balance:",action.payload)
            return {...state,balance:action.payload};
        }
        case 'FETCH':{
            state.mintedNFTs = action.payload;
            console.log("stateFetched:",state);
            return {...state,nft:action.payload};
        }
        case REHYDRATE:{
            console.log("REHYDRATE",state,"action: ",action)
            return { ...state, persistedState: action.payload };
            break;
        }
        default:{
            console.log("state default",state)
            return state;
        }
    }
}