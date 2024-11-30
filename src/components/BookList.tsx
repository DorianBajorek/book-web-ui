import React, { CSSProperties, useEffect, useState } from 'react';
import { getUserOffers } from '../BooksService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './UserData';
import { Book } from './Constant';
import LoadingSpinner from './LoadingSpinner';
import OffersList from './OffersList';

interface BooksListProps {
  username: string;
}

const BooksList: React.FC<BooksListProps> = ({ username }) => {
  const { token, isDeleteOfferInProgress } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getUserOffers(token, username);
        if (data) {
          setBooks(data);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [token, username, isDeleteOfferInProgress]);

  const handleBookClick = (book: Book) => {
    navigate(`/book-details/${book.offer_id.toString()}`);
  };

  return (
    <div style={styles.container}>
      <LoadingSpinner visible={isLoading} />
      
      {!isLoading && books.length === 0 && <p>Brak książek do wyświetlenia.</p>}

      {!isLoading && books.length > 0 && (
        <OffersList books={books.slice().reverse()} onBookClick={handleBookClick} />
      )}
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    padding: '20px 15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
};

export default BooksList;
