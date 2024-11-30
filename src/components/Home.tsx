import React, { useEffect, useState } from 'react';
import BookSlider from './BookSlider';
import { useAuth } from './UserData';
import LoadingSpinner from './LoadingSpinner';
import { getUserOffers } from '../BooksService';
import { Book } from './Constant';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const HomeView: React.FC = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getUserOffers(token, 'drugaksiazka');
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
  }, [token]);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleDownload = () => {
    const url = 'https://www.drugaksiazka.pl/drugaksiazka.apk';
    const link = document.createElement('a');
    link.href = url;
    link.download = 'DrugaKsiazka.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={styles.container}>
      <Helmet>
        <title>Drugaksiazka.pl - Sprzedaj książki online</title>
        <meta
          name="description"
          content="Sprzedaj używane książki szybko i łatwo dzięki naszej aplikacji do skanowania kodów kreskowych."
        />
      </Helmet>
      <header style={styles.header}>
        <h1 style={styles.appTitle}>Druga Książka</h1>
        <p style={styles.description}>
          Druga Książka to platforma, gdzie możesz wymieniać książki i dawać im drugie życie. Dołącz do naszej społeczności, odkrywaj nowe tytuły lub dziel się swoją kolekcją z innymi!
        </p>
      </header>

      <div style={styles.imageContainer}>
        {isLoading ? (
          <LoadingSpinner visible={true} />
        ) : books.length > 0 ? (
          <BookSlider
            books={books.map((book) => ({
              id: book.offer_id.toString(),
              image: book.frontImage.replace('http', 'https'),
              title: book.title,
            }))}
          />
        ) : (
          <p>Brak książek do wyświetlenia.</p>
        )}
      </div>

      <div style={styles.buttonContainer}>
        {token ? (
          <button style={styles.button} onClick={logout}>
            Wyloguj się
          </button>
        ) : (
          <>
            <button style={styles.button} onClick={handleRegister}>
              Zarejestruj się
            </button>
            <button style={styles.button} onClick={handleLogin}>
              Zaloguj się
            </button>
          </>
        )}
      </div>

      <div style={styles.infoContainer}>
        <p style={styles.infoText}>
          W Drugiej Książce możesz wymieniać książki z innymi. Połącz się z innymi użytkownikami, dziel się swoimi opiniami, odkrywaj nowe perspektywy i wzbogacaj swoje doświadczenia czytelnicze!
        </p>
      </div>
      <div style={styles.downloadAppContainer}>
        <h2 style={styles.downloadAppTitle}>Pobierz naszą aplikację</h2>
        <p style={styles.downloadAppDescription}>
          Chcesz mieć dostęp do naszej platformy zawsze przy sobie? Pobierz naszą aplikację, aby łatwo wymieniać książki i korzystać z wielu innych funkcji na swoim telefonie.
        </p>
        <a onClick={handleDownload}>
          <button style={styles.button}>Pobierz</button>
        </a>
      </div>
      <div style={styles.howItWorksContainer}>
        <h2 style={styles.howItWorksTitle}>Jak to działa?</h2>
        <div style={styles.howItWorksStepsContainer}>
          <p style={styles.howItWorksStep}>📖 Skanujesz kod kreskowy.</p>
          <p style={styles.howItWorksStep}>📷 Robisz zdjęcie przodu książki.</p>
          <p style={styles.howItWorksStep}>📷 Robisz zdjęcie tyłu książki.</p>
          <p style={styles.howItWorksStep}>💰 Ustawiasz cenę.</p>
          <p style={styles.howItWorksStep}>✅ I gotowe!</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
    container: {
      fontFamily: 'Roboto, sans-serif',
      backgroundColor: '#f7f9fc',
      padding: '20px',
      maxWidth: '100%',
      margin: '0 auto',
    },
    header: {
      textAlign: 'center' as const,
      marginBottom: '30px',
    },
    appTitle: {
      fontSize: '32px',
      fontWeight: 800 as const,
      color: '#2e86c1',
    },
    downloadAppContainer: {
      textAlign: 'center' as const,
      padding: '20px',
      backgroundColor: '#f5f8fa',
      borderRadius: '15px',
      margin: '0 auto 30px',
      maxWidth: '1200px',
    },
    downloadAppTitle: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#2e86c1',
      marginBottom: '10px',
    },
    downloadAppDescription: {
      fontSize: '18px',
      color: '#444',
      lineHeight: '1.6',
      maxWidth: '800px',
      margin: '0 auto 20px',
    },
    description: {
      fontSize: '20px',
      color: '#6e7c7c',
      lineHeight: '1.6',
      maxWidth: '800px',
      margin: '0 auto',
      marginTop: '10px',
    },
    imageContainer: {
      display: 'flex',
      justifyContent: 'center' as const,
      margin: '30px 0',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center' as const,
      gap: '15px',
      marginBottom: '40px',
    },
    button: {
      backgroundColor: '#4682b4',
      color: '#fff',
      padding: '12px 20px',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: 'bold' as const,
      cursor: 'pointer' as const,
      border: 'none',
      outline: 'none',
      transition: 'background-color 0.3s',
    },
    infoContainer: {
      textAlign: 'center' as const,
      padding: '20px 0',
      backgroundColor: '#eaf0f6',
      borderRadius: '10px',
      marginBottom: '30px',
    },
    infoText: {
      fontSize: '20px',
      color: '#444',
      lineHeight: '1.6',
      maxWidth: '800px',
      margin: '0 auto',
    },
    howItWorksContainer: {
      padding: '20px',
      backgroundColor: '#f5f8fa',
      borderRadius: '15px',
      textAlign: 'center' as const,
      maxWidth: '1200px',
      margin: '0 auto 30px',
    },
    howItWorksTitle: {
      fontSize: '20px',
      fontWeight: 700 as const,
      color: '#2e86c1',
      marginBottom: '10px',
    },
    howItWorksStepsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '10px',
      marginTop: '10px',
      padding: '0 20px',
    },
    howItWorksStep: {
      fontSize: '16px',
      color: '#6e7c7c',
      backgroundColor: '#fff',
      padding: '10px',
      borderRadius: '8px',
      boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
      display: 'flex',
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    },
  };
  

export default HomeView;
