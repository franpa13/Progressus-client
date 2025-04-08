import React, { useEffect, useState } from "react";
import { MainLayout } from "../../../../layout/MainLayout";
import { Title, Location, SnackbarDefault } from "../../../../components";
import { useNavigate } from "react-router-dom";
import { useStoreUserData } from "../../../../store";
import { AllPlanes } from "../todosLosPlanes/AllPlanes";
import { useMembershipStore } from "../../../../store/useStoreMembership";

export const Plans = () => {
  // VER SI TIENE MEMBRESIA ACTIVA
  const navigate = useNavigate();
  const membership = useMembershipStore((state) => state.membershipData);


  const [selectNav, setSelectNav] = useState("Todos los planes");
  const dataUser = useStoreUserData((state) => state.userData);
  useEffect(() => {
    if (roleUser !== "ENTRENADOR" && dataUser?.membresiaActiva === false) {
      // if (!membership || membership?.estadoSolicitud.nombre !== "Confirmado") {
        navigate("/membership");
      // }
    }
  }, [membership, navigate]);

  // ROL DE USER
  const roleUser = dataUser.roles[0];
  const [alertAsignedPlan, setAlertAsignedPlan] = useState(false);
  const [alertExerciseAdded, setAlertExerciseAdded] = useState(false);

  const [errorServer, setErrorServer] = useState(false);
  return (
    <MainLayout>
      <section className="animate-fade-in-down md:mx-auto bg-white rounded shadow-xl w-full md:w-11/12  overflow-hidden mb-20 flex flex-col ">
        <div className="b p-3 ">
          <Location route={"Planes"} subroute={selectNav}></Location>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <Title title={"Planes de entrenamiento"}></Title>
            {/* <Link
              to={"/plans/createPlans/myPlans"}
              className="flex  gap-2 items-center"
            >
              <span className="text-sm md:text-lg text-customTextGreen underline">
                Mis planes
              </span>
              <GrPlan className="text-customNavBar text-sm md:text-2xl"></GrPlan>
            </Link> */}
          </div>
        </div>
        {/* DIVISION GRAY */}
        <div className="w-full h-2 md:h-4 bg-customGray"></div>
        {/* BUSCAR EJERCICIO */}
        <div className="p-3 mb-3 w-full flex justify-center md:justify-center items-center gap-5 md:gap-12  ">
          <span
            onClick={() => setSelectNav("Todos los planes")}
            className={`transition-all font-bold cursor-pointer p-1  ${
              selectNav === "Todos los planes" &&
              "border-b-2 border-customTextBlue text-customTextBlue md:text-lg"
            }`}
          >
            {roleUser === "SOCIO" ? "Planes disponibles" : "Todos los planes"}
          </span>

          <span
            onClick={() => setSelectNav("Mis Planes")}
            className={`transition-all font-bold cursor-pointer p-1 ${
              selectNav === "Mis Planes" &&
              "border-b-2 border-customTextBlue text-customTextBlue md:text-lg"
            }`}
          >
            {roleUser === "SOCIO" ? "Mi plan" : "Mis planes"}
          </span>
        </div>
        <AllPlanes
          setAlertAsignedPlan={setAlertAsignedPlan}
          selectNav={selectNav}
        ></AllPlanes>
        {/* {selectNav == "Editar Planes" && <EditPlans></EditPlans>} */}
      </section>
      {/* ASIGNAR PLAN A UN USER */}
      <SnackbarDefault
        open={alertAsignedPlan}
        setOpen={setAlertAsignedPlan}
        severity={"success"}
        message={"¡El plan se asignó correctamente!"}
        position={{ vertical: "bottom", horizontal: "left" }}
      ></SnackbarDefault>
      {/* ALERT ERROR 500(SERVIDOr) */}
      <SnackbarDefault
        open={errorServer}
        setOpen={setErrorServer}
        severity={"error"}
        message={"Ocurrio un error inténtelo nuevamente"}
        position={{ vertical: "bottom", horizontal: "left" }}
      ></SnackbarDefault>

      <SnackbarDefault
        open={alertExerciseAdded}
        setOpen={setAlertExerciseAdded}
        severity={"success"}
        message={
          "El ejercicio se agregó a tu plan. Puedes consultarlo en Mis Planes."
        }
        position={{ vertical: "bottom", horizontal: "left" }}
      ></SnackbarDefault>

      {/* <SnackbarDefault
        open={alertCreate}
        setOpen={setAlertCreate}
        severity={"success"}
        message={"El plan se creo correctamente."}
        position={{ vertical: "bottom", horizontal: "left" }}
      ></SnackbarDefault> */}
    </MainLayout>
  );
};
