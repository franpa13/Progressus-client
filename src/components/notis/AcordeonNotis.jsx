import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
  {
    transform: 'rotate(90deg)',
  },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(255, 255, 255, .05)',
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export const AcordeonNotis = () => {
  const [expanded, setExpanded] = React.useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const notificaciones = [
    {
      id: 'panel1',
      titulo: 'Nueva clase de spinning',
      contenido: 'Se ha agregado una nueva clase de spinning los jueves a las 7 PM.',
      fecha: '2025-01-10',
      hora: '14:30',
    },
    {
      id: 'panel2',
      titulo: 'Promoción especial',
      contenido: 'Descuento del 20% en membresías anuales hasta el final del mes.',
      fecha: '2025-01-09',
      hora: '10:00',
    },
    {
      id: 'panel3',
      titulo: 'Cambio de horario',
      contenido: 'El horario de yoga de los miércoles ha cambiado a las 6 PM.',
      fecha: '2025-01-08',
      hora: '16:45',
    },
  ];

  return (
    <div>
      {notificaciones.map((noti) => (
        <Accordion
          key={noti.id}
          expanded={expanded === noti.id}
          onChange={handleChange(noti.id)}
          sx={{ my: '5px' }}
        >
          <AccordionSummary
            aria-controls={`${noti.id}-content`}
            id={`${noti.id}-header`}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Typography component="span">{noti.titulo}</Typography>
              <Typography
                component="span"
                variant="caption"
                fontSize={"16px"}
                sx={{ color: 'black' }}
              >
                {`${noti.fecha} | ${noti.hora}`}
              </Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{noti.contenido}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};
