import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import { store } from './Store/store';
import {Provider} from 'react-redux'
import Dashboard from './Components/Dashboard';
function App() {
  return (

    <div className="App">
    <Provider store={store}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Provider>

    </div>
  );
}

export default App;
