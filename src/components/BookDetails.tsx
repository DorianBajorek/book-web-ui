import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteOffer } from '../BooksService';
import { useAuth } from './UserData';

const BookDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { book, owner } = location.state;
  const { login, token, setIsDeleteOfferInProgress, isDeleteOfferInProgress } = useAuth();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    { id: '1', image: { uri: book.cover_book.replace("/media/", "/media/cover_images/") } },
    ...(book.frontImage ? [{ id: '2', image: { uri: book.frontImage } }] : []),
    ...(book.backImage ? [{ id: '3', image: { uri: book.backImage } }] : []),
  ];

  const handleDeleteOffer = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this offer?");
    if (confirmDelete) {
      try {
        setIsDeleteOfferInProgress(true);
        await deleteOffer(token, book.offer_id);
        setIsDeleteOfferInProgress(false);
        alert("Offer deleted successfully.");
        navigate(-1);
      } catch (error) {
        alert("Failed to delete the offer.");
        console.error(error);
      }
    }
  };

  const handleSendMessageToOwner = () => {
    navigate('/chat', { state: { recipient: owner } });
  };

  const handleImageClick = (uri: string) => {
    setSelectedImage(uri);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={imagesContainerStyle}>
          {images.map((item) => (
            <div key={item.id} style={bookContainerStyle}>
              <img
                src={item.image.uri}
                alt="Book Cover"
                style={bookImageStyle}
                onClick={() => handleImageClick(item.image.uri)}
              />
            </div>
          ))}
        </div>
        <h2 style={bookTitleStyle}>{book.title}</h2>
        <p style={bookDescriptionStyle}>
          {book.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum."}
        </p>

        <div style={detailsContainerStyle}>
          <p style={bookDetailStyle}>
            <span style={labelStyle}>Autor: </span>{book.author || "Brak"}
          </p>
          <p style={bookDetailStyle}>
            <span style={labelStyle}>Użytkownik: </span>{owner}
          </p>
          <p style={bookDetailStyle}>
            <span style={labelStyle}>ISBN: </span>{book.isbn}
          </p>
          <p style={bookDetailStyle}>
            <span style={labelStyle}>Cena: </span>20
          </p>
        </div>
      </div>

      <div style={buttonContainerStyle}>
        {login !== owner ? (
          <button style={buttonStyle} onClick={handleSendMessageToOwner}>
            Napisz wiadomość do właściciela
          </button>
        ) : (
          <button style={{ ...buttonStyle, ...deleteButtonStyle }} onClick={handleDeleteOffer}>
            Usuń ofertę
          </button>
        )}
      </div>

      {selectedImage && (
        <div style={modalOverlayStyle} onClick={handleCloseModal}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Enlarged" style={modalImageStyle} />
            <span style={closeButtonStyle} onClick={handleCloseModal}>X</span>
          </div>
        </div>
      )}
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  fontFamily: 'Roboto, sans-serif',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#f5f5f5',
  minHeight: "100vh"
};

const cardStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  borderRadius: '10px',
  padding: '20px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  marginBottom: '20px',
  width: '100%',
  maxWidth: '600px',
  textAlign: 'center',
};

const bookTitleStyle: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: '700',
  marginTop: '10px',
  marginBottom: '10px',
  color: '#333',
};

const bookDescriptionStyle: React.CSSProperties = {
  fontSize: '16px',
  marginBottom: '15px',
  color: '#666',
};

const detailsContainerStyle: React.CSSProperties = {
  textAlign: 'left',
  width: '100%',
  marginTop: '10px',
};

const bookDetailStyle: React.CSSProperties = {
  fontSize: '16px',
  marginBottom: '8px',
  color: '#555',
};

const labelStyle: React.CSSProperties = {
  fontWeight: 'bold',
  color: '#333',
};

const buttonContainerStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '600px',
  padding: '0 20px',
  display: 'flex',
  justifyContent: 'center',
  marginTop: '10px',
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: '#007bff',
  borderRadius: '5px',
  padding: '15px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '500',
  cursor: 'pointer',
  width: '100%',
  textAlign: 'center',
  border: "0px"
};

const deleteButtonStyle: React.CSSProperties = {
  backgroundColor: 'red',
};

const imagesContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '20px',
};
const bookImageStyle: React.CSSProperties = {
    width: '100%',
    maxHeight: '250px',
    objectFit: 'contain',
    display: 'block',
    borderRadius: '10px',
    overflow: 'hidden',
    cursor: 'pointer',
  };
  
  const bookContainerStyle: React.CSSProperties = {
    width: '30%',
    marginRight: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  };

const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContentStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '10px',
  textAlign: 'center',
  position: 'relative',
};

const modalImageStyle: React.CSSProperties = {
  maxWidth: '100%',
  maxHeight: '80vh',
  borderRadius: '10px',
};

const closeButtonStyle: React.CSSProperties = {
  position: 'absolute',
  top: '20px',
  right: '20px',
  fontSize: '24px',
  fontWeight: '900',
  color: '#333',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  border: 'none',
  padding: '15px',
  borderRadius: '50%',
};

export default BookDetails;
