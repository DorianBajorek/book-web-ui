import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { AuthProvider } from './components/UserData';
import Profile from './components/Profile';
import BookDetails from './components/BookDetails';
import SearchScreen from './components/SearchScreen';
import NavMobileView from './components/NavMobileView';

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          {windowWidth < 600 ? <NavMobileView /> : <Nav />}
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:userLogin" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/book-details/:offer_id" element={<BookDetails />} />
            <Route path="/offers" element={<SearchScreen />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
