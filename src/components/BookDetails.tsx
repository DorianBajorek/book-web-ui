import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOfferById, deleteOffer } from '../BooksService';
import { useAuth } from './UserData';
import { Book } from './Constant';
import LoadingSpinner from './LoadingSpinner';
import { Helmet } from 'react-helmet';
import CloseButton from './CloseButton';

const BookDetails: React.FC = () => {
  const { offer_id } = useParams();
  const { token, login, setIsDeleteOfferInProgress } = useAuth();
  const navigate = useNavigate();

  const [book, setBook] = useState<Book>();
  const [owner, setOwner] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
          setError(true);
        }
      };

      fetchBook();
    }
  }, [offer_id, token]);

  const handleNavigateToUserProfile = (username: string) => {
    navigate(`/profil/${username}`);
  };

  const handleDelete = async () => {
    try {
      setIsDeleteOfferInProgress(true);
      await deleteOffer(token, offer_id);
      setIsDeleteOfferInProgress(false);
      navigate('/profil/' + login);
    } catch (error) {
      console.error("Failed to delete offer", error);
      alert("Failed to delete the offer");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (error) {
    return (
      <div style={errorContainerStyle}>
        <h2 style={errorMessageStyle}>Nie znaleziono książki</h2>
      </div>
    );
  }

  if (!book) {
    return <LoadingSpinner visible={true} />;
  }
  
  const images = [
    ...(book.smallfrontImage || book.frontImage
      ? [{
          id: '2',
          small: book.smallfrontImage ? book.smallfrontImage.replace("http", "https") : null,
          large: book.frontImage ? book.frontImage.replace("http", "https") : null,
        }]
      : []),
    ...(book.smallbackImage || book.backImage
      ? [{
          id: '3',
          small: book.smallbackImage ? book.smallbackImage.replace("http", "https") : null,
          large: book.backImage ? book.backImage.replace("http", "https") : null,
        }]
      : []),
  ];
  
  const handleImageClick = (image: { small: string | null; large: string | null }) => {
    setSelectedImage(image.large || image.small);
  };
  
  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div style={containerStyle}>
      <Helmet>
        <title>{book.title} - Drugaksiazka.pl</title>
        <meta name="description" content={book.author + ", " + book.title} />
      </Helmet>
      <div style={cardStyle}>
        <CloseButton onPress={handleBack} />
        <h2 style={bookTitleStyle}>{book.title}</h2>
        <div style={isMobile ? mobileImagesContainerStyle : imagesContainerStyle}>
          {images.map((image) => (
            <div key={image.id} style={isMobile ? mobileBookContainerStyle : bookContainerStyle}>
              <img
                src={image.small || image.large || ""}
                alt={`Book image ${image.id}`}
                style={isMobile ? mobileBookImageStyle : bookImageStyle}
                onClick={() => handleImageClick(image)}
              />
            </div>
          ))}
        </div>
        <div style={detailsContainerStyle}>
          <p style={authorStyle}><b>Autor:</b> {book.author || 'Brak'}</p>
          <p style={userStyle}><b>Użytkownik: </b>
            <span
              style={{ color: '#169ee7', cursor: 'pointer' }}
              onClick={() => handleNavigateToUserProfile(owner)}
            >
              {owner}
            </span>
          </p>
          <p style={priceStyle}><b>Cena:</b> {book.price},00 zł</p>
        </div>
        {owner === login && (
          <button onClick={handleDelete} style={deleteButtonStyle}>Usuń ofertę</button>
        )}
      </div>
      {selectedImage && (
        <div style={modalOverlayStyle} onClick={handleCloseModal}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Enlarged" style={modalImageStyle} />
            <CloseButton onPress={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );  
};

const mobileImagesContainerStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '20px',
};

const mobileBookContainerStyle: React.CSSProperties = {
  marginBottom: '10px',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
};

const mobileBookImageStyle: React.CSSProperties = {
  width: '50%',
  height: 'auto',
  objectFit: 'cover',
  borderRadius: '10px',
};

const deleteButtonStyle: React.CSSProperties = {
  backgroundColor: '#ff4d4f',
  color: '#fff',
  padding: '12px 24px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: '600',
  marginTop: '20px',
  fontSize: '18px',
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
  padding: '40px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  marginBottom: '20px',
  width: '90%',
  maxWidth: '600px',
  textAlign: 'center',
  position: 'relative',
};

const bookTitleStyle: React.CSSProperties = {
  fontSize: '28px',
  fontWeight: '700',
  marginTop: '10px',
  marginBottom: '20px',
  color: '#333',
};

const detailsContainerStyle: React.CSSProperties = {
  color: "#666",
  textAlign: 'left',
  width: '100%',
  marginTop: '20px',
  fontWeight: '600',
};

const authorStyle: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#444',
  marginBottom: '10px',
};

const userStyle: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#444',
  marginBottom: '10px',
};

const priceStyle: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#444',
  marginBottom: '10px',
};

const bookImageStyle: React.CSSProperties = {
  width: '100%',
  height: '250px',
  objectFit: 'cover',
  display: 'block',
  borderRadius: '10px',
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out',
};

const imagesContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '20px',
  gap: '30px',
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

const errorContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#f5f5f5',
  color: '#444',
  fontFamily: 'Roboto, sans-serif',
};

const errorMessageStyle: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: '700',
  color: '#333',
};

export default BookDetails;
