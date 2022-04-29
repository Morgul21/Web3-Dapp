import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from "@redux-saga/core"
import reducer from './reducer/reducer'
import { BrowserRouter as Router,
  Routes,
  Route,
  Link} from "react-router-dom";
import allMySagas from './sagas/saga';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import LoginPage from './components/login/LoginPage';
import ProfilePage from './components/profile/ProfilePage';
import ItemDetails from './components/profile/Item/ItemDetails';
import EditItem from './components/profile/Item/EditItem';
import MintPage from './components/profile/Mint/MintPage';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);
const sagaMiddleware = createSagaMiddleware();

 const myStore = createStore(persistedReducer,applyMiddleware(sagaMiddleware))
let persistor = persistStore(myStore);

export { myStore, persistor, sagaMiddleware };

const rootSaga = allMySagas;
sagaMiddleware.run(rootSaga);

function render(){
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={myStore}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
              <Route path="/" element={<LoginPage/>} />
              <Route path="/home" element={<ProfilePage/>}/>
              <Route path="/mint" element={<MintPage/>}/>
              <Route path="/item/:id" element={<ItemDetails/>}/>
              <Route path="/edit/:id" element={<EditItem/>}/>
          </Routes>  
        </PersistGate>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
render()
myStore.subscribe(render)

