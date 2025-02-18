import React, { useState, useEffect, useRef } from 'react';
import { getLastAddedOffers, getOffersByQueryLazy } from '../BooksService';
import { useAuth } from './UserData';
import { Book } from './Constant';
import OffersList from './OffersList';

const SearchScreen = () => {
  const { token } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedBooks, setSearchedBooks] = useState<Book[]>([]);
  const [lastAddedBooks, setLastAddedBooks] = useState<Book[]>([]);
  const [searchPageNumber, setSearchPageNumber] = useState(0);
  const [lastAddedPageNumber, setLastAddedPageNumber] = useState(0);
  const [hasNotResults, setHasNotResults] = useState(false);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFetchingRef = useRef(false);
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
    if (searchQuery === '') {
      setSearchedBooks([]);
      setSearchPageNumber(0);
      setHasNotResults(false);
      return;
    }
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(async () => {
      try {
        const data = await getOffersByQueryLazy(token, searchQuery, PAGE_SIZE, 0);
        if (data && data.length > 0) {
          setSearchedBooks(data);
          setSearchPageNumber(0);
          setHasNotResults(false);
        } else {
          setSearchedBooks([]);
          setHasNotResults(true);
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

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollY + windowHeight >= documentHeight - 10 && !isFetchingRef.current) {
      isFetchingRef.current = true;
      
      if (searchQuery !== '') {
        setSearchPageNumber((prev) => prev + 1);
      } else {
        setLastAddedPageNumber((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    if (searchPageNumber === 0 || searchQuery === '') return;

    const fetchMoreBooks = async () => {
      try {
        const data = (await getOffersByQueryLazy(token, searchQuery, PAGE_SIZE, searchPageNumber)) || [];
        if (data.length > 0) {
          setSearchedBooks((prevBooks) => [...prevBooks, ...data]);
        }
      } catch (error) {
        console.error('Error fetching more search results:', error);
      } finally {
        isFetchingRef.current = false;
      }
    };

    fetchMoreBooks();
  }, [searchPageNumber]);

  useEffect(() => {
    if (lastAddedPageNumber === 0 || searchQuery !== '') return;

    const fetchMoreBooks = async () => {
      try {
        const data = (await getLastAddedOffers(PAGE_SIZE, lastAddedPageNumber)) || [];
        if (data.length > 0) {
          setLastAddedBooks((prevBooks) => [...prevBooks, ...data]);
        }
      } catch (error) {
        console.error('Error fetching more last added books:', error);
      } finally {
        isFetchingRef.current = false;
      }
    };

    fetchMoreBooks();
  }, [lastAddedPageNumber]);

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
        ) : hasNotResults ? (
          <h2 style={noResultsTextStyle}>Brak wyników</h2>
        ) : (
          <>
            <h1 style={titleTextStyle}>Ostatnio dodane ogłoszenia</h1>
            <OffersList books={lastAddedBooks} />
          </>
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
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#d9534f',
  textAlign: 'center',
  marginTop: '20px',
};
export default SearchScreen;
