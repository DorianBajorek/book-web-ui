import React, { useState } from 'react';
import { useAuth } from './UserData';
import { updateUserPhoneNumber } from '../BooksService';

type EditProfileModalProps = {
  onClose: () => void;
};

const EditProfileModal: React.FC<EditProfileModalProps> = ({onClose}) => {
  const [newPhone, setNewPhone] = useState('');
  const {login, email, token, updatePhoneNumber } = useAuth();

  const handleSave = async () => {
    try {
        await updateUserPhoneNumber(newPhone, token);
        updatePhoneNumber(newPhone)
        onClose();
    } catch(error) {
        alert("Coś poszło nie tak")
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>Edycja profilu</h2>
        <div style={formGroupStyle}>
          <label htmlFor="username" style={labelStyle}>Nazwa użytkownika</label>
          <input
            type="text"
            id="username"
            value={login}
            style={inputStyle}
            disabled={true}
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="email" style={labelStyle}>E-mail</label>
          <input
            type="email"
    id="email"
            value={email}
            style={inputStyle}
            disabled={true}
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="phone" style={labelStyle}>Numer telefonu</label>
          <input
            type="tel"
            id="phone"
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={buttonGroupStyle}>
          <button onClick={handleSave} style={saveButtonStyle}>Zapisz</button>
          <button onClick={onClose} style={cancelButtonStyle}>Wróc</button>
        </div>
      </div>
    </div>
  );
};

const overlayStyle: React.CSSProperties = {
    fontFamily: '"Roboto", sans-serif',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };
  
  const modalStyle: React.CSSProperties = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '400px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  };
  
  const formGroupStyle: React.CSSProperties = {
    marginBottom: '15px',
    textAlign: 'left',
  };
  
  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  };
  
  const inputStyle: React.CSSProperties = {
    width: '90%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
  };
  
  const buttonGroupStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
  };
  
  const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  };
  
  const cancelButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#f44336',
    color: 'white',
  };
  
  const saveButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#4caf50',
    color: 'white',
  };

export default EditProfileModal;
