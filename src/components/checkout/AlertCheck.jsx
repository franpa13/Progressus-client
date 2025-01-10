import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

export const AlertCheckout = ({ severity, text }) => {
  return (
    <Alert
    sx={{ fontSize: {
      xs: "14px", // Tamaño de fuente para pantallas pequeñas
      sm: "16px", // Tamaño de fuente para pantallas medianas
      md: "18px", // Tamaño de fuente para pantallas grandes
      lg: "20px", // Tamaño de fuente para pantallas muy grandes
    },}}
      // icon={<CheckIcon fontSize="inherit" />} 
      severity={severity}>
      {text}
    </Alert>
  );
}