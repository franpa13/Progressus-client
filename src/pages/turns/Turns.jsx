import React, { useEffect, useState } from "react";
import { MainLayout } from "../../layout/MainLayout";
import {
  Acordion,
  Alert,
  Button,
  Location,
  Stack,
  Title,
  GridAlertsTurns,
  LoadingSkeleton,
} from "../../components";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { CgDanger } from "react-icons/cg";
import { FaRegCalendarTimes } from "react-icons/fa";

import { useDeleteTurn } from "../../service/turns/useDeleteTurn";

import { IoIosTimer } from "react-icons/io";
import { useGetTurns } from "../../service/turns/use-getTurns";

import { useSpinnerStore, useStoreUserData } from "../../store";
import { useMembershipStore } from "../../store/useStoreMembership";
import { useNavigate } from "react-router-dom";
dayjs.locale("es");

export const Turns = () => {
  const turnos = [
    {
      title: "Turno Mañana",
      horarios: ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00"],
    },
    {
      title: "Turno Tarde",
      horarios: ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
    },
    {
      title: "Turno Noche",
      horarios: ["19:00", "20:00", "21:00", "22:00"],
    },
  ];

  // if (!membership || membership.estadoSolicitud.nombre !== "Confirmado") {
  //   navigate("/membership");
  // }
  /////////////////////////////////////
  const dataUser = useStoreUserData((state) => state.userData);
  const [turnosReservados, setTurnosReservados] = useState([]);
  // VER SI TIENE MEMBRESIA ACTIVA
  const membership = useMembershipStore((state) => state.membershipData);

  const navigate = useNavigate();
  if (dataUser?.membresiaActiva == false) {
    navigate("/membership");

  }
  // SPINNER LOGIN
  const { showSpinner, hideSpinner } = useSpinnerStore();
  // DIA FROMATEADO
  const today = dayjs().format("dddd, D [de] MMMM [de] YYYY");
  // ALERT AL ELMINAR RESERVA
  const [alertDelete, setAlertDelete] = useState(false);
  // MANEJO DEL ALERT AL RESERVAR TURNO
  const [openAlert, setOpenAlert] = useState(false);
  const [openAlertError, setOpenAlertError] = useState(false);
  // ALERTA AL SELECCIONAR HORA ANTES DE LA ACTUAL
  const [alertHoraError, setAlertHoraError] = useState(false);
  //ALERT PARA NO RESERVAR DOS VECES EL MISMO HORARIO
  const [skeletonTurn, setSkeletonTurn] = useState(true);
  const [unTurnoPorDia, setUnTurnoPorDia] = React.useState(false);
  const [alertMaxTurns, setAlertMaxTurns] = React.useState(false);
  useEffect(() => {
    const traerTurnos = async () => {
      try {
        const response = await useGetTurns(dataUser.identityUserId);
        console.log(response, "response de response");

        if (response) {
          setTurnosReservados(response?.data.value);
        }
      } catch (error) {
        console.error("Error al traer los turnos:", error);
      } finally {
        setSkeletonTurn(false);
      }
    };

    traerTurnos();
  }, []);

  const deleteTurn = async (turn) => {
    showSpinner();

    try {
      console.log(turn, "clcikea");

      const response = await useDeleteTurn(turn.id);
      if (response && response.status == 200) {
        const responseGet = await useGetTurns(dataUser.identityUserId);
        console.log(responseGet, "response de response");

        if (responseGet) {
          setTurnosReservados(responseGet?.data.value);
        }
      }

      // if (response.status == "200") {
      //   setAlertDelete(true);

      //   // Esperar a que la alerta se cierre antes de actualizar los turnos
      //   const response = await useGetTurns(dataUser.identityUserId);

      //   setTurnosReservados(response?.data.value);
      // }
    } catch (e) {
      console.log(e);
    } finally {
      hideSpinner();
    }
  };

  const turnosHoy = turnosReservados.filter((turn) => {
    const fechaTurno = turn.fechaReserva.split("T")[0];
    return dayjs(fechaTurno).isSame(dayjs(), "day");
  });

  const turnosPasados = turnosReservados.filter((turn) => {
    const fechaTurno = turn.fechaReserva.split("T")[0];
    return dayjs(fechaTurno).isBefore(dayjs(), "day");
  });
  console.log(turnosHoy, "turnos hoy");

  return (
    <MainLayout>
      <section className="animate-fade-in-down bg-white md:mx-auto   rounded shadow-xl w-full md:w-11/12 p-4 overflow-hidden mb-20">
        <section className="w-full md:flex items-start md:mt-0 gap-0  ">
          <div className="flex flex-col md:border-r  md:pr-5 items-center justify-center gap-4 w-full mt-0 md:w-1/4 ">
            <div className="flex flex-col w-full justify-center md:items-start md:gap-3">
              <Location
                route={"Turnos"}
                subroute={"Reservar Turnos"}
              ></Location>
              <Title title={"Reserva tu turno"}></Title>
              <span className="text-customTextBlue text-base md:text-xl font-medium">
                {today}
              </span>
            </div>
            {turnos.map((turno, index) => (
              <Acordion
                setUnTurnoPorDia={setUnTurnoPorDia}
                setAlertMaxTurns={setAlertMaxTurns}
                setAlertHoraError={setAlertHoraError}
                openAlert={openAlert}
                openAlertError={openAlertError}
                // PARA ACTUALIZAR TURNOS RESERVADOS
                setTurnosReservados={setTurnosReservados}
                turnosReservados={turnosHoy}
                //////////////////////
                setOpenAlert={setOpenAlert}
                setOpenAlertError={setOpenAlertError}
                key={index}
                title={turno.title}
                content={turno.horarios}
              />
            ))}
          </div>
          <section className="md:w-3/4  md:px-4  ">
            <div className="md:mt-0 mt-3 flex w-full gap-5 flex-col justify-center items-center">
              <Title
                className={"md:text-lg font-semibold leading-3  "}
                title={"Mis turnos"}
                icon={<IoIosTimer size={22} />}
              ></Title>
              {/* TURNOS DE HOY  */}
              {skeletonTurn ? (
                <div className="w-full">
                  <LoadingSkeleton
                    className={"w-full "}
                    width={"100%"}
                    count={4}
                    height={50}
                  />
                </div>
              ) : turnosHoy && turnosHoy.length > 0 ? (
                turnosHoy.map((turn) => {
                  const fechaReserva = turn.fechaReserva.split("T")[0];
                  const [year, month, day] = fechaReserva.split("-");
                  const fechaFormateada = `${day}-${month}-${year}`;

                  const fechaObj = new Date(year, month - 1, day);
                  const diasSemana = [
                    "Domingo",
                    "Lunes",
                    "Martes",
                    "Miércoles",
                    "Jueves",
                    "Viernes",
                    "Sábado",
                  ];
                  const diaSemana = diasSemana[fechaObj.getDay()];

                  const horaInicioFormateada = turn.horaInicio.substring(0, 5);
                  const horaFinFormateada = turn.horaFin.substring(0, 5);

                  const hora = parseInt(turn.horaInicio.split(":")[0], 10);
                  let tituloTurno = "";
                  if (hora >= 6 && hora < 12) {
                    tituloTurno = "Turno mañana";
                  } else if (hora >= 12 && hora < 18) {
                    tituloTurno = "Turno tarde";
                  } else {
                    tituloTurno = "Turno noche";
                  }

                  return (
                    <Stack
                      onClick={() => deleteTurn(turn)}
                      classNameText={"flex flex-col items-end gap-3"}
                      isTurn={true}
                      key={turn.id}
                      titulo={tituloTurno}
                      duracion={`${horaInicioFormateada} hs - ${horaFinFormateada} hs`}
                      fechaFinalizacion={`${diaSemana}, ${fechaFormateada}`}
                    ></Stack>
                  );
                })
              ) : (
                <Stack
                  Icon={CgDanger}
                  titulo={"No tienes turnos reservados"}
                ></Stack>
              )}
              {/* TURNOS PASADOS */}
              <Title
                className={"  md:text-lg font-semibold leading-3 mt-6"}
                title={"Turnos anteriores"}
                icon={<FaRegCalendarTimes size={21} />}
              ></Title>
              {skeletonTurn ? (
                <div className="w-full">
                  <LoadingSkeleton
                    className={"w-full "}
                    width={"100%"}
                    count={4}
                    height={50}
                  />
                </div>
              ) : turnosPasados && turnosPasados.length > 0 ? (
                turnosPasados.map((turn) => {
                  const fechaReserva = turn.fechaReserva.split("T")[0];
                  const [year, month, day] = fechaReserva.split("-");
                  const fechaFormateada = `${day}-${month}-${year}`;

                  const fechaObj = new Date(year, month - 1, day);
                  const diasSemana = [
                    "Domingo",
                    "Lunes",
                    "Martes",
                    "Miércoles",
                    "Jueves",
                    "Viernes",
                    "Sábado",
                  ];
                  const diaSemana = diasSemana[fechaObj.getDay()];

                  const horaInicioFormateada = turn.horaInicio.substring(0, 5);
                  const horaFinFormateada = turn.horaFin.substring(0, 5);

                  const hora = parseInt(turn.horaInicio.split(":")[0], 10);
                  let tituloTurno = "";
                  if (hora >= 6 && hora < 12) {
                    tituloTurno = "Turno mañana";
                  } else if (hora >= 12 && hora < 18) {
                    tituloTurno = "Turno tarde";
                  } else {
                    tituloTurno = "Turno noche";
                  }

                  return (
                    <Stack
                      key={turn.id}
                      titulo={tituloTurno}
                      duracion={`${horaInicioFormateada} hs - ${horaFinFormateada} hs`}
                      fechaFinalizacion={`${diaSemana}, ${fechaFormateada}`}
                    ></Stack>
                  );
                })
              ) : (
                <Stack
                  Icon={CgDanger}
                  titulo={"No tienes turnos reservados"}
                ></Stack>
              )}
              {/* {turnosReservados &&
                turnosReservados.length > 0 &&
                !skeletonTurn && (
                  <div className="w-full flex justify-end">
                    <Button
                      onClick={handleDeleteTurn}
                      Icon={MdDeleteOutline}
                      className="px-[6px] py-[3px] flex items-center gap-1 bg-red-600 hover:bg-red-700 text-sm md:text-base"
                      label={`${
                        turnosReservados.length == 1
                          ? `Eliminar turno`
                          : `Eliminar Turnos`
                      }`}
                    ></Button>
                  </div>
                )} */}
            </div>

            {/* <div className="md:mt-0 mt-3 flex w-full gap-5 flex-col justify-center items-center">
              <Title
                className={""}
                title={"Turnos de fechas pasadas"}
                icon={<IoIosTimer />}
              ></Title>
              {skeletonTurn ? (
                <div className="w-full">
                  <LoadingSkeleton
                    className={"w-full "}
                    width={"100%"}
                    count={4}
                    height={50}
                  />
                </div>
              ) : turnosReservados.length > 0 ? (
                turnosReservados
                  .filter((turn) => {
                    // Obtener la fecha del turno
                    const fechaTurno = turn.fechaReserva.split("T")[0]; // Ejemplo: "2024-11-21"
                    // Obtener la fecha actual en formato "YYYY-MM-DD"
                    const hoy = dayjs().format("YYYY-MM-DD");
                    // Retornar solo los turnos del día actual
                    return fechaTurno === hoy;
                  })
                  .map((turn) => {
                    const fechaReserva = turn.fechaReserva.split("T")[0];
                    const [year, month, day] = fechaReserva.split("-");
                    const fechaFormateada = `${day}-${month}-${year}`;

                    const fechaObj = new Date(year, month - 1, day);
                    const diasSemana = [
                      "Domingo",
                      "Lunes",
                      "Martes",
                      "Miércoles",
                      "Jueves",
                      "Viernes",
                      "Sábado",
                    ];
                    const diaSemana = diasSemana[fechaObj.getDay()];

                    const horaInicioFormateada = turn.horaInicio.substring(
                      0,
                      5
                    );
                    const horaFinFormateada = turn.horaFin.substring(0, 5);

                    const hora = parseInt(turn.horaInicio.split(":")[0], 10);
                    let tituloTurno = "";
                    if (hora >= 6 && hora < 12) {
                      tituloTurno = "Turno mañana";
                    } else if (hora >= 12 && hora < 18) {
                      tituloTurno = "Turno tarde";
                    } else {
                      tituloTurno = "Turno noche";
                    }

                    return (
                      <Stack
                        key={turn.id}
                        titulo={tituloTurno}
                        duracion={`${horaInicioFormateada} hs - ${horaFinFormateada} hs`}
                        fechaFinalizacion={`${diaSemana}, ${fechaFormateada}`}
                      ></Stack>
                    );
                  })
              ) : (
                <Stack
                  Icon={CgDanger}
                  titulo={"No tienes turnos reservados"}
                ></Stack>
              )}

              {turnosReservados.length > 0 && !skeletonTurn && (
                <div className="w-full flex justify-end">
                  <Button
                    onClick={handleDeleteTurn}
                    Icon={MdDeleteOutline}
                    className="px-[6px] py-[3px] flex items-center gap-1 bg-red-600 hover:bg-red-700 text-sm md:text-base"
                    label={`${
                      turnosReservados.length == 1
                        ? `Eliminar turno`
                        : `Eliminar Turnos`
                    }`}
                  ></Button>
                </div>
              )}
            </div> */}
          </section>
        </section>
      </section>
      {/* ALERTAS AL GUARDAR , ELIMINAR , TURNO NO DISPONIBLE Y TURNO DUPLICADO */}

      <GridAlertsTurns
        alertMaxTurns={alertMaxTurns}
        setAlertMaxTurns={setAlertMaxTurns}
        unTurnoPorDia={unTurnoPorDia}
        setUnTurnoPorDia={setUnTurnoPorDia}
        setAlertDelete={setAlertDelete}
        alertDelete={alertDelete}
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        openAlertError={openAlertError}
        setOpenAlertError={setOpenAlertError}
        alertHoraError={alertHoraError}
        setAlertHoraError={setAlertHoraError}
      ></GridAlertsTurns>
    </MainLayout>
  );
};
