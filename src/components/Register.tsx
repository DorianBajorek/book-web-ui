import React, { useState } from 'react';
import { registerUser } from '../BooksService';
import { useAuth } from './UserData';
import { useNavigate } from 'react-router-dom';
import ErrorBanner from './Banners/ErrorBanner';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showError, setShowError] = useState('');
  const { updateToken, updateUserName, updateEmail } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async () => {
    setShowError('');
    if (!username || !email || !password || !confirmPassword) {
      setShowError('Wszystkie pola muszą być wypełnione.');
      setTimeout(() => setShowError(''), 5000);
      return;
    }

    try {
      const data = await registerUser(email, username, password);
      if (data) {
        updateToken(data.token);
        updateUserName(data.username);
        updateEmail(data.email);
        navigate('/');
      }
    } catch (error) {
      setShowError('Wystąpił błąd podczas rejestracji.');
      setTimeout(() => setShowError(''), 5000);
    }
  };

  return (
    <div style={styles.pageContainer}>
      {showError && <ErrorBanner message={showError} />}
      <div style={styles.container}>
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
          <label style={styles.label}>E-mail:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            placeholder="Email"
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

        <button type="button" onClick={handleRegister} style={styles.button}>
          Zarejestruj się
        </button>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
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
};

export default Register;
