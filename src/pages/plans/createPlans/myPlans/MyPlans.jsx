import React, { useEffect, useState } from "react";
import { MainLayout } from "../../../../layout/MainLayout";
import {
  Title,
  Location,
  BasicTable,
  Select,
  Button,
  TableAllPlans,
} from "../../../../components";
import { MdDeleteOutline } from "react-icons/md";
import { usePlansSocio } from "../../../../service/plans/usePlansSocio";
import { useStoreUserData } from "../../../../store";
import { GrPlan } from "react-icons/gr";
import { useGetAllPlansByUser } from "../../../../service/plans/useGetAllPlansByUser";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useGetPlanById } from "../../../../service/plans/useGetPlanById";

const arregloColumns = [
  "Nombre",
  "Objetivo",
  "Descripción",
  "Cantidad de días",
  "Acciones",
];

export const MyPlans = ({
  setAlertAsignedPlan,
  // setAlertPlanVacio,
  // setAlertCreate,
  // setErrorServer,
}) => {
  const dataUser = useStoreUserData((state) => state.userData);
  const nameUser = dataUser.nombre;

  // ROL DE USER
  const roleUser = dataUser.roles[0];
  const [loading, setLoading] = useState(false);

  const [plansByUser, setPlansByUser] = useState([]);

  useEffect(() => {
    const traerPlansByUser = async () => {
      setLoading(true);

      try {
        if (roleUser === "ENTRENADOR") {
          const response = await useGetAllPlansByUser(dataUser.identityUserId);

          if (response?.status === 200) {
            setPlansByUser(response.data);
          }
        } else {
          const responsePlansSocio = await usePlansSocio(
            dataUser.identityUserId
          );

          console.log(responsePlansSocio, "RESPONSE PLAN SOCIO");

          if (responsePlansSocio?.status === 200) {
            const traerPlanAsignado = await useGetPlanById(
              responsePlansSocio.data.planDeEntrenamientoId
            );
 
            setPlansByUser([traerPlanAsignado.data.value.value]);
          }
        }
      } catch (e) {
        console.log(e.response?.data, "Detalle del error");
        console.log(e, "Errores");
      } finally {
        setLoading(false);
      }
    };
    traerPlansByUser();
  }, []);

  console.log(plansByUser, "plans by user");

  return (
    <>
     

      <TableAllPlans
        setPlanes={setPlansByUser}
        setAlertAsignedPlan={setAlertAsignedPlan}
        loading={loading}
        textSinEjercicios={"No se encontraron planes.."}
        arregloColumns={arregloColumns}
        arreglo={Array.isArray(plansByUser) ? plansByUser : [plansByUser]}
        myPlans={true}
      />
    </>
  );
};
