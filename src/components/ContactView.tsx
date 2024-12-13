import React from 'react';

const ContactView: React.FC = () => {
  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Skontaktuj się z nami</h1>
        <p style={styles.description}>
          Dziękujemy, że korzystasz z platformy Druga Książka! Jeśli masz jakiekolwiek pytania, 
          problemy z działaniem strony, aplikacji, lub po prostu chcesz podzielić się swoją opinią, 
          skontaktuj się z nami. Jesteśmy tu, aby pomóc!
        </p>
        <div style={styles.contactInfo}>
          <p style={styles.contactItem}>
            <strong>Email:</strong> <a href="mailto:drugaksiazkabiuro@gmail.com" style={styles.link}>drugaksiazkabiuro@gmail.com</a>
          </p>
          <p style={styles.contactItem}>
            <strong>Telefon:</strong> <a href="tel:+48530421473" style={styles.link}>+48 530 421 473</a>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    fontFamily: '"Roboto", sans-serif',
    display: 'flex',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    minHeight: '90vh',
    backgroundColor: '#f4f5fb',
  },
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '40px',
    borderRadius: '15px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    width: '100%',
  },
  heading: {
    fontSize: '30px',
    fontWeight: 'bold' as const,
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center' as const,
  },
  description: {
    fontSize: '20px',
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center' as const,
    lineHeight: '1.6',
  },
  contactInfo: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
  },
  contactItem: {
    fontSize: '20px',
    color: '#333',
    textAlign: 'center' as const,
  },
  link: {
    color: '#4682b4',
    textDecoration: 'none',
    transition: 'color 0.3s',
    cursor: 'pointer' as const,
  },
};

export default ContactView;
