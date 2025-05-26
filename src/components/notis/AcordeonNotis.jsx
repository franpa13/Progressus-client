import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNotificacionesUsuario } from '../../hooks/notificaciones/useNotis';
import { useSpinnerStore, useStoreUserData } from '../../store';


const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': { borderBottom: 0 },
  '&::before': { display: 'none' },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]: {
    transform: 'rotate(90deg)',
  },
  [`& .${accordionSummaryClasses.content}`]: { marginLeft: theme.spacing(1) },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export const AcordeonNotis = () => {
  const showSpinner = useSpinnerStore((state) => state.showSpinner);
  const hideSpinner = useSpinnerStore((state) => state.hideSpinner);
  const dataUser = useStoreUserData((state) => state.userData);
  const { notificaciones, loading, error } = useNotificacionesUsuario(dataUser?.identityUserId);
  const [expanded, setExpanded] = useState('');
  const [showAll, setShowAll] = useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  // Función para formatear la fecha
  const formatFecha = (fecha) => {
    if (!fecha) return 'Fecha no disponible';
    const date = new Date(fecha);
    date.setHours(date.getHours() - 3); // Resta 3 horas
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };


  useEffect(() => {
    if (loading) {
      showSpinner();
    } else {
      hideSpinner();
    }
  }, [loading]);
  const notificacionesOrdenadas = [...(notificaciones || [])].sort((a, b) => {
    const dateA = a.fechaCreacion ? new Date(a.fechaCreacion).getTime() : 0;
    const dateB = b.fechaCreacion ? new Date(b.fechaCreacion).getTime() : 0;
    return dateB - dateA; // Orden descendente
  });

  // Obtener las notificaciones a mostrar
  const notificacionesAMostrar = showAll
    ? notificacionesOrdenadas.slice(0, 12)
    : notificacionesOrdenadas.slice(0, 5);

  return (
    <div>
      {notificacionesAMostrar?.length > 0 ? (
        <>
          {notificacionesAMostrar?.map((noti, index) => (
            <Accordion key={index} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)} sx={{ my: '8px' }}>
              <AccordionSummary aria-controls={`panel${index}-content`} id={`panel${index}-header`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <Typography component="span">{noti.titulo}</Typography>
                  <Typography component="span" variant="caption" fontSize="16px" sx={{ color: 'black' }}>
                    {formatFecha(noti.fechaCreacion)}
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{noti.cuerpo}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}

          {/* Botones de control */}
          <div className='flex justify-start w-full' style={{ textAlign: 'center', margin: '20px 0' }}>
            {notificacionesOrdenadas?.length > 5 && !showAll && (
              <Button
                variant="contained"
                onClick={() => setShowAll(true)}
                sx={{
                  backgroundColor: '#3f51b5',
                  '&:hover': { backgroundColor: '#303f9f' },
                  marginRight: '10px'
                }}
              >
                Mostrar más (12)
              </Button>
            )}

            {showAll && (
              <Button
                variant="outlined"
                onClick={() => setShowAll(false)}
                sx={{
                  color: '#3f51b5',
                  borderColor: '#3f51b5',
                  '&:hover': { borderColor: '#303f9f' }
                }}
              >
                Mostrar menos (5)
              </Button>
            )}
          </div>
        </>
      ) : (
        <Typography variant="body1" sx={{ textAlign: 'center', padding: '20px' }}>
          No tienes notificaciones nuevas.
        </Typography>
      )}
    </div>
  );
};