import { Box, Card, CardContent, CardMedia, CircularProgress, Container, List, ListItem, ListItemText, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import React from 'react'
import logoMp from "/logomp.png"
import { useSpinnerStore, useStoreUserData } from '../../store'
import { useGetMemberships } from '../../service/membership/useGetMembership'
import { useCreateRequestPayment } from '../../service/membership/useCreateRequestPayment'
import { useRegisterComoMp } from '../../service/membership/useRegisterComoMp'

export const SectionPaymentNutritionPlan = () => {
  const [isLoading, setIsLoading] = useState(false)
  const hideSpinner = useSpinnerStore(state => state.hideSpinner)
  const showSpinner = useSpinnerStore(state => state.showSpinner)
  const [idPlan, setIdPlan] = useState(null)
  const userData = useStoreUserData((state) => state.userData);
  useEffect(() => {
    showSpinner()
    const traerPlanNutri = async () => {
      try {
        const response = await useGetMemberships();



        const planNutri = response.data.find((membresia) => membresia.id === 15);

        if (planNutri) {
          setIdPlan(planNutri)

        } else {
          console.log("No se encontró la membresía con id 15");
        }
      } catch (e) {
        console.log(e, "errores");
      } finally {
        hideSpinner()
      }
    };

    traerPlanNutri();
  }, []);

  const handleCreateSolicitud = async () => {
    setIsLoading(true)
    const createPlan = await useCreateRequestPayment(15, 4, userData.identityUserId)
    console.log(createPlan, "create plan");
    let idSolicitudMercadoPago;
    if (createPlan?.status == 200) {
      idSolicitudMercadoPago = createPlan.data.id;
    }

    // REGISTRAR SOLICITUD COMO MERCADO PAGO
    const registerComoMercadoPago = await useRegisterComoMp(
      idSolicitudMercadoPago
    );

    // REDIRECCIÓN AL INIT POINT
    const initPoint = registerComoMercadoPago?.data?.value?.initPoint;
    if (initPoint) {
      setIsLoading(false)
      window.location.href = initPoint; // Redirige al usuario
    } else {
      console.error("InitPoint no encontrado en la respuesta.");
    }
  }
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
              onClick={handleCreateSolicitud}
              style={{
                minWidth: '750px',
                backgroundColor: "#009EE3",
                color: "white",
                padding: "8px 15px",
                borderRadius: "5px",
                fontWeight: "600",
                fontSize: "16px",
                border: "none",
                cursor: isLoading ? "default" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "background-color 0.3s ease",
                opacity: isLoading ? 0.7 : 1
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <img src={logoMp} alt="Mercado Pago" className="w-7 md:w-10" />
              )}
              Pagar con Mercado Pago
            </button>
          </CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem' }}>
            <Card sx={{ width: 250, boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="50"
                image="/nutricionista.jpg"
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
