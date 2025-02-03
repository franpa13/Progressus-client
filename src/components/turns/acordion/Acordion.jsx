import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { IoIosArrowDown } from "react-icons/io";
import { CgGym } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { ModalTurns } from "../modalTurns/ModalTurns";
import { useTraerTurnosPorHora } from "../../../service/turns/useTraerTurnosPorHora";
import { useEffect } from "react";
import { SnackbarDefault } from "../../ui/snackbar/Snackbar";

// Recibiendo props en el componente
export const Acordion = ({
  title,
  content,
  onClick,
  setOpenAlert,
  setOpenAlertError,
  turnosReservados,
  setTurnosReservados,
  setAlertHoraError,
 
  setUnTurnoPorDia,

  setAlertMaxTurns
}) => {
  const [reservasPorHora, setReservasPorHora] = React.useState({});
  const [open, setOpen] = React.useState(false);

  // MANEJO DE HORARIOS
  const [horaInicio, setHorario] = React.useState("");
  const [horaFinal, setHoraFinal] = React.useState("");

  // Obtener la fecha actual en el formato YYYY-MM-DD
  const obtenerFechaActual = () => {
    const fecha = new Date();
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, "0");
    const day = String(fecha.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const fecha = obtenerFechaActual();

  // TRAER RESERVAS POR HORA
  const fetchReservas = async (hora) => {
    try {
      const response = await useTraerTurnosPorHora(fecha, `${hora}:00`);

      const cantidadReservada = response ? response.data.length : 0; // Ajusta `cantidad` según la respuesta real de la API

      setReservasPorHora((prev) => ({
        ...prev,
        [hora]: cantidadReservada,
      }));
    } catch (error) {
      console.log("Error al traer los turnos reservados", error);
    }
  };

  useEffect(() => {
    content.forEach((hora) => fetchReservas(hora));
  }, [content, fecha]);

  const onChangeHora = (cont, index) => {
    setHorario(cont);

    // Verificar si es la última hora del turno
    if (index === content.length - 1) {
      const [hours, minutes] = cont.split(":");
      const nextHour = `${String(parseInt(hours) + 1).padStart(
        2,
        "0"
      )}:${minutes}`;
      setHoraFinal(nextHour);
    } else {
      setHoraFinal(content[index + 1]);
    }
  };

  

  // Función para comparar la hora en formato HH:mm
  const formatHora = (hora) => {
    return hora.substring(0, 5); // Retorna solo la parte HH:mm
  };

  // Función para verificar si la hora del botón está reservada
  const isHoraReservada = (hora) => {
    const horaFormateada = formatHora(hora); // Formatear la hora para compararla
    // Verificar si alguno de los turnos reservados tiene la misma hora
    if(turnosReservados){

      return turnosReservados && turnosReservados?.some(
        (turno) => formatHora(turno.horaInicio) === horaFormateada
      );
    }

  };

  // const handleModal = (cont, index, isDisabled) => {
  //   if (reservasPorHora[cont] >= 40) {
  //     setAlertMaxTurns(true);
  //   } else {
  //     if (turnosReservados && turnosReservados.length === 1) {
  //       setUnTurnoPorDia(true);
  //       return;
  //     } else {
  //       !isDisabled && onChangeHora(cont, index);
  //       setOpen(true);
  //     }
  //   }
  // };
  const handleModal = (cont, index, isDisabled) => {
    if (reservasPorHora[cont] >= 40) {
      setAlertMaxTurns(true); // Mostrar alerta si el máximo de turnos está alcanzado
    } else {
      // Verificar si el usuario ya tiene un turno reservado
      if (turnosReservados && turnosReservados.length >= 2) {
        // Si ya tiene 2 turnos reservados, muestra un mensaje de alerta o evita la acción
        setAlertMaxTurns(true); // O podrías mostrar otro mensaje si lo prefieres
        return;
      } else {
        // Si no tiene dos turnos, permite que reserve
        !isDisabled && onChangeHora(cont, index); // Cambiar el horario de la reserva si no está deshabilitado
        setOpen(true); // Abrir el modal para hacer la reserva
      }
    }
  };
  return (
    <div className="w-full">
      <Accordion>
        <AccordionSummary
          expandIcon={<IoIosArrowDown className="text-customTextBlue" />}
          aria-controls="panel-content"
          id="panel-header"
          onClick={onClick}
        >
          <div className="flex items-center gap-3">
            <IoSettingsOutline size={22} className="text-customTextBlue" />
            <h2 className="text-base md:text-lg font-semibold">{title}</h2>  
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-col gap-5">
            {content.map((cont, index) => {
              // Verificar si la hora está reservada
              const isDisabled = isHoraReservada(cont);

              return (
                <button
                  key={cont}
                  className={`bg-green-50 rounded-lg md:p-2 p-2 px-1 flex justify-between cursor-pointer hover:bg-customNavBar hover:text-white transition-all ${
                    isDisabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => handleModal(cont, index, isDisabled)}
                  disabled={isDisabled}
                >
                  <div className="flex flex-row-reverse items-center justify-start gap-3">
                    <span className="text-base md:text-lg font-semibold">
                      {`${cont} hs`}
                    </span>
                    <CgGym size={24} />
                  </div>
                  <span className="font-semibold">
                    {reservasPorHora[cont] || 0}/40
                  </span>
                </button>
              );
            })}
          </div>
        </AccordionDetails>
      </Accordion>
      <ModalTurns
        turnosReservados={turnosReservados}
        setTurnosReservados={setTurnosReservados}
        setOpenAlert={setOpenAlert}
        setOpenAlertError={setOpenAlertError}
        open={open}
        setOpen={setOpen}
        horaInicio={horaInicio}
        horaFinal={horaFinal}
        setAlertHoraError={setAlertHoraError}
      />
      {/* <SnackbarDefault
        open={unTurnoPorDia}
        setOpen={setUnTurnoPorDia}
        severity={"warning"}
        duration={7000}
        // position={{vertical : "center" , horizontal : "center"}}
        message={"Solo puedes reservar un turno por dia !"}
      ></SnackbarDefault> */}

      {/* ALERT MAXIMO DE TURNOS POR ESA HORA */}
      {/* <SnackbarDefault
        open={alertMaxTurns}
        setOpen={setAlertMaxTurns}
        severity={"warning"}
        duration={7000}
        message={"Se alcanzo el maximo de cupos en este horario!"}
      ></SnackbarDefault> */}
    </div>
  );
};
