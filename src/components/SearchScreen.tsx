import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOffersByQuery } from '../BooksService';
import { useAuth } from './UserData';
import { Book } from './Constant';

const SearchScreen = () => {
  const { token } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setResults([]);
      return;
    }
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(async () => {
      try {
        const data = await getOffersByQuery(token, searchQuery);
        if (data) {
          setResults(data);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }, 500);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [searchQuery, token]);

  const handleBookClick = (book: Book) => {
    const offerId = book.offer_id;
    navigate(`/book-details/${offerId}`);
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleTextStyle}>Znajdź książkę po tytule</h1>
      <div style={searchContainerStyle}>
        <input
          style={searchInputStyle}
          type="text"
          placeholder="Wyszukaj..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div style={resultsContainerStyle}>
        {results.length > 0 ? (
          results.map((item: Book, index) => (
            <div key={index} style={resultContainerStyle} onClick={() => handleBookClick(item)}>
              <img
                src={item.cover_book.replace('/media/', '/media/cover_images/')}
                alt={`${item.title} cover`}
                style={bookImageStyle}
              />
              <div style={textContainerStyle}>
                <h3 style={bookTitleStyle}>{item.title}</h3>
                <p style={bookDescriptionStyle}>Autor: {item.author ? item.author : 'Brak'}</p>
                <p style={bookDescriptionStyle}>Użytkownik: {item.user}</p>
              </div>
            </div>
          ))
        ) : (
          <p style={noResultsTextStyle}>Brak wyników</p>
        )}
      </div>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#f4f4f4',
  fontFamily: 'Roboto, sans-serif',
  minHeight: "100vh"
};

const titleTextStyle: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '20px',
  color: '#333',
};

const searchContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  maxWidth: '600px',
  marginBottom: '20px',
};

const searchInputStyle: React.CSSProperties = {
  flex: 1,
  height: '40px',
  padding: '0 15px',
  borderRadius: '8px',
  border: '1px solid #ddd',
  fontSize: '16px',
};

const resultsContainerStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '600px',
  marginTop: '20px',
};

const resultContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#fff',
  padding: '15px',
  borderRadius: '10px',
  marginBottom: '15px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  border: '1px solid #f0f0f0',
  transition: 'transform 0.2s ease',
};

const bookImageStyle: React.CSSProperties = {
  width: '90px',
  height: '130px',
  borderRadius: '8px',
  marginRight: '15px',
};

const textContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
};
  
const bookDescriptionStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#666',
    marginTop: '4px',
    textAlign: 'left',
    marginBottom: '-4px',
    fontWeight: '700'
};

const bookTitleStyle: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#333',
  marginBottom: '4px',
};

const noResultsTextStyle: React.CSSProperties = {
  fontSize: '16px',
  color: '#888',
  textAlign: 'center',
  marginTop: '30px',
};

export default SearchScreen;
