import React, { CSSProperties } from 'react';

const styles: { [key: string]: CSSProperties } = {
  overlay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1000,
  },
  spinner: {
    border: '8px solid #f3f3f3',
    borderTop: '8px solid "#454647"',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 1s linear infinite',
  },
};

const keyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

interface LoadingSpinnerProps {
  visible: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ visible }) => {
  if (!visible) return null; // Jeśli nie ma widoczności, nie renderuj spinnera

  return (
    <>
      <style>{keyframes}</style> {/* Animacja spinnera dodana do dokumentu */}
      <div style={styles.overlay}>
        <div style={styles.spinner}></div>
      </div>
    </>
  );
};

export default LoadingSpinner;
