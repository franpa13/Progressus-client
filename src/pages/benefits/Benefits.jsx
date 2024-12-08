import React, { useState } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { MainLayout } from "../../layout/MainLayout";

export const Benefits = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const benefits = [
    {
      image: '/beneficio-budines.jpg',
      title: 'Budines tortas y mas...',
      description: '¡Rico y saludable! Por consultas y encargues...',
      phone: '3385-441806'
    },
    {
      image: '/beneficio-osteopatia.jpg',
      title: '10% de descuento',
      description: 'Osteopatía - medicina alternativa',
      practicante: 'Lic. Juan Cruz bosticco'
    },
    {
      image: '/beneficio-nutricionista.jpg',
      title: 'Nuestra nutricionista!',
      description: 'Lic. Valentina Goñi. UCC MP: 4569',
      services: [
        'Nutrición y Medicina Ortomolecular',
        'Alimentación Antiinflamatoria',
        'Alimentación Cetogénica, Low Carb-High Fat',
        'Nutrición Deportiva',
        'Antropometrista ISAK nivel I'
      ]
    }
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? benefits.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === benefits.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <MainLayout>
      <Container maxWidth="md" sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={benefits[currentIndex].image}
                title={benefits[currentIndex].title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {benefits[currentIndex].title}
                </Typography>
                <Typography variant="body1" color="text.secondary" component="p">
                  {benefits[currentIndex].description}
                </Typography>
                {benefits[currentIndex].phone && (
                  <Typography variant="body1" color="text.secondary" component="p">
                    Teléfono: {benefits[currentIndex].phone}
                  </Typography>
                )}
                {benefits[currentIndex].practicante && (
                  <Typography variant="body1" color="text.secondary" component="p">
                    Practicante: {benefits[currentIndex].practicante}
                  </Typography>
                )}
                {benefits[currentIndex].services && (
                  <div>
                    <Typography variant="h6" component="h3">
                      Servicios:
                    </Typography>
                    <ul>
                      {benefits[currentIndex].services.map((service, index) => (
                        <li key={index}>
                          <Typography variant="body1" color="text.secondary" component="p">
                            - {service}
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
              <Grid container justifyContent="space-between" sx={{ padding: '0.5rem' }}>
                <IconButton onClick={handlePrev}>
                  <ArrowBack />
                </IconButton>
                <IconButton onClick={handleNext}>
                  <ArrowForward />
                </IconButton>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </ Container>
    </MainLayout>
  );
};
