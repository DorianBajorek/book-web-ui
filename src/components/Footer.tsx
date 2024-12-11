const Footer: React.FC = () => {
    return (
      <div style={styles.footerContainer}>
        <a href="https://www.instagram.com/drugaksiazka_official/" target="_blank" rel="noopener noreferrer" style={styles.link}>
          <img src="/instagram-logo.png" alt="Instagram" style={styles.icon} />
        </a>
        <p style={styles.footerText}>© 2024 Drugaksiazka.pl. Wszystkie prawa zastrzeżone.</p>
      </div>
    );
  };
  
  const styles = {
    footerContainer: {
      textAlign: 'center' as const,
      padding: '20px',
      backgroundColor: '#f5f8fa',
      borderTop: '1px solid #e0e0e0',

    },
    link: {
      display: 'inline-block',
      margin: '0 10px',
    },
    icon: {
      width: '24px',
      height: '24px',
    },
    footerText: {
      fontSize: '14px',
      color: '#6e7c7c',
      margin: '10px 0 0',
    },
  };
  
  export default Footer;
  