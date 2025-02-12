import { Box, Card, CardContent, CardMedia, Container, List, ListItem, ListItemText, Typography } from '@mui/material'
import React from 'react'
import logoMp from "/logomp.png"
export const SectionPaymentNutritionPlan = () => {
  return (
    <div className='animate-fade-in-down'>
    <Container maxWidth="lg" sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
      <Card sx={{ display: 'flex', padding: '2rem', justifyContent: 'space-between' }}>
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h5" gutterBottom>
            Plan Nutricional Personalizado
          </Typography>
          <Typography variant="body1" paragraph>
            Completa tu entrenamiento con un plan nutricional diseñado especialmente para ti.
          </Typography>
          <Typography variant="body1" paragraph>
            ¿Por qué elegir nuestro servicio de nutrición?
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="✓ Planes personalizados: Diseñados según tus objetivos (pérdida de peso, ganancia muscular, rendimiento deportivo, etc.)." />
            </ListItem>
            <ListItem>
              <ListItemText primary="✓ Seguimiento continuo: Ajustes mensuales según tu progreso." />
            </ListItem>
            <ListItem>
              <ListItemText primary="✓ Comodidad total: Accede a los planes desde la misma web." />
            </ListItem>
            <ListItem>
              <ListItemText primary="✓ Consejos profesionales: Nuestra nutricionista está certificada y especializada en fitness y salud integral." />
            </ListItem>
          </List>
          <Typography variant="body1" paragraph>
            Este es un servicio adicional exclusivo para socios del gimnasio.
          </Typography>
          <Typography variant="h6" color="primary" gutterBottom>
            Costo del servicio: $15.000 por mes.
          </Typography>
          <button
            onClick={() => hanleCreateSolicitud(card)}
            style={{
              minWidth: '750px',
              backgroundColor: "#009EE3",
              color: "white",
              padding: "8px 15px",
              borderRadius: "5px",
              fontWeight: "600",
              fontSize: "16px",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#007BBE")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#009EE3")
            }
          >
            <img
              src={logoMp}
              alt="Mercado Pago"
              className="w-7 md:w-10"
            />
            Pagar con Mercado Pago
          </button>
        </CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem' }}>
          <Card sx={{ width: 250, boxShadow: 3 }}>
            <CardMedia
              component="img"
              height="50"
              image="/public/nutricionista.jpg"
              alt="Nutricionista"
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Lic. Valentina Goñi
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Dip. Nutrición y Medicina Ortomolecular
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Nutrición Deportiva
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Antropometrista ISAK Nivel 1
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Card>
    </Container>
  </div>
  )
}
