import React, { useState, CSSProperties, useEffect } from 'react';
import { useAuth } from './UserData';
import BooksList from './BookList';
import { useParams } from 'react-router-dom';
import { getUserData, exportUserOffers } from '../BooksService';

const Profile = () => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const { userLogin } = useParams<{ userLogin: string }>();
  const { login, token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (userLogin) {
        const data = await getUserData(userLogin);
        if (data) {
          setEmail(data.email || '');
          setPhoneNumber(data.phoneNumber || '');
        }
      }
    };

    fetchData();
  }, [userLogin]);

  const handleDownloadBooks = async () => {
    try {
      const username = userLogin || login;
      if (!username) {
        alert('Brak nazwy użytkownika.');
        return;
      }

      const blob = await exportUserOffers(token);

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${username}_books.txt`; 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert('Nie udało się pobrać listy książek.');
      console.error('Error downloading user offers:', error);
    }
  };

  return (
    <div style={styles.profileContainer}>
      <div style={styles.profileCard}>
        <img src="/avatar.png" alt="User Avatar" style={styles.avatar} />
        <div style={styles.infoContainer}>
          <div style={styles.infoRow}>
            <span style={styles.label}>Użytkownik:</span>
            <span style={styles.infoValue}>{userLogin}</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.label}>E-mail:</span>
            <span style={styles.infoValue}>{email}</span>
          </div>
          {phoneNumber !== 'undefined' && (
            <div style={styles.infoRow}>
              <span style={styles.label}>Telefon:</span>
              <span style={styles.infoValue}>{phoneNumber}</span>
            </div>
          )}
        </div>
      </div>
      {token && (
        <button type="button" onClick={handleDownloadBooks} style={styles.button}>
          Pobierz listę książek
        </button>
      )}
      <BooksList username={userLogin || login} />
    </div>
  );
};

const styles: {
  profileContainer: CSSProperties;
  profileCard: CSSProperties;
  avatar: CSSProperties;
  infoContainer: CSSProperties;
  infoRow: CSSProperties;
  label: CSSProperties;
  infoValue: CSSProperties;
  button: CSSProperties;
} = {
  profileContainer: {
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '30px',
    backgroundColor: '#f7f9fc',
    minHeight: '100vh',
    boxSizing: 'border-box',
  },
  profileCard: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '20px 40px',
    borderRadius: '15px',
    boxShadow: '0 6px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    width: '90%',
    marginBottom: '20px',
  },
  avatar: {
    width: '18%',
    height: 'auto',
    borderRadius: '50%',
    marginRight: '20px',
    border: '2px solid #4682b4',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  label: {
    fontSize: '16px',
    color: '#666',
    fontWeight: '550',
    marginRight: '10px',
    flexBasis: '40%',
    textAlign: 'right',
  },
  infoValue: {
    fontSize: '16px',
    color: '#333',
    fontWeight: '600',
    flexBasis: '70%',
    textAlign: 'left',
  },
  button: {
    marginTop: '20px',
    padding: '12px 10px',
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

export default Profile;
