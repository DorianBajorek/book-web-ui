import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
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
import EmailVerification from './components/VerificationView';
import ResetPassword from './components/ResetPassword';
import Footer from './components/Footer';
import ContactView from './components/ContactView';
import InfoView from './components/InfoView'

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
        <div className="App" style={{backgroundColor: "#f5f8fa"}}>
          {windowWidth < 600 ? <NavMobileView /> : <Nav />}
          <Helmet>
            <title>Drugaksiazka.pl - Sprzedaj używane książki online</title>
            <meta name="description" content="Sprzedaj używane książki online za pomocą aplikacji do skanowania kodów kreskowych. Wystawiaj książki na sprzedaż w kilka sekund!" />
            <meta name="keywords" content="sprzedaż książek online, używane książki, książki na sprzedaż, aplikacja do sprzedaży książek, sprzedaj książki, skanowanie kodów kreskowych książek, druga książka,
            tania ksiażka, księgania online." />
          </Helmet>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profil/:userLogin" element={<Profile />} />
            <Route path="/logowanie" element={<Login />} />
            <Route path="/rejstracja" element={<Register />} />
            <Route path="/oferta/:offer_id" element={<BookDetails />} />
            <Route path="/oferty" element={<SearchScreen />} />
            <Route path="/verification" element={<EmailVerification />} />
            <Route path="/zmiana-hasla" element={<ResetPassword />} />
            <Route path="/kontakt" element={<ContactView />} />
            <Route path="/informacje" element={<InfoView />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
