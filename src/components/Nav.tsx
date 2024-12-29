import React from 'react';
import '@fontsource/inter';
import { useAuth } from './UserData';
import { useNavigate } from 'react-router-dom';

const Nav: React.FC = () => {
  const { token, logout, login } = useAuth();
  const navigate = useNavigate();

  return (
    <nav style={styles.nav}>
      <a href="/" style={styles.logoWrapper} rel="noopener noreferrer">
        <img src="/simpleLogo.png" alt="Logo" style={styles.logoImage} />
        <p style={{ color: '#169ee7', cursor: 'pointer' }}>Druga Książka</p>
      </a>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <a href="/" style={styles.navLink}>Strona główna</a>
        </li>
        <li style={styles.navItem}>
          <a href="/oferty" style={styles.navLink}>Ogłoszenia</a>
        </li>
        {token ? (
          <>
            <li style={styles.navItem}>
              <a href={`/profil/${login}`} style={styles.navLink}>Profil</a>
            </li>
            <li style={styles.navItem}>
              <a onClick={logout} href="/" style={styles.navLink}>Wyloguj się</a>
            </li>
          </>
        ) : (
          <>
            <li style={styles.navItem}>
              <a href="/logowanie" style={styles.navLink}>Zaloguj się</a>
            </li>
            <li style={styles.navItem}>
              <a href="/rejstracja" style={styles.navLink}>Zarejestruj się</a>
            </li>
          </>
        )}
        <li style={styles.navItem}>
          <a href="/kontakt" style={styles.navLink}>Kontakt</a>
        </li>
        <li style={styles.navItem}>
          <a href="/informacje" style={styles.navLink}>Informacje</a>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: '5px 50px 10px 50px',
    borderBottom: 'solid 1px #e5e5e5',
    fontFamily: '"Inter", sans-serif',
  },
  navList: {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  navItem: {
    marginLeft: '1.5rem',
  },
  navLink: {
    color: '#169ee7',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1rem',
  },
  logoWrapper: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#555',
    cursor: 'pointer',
  },
  logoImage: {
    marginRight: '0px',
    width: '80px',
    height: '80px',
    cursor: 'pointer',
  },
};

export default Nav;
