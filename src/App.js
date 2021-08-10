import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Home from './screens/Home'
import Info from './screens/Info'
import "./App.css"

const App=()=>{

  return (
    <BrowserRouter>
    <Switch>
     <div className = "screen">
      <Route exact path="/" component={Home} />
      <Route exact path="/info" component={Info} />
     </div>
    </Switch>
    </BrowserRouter>
   
  );
}


export default App;
