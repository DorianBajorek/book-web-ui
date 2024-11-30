import React, { useState, CSSProperties, useEffect } from 'react';
import { useAuth } from './UserData';
import BooksList from './BookList';
import { useParams } from 'react-router-dom';
import { getUserData } from '../BooksService';

const Profile = () => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const { userLogin } = useParams<{ userLogin: string }>();
  const { token, login } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (token && userLogin) {
        const data = await getUserData(token, userLogin);
        if (data) {
          setEmail(data.email || '');
          setPhoneNumber(data.phoneNumber || '');
        }
      }
    };

    fetchData();
  }, [token, userLogin]);

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
    width: '120px',
    height: '120px',
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
};

export default Profile;
