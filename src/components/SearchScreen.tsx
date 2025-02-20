import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getLastAddedOffers, getOffersByQueryLazy } from '../BooksService';
import { useAuth } from './UserData';
import { Book } from './Constant';
import OffersList from './OffersList';
import LoadingSpinner from './LoadingSpinner';

const PAGE_SIZE = 10;

const SearchScreen = () => {
  const { token } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const [loadingPage, setLoadingPage] = useState(false);
  
  const [books, setBooks] = useState<Book[]>([]);
  const [hasNotResults, setHasNotResults] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        setLoadingPage(true);
        if (searchQuery) {
          data = await getOffersByQueryLazy(token, searchQuery, PAGE_SIZE, page - 1);
        } else {
          data = await getLastAddedOffers(PAGE_SIZE, page - 1);
        }
        if (data && data.length > 0) {
          setBooks(data);
          setTotalPages(data[0].total_pages);
          setHasNotResults(false);
        } else {
          setBooks([]);
          setHasNotResults(true);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoadingPage(false);
      }
    };

    fetchData();
  }, [searchQuery, page, token]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ query: e.target.value, page: '1' });
  };

  const handlePageChange = (newPage: number) => {
    window.scrollTo({ top: 0 });
    setSearchParams({ query: searchQuery, page: newPage.toString() });
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
          onChange={handleSearchChange}
        />
      </div>
      <div style={resultsContainerStyle}>
        <LoadingSpinner visible={loadingPage} />
        {books.length > 0 ? (
          <OffersList books={books} />
        ) : hasNotResults ? (
          <h2 style={noResultsTextStyle}>Brak wyników</h2>
        ) : null}
      </div>
      <div style={paginationStyle}>
        <button 
          style={{ ...paginationButtonStyle, ...(page > 1 ? paginationButtonHoverStyle : {}) }} 
          disabled={page <= 1} 
          onClick={() => handlePageChange(page - 1)}
        >
          Poprzednia
        </button>
        <span style={paginationTextStyle}>Strona {page} z {totalPages}</span>
        <button 
          style={{ ...paginationButtonStyle, ...(page < totalPages ? paginationButtonHoverStyle : {}) }} 
          disabled={page >= totalPages} 
          onClick={() => handlePageChange(page + 1)}
        >
          Następna
        </button>
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

const paginationStyle: React.CSSProperties = {
  marginTop: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
};

const paginationButtonStyle: React.CSSProperties = {
  padding: '8px 12px',
  borderRadius: '6px',
  border: '1px solid #007bff',
  backgroundColor: 'transparent',
  color: '#007bff',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '500',
  transition: 'all 0.3s ease',
  outline: 'none',
};

const paginationButtonHoverStyle: React.CSSProperties = {
  backgroundColor: '#007bff',
  color: '#fff',
};

const paginationTextStyle: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#333',
};

export default SearchScreen;
