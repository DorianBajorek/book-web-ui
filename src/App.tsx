import React from 'react';
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

function App() {
  return (
    <AuthProvider>
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/book-details" element={<BookDetails />} />
          <Route path="/offers" element={<SearchScreen />} />
        </Routes>
      </div>
    </Router>
    </AuthProvider>
  );
}
export default App;
