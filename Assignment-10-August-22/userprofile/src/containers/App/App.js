import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {Provider} from 'react-redux'

import './App.css';
import Login from '../Pages/Login';
import SignUp from '../Pages/SignUp';
import { store } from '../../Store/store';

import Dashboard from '../Pages/Dashboard';

function App() {
  return (

    <div className="App">
    <Provider store={store}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Provider>

    </div>
  );
}

export default App;
