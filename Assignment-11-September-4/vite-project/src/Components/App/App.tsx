import "./App.css";
import { Provider } from "react-redux";
import store from "../../store/store";
import Dashboard from "../Dashboard/Dashboard";
import SignUp from "../SignUp/SignUp";
import { Routes, Route } from "react-router-dom";
import Login from "../Login/Login";
import ForgetPassword from "../Login/ForgetPassword";
import DetailsForm from "../Dashboard/DetailsForm";
import SurveyComponent from "../Dashboard/SurveyComponent";

function App() {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="profile" element={<DetailsForm />} />
            <Route path="questions" element={<SurveyComponent />} />
          </Route>
        </Routes>
      </Provider>
    </>
  );
}

export default App;
