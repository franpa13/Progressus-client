import * as React from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ConfirmCode from "../confirmCode/ConfirmCode";

import { useState } from "react";
import {
  useSpinnerStore,
  useStoreAlert,
  useStoreSelectAuth,
} from "../../../store";
import { useSpring, animated } from "@react-spring/web";
import { sendCodeVerificationAuth } from "../../../service/auth/use-sendCodeVerificationAuth";
import { MdErrorOutline } from "react-icons/md";

import { ButtonSpinner } from "../../ui/buttons/ButtonSpinner";
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
  width: window.innerWidth < 700 ? "79%" : 800,
  maxWidth: 400,
  bgcolor: "#E6F7FF",
  border: "1px solid #1890FF",
  borderRadius: "8px",
  boxShadow: 24,
  p: 2,
};

export const ModalVerificationAuth = ({ open, email, setOpen }) => {
  // SPINNER
  const [openSpinner, setOpenSpinner] = useState(false);
  // ESTADO DEL ALERT CUANDO SE VERIFICA EL CODIGO
  const openAlertAuth = useStoreAlert((state) => state.openAlert);
  // CAMBIAR AL LOGIN
  const changeToLogin = useStoreSelectAuth((state) => state.authLogin);
  // ERROR AL ENVIAR EL CODIGO
  const [alertFailed, setAlertFailed] = useState(false);
  const [code, setCode] = useState(Array(4).fill(""));
  const handleSendCode = async () => {
    const codeString = code.join("");
    console.log(email, typeof codeString, "email and codeaster");
    setOpenSpinner(true);
    try {
      const responseSendCode = await sendCodeVerificationAuth(
        email,
        codeString
      );

      if (responseSendCode && responseSendCode.status == "200") {
        changeToLogin();
        openAlertAuth();
        setOpen(false);
      } else {


        setAlertFailed(true);
        setCode(Array(4).fill(""));
      }
    } catch (e) {
      console.log(e, "error");
    } finally {
      setOpenSpinner(false);
    }
  };
  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
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
            <h2 className="text-center w-full">
              Ingrese el código que enviamos al correo {email && email}
            </h2>
            <div className="flex flex-col items-center justify-center w-full ">
              <ConfirmCode code={code} setCode={setCode} set></ConfirmCode>
              {alertFailed && (
                <span className="text-red-500 w-full text-center font-medium flex justify-center items-center text-sm">
                  Código inválido
                  <MdErrorOutline width={15} />
                </span>
              )}
              <ButtonSpinner
                loading={openSpinner}
                label="Verificar Codigo"
                type="text"
                onClick={handleSendCode}
              ></ButtonSpinner>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
