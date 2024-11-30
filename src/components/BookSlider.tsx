import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cursorTo } from 'readline';

interface Book {
  id: string;
  image: string;
  title: string;
}

interface BookSliderProps {
  books: Book[];
}

const BookSlider: React.FC<BookSliderProps> = ({ books }) => {
  const infiniteBooks = [...books, ...books];
  const navigate = useNavigate();

  const handleBookClick = (offerId: string) => {
    navigate(`/book-details/${offerId}`)
  };

  return (
    <div style={styles.sliderContainer}>
      <div style={styles.bookList}>
        {infiniteBooks.map((book, index) => (
          <div key={`${book.id}-${index}`} style={styles.bookContainer} onClick={() => handleBookClick(book.id)}>
            <img src={book.image} alt="book" style={styles.bookImage} />
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  sliderContainer: {
    overflow: 'hidden' as 'hidden',
    width: '100%',
    display: 'flex',
    padding: '10px 0',
  },
  bookList: {
    display: 'flex',
    animation: 'scroll 20s linear infinite',
  },
  bookContainer: {
    minWidth: '150px',
    height: '200px',
    margin: '0 10px',
    display: 'flex',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    cursor: 'pointer',
  },
  bookImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as 'cover',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  },
};

const globalStyles = `
@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-10%); }
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = globalStyles;
document.head.appendChild(styleSheet);

export default BookSlider;
