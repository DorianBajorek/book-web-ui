import React, { CSSProperties, useEffect, useState } from 'react';
import { getUserOffers } from '../BooksService';
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

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getUserOffers(username);
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

  return (
    <div style={styles.container}>
      <LoadingSpinner visible={isLoading} />
      
      {!isLoading && books.length === 0 && <p>Brak książek do wyświetlenia.</p>}

      {!isLoading && books.length > 0 && (
        <OffersList books={books.slice().reverse()}  />
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
