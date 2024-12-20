import React, { useState, CSSProperties, useEffect } from 'react';
import { useAuth } from './UserData';
import BooksList from './BookList';
import { useParams } from 'react-router-dom';
import { getUserData, exportUserOffers } from '../BooksService';
import EditProfileModal from './EditProfileModal';
import { CiSettings } from "react-icons/ci";
import LoadingSpinner from './LoadingSpinner';

const Profile = () => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const { userLogin } = useParams<{ userLogin: string }>();
  const { login, token, isDeleteUserInProgress } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
  }, [userLogin, isModalOpen]);

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
      console.error('Error downloading user oferty:', error);
    }
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  }
  
  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const isSmallScreen = windowWidth < 600;

  return (
    <>
      <LoadingSpinner visible={isDeleteUserInProgress} />
      {isModalOpen && (
        <EditProfileModal onClose={handleCloseModal} />
      )}
      <div style={profileContainerStyle}>
        <div style={isSmallScreen ? profileCardStyleSmall : profileCardStyle}>
          <img src="/avatar.png" alt="User Avatar" style={avatarStyle} />
          <div style={infoContainerStyle}>
            {login === userLogin && (
              <div style={gearIconStyle} onClick={handleOpenModal}>
                <CiSettings />
              </div>
            )}
            <div style={infoRowStyle}>
              <span style={labelStyle}>Użytkownik:</span>
              <span style={infoValueStyle}>{userLogin}</span>
            </div>
            <div style={infoRowStyle}>
              <span style={labelStyle}>E-mail:</span>
              <span style={infoValueStyle}>{email}</span>
            </div>
            {phoneNumber !== 'undefined' && (
              <div style={infoRowStyle}>
                <span style={labelStyle}>Telefon:</span>
                <span style={infoValueStyle}>{phoneNumber}</span>
              </div>
            )}
          </div>
        </div>
        {login === userLogin && (
          <button type="button" onClick={handleDownloadBooks} style={buttonStyle}>
            Pobierz listę książek
          </button>
        )}
        <BooksList username={userLogin || login} />
      </div>
    </>
  );
};

const profileContainerStyle: CSSProperties = {
  fontFamily: 'Arial, sans-serif',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '30px',
  backgroundColor: '#f7f9fc',
  minHeight: '100vh',
  boxSizing: 'border-box',
};

const profileCardStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#fff',
  padding: '20px 40px',
  borderRadius: '15px',
  boxShadow: '0 6px 10px rgba(0, 0, 0, 0.1)',
  maxWidth: '600px',
  width: '90%',
  marginBottom: '20px',
  position: "relative",
};

const profileCardStyleSmall: CSSProperties = {
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#fff',
  padding: '15px',
  borderRadius: '15px',
  boxShadow: '0 6px 10px rgba(0, 0, 0, 0.1)',
  maxWidth: '600px',
  width: '90%',
  marginBottom: '20px',
  position: "relative",
};

const avatarStyle: CSSProperties = {
  width: '18%',
  height: 'auto',
  borderRadius: '50%',
  border: '2px solid #4682b4',
};

const infoContainerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  alignItems: 'center',
};

const infoRowStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '10px',
};

const labelStyle: CSSProperties = {
  fontSize: '16px',
  color: '#666',
  fontWeight: '550',
  marginBottom: '5px',
};

const infoValueStyle: CSSProperties = {
  fontSize: '16px',
  color: '#333',
  fontWeight: '600',
  textAlign: 'center',
};

const gearIconStyle: CSSProperties = {
  position: 'absolute',
  top: '15px',
  right: '15px',
  fontSize: '28px',
  cursor: 'pointer',
};

const buttonStyle: CSSProperties = {
  marginTop: '20px',
  padding: '12px 10px',
  borderRadius: '25px',
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#fff',
  backgroundColor: '#4682b4',
  border: 'none',
  cursor: 'pointer',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
  transition: 'background-color 0.3s',
};

export default Profile;
