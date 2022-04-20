import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware } from 'redux'
import {addFormSubmitSagaTo} from 'redux-form-submit-saga';
import createSagaMiddleware from "@redux-saga/core"
import reducer from './reducer/reducer'
import { BrowserRouter as Router,
  Routes,
  Route,
  Link} from "react-router-dom";
import allMySagas from './sagas/saga'
import HomeComponent from './components/appHomeComponent';
import { Provider } from 'react-redux';

const sagaMiddleware = createSagaMiddleware();

export const myStore = createStore(reducer,applyMiddleware(sagaMiddleware))

const rootSaga = addFormSubmitSagaTo(allMySagas);
sagaMiddleware.run(rootSaga);


//const actionBalance = (type,account) => myStore.dispatch({type,account})


function render(){
ReactDOM.render(
  <React.StrictMode>
    <Provider store={myStore}>
      <Router>
        <Routes>
          <Route path="/" element={<HomeComponent value={myStore.getState()} />} />
        </Routes>
      </Router>
    </Provider>
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

