import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "./App.css"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import {Login, Register, Home, Users} from "../src/views"


export type InputStateType = { email: string, password: string, name: string, jobTitle: string};
export type HandleInputType = { name: string, value: string }


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Register /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/home" element={ <Home /> } />
        <Route path="/users" element={ <Users /> } />
      </Routes>
    </Router>
  );
}

export default App;


