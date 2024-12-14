import React, { useState, useEffect, useRef } from 'react';
import { registerUser } from '../BooksService';
import { useAuth } from './UserData';
import { useNavigate } from 'react-router-dom';
import ErrorBanner from './Banners/ErrorBanner';
import GoogleButton from 'react-google-button';
import axios from 'axios';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showError, setShowError] = useState('');
  const [showPopover, setShowPopover] = useState(false);
  const { updateToken, updateUserName, updateEmail, updatePhoneNumber } = useAuth();
  const navigate = useNavigate();
  const popoverRef = useRef<HTMLDivElement>(null);

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

  const handleRegister = async () => {
    setShowError('');
    if (!username || !email || !password || !confirmPassword) {
      setShowError('Wszystkie pola muszą być wypełnione.');
      setTimeout(() => setShowError(''), 5000);
      return;
    }

    try {
      const data = await registerUser(email, username, password, phoneNumber);
      if (data) {
        updateToken(data.token);
        updateUserName(data.username);
        updateEmail(data.email);
        updatePhoneNumber(data?.phoneNumber);
        navigate('/');
      }
    } catch (error: any) {
      setShowError(error.response.data.error[0]);
      setTimeout(() => setShowError(''), 5000);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
      setShowPopover(false);
    }
  };

  useEffect(() => {
    if (showPopover) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopover]);

  return (
    <div style={styles.pageContainer}>
      {showError && <ErrorBanner message={showError} />}
      <div style={styles.container}>
        <div style={styles.formGroup}>
          <label style={styles.label}>E-mail:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            placeholder="E-mail"
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Nazwa użytkownika:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            placeholder="Nazwa użytkownika"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Hasło:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            placeholder="Hasło"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Powtórz hasło:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
            placeholder="Powtórz hasło"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Numer telefonu (opcjonalne):{' '}
            <span
              style={styles.infoIcon}
              onClick={() => setShowPopover((prev) => !prev)}
            >
              ℹ️
            </span>
          </label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={styles.input}
            placeholder="Numer telefonu"
          />
          {showPopover && (
            <div ref={popoverRef} style={styles.popover}>
              Podaj numer telefonu, aby klienci mogli się z Tobą skontaktować – zwiększa to szanse na sprzedaż i ułatwia nawiązanie relacji. Numer telefonu będzie dostępny dla wszystkich klientów Druga Książka.
            </div>
          )}
        </div>

        <button type="button" onClick={handleRegister} style={styles.button}>
          Zarejestruj się
        </button>
        <GoogleButton style={styles.googleButton} onClick={onGoogleLoginSuccess} label="Zarejestruj się przez Google" />
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
    minHeight: '90vh',
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
    position: 'relative' as const,
  },
  label: {
    fontSize: '18px',
    color: '#333',
    marginBottom: '5px',
    display: 'flex',
    alignItems: 'center' as const,
  },
  input: {
    padding: '12px 15px',
    fontSize: '18px',
    borderRadius: '10px',
    border: '1px solid #e0e0e0',
    outline: 'none',
    backgroundColor: '#f9f9f9',
  },
  button: {
    marginTop: '20px',
    padding: '12px 0',
    borderRadius: '25px',
    fontSize: '18px',
    fontWeight: 'bold' as const,
    color: '#fff',
    backgroundColor: '#4682b4',
    border: 'none',
    cursor: 'pointer' as const,
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
    transition: 'background-color 0.3s',
  },
  infoIcon: {
    fontSize: '18px',
    color: '#4682b4',
    cursor: 'pointer',
    marginLeft: '5px',
  },
  popover: {
    position: 'absolute' as const,
    top: '40px',
    right: '-100px',
    left: '200px',
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontSize: '16px',
    color: '#333',
    zIndex: 10,
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

export default Register;
