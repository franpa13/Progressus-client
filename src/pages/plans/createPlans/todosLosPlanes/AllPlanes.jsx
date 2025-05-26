import React, { useEffect, useState } from "react";
import {
  BasicTable,
  Button,
  SnackbarDefault,
  TableAllPlans,
  Title,
} from "../../../../components";
import { IoMdAdd } from "react-icons/io";
import { useGetAllPlans } from "../../../../service/plans/useGetAllPlans";
import { ModalCreatePlans } from "../../../../components";
import { MyPlans } from "../myPlans/MyPlans";
import { useStoreUserData } from "../../../../store";
import { useGetPlantillas } from "../../../../service/plans/useGetPlantillas";
import { GiClick } from "react-icons/gi";
import { GrPlan } from "react-icons/gr";
const arregloColumns = [
  "Nombre",
  "Objetivo",
  "Descripción",
  "Cantidad de días",
  "Acciones",
];
export const AllPlanes = ({ selectNav, setAlertAsignedPlan }) => {
  console.log(selectNav, "sleectnav");

  const userData = useStoreUserData((state) => state.userData);
  const nameUser = userData.nombre;
  // ROL DE USER
  const roleUser = userData.roles[0];
  // ERROR SERVER
  const [errorServer, setErrorServer] = useState(false);
  // MODAL PARA CREAR PLAN
  const [openCreatePlan, setOpenCreatePlan] = useState(false);

  // LOADING CUANDO CARGUE LA TABLA
  const [loading, setLoading] = useState(false);
  const [allPlans, setAllPlans] = useState([]);
  useEffect(() => {
    const traerPlans = async () => {
      setLoading(true);
      try {
        if (roleUser === "ENTRENADOR") {
          const response = await useGetAllPlans();
          if (response) {
            setAllPlans(response.data);
          }
        } else {
          const response = await useGetPlantillas();
          if (response) {
            setAllPlans(response.data);
          }
        }
      } catch (e) {
        console.log(e, "errores");
      } finally {
        setLoading(false);
      }
    };
    traerPlans();
  }, []);
  console.log(allPlans, "all plans");

  return (
    <div className="w-full">
      {roleUser === "ENTRENADOR" ? (
        <div className="px-3 flex flex-wrap flex-row-reverse justify-between items-end  md:items-center w-full ">
          {/* NUEVO PLAN */}
          <Button
            className="flex justify-start items-center gap-1 "
            Icon={IoMdAdd}
            onClick={() => setOpenCreatePlan(true)}
            label={"Nuevo plan"}
          ></Button>
          <div className="   mt-0  flex flex-col justify-start md:flex-row  md:justify-between mb-0 md:items-center">
            {selectNav === "Mis Planes" && (
              <div className="w-full  flex justify-start  font-semibold items-center gap-2 mb-4">
                <h2 className="text-lg md:text-2xl ">{`Planes de ${nameUser}`}</h2>
                <GrPlan className="text-customNavBar text-sm md:text-2xl" />
              </div>
            )}
          </div>
        </div>
      ) : roleUser === "SOCIO" && selectNav === "Todos los planes" ? (
        <div className="flex justify-start items-center">
          <Title
            className={
              " p-3 underline flex justify-start mb-1 text-customTextGreen w-full text-start "
            }
            title={"Elegir planes plantillas"}
          >
            {" "}
          </Title>
          <GiClick className="text-2xl"></GiClick>
        </div>
      ) : (
        <div className="flex justify-start items-center">
          <Title
            className={
              " p-3 underline flex justify-start mb-1 text-customTextGreen w-full text-start "
            }
            title={"Mis planes"}
          >
            {" "}
          </Title>
          <GiClick className="text-2xl"></GiClick>
        </div>
      )}
      {selectNav == "Todos los planes" ? (
        <TableAllPlans
          setAlertAsignedPlan={setAlertAsignedPlan}
          loading={loading}
          textSinEjercicios={"No se encontraron planes..."}
          arregloColumns={arregloColumns}
          arreglo={allPlans}
        ></TableAllPlans>
      ) : (
        <MyPlans setAlertAsignedPlan={setAlertAsignedPlan}></MyPlans>
      )}
      {/* MODAL PARA CREAR PLAN */}
      <ModalCreatePlans
        setErrorServer={setErrorServer}
        open={openCreatePlan}
        setOpen={setOpenCreatePlan}
      ></ModalCreatePlans>
      <SnackbarDefault
        open={errorServer}
        setOpen={setErrorServer}
        severity={"error"}
        message={"Ocurrió un error. Inténtelo nuevamente."}
        position={{ vertical: "bottom", horizontal: "left" }}
      ></SnackbarDefault>
    </div>
  );
};
