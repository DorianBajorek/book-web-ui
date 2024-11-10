import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOfferById } from '../BooksService';
import { useAuth } from './UserData';
import { Book } from './Constant';

const BookDetails: React.FC = () => {
  const { offer_id } = useParams();
  const { token } = useAuth();

  const [book, setBook] = useState<Book>();
  const [owner, setOwner] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (offer_id) {
      const fetchBook = async () => {
        try {
          const data = await getOfferById(token, offer_id);
          if (data) {
            setBook(data);
            setOwner(data.username);
          }
        } catch (error) {
          console.error("Failed to fetch book details", error);
        }
      };

      fetchBook();
    }
  }, [offer_id, token]);

  if (!book) {
    return <div>Loading...</div>;
  }

  const images = [
    { id: '1', image: { uri: book.cover_book.replace("/media/", "/media/cover_images/") } },
    ...(book.frontImage ? [{ id: '2', image: { uri: book.frontImage } }] : []),
    ...(book.backImage ? [{ id: '3', image: { uri: book.backImage } }] : []),
  ];

  const handleImageClick = (uri: string) => {
    setSelectedImage(uri);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={bookTitleStyle}>{book.title}</h2>
        <div style={imagesContainerStyle}>
          {images.map((image) => (
            <div key={image.id} style={bookContainerStyle}>
              <img
                src={image.image.uri}
                alt={`Book image ${image.id}`}
                style={bookImageStyle}
                onClick={() => handleImageClick(image.image.uri)}
              />
            </div>
          ))}
        </div>
        <div style={detailsContainerStyle}>
          <p><b>Autor:</b> {book.author || 'Brak'}</p>
          <p><b>Użytkownik:</b> {owner}</p>
          <p><b>Cena:</b> {book.price}</p>
        </div>
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

const detailsContainerStyle: React.CSSProperties = {
  color: "#666",
  textAlign: 'left',
  width: '100%',
  marginTop: '10px',
  fontWeight: '500'
};

const bookImageStyle: React.CSSProperties = {
  width: '100%',
  height: '200px', // Możesz ustawić stałą wysokość, aby zapewnić równość rozmiarów
  objectFit: 'cover', // Zapewnia, że zdjęcie wypełnia kontener, zachowując proporcje
  display: 'block',
  borderRadius: '10px',
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out',
};

const imagesContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '20px',
  gap: '10px'
};

const bookContainerStyle: React.CSSProperties = {
  flex: '1',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  maxWidth: '30%',
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
