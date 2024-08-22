import {Routes, Route} from "react-router-dom";
 
import './App.css';
import Login from './Login';
import SignUp from './SignUp';
import Welcome from "./welcome";


 

function App() {
  return (
    <div className="App">
    
    <Routes>
    <Route path="/" element={<Welcome/>}></Route>
    <Route path="/login" element={<Login/>}></Route>
    <Route path="/signup" element={<SignUp/>}></Route>
    </Routes>
    </div>
  );
}

export default App;
