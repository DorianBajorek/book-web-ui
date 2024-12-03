import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { requestResetPassword, resetPassword } from '../BooksService';
import ErrorBanner from './Banners/ErrorBanner';

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [uid, setUid] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [showError, setShowError] = useState(false); // Dodanie stanu błędu
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setUid(searchParams.get('uid'));
    setToken(searchParams.get('token'));
  }, [location.search]);

  const handleSendLink = async () => {
    console.log(`Reset password link sent to: ${email}`);
    await requestResetPassword(email);
    setEmailSent(true);
    setTimeout(() => navigate('/login'), 3000);
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setShowError(true); // Ustawienie błędu na true
      setTimeout(() => setShowError(false), 5000); // Ukrycie błędu po 5 sekundach
      return;
    }
    if (uid && token) {
      await resetPassword(uid, token, newPassword);
    }
    alert('Hasło zostało zmienione.');
    navigate('/login');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, action: () => void) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  return (
    <div style={styles.pageContainer}>
      {showError && <ErrorBanner message="Hasła nie pasują do siebie!" />} {/* Wyświetlenie baneru */}
      <div style={styles.container}>
        {uid && token ? (
          <>
            <h2 style={styles.title}>Zresetuj swoje hasło</h2>
            <div style={styles.formGroup}>
              <label style={styles.label}>Nowe hasło:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, handleResetPassword)}
                style={styles.input}
                placeholder="Podaj nowe hasło"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Potwierdź nowe hasło:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, handleResetPassword)}
                style={styles.input}
                placeholder="Potwierdź nowe hasło"
              />
            </div>
            <button type="button" onClick={handleResetPassword} style={styles.button}>
              Zapisz
            </button>
          </>
        ) : emailSent ? (
          <div style={styles.messageContainer}>
            <h2 style={styles.title}>Link wysłany!</h2>
            <p style={styles.message}>Sprawdź swoją skrzynkę e-mail, aby zresetować hasło.</p>
          </div>
        ) : (
          <>
            <h2 style={styles.title}>Zresetuj hasło</h2>
            <div style={styles.formGroup}>
              <label style={styles.label}>Adres e-mail:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, handleSendLink)}
                style={styles.input}
                placeholder="Podaj adres e-mail"
              />
            </div>
            <button type="button" onClick={handleSendLink} style={styles.button}>
              Wyślij
            </button>
          </>
        )}
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
  title: {
    fontSize: '20px',
    fontWeight: 'bold' as const,
    marginBottom: '20px',
    textAlign: 'center' as const,
    color: '#333',
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
  messageContainer: {
    textAlign: 'center' as const,
  },
  message: {
    fontSize: '16px',
    color: '#555',
    marginTop: '10px',
  },
};

export default ResetPassword;
