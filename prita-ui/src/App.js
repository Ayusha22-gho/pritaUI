import './App.css';
import {  Routes, Route } from "react-router-dom";
import Land from './components/Landing/Land';
import HomeScreen from "./components/HomeScreen/homescreen"
import BranchTest from "./components/BranchTesting/BranchTest"
import WithoutUTC from './components/WithoutUTC/WithoutUTC';
function App() {
  return (
    <Routes>
      <Route
        exact path = "/"
        element = {
       <Land/>
       }
      ></Route>
      <Route
       exact path = "/preSIT"
       element = {<HomeScreen heading="PRITA - PreSIT"/>}
      >
      </Route>
      <Route
       exact path = "/SIT"
       element = {<BranchTest heading = "Workflow Testing - Branch Search"/>}
      >
      </Route>
      <Route
       exact path = "/rules-without-utc"
       element = {<WithoutUTC heading = "Rules Without Unit Test Cases"/>}
      >
      </Route>
      <Route
      exact path = "/"
      >

      </Route>
    </Routes>
  );
}

export default App;
