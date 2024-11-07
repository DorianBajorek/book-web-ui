import React, { CSSProperties, useEffect, useState } from 'react';
import { getUserOffers } from '../BooksService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './UserData';
import { Book } from './Constant';
import LoadingSpinner from './LoadingSpinner';  // Importowanie komponentu LoadingSpinner

const BooksList = () => {
  const { token, login } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);  // Stan do kontrolowania ładowania książek
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getUserOffers(token);
        if(data){
            setBooks(data);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setIsLoading(false);  // Po zakończeniu ładowania ustawiamy isLoading na false
      }
    };

    fetchBooks();
  }, [token]);

  const handleBookClick = (book: Book) => {
    navigate('/book-details', { state: { book, owner: login } });
  };

  return (
    <div style={styles.container}>
      <LoadingSpinner visible={isLoading} />  {/* Pokazanie spinnera, gdy książki się ładują */}
      
      {!isLoading && books.length === 0 && <p>Brak książek do wyświetlenia.</p>} {/* Komunikat, jeśli brak książek */}

      {books.map((item) => (
        <div 
          key={item.offer_id} 
          onClick={() => handleBookClick(item)} 
          style={styles.bookContainer}
        >
          <img 
            src={item.cover_book.replace("/media/", "/media/cover_images/")}
            alt={`${item.title} cover`}
            style={styles.bookImage}
          />
          <div style={styles.textContainer}>
            <h3 style={styles.bookTitle}>{item.title}</h3>
            <p style={styles.bookDescription}>Autor: {item.author || "Brak"}</p>
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
    padding: '15px',
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
    border: '1px solid #ddd',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
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
    marginTop: '4px',
    lineHeight: '20px',
  },
};

export default BooksList;
