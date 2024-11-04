import React from 'react';
import '@fontsource/inter';
const Nav: React.FC = () => {
  return (
    <nav style={styles.nav}>
      <div style={styles.logoWrapper}>
        LOGO
      </div>
      <ul style={styles.navList}>
        <li style={styles.navItem}><a href="/" style={styles.navLink}>Home</a></li>
        <li style={styles.navItem}><a href="/about" style={styles.navLink}>About</a></li>
        {true ? (
          <>
            <li style={styles.navItem}><a href="/profile" style={styles.navLink}>Profile</a></li>
            <li style={styles.navItem}><a onClick={() => {}} href="/" style={styles.navLink}>Logout</a></li>
          </>
        ) : (
          <>
            <li style={styles.navItem}><a href="/login" style={styles.navLink}>Login</a></li>
            <li style={styles.navItem}><a href="/register" style={styles.navLink}>Register</a></li>
          </>
        )}
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
    padding: "5px 50px 10px 50px",
    borderBottom: "solid 1px #e5e5e5",
    fontFamily: '"Inter", sans-serif'
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
    display: 'flex',
    alignItems: 'center',
    fontSize: "24px",
    fontWeight: "bold",
    color: "#555"
  },
  logoImage: {
    marginRight: '15px',
    width: '35px',
    height: '40px'
  }
};

export default Nav;
