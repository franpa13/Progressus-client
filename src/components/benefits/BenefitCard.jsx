import React from 'react';

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '300px',
    margin: '16px',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 'auto',
  },
  content: {
    padding: '16px',
  },
  title: {
    fontSize: '18px',
    marginBottom: '8px',
    color: '#333',
  },
  description: {
    fontSize: '14px',
    color: '#555',
  },
};

export const BenefitCard = ({ image, title, description, contact, location, date }) => {
  return (
    <div style={styles.card}>
      <img src={image} alt={title} style={styles.image} />
      <div style={styles.content}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.description}>{description}</p>
        <p><strong>Ubicación:</strong> {location}</p>
        <p><strong>Fecha:</strong> {date}</p>
        <p><strong>Contacto:</strong> {contact}</p>
      </div>
    </div>
  );
};

export default BenefitCard;
