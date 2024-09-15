import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Store } from "redux";
import { lazy, Suspense } from "react";

import "./App.css";

import middleware from "src/settings";
import sagaStore from "src/sagaStore/sagaStore";
import store from "src/store/store";

const Dashboard = lazy(() => import("src/Components/Dashboard/Dashboard"));
const DetailsForm = lazy(() => import("src/Components/Dashboard/DetailsForm"));
const SurveyComponent = lazy(
  () => import("src/Components/Dashboard/SurveyComponent")
);
const ForgetPassword = lazy(
  () => import("src/Components/Login/ForgetPassword")
);
const Login = lazy(() => import("src/Components/Login/Login"));
const PrivateComponent = lazy(() => import("src/Components/PrivateComponent"));
const SignUp = lazy(() => import("src/Components/SignUp/SignUp"));

const selectedStore: Store = middleware === "thunk" ? store : sagaStore;

const App = () => {
  return (
    <Provider store={selectedStore}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route
            path="/dashboard"
            element={<PrivateComponent toBeAuthenticated={Dashboard} />}
          >
            <Route path="profile" element={<DetailsForm />} />
            <Route path="questions" element={<SurveyComponent />} />
          </Route>
        </Routes>
      </Suspense>
    </Provider>
  );
};

export default App;
