import React from 'react';

interface CloseButtonProps {
  onPress: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onPress }) => {
  return (
    <button onClick={onPress} style={styles.closeIcon}>
      <span style={styles.closeIconText}>X</span>
    </button>
  );
};

const styles = {
  closeIcon: {
    position: 'absolute' as 'absolute',
    right: '20px',
    top: '10px',
    zIndex: 1,
    backgroundColor: '#e74c3c',
    padding: '5px 8px',
    borderRadius: '15px',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.5)',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
  },
  closeIconText: {
    fontSize: '20px',
    fontWeight: 'bold' as 'bold',
    color: '#fff',
    textAlign: 'center' as 'center',
  },
};

export default CloseButton;
