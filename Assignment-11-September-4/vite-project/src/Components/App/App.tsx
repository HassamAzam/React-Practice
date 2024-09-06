import "./App.css";
import { Provider } from "react-redux";
import store from "../../store/store";
import Dashboard from "../Dashboard/Dashboard";
import SignUp from "../SignUp/SignUp";
import { Routes, Route } from "react-router-dom";
import Login from "../Login/Login";
import ForgetPassword from "../Login/ForgetPassword";

function App() {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/forgetPassword" element={<ForgetPassword />}></Route>
        </Routes>
      </Provider>
    </>
  );
}

export default App;
