import React from "react"
import Form from "./Components/Form"
import Pizza from "./Components/Pizza"
import {Switch, Route, Link} from "react-router-dom"


const App = () => {
  return (
    <>
      <h1>Lambda Eats</h1>
      <h1>HOMEPAGE</h1>
      {/* <Link to="/">Home</Link> */}
      <Link to="/pizza"><div id="order-pizza">Order Pizza</div></Link>
      <Switch>
        <Route exact path="/"></Route>
        <Route path="/pizza"><Pizza /></Route>
        {/* <Route path="/pizza"><Pizza /></Route> */}
      </Switch>
      
      
    </>
  );
};
export default App;
