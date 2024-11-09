import React from 'react';

interface ErrorBannerProps {
  message: string;
}

const ErrorBanner: React.FC<ErrorBannerProps> = ({ message }) => {
  return (
    <div style={containerStyle}>
      <div style={iconContainerStyle}>
        <span style={iconStyle}>⚠️</span>
      </div>
      <div style={textContainerStyle}>
        <p style={messageStyle}>{message}</p>
      </div>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  position: 'absolute',
  top: '60px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#ffe6e5',
  padding: '16px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  maxWidth: '600px',
  minWidth: '300px',
  animation: 'slideDown 0.5s ease-out',
  zIndex: 1000,
};

const iconContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '48px',
  height: '48px',
  borderRadius: '24px',
  backgroundColor: '#fff8f8',
  marginRight: '16px',
};

const iconStyle: React.CSSProperties = {
  fontSize: '24px',
};

const textContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

const messageStyle: React.CSSProperties = {
  fontSize: '18px',
  color: '#555',
  margin: 0,
};

const styles = `
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translate(-50%, -20px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default ErrorBanner;
