import React from "react";
import { Alert } from "../../ui/alert/Alert";
import { SnackbarDefault } from "../../ui/snackbar/Snackbar";
export const GridAlertsTurns = ({
  alertDelete,
  openAlert,
  setOpenAlert,
  openAlertError,
  setAlertDelete,
  alertHoraError,
  setAlertHoraError,
  setOpenAlertError,
  unTurnoPorDia, 
  setUnTurnoPorDia,
  alertMaxTurns ,
  setAlertMaxTurns
}) => {
  return (
    <>
      {/* ALERT AL RESERVAR CORRECTAMENTE EL TURNO */}
      {openAlert && (
        <SnackbarDefault
          open={openAlert}
          setOpen={setOpenAlert}
          message="Turno guardado correctamente!"
          severity="success"
        />
      )}
      {/* ALERT SI ERROR AL RESERVAR EL TURNO */}
      {openAlertError && (
        <Alert
          open={openAlertError}
          setOpen={setOpenAlertError}
          severity="info"
          message="Ocurrió un error al realizar la operación"
        />
      )}
      {/* ALERT AL ELIMINAR */}
      {alertDelete && (
        <SnackbarDefault
          open={alertDelete}
          setOpen={setAlertDelete}
          message="Turno eliminado correctamente"
          severity="info"
        ></SnackbarDefault>
      )}
      {/* ALERT SI SELECCIONA HORARIOS NO CORRESPONDIENTES*/}
      {alertHoraError && (
        <SnackbarDefault
          open={alertHoraError}
          setOpen={setAlertHoraError}
          message="No se puede reservar este turno !"
          severity="error"
        ></SnackbarDefault>
      )}

      {/* ALERT SOLO PUEDE RESERVAR UN TURNO POR DIA */}
      <SnackbarDefault
        open={unTurnoPorDia}
        setOpen={setUnTurnoPorDia}
        severity={"warning"}
        duration={7000}
        // position={{vertical : "center" , horizontal : "center"}}
        message={"Solo puedes reservar un turno por día!"}
      ></SnackbarDefault>

      {/* ALERT MAXIMO DE TURNOS POR ESA HORA */}
      <SnackbarDefault
        open={alertMaxTurns}
        setOpen={setAlertMaxTurns}
        severity={"warning"}
        duration={7000}
        message={"Se alcanzó el máximo de cupos !"}
      ></SnackbarDefault>
      {/* ALERT SI INTENTA SELECCIONAR DOS TURNOS AL MISMO HORARIO*/}
      {/* {alertDuplicatedTurn && (
        <SnackbarDefault
          open={alertDuplicatedTurn}
          setOpen={setAlertDuplicatedTurn}
          message="Ya has reservado este turno anteriormente "
          severity="warning"
        ></SnackbarDefault>
      )} */}
    </>
  );
};
