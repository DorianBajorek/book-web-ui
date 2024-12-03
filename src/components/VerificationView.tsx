import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { verifyEmail } from "../BooksService";
import ErrorBanner from "./Banners/ErrorBanner";

const EmailVerification = () => {
  const [verified, setVerified] = useState(false);
  const [searchParams] = useSearchParams();
  const [showError, setShowError] = useState(false);

  const token = searchParams.get("token");

  const handleVerification = async () =>  {
    if(token){
        try {
          await verifyEmail(token);
          setVerified(true);
        } catch(error){
          setShowError(true);
          setTimeout(() => setShowError(false), 5000);
        }
    }
  };

  return (
    <div style={styles.container}>
      {showError && <ErrorBanner message="Coś poszło nie tak. Spróbuj ponownie poźniej." />}
      {!verified ? (
        <div style={styles.box}>
          <h2 style={styles.heading}>Weryfikacja e-maila</h2>
          <p style={styles.text}>
            Kliknij poniższy przycisk, aby zakończyć proces weryfikacji Twojego
            e-maila.
          </p>
          <button style={styles.button} onClick={handleVerification}>
            Zweryfikuj e-mail
          </button>
        </div>
      ) : (
        <div style={styles.box}>
          <h2 style={styles.heading}>Dziękujemy!</h2>
          <p style={styles.text}>Twój e-mail został pomyślnie zweryfikowany.</p>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f4f4f4",
      fontFamily: "Arial, sans-serif",
      margin: 0,
      padding: 0,
    },
    box: {
      textAlign: "center",
      padding: "20px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      maxWidth: "400px",
      width: "100%",
    },
    heading: {
      fontSize: "24px",
      marginBottom: "16px",
      color: "#333",
    },
    text: {
      fontSize: "16px",
      marginBottom: "20px",
      color: "#555",
    },
    button: {
      padding: "10px 20px",
      fontSize: "16px",
      color: "#fff",
      backgroundColor: "#007bff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
  };
  

export default EmailVerification;
