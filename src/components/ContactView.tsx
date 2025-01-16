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

        <div style={styles.privacyContainer}>
          <h2 style={styles.heading}>Polityka Prywatności</h2>
          <p style={styles.privacyText}>
            Twoje dane osobowe są dla nas ważne. Korzystając z naszej platformy, akceptujesz warunki niniejszej Polityki Prywatności. 
            Zebrane dane są wykorzystywane wyłącznie w celu świadczenia naszych usług, ulepszania funkcjonalności strony oraz wspierania użytkowników.
          </p>
          <h3 style={styles.subHeading}>Jakie dane zbieramy?</h3>
          <p style={styles.privacyText}>
            - Dane logowania (np. imię, adres e-mail).
            <br />
            - Informacje o Twojej aktywności na platformie.
            <br />
            - Inne dane niezbędne do realizacji funkcji platformy.
          </p>
          <h3 style={styles.subHeading}>Jak chronimy Twoje dane?</h3>
          <p style={styles.privacyText}>
            Stosujemy odpowiednie środki techniczne i organizacyjne, aby zapewnić bezpieczeństwo Twoich danych i chronić je przed nieuprawnionym dostępem.
          </p>
          <h3 style={styles.subHeading}>Twoje prawa</h3>
          <p style={styles.privacyText}>
            Masz prawo do wglądu w swoje dane, ich poprawiania lub usunięcia. W każdej chwili możesz skontaktować się z nami, aby skorzystać z tych praw.
          </p>
          <h3 style={styles.subHeading}>Jak usunąć konto?</h3>
          <p style={styles.privacyText}>
            Aby usunąć konto, musisz być zalogowany, wejść do sekcji Profil, kliknąć zębatkę, a następnie czerwony kosz. Opcja ta spowoduje usunięcie konta wraz ze wszystkimi informacjami. 
            Jeśli napotkasz jakiekolwiek trudności w usuwaniu konta, skontaktuj się z naszym działem wsparcia za pośrednictwem e-maila lub telefonu podanego powyżej.
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
  privacyContainer: {
    marginTop: '30px',
    textAlign: 'left' as const,
  },
  privacyText: {
    fontSize: '16px',
    color: '#555',
    lineHeight: '1.6',
    marginBottom: '20px',
  },
  subHeading: {
    fontSize: '20px',
    fontWeight: 'bold' as const,
    color: '#333',
    marginBottom: '10px',
  },
};

export default ContactView;
