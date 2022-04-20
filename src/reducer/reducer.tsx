import { initialState } from "../initial-states/initialState";


export default function handleAccount(state=initialState,action){
    switch(action.type){
        case 'SET':{
            console.log("SET state:",state);
            console.log("SET action:",action);
            state.accountNumber = action.payload[0];
            return state;
        }
        case 'GETVAL':{
            console.log("GETVAL action.state:",state)
            console.log("GETVAL action.balance:",action.payload)
            state.balance = action.payload;
           return state
        }
        case 'FETCH':{
            state.mintedNFTs = action.payload;
            console.log("stateFetched:",state);
            return state;
        }
        default:{
            console.log("state default",state)
            return state;
        }
    }
}