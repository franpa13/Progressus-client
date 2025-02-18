import React, { useState } from 'react';
import { Button, Typography, Box, Card, CardContent, CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/Upload';
import { MainLayout } from "../../layout/MainLayout";
import logo from "/progressus.png";
import { SnackbarDefault } from "../../components";

export const ComprobantesSocio = () => {
  const [file, setFile] = useState(null);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [loading, setLoading] = useState(false); 

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && (selectedFile.type.includes("image") || selectedFile.type === "application/pdf")) {
      setFile(selectedFile);
    } else {
      alert("Solo se permiten archivos PDF o imágenes");
    }
  };

  function guardarArchivo() {
    setLoading(true); 
    var reader = new FileReader() 
    reader.readAsDataURL(file) 
    reader.onload = function (e) { 
      var rawLog = reader.result.split(',')[1]; 
      var dataSend = { dataReq: { data: rawLog, name: file.name, type: file.type }, fname: "uploadFilesToGoogleDrive" }; //preapre info to send to API
      fetch('https://script.google.com/macros/s/AKfycbyqLYFeGy8cTpgEJ24F4C3NfLQp5kVrDCo8JILL9LiWysLnJkB2-NN4QOKSVL4T87hSUg/exec', //your AppsScript URL
        { method: "POST", body: JSON.stringify(dataSend) }) 
        .then(res => res.json()).then((a) => {
          setAlertSuccess(true);
          handleDelete();
        }).catch(e =>setAlertError(true))
        .finally(() => setLoading(false)); 
      }
    }

  const handleDelete = () => {
    setFile(null);
  };

  return (
<MainLayout>    
    <Card sx={{ maxWidth: 600, margin: 'auto', padding: 2, textAlign: 'center', boxShadow: 3 }}>
      <CardContent>
        <Box display="flex" justifyContent="center" mb={2}>
          <img src={logo} className="w-[120px] md:w-[125px]" alt="" />
        </Box>
        <Typography variant="h5" fontWeight="bold"  marginTop="50px" marginBottom="30px"gutterBottom>
          SUBÍ ACÁ TU COMPROBANTE DE PAGO
        </Typography>
        <input
          type="file"
          accept="image/*,application/pdf"
          style={{ display: 'none' }}
          id="upload-file"
          onChange={handleFileChange}
        />
        <label htmlFor="upload-file">
          <Button
            variant="contained"
            component="span"
            startIcon={<CloudUploadIcon />}
            sx={{backgroundColor: '#009EE3', fontWeight: 'bold', color: 'white', '&:hover': { backgroundColor: '#007BBE' }, mb: 2 }}
          >
            Adjuntar
          </Button>
        </label>
        {file && (
          <Box mt={2}>
            <Typography variant="body2">Archivo seleccionado: {file.name}</Typography>
            {file.type.includes("image") ? (
              <img src={URL.createObjectURL(file)} alt="Vista previa" width="100%" style={{ marginTop: '10px', borderRadius: '5px' }} />
            ) : (
              <Typography variant="body2" color="textSecondary">PDF adjuntado</Typography>
            )}
            <Box mt={2} display="flex" justifyContent="space-between">
            {loading ? (
                  <CircularProgress size={24} />
                ) : (
              <Button sx={{ fontWeight: 'bold' }} variant="contained" color="success" startIcon={<UploadIcon />} onClick={guardarArchivo}>
                Subir
              </Button>
              )}
              <Button disabled={loading} sx={{ fontWeight: 'bold' }} variant="contained" color="error" startIcon={<DeleteIcon />} onClick={handleDelete}>
                Eliminar
              </Button>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
    <SnackbarDefault 
        message={"Archivo subido exitosamente a Google Drive!"} 
        open={alertSuccess} 
        setOpen={setAlertSuccess} 
        severity={"success"} 
      />
      
      {/* Notificación de error */}
      <SnackbarDefault 
        message={"Hubo un problema al subir el archivo"} 
        open={alertError} 
        setOpen={setAlertError} 
        severity={"error"} 
      />
</MainLayout>    
  );
};
