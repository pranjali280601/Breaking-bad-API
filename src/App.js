import React,{useEffect,useState} from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Home from './screens/Home'
import Info from './screens/Info'
import "./App.css"

const App=()=>{

  return (
    <BrowserRouter>
    <Switch>
     <div className = "screen">
      <Route exact path="/">
      <Home />
      </Route>
      <Route exact path="/info">
      <Info />
      </Route>
      </div>
      </Switch>
    </BrowserRouter>
   
  );
}


export default App;
