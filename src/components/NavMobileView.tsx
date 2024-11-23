import React, { useState } from 'react';
import '@fontsource/inter';
import { useAuth } from './UserData';
import { useNavigate } from 'react-router-dom';

const NavMobileView: React.FC = () => {
  const { token, logout, login } = useAuth();
  const navigate = useNavigate();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logoWrapper} onClick={handleLogoClick}>
        <img src="/simpleLogo.png" alt="Logo" style={styles.logoImage} />
        <p style={{ color: '#169ee7', cursor: 'pointer' }}>Druga Książka</p>
      </div>
      <button onClick={toggleMenu} style={styles.hamburgerButton}>
        ☰
      </button>

      {isMenuOpen && (
        <ul style={styles.navListMobile}>
          <li style={styles.navItem}>
            <a href="/" style={styles.navLink}>Strona główna</a>
          </li>
          {token ? (
            <>
              <li style={styles.navItem}>
                <a href="/offers" style={styles.navLink}>Ogłoszenia</a>
              </li>
              <li style={styles.navItem}>
                <a href={`/profile/${login}`} style={styles.navLink}>Profil</a>
              </li>
              <li style={styles.navItem}>
                <a onClick={logout} href="/" style={styles.navLink}>Wyloguj się</a>
              </li>
            </>
          ) : (
            <>
              <li style={styles.navItem}>
                <a href="/login" style={styles.navLink}>Zaloguj się</a>
              </li>
              <li style={styles.navItem}>
                <a href="/register" style={styles.navLink}>Zarejestruj się</a>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: '10px 20px',
    borderBottom: 'solid 1px #e5e5e5',
    fontFamily: '"Inter", sans-serif',
    position: 'relative' as 'relative',
  },
  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#555',
    cursor: 'pointer',
  },
  logoImage: {
    marginRight: '10px',
    width: '50px',
    height: '50px',
    cursor: 'pointer',
  },
  hamburgerButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#169ee7',
    display: 'block',
  },
  navListMobile: {
    position: 'absolute' as 'absolute',
    top: '60px',
    right: '0',
    backgroundColor: '#fff',
    width: '200px',
    padding: '10px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    listStyle: 'none',
    margin: 0,
  },
  navItem: {
    marginBottom: '1rem',
  },
  navLink: {
    color: '#169ee7',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1rem',
  },
};

export default NavMobileView;
