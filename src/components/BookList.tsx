import React, { CSSProperties, useEffect, useState } from 'react';
import { getUserOffers } from '../BooksService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './UserData';
import { Book } from './Constant';
import LoadingSpinner from './LoadingSpinner';

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

  const handleBookClick = (offer_id: number) => {
    navigate(`/book-details/${offer_id.toString()}`);
  };

  return (
    <div style={styles.container}>
      <LoadingSpinner visible={isLoading} />
      
      {!isLoading && books.length === 0 && <p>Brak książek do wyświetlenia.</p>}

      {books
        .slice()
        .reverse()
        .map((item) => (
          <div 
            key={item.offer_id} 
            onClick={() => handleBookClick(item.offer_id)} 
            style={styles.bookContainer}
          >
            {item.frontImage && (
              <img 
              src={item.frontImage.replace("http", "https")}
              alt={`${item.title} cover`}
              style={styles.bookImage}
            />
            )}
            <div style={styles.textContainer}>
              <h3 style={styles.bookTitle}>{item.title}</h3>
              <p style={styles.bookDescription}>Autor: {item.author || "Brak"}</p>
              <p style={styles.bookDescription}>Cena: {item.price},00 zł</p>
            </div>
          </div>
      ))}
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
  bookContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: '15px',
    borderRadius: '15px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  },
  bookImage: {
    width: '80px',
    height: '120px',
    borderRadius: '10px',
    marginRight: '15px',
    border: '1.5px solid #ddd',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  bookTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#333',
    marginBottom: '4px',
  },
  bookDescription: {
    fontSize: '14px',
    color: '#777',
    fontWeight: "600",
    marginTop: '4px',
    textAlign: 'left',
    marginBottom: "-4px"
  },
};

export default BooksList;
