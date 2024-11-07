import * as React from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "../../ui/buttons/Button";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import { IoIosTimer } from "react-icons/io";
import { useSendReserve } from "../../../service/turns/use-sendReserve";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import dayjs from "dayjs";
import { useGetTurns } from "../../../service/turns/use-getTurns";
import { Alert } from "../../ui/alert/Alert";
import { useStoreUserData } from "../../../store";
const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: window.innerWidth < 700 ? "78%" : 800,
  maxWidth: 400,
  bgcolor: "#E6F7FF",
  border: "1px solid #1890FF",
  borderRadius: "8px",
  boxShadow: 24,
  p: 2,
};

export const ModalTurns = ({
  open,
  setOpen,
  horaInicio,
  horaFinal,
  setOpenAlert,
  setOpenAlertError,
  setTurnosReservados,
}) => {
  // HORARIO Y FECHA PARA MOSTRAR EN HOME
  // const today = dayjs().format("dddd, D [de] MMMM [de] YYYY");
  // const setTime = useStoreTime((state) => state.setTime);
  // const setDate = useStoreTime((state) => state.setTDate);
  const userData = useStoreUserData((state) => state.userData);

  dayjs.extend(utc);
  dayjs.extend(timezone);
  const fechaArgentina = dayjs()
    .tz("America/Argentina/Buenos_Aires")
    .toISOString();
  const idUser = userData.identityUserId;

  // Obtener la fecha actual en formato 'YYYY-MM-DD'
  const fechaBase = dayjs()
    .tz("America/Argentina/Buenos_Aires")
    .format("YYYY-MM-DD");

  // Convertir las horas de inicio y fin en formato HH:mm:ss
  const horaInicioFormatted = dayjs(`${fechaBase}T${horaInicio}`).format(
    "HH:mm:ss"
  );
  const horaFinFormatted = dayjs(`${fechaBase}T${horaFinal}`).format(
    "HH:mm:ss"
  );

  if (!horaInicioFormatted || !horaFinFormatted) {
    console.error("Error: Hora de inicio o fin no es válida.");
    return null;
  }

  const confirm = true;

  const handleClose = () => setOpen(false);

  const handleTurn = async (e) => {
    e.preventDefault();
    try {
      setOpenAlert(false);
      setOpenAlertError(false);
      const responseTurn = await useSendReserve(
        idUser,
        fechaArgentina,
        horaInicioFormatted, // Enviando la hora en formato HH:mm:ss
        horaFinFormatted, // Enviando la hora en formato HH:mm:ss
        confirm
      );
      console.log(responseTurn, "response returnm");

      if (responseTurn && responseTurn.status == "200") {
        const upadateTurns = await useGetTurns(userData.identityUserId);
        setTurnosReservados(upadateTurns.data.value)
        setOpen(false);
        setOpenAlert(true);
      } else {
        setOpen(false);
        setOpenAlertError(true);
      }
      console.log(responseTurn, "response");
    } catch (e) {
      console.log(e, "error");
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <form
              onSubmit={handleTurn}
              className="flex flex-col justify-center items-center text-center gap-3"
            >
              <div className="w-full p-[2px] absolute top-0 justify-start">
                <IoIosTimer size={28}></IoIosTimer>
              </div>
              <Typography
                sx={{ marginTop: "25px" }}
                id="spring-modal-title"
                variant="h6"
                component="h2"
              >
                {`¿Estás seguro de reservar el turno de las ${horaInicio}?`}
              </Typography>
              <Button
                label="Elegir turno"
                type="submit"
                className="px-[7px] py-[5px] md:px-2 md:py-2 text-sm md:text-sm"
              ></Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
