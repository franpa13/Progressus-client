import React, { useEffect, useState } from "react";
import { ModalLayout } from "../../layout/ModalLayout";
import { MdDeleteOutline } from "react-icons/md";
import { ButtonSpinner } from "../ui/buttons/ButtonSpinner";

import { useStoreUserData } from "../../store";
import { useDeleteExercise } from "../../service/plans/useDeleteExercise";
import { useGetAllPlansByUser } from "../../service/plans/useGetAllPlansByUser";
import { ErrorAuth } from "../ui/errorAuth/ErrorAuth";
import usePlanParaVer from "../../store/planParaVer";
import { useGetPlanById } from "../../service/plans/useGetPlanById";
export const ModalDeleteExercise = ({
  open,
  setOpen,
  exercise,
  setPlanes,
  day,
  setOpenAlertDelete
}) => {
  const dataUser = useStoreUserData((state) => state.userData);
  const [errorDeleteEx, setErrorDeleteEx] = useState(false);
  const [alertError, setAlertError] = useState(false)
  const planParaVer = usePlanParaVer((state) => state.planParaVer);
  // LOADING DEL BUTTON


  const [loading, setLoading] = useState(false);
  const deleteItem = async () => {
    setLoading(true);
    try {
      const responseDelete = await useDeleteExercise(
        planParaVer.id,
        day,
        exercise
      );

      if (responseDelete && responseDelete.status == 200) {
        const responseDataPlan = await useGetPlanById(planParaVer.id);
        setPlanes(responseDataPlan.data.value.value);
        setOpen(false);
        setOpenAlertDelete(true)
      }
      else {
        setAlertError(true)
      }
    } catch (e) {
      console.log(e, "error");
    } finally {
      setLoading(false);
    }
  };
  //   useEffect(() => {
  //     setErrorDeletePlan(false);
  //   }, [open]);
  return (
    <ModalLayout Icon={MdDeleteOutline} open={open} setOpen={setOpen}>
      <div className="flex justify-center items-center gap-1 mb-4">
        <span className="font-semibold text-xl  text-center">
          ¿Eliminar
          <span className="font-bold text-xl ml-1 mr-1 text-center text-red-600">
            {exercise?.ejercicio.nombre}
          </span>
          <span>del día {day}?</span>
        </span>
      </div>
      <div className="flex justify-center">
        <ButtonSpinner
          onClick={deleteItem}
          loading={loading}
          label="Eliminar ejercicio"
          className="bg-red-600"
        ></ButtonSpinner>
      </div>
      {alertError && (
        <ErrorAuth
          messageError={"Ha ocurrido un error inténtelo nuevamente"}
          className="flex justify-center items-center"
        ></ErrorAuth>
      )}
    </ModalLayout>
  );
};
