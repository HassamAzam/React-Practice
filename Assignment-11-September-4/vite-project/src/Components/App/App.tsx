import { Store } from "redux";
import "./App.css";
import { Provider } from "react-redux";
import Dashboard from "../Dashboard/Dashboard";
import SignUp from "../SignUp/SignUp";
import { Routes, Route } from "react-router-dom";
import Login from "../Login/Login";
import ForgetPassword from "../Login/ForgetPassword";
import DetailsForm from "../Dashboard/DetailsForm";
import SurveyComponent from "../Dashboard/SurveyComponent";
import sagaStore from "../../sagaStore/sagas/sagaStore";
import store from "../../store/store";

const selectedStore: Store =
  import.meta.env.VITE_MIDDLEWARE === "thunk" ? store : sagaStore;

function App() {
  return (
    <>
      <Provider store={selectedStore}>
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
