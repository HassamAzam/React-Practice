import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import PrivateRoute from "../../Components/PrivateRoute";
import Dashboard from "../Pages/Dashboard";

import "./App.css";
import { store } from "../../store/store";

const Login = React.lazy(() => import("../Pages/Login"));
const SignUp = React.lazy(() => import("../Pages/SignUp"));
const Welcome = React.lazy(() => import("../Pages/Welcome"));

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/dashboard"
              element={<PrivateRoute toBeAuthenticated={Dashboard} />}
            />
          </Routes>
        </Suspense>
      </Provider>
    </div>
  );
}

export default App;
