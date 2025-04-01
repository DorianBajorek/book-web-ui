const Footer: React.FC = () => {
  return (
    <div style={styles.footerContainer}>
      <div style={styles.linkContainer}>
      </div>
      <p style={styles.footerText}>© 2024 Drugaksiazka.pl. Wszystkie prawa zastrzeżone.</p>
    </div>
  );
};

const styles = {
  footerContainer: {
    fontFamily: '"Roboto", sans-serif', 
    textAlign: 'center' as const,
    padding: '20px',
    backgroundColor: '#f5f8fa',
    borderTop: '1px solid #e0e0e0',
  },
  linkContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '10px',
  },
  link: {
    display: 'inline-block',
  },
  icon: {
    width: '28px',
    height: '28px',
  },
  privacyButton: {
    display: 'inline-block',
    textDecoration: 'none',
    color: '#6e7c7c',
    fontSize: '16px',
    fontWeight: '600',
    padding: '5px 10px',
    border: '1px solid #6e7c7c',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  footerText: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#6e7c7c',
    margin: '10px 0 0',
  },
};

export default Footer;
