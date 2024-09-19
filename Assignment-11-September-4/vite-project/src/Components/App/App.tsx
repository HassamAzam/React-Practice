import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { lazy, Suspense } from 'react';

import './App.css';
import configureStore from 'src/configStore';
import DetailsForm from 'src/Components/Dashboard/DetailsForm';
import ForgetPassword from 'src/Components/Login/ForgetPassword';
import Login from 'src/Components/Login/Login';
import SignUp from 'src/Components/SignUp/SignUp';
import SurveyComponent from 'src/Components/Dashboard/SurveyComponent';

const Dashboard = lazy(() => import('src/Components/Dashboard/Dashboard'));
const PrivateComponent = lazy(() => import('src/Components/PrivateComponent'));

const selectedStore: Store = configureStore();

const App = () => {
  return (
    <Provider store={selectedStore}>
      <Suspense fallback={<div>Loading the id...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route
            path="/dashboard"
            element={<PrivateComponent route="/login" component={Dashboard} />}
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
