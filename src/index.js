import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import App from './App';
import Login from './components/Login';
import reportWebVitals from './reportWebVitals';

// HOC to check if user is logged in
const PrivateRoute = ({ element, ...rest }) => {
  const isLoggedIn = sessionStorage.getItem('loggedIn') === 'true';
  
  return isLoggedIn ? element : <Navigate to="/" />;
};

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route
        exact
        path="/"
        element={
          sessionStorage.getItem('loggedIn') === 'true' ? (
            <Navigate to="/dashboard" />
          ) : (
            <Login />
          )
        }
      />
      <Route path="/dashboard" element={<PrivateRoute element={<App />} />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
