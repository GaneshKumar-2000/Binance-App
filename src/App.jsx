import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { useSelector, useDispatch } from 'react-redux';
import Dashboard from './Layouts/Dashboard/dashboard';
import { login } from './redux/authStore/authStore';


import Login from './Layouts/Login/Login';

function App() {
  const dispatch = useDispatch();
  const isLogged = useSelector(state => state.auth.isLogged);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("usermail");
    if (token && email) {
      dispatch(login({ email, token }));
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {!isLogged ?
          <Route path="/" element={<Login />} />
          :
          <Route
            path="/"
            element={
              <Dashboard />
            }
          />}

        {/* <Route
          path="/table"
          element={
            <PrivateRoute>
              <TableSection />
            </PrivateRoute>
          }
        /> */}
      </Routes>
    </Router>

  )
}

export default App
