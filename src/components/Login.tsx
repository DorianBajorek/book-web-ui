import React, { useState } from 'react';
import { loginUser } from '../BooksService';
import { useAuth } from './UserData';
import { useNavigate } from 'react-router-dom';
import ErrorBanner from './Banners/ErrorBanner';
import GoogleButton from 'react-google-button';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const { updateToken, updateUserName, updateEmail, updatePhoneNumber } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await loginUser(username, password);
      if (data) {
        updateToken(data.token);
        updateUserName(data.username);
        updateEmail(data.email);
        updatePhoneNumber(data?.phoneNumber);
        navigate('/');
      }
    } catch (error) {
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    }
  };

  const onGoogleLoginSuccess = () => {
    const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
  
    const scope = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile'
    ].join(' ');
  
    const clientId = '894874389822-vus90gg05gp7p6n8g5roor2nibcsli3b.apps.googleusercontent.com';
    const redirectUri = 'https://drugaksiazka.pl/';
  
    const params = {
      response_type: 'code',
      client_id: clientId,
      redirect_uri: redirectUri,
      prompt: 'select_account',
      access_type: 'offline',
      scope
    };
  
    const urlParams = new URLSearchParams(params as Record<string, string>).toString();
    window.open(`${GOOGLE_AUTH_URL}?${urlParams}`, '_blank', 'noopener,noreferrer');
  };


  const handleChangePassword = () => {
    navigate('/zmiana-hasla');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div style={styles.pageContainer}>
      {showError && <ErrorBanner message="Nieprawidłowa nazwa użytkownika lub hasła" />}
      <div style={styles.container}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Nazwa użytkownika:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            style={styles.input}
            placeholder="Username"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Hasło:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            style={styles.input}
            placeholder="Password"
          />
          <div style={styles.changePasswordContainer}>
            <span style={styles.textLink} onClick={handleChangePassword}>
              Zapomniałeś hasła?
            </span>
          </div>
        </div>

        <button type="button" onClick={handleLogin} style={styles.button}>
          Login
        </button>
        <GoogleButton style={styles.googleButton} onClick={onGoogleLoginSuccess} label="Zaloguj się przez Google" />
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    fontFamily: '"Roboto", sans-serif', 
    display: 'flex',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    minHeight: '100vh',
    backgroundColor: '#f4f5fb',
  },
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '30px',
    borderRadius: '15px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    marginBottom: '15px',
  },
  label: {
    fontSize: '16px',
    color: '#333',
    marginBottom: '5px',
  },
  input: {
    padding: '12px 15px',
    fontSize: '16px',
    borderRadius: '10px',
    border: '1px solid #e0e0e0',
    outline: 'none',
    backgroundColor: '#f9f9f9',
  },
  changePasswordContainer: {
    display: 'flex',
    justifyContent: 'flex-end' as const,
    marginTop: '10px',
  },
  textLink: {
    fontSize: '14px',
    color: '#4682b4',
    cursor: 'pointer' as const,
    textDecoration: 'underline',
    transition: 'color 0.3s',
  },
  button: {
    marginTop: '20px',
    padding: '12px 0',
    borderRadius: '25px',
    fontSize: '16px',
    fontWeight: 'bold' as const,
    color: '#fff',
    backgroundColor: '#4682b4',
    border: 'none',
    cursor: 'pointer' as const,
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
    transition: 'background-color 0.3s',
  },
  googleButton: {
    marginTop: '20px',
    borderRadius: '25px',
    fontSize: '16px',
    color: '#000',
    backgroundColor: '#fff',
    border: 'none',
    cursor: 'pointer' as const,
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    width:'100%'
  },
  
};

export default Login;
