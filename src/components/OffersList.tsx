import React from 'react';
import { Book } from './Constant';

type OffersListProps = {
  books: Book[];
};

const OffersList = ({ books }: OffersListProps) => {
  return (
    <div>
      {books.map((item, index) => (
        <a
          key={index}
          href={`/oferta/${item.offer_id}`}
          style={resultContainerStyle}
        >
          {item.frontImage && (
            <img
              src={item.frontImage.replace('http', 'https')}
              alt={`${item.title} cover`}
              style={bookImageStyle}
            />
          )}
          <div style={textContainerStyle}>
            <h3 style={bookTitleStyle}>{item.title}</h3>
            <p style={bookDescriptionStyle}>
              Autor: {item.author ? item.author : 'Brak'}
            </p>
            <p style={bookDescriptionStyle}>Użytkownik: {item.username}</p>
            <p style={bookDescriptionStyle}>Cena: {item.price},00zł</p>
          </div>
        </a>
      ))}
    </div>
  );
};

const resultContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#fff',
  padding: '15px',
  borderRadius: '10px',
  marginBottom: '15px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  textDecoration: 'none',
  color: 'inherit',
  border: '1px solid #f0f0f0',
  transition: 'transform 0.2s ease',
  cursor: 'pointer',
};

const bookImageStyle: React.CSSProperties = {
  width: '120px',
  height: '150px',
  borderRadius: '8px',
  marginRight: '15px',
};

const textContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
};

const bookTitleStyle: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#333',
  marginBottom: '4px',
};

const bookDescriptionStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#666',
  marginTop: '4px',
  textAlign: 'left',
};

export default OffersList;
