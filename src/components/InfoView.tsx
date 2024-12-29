import React from 'react';

const InfoView: React.FC = () => {
    const faqList = [
        { question: "Jak usunąć konto?", answer: "Aby usunąć konto, musisz być zalogowany, wejść do sekcji Profil, kliknąć zębatkę, a następnie czerwony kosz. Opcja ta spowoduje usunięcie konta wraz ze wszystkimi informacjami." },
      ];
    
      return (
        <div style={styles.pageContainer}>
          <div style={styles.container}>
            <h1 style={styles.heading}>FAQ - Najczęściej zadawane pytania</h1>
            <div style={styles.faqList}>
              {faqList.map((item, index) => (
                <div key={index} style={styles.faqItem}>
                  <p style={styles.question}>{item.question}</p>
                  <p style={styles.answer}>{item.answer}</p>
                </div>
              ))}
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
    faqList: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '20px',
    },
    faqItem: {
      borderBottom: '1px solid #ddd',
      paddingBottom: '10px',
    },
    question: {
      fontSize: '20px',
      fontWeight: 'bold' as const,
      color: '#333',
      marginBottom: '10px',
    },
    answer: {
      fontSize: '18px',
      color: '#666',
      lineHeight: '1.5',
    },
  };
export default InfoView;
