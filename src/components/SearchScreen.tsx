import React, { useState, useEffect, useRef } from 'react';
import { getLastAddedOffers, getOffersByQuery } from '../BooksService';
import { useAuth } from './UserData';
import { Book } from './Constant';
import OffersList from './OffersList';

const SearchScreen = () => {
  const { token } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedBooks, setSearchedBooks] = useState<Book[]>([]);
  const [lastAddedBooks, setLastAddedBooks] = useState<Book[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const PAGE_SIZE = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLastAddedOffers(PAGE_SIZE, 0);
        if (data) {
          setLastAddedBooks(data);
        }
      } catch (error) {
        console.error('Error fetching last added offers:', error);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchedBooks([]);
      return;
    }
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(async () => {
      try {
        const data = await getOffersByQuery(token, searchQuery);
        if (data) {
          setSearchedBooks(data);
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

  const handleScroll = async () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollY + windowHeight >= documentHeight - 10) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (pageNumber === 0) return;

    const fetchMoreBooks = async () => {
      try {
        const data = await getLastAddedOffers(PAGE_SIZE, pageNumber);
        if (data) {
          setLastAddedBooks((prevBooks) => [...prevBooks, ...data]);
        }
      } catch (error) {
        console.error('Error fetching more books:', error);
      }
    };

    fetchMoreBooks();
  }, [pageNumber]);

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
        {searchedBooks.length > 0 ? (
          <OffersList books={searchedBooks} />
        ) : searchedBooks.length === 0 ? (
          <>
            <h1 style={titleTextStyle}>Ostatnio dodane ogłoszenia</h1>
            <OffersList books={lastAddedBooks} />
          </>
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
  minHeight: '100vh',
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
  maxWidth: '900px',
  marginTop: '20px',
};

const noResultsTextStyle: React.CSSProperties = {
  fontSize: '16px',
  color: '#888',
  textAlign: 'center',
  marginTop: '30px',
};

export default SearchScreen;
