import React, { CSSProperties, useEffect } from 'react';

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
    borderTop: '8px solid #454647',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 1s linear infinite, colorChange 1.5s linear infinite', 
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
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      <style>{keyframes}</style>
      <div style={styles.overlay}>
        <div style={styles.spinner}></div>
      </div>
    </>
  );
};

export default LoadingSpinner;
