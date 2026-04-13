import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import Account from './components/Account';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="app-wrapper">
        <Navbar isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                isLoggedIn
                  ? <Navigate to="/" replace />
                  : <Login onLogin={() => setIsLoggedIn(true)} />
              }
            />
            <Route
              path="/registration"
              element={
                isLoggedIn
                  ? <Navigate to="/" replace />
                  : <Registration onRegister={() => setIsLoggedIn(true)} />
              }
            />
            <Route
              path="/account"
              element={
                isLoggedIn
                  ? <Account />
                  : <Navigate to="/login" replace />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
