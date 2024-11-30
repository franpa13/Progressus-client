import React, { useEffect, useState } from "react";
import { MainLayout } from "../../layout/MainLayout";
import { useSpinnerStore, useStoreUserData } from "../../store";
import { useGetTurns } from "../../service/turns/use-getTurns";
import dayjs from "dayjs";

import { useDataUser } from "../../service/auth/use-dataUser";
import gif from "/Progressus_G5.gif";
import videoProgressus from "/videoProgressus.mp4";
import {
  Button,
  Title,
  Footer,
  LoadingSkeleton,
  SnackbarDefault,
} from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { useMembershipStore } from "../../store/useStoreMembership";
import { useGetRequestPaymentSocio } from "../../service/membership/useGetRequestPaymentSocio";

export const HomePage = () => {
  const navigate = useNavigate();

  const email = useStoreUserData((state) => state.email);
  const dataUser = useStoreUserData((state) => state.userData);

  // Validación segura para roles
  const roleUser = dataUser?.roles?.[0] || "GUEST"; // Valor por defecto

  const setAllDataUser = useStoreUserData((state) => state.setUserData);
  const [turnosReservados, setTurnosReservados] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Gestión de membresías
  const setMembership = useMembershipStore((state) => state.setMembershipData);
  const membership = useMembershipStore((state) => state.membershipData);
  const [turnoMasCercano, setTurnoMasCercano] = useState(null);
  const [allMembership, setAllMembership] = useState(null);

  // Error si no tiene membresías activas
  const [openErrorTurns, setOpenErrorTurns] = useState(false);
  const nameUser = dataUser?.nombre || "Usuario";
  const openSpinner = useSpinnerStore((state) => state.showSpinner);
  const closeSpinner = useSpinnerStore((state) => state.hideSpinner);
  // Carga inicial de datos
  useEffect(() => {
    openSpinner();

    const fetchData = async () => {
      try {
        const userResponse = await useDataUser(email);
        setAllDataUser(userResponse.data);

        if (userResponse?.data?.identityUserId) {
          const turnsResponse = await useGetTurns(
            userResponse.data.identityUserId
          );
          setTurnosReservados(turnsResponse.data || []); // Validación segura
        }

        // Traer membresía
        if (dataUser?.identityUserId) {
          const response = await useGetRequestPaymentSocio(
            dataUser.identityUserId
          );

          if (response?.data?.value?.value) {
            const allMembership =
              response.data.value.value.historialSolicitudDePagos || [];
            setAllMembership(allMembership);

            // Solo actualizamos el store si hay membresías
            if (Array.isArray(allMembership) && allMembership.length > 0) {
              const lastMembership = allMembership[allMembership.length - 1];
              setMembership(lastMembership); // Actualiza el store
            }
          } else {
            setMembership(null);
          }
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setIsLoading(false);
        closeSpinner();
      }
    };

    fetchData();
  }, [email, dataUser?.identityUserId, setAllDataUser, setMembership]);

  // Obtener el próximo turno más cercano
  useEffect(() => {
    if (Array.isArray(turnosReservados) && turnosReservados.length > 0) {
      const now = dayjs();

      const filteredTurns = turnosReservados.filter((turno) => {
        const fechaHora = `${turno.fechaReserva.split("T")[0]}T${
          turno.horaInicio
        }`;
        const turnoDateTime = dayjs(fechaHora);
        return turnoDateTime.isAfter(now);
      });

      const closestTurn =
        filteredTurns.length > 0
          ? filteredTurns.sort((a, b) => {
              const fechaHoraA = `${a.fechaReserva.split("T")[0]}T${
                a.horaInicio
              }`;
              const fechaHoraB = `${b.fechaReserva.split("T")[0]}T${
                b.horaInicio
              }`;

              const dateA = dayjs(fechaHoraA);
              const dateB = dayjs(fechaHoraB);

              return dateA.diff(dateB);
            })[0]
          : null;

      setTurnoMasCercano(closestTurn);
    }
  }, [turnosReservados]);

  // Manejo del click para navegar a los turnos
  const handleLinkClick = () => {
    if (!membership || membership?.estadoSolicitud?.nombre !== "Confirmado") {
      setOpenErrorTurns(true);
      return;
    }
    navigate("/turns");
  };

  return (
    <MainLayout>
      <div className="animate-fade-in-down w-full flex flex-col justify-start gap-1">
        <div className="bg-white mx-3 mt-4 md:mt-0 md:m-0 md:mx-8 p-2 rounded shadow-sm">
          {/* Video en bucle */}
          <Title
            title={`Hola, ${nameUser}!`}
            className="p-4 text-center w-full justify-center md:justify-start"
          />
        </div>
  
        <div className="flex-grow flex justify-center items-center w-full">
          <video
            src={videoProgressus}
            autoPlay
            loop
            muted
            className={`w-full h-full object-cover ${
              roleUser === "ADMIN" || roleUser === "ENTRENADOR"
                ? "md:w-full"
                : "md:w-full"
            }`}
            alt="Progressus"
          />
        </div>
  
        {isLoading ? (
          <LoadingSkeleton
            className={"w-full"}
            count={1}
            width={800}
            height={50}
          />
        ) : turnoMasCercano &&
          roleUser !== "ENTRENADOR" &&
          roleUser !== "ADMIN" ? (
          <div className="bg-white mx-3 md:m-0 md:mx-8 p-2 rounded shadow-sm gap-1 flex flex-col md:flex-col justify-center items-center md:w-full">
            <div className="flex flex-col items-center md:flex-row gap-1">
              <Title title={"Tu próximo turno es el día: "} />
              <Title
                className="text-customNavBar font-bold"
                title={dayjs(turnoMasCercano.fechaReserva)
                  .format("dddd, D [de] MMMM [de] YYYY")
                  .toUpperCase()}
              />
              <Title
                className="text-customNavBar font-bold md:hidden"
                title={`${turnoMasCercano.horaInicio} hs`}
              />
            </div>
            <Title
              className="hidden md:block text-customNavBar font-bold"
              title={`${turnoMasCercano.horaInicio} hs`}
            />
            <Link to={"/turns"}>
              <Button
                label={"Administrar mis turnos"}
                className="py-1 px-2 text-sm md:text-base"
              />
            </Link>
          </div>
        ) : roleUser !== "ADMIN" && roleUser !== "ENTRENADOR" ? (
          <div className="bg-white mx-3 md:m-0 md:mx-8 p-2 rounded shadow-sm gap-1 flex md:flex-col justify-center items-center md:w-full">
            <Title
              title={"No tienes turnos reservados"}
              className="text-base"
            />
            <Button
              onClick={handleLinkClick}
              label={"Reservar"}
              className="py-1 px-2 text-base"
            />
          </div>
        ) : null}
      </div>
    

      <SnackbarDefault
        position={{ vertical: "left", horizontal: "center" }}
        severity={"warning"}
        message={"Usted no posee membresías activas"}
        open={openErrorTurns}
        setOpen={setOpenErrorTurns}
      />
    </MainLayout>
  );
};
