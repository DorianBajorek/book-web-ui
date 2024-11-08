import React, { useState, CSSProperties } from 'react';
import { useAuth } from './UserData';
import BooksList from './BookList';

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { login, email } = useAuth();
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div style={styles.profileContainer}>
      <div style={styles.profileCard}>
        <img src="avatar.png" alt="User Avatar" style={styles.avatar} />

        <div style={styles.infoRow}>
          <span style={styles.label}>Nazwa użytkownika:</span>
          <span style={styles.infoValue}>{login}</span>
        </div>

        <div style={styles.infoRow}>
          <span style={styles.label}>Email:</span>
          <span style={styles.infoValue}>{email || "d1@op.pl"}</span>
        </div>
      </div>

      <BooksList />
    </div>
  );
};

const styles: { 
  profileContainer: CSSProperties;
  profileCard: CSSProperties;
  avatar: CSSProperties;
  infoRow: CSSProperties;
  label: CSSProperties;
  infoValue: CSSProperties;
  button: CSSProperties;
} = {
  profileContainer: {
    fontFamily: 'Roboto, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '30px',
    backgroundColor: '#f7f9fc',
    minHeight: '100vh',
  },
  profileCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '70px',
    borderRadius: '15px',
    boxShadow: '0 6px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
    marginBottom: '20px',
  },
  avatar: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    marginBottom: '20px',
    border: '2px solid #4682b4',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '10px',
  },
  label: {
    fontSize: '20px',
    color: '#666',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: '18px',
    color: '#333',
    fontWeight: '700',
    textAlign: 'right',
  },
  button: {
    backgroundColor: '#4682b4',
    color: 'white',
    padding: '12px 30px',
    borderRadius: '30px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    border: 'none',
    boxShadow: '0 4px 6px rgba(70, 130, 180, 0.4)',
    transition: 'background-color 0.3s',
  },
};

export default Profile;
