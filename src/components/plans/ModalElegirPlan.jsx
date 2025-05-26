import React, { useEffect, useState } from "react";
import { ModalLayout } from "../../layout/ModalLayout";
import { MdDeleteOutline } from "react-icons/md";
import { ButtonSpinner } from "../ui/buttons/ButtonSpinner";
import { useDeletePlan } from "../../service/plans/useDeletePlan";
import { useStoreUserData } from "../../store";
import { useGetAllPlansByUser } from "../../service/plans/useGetAllPlansByUser";
import { ErrorAuth } from "../ui/errorAuth/ErrorAuth";
import { GiClick } from "react-icons/gi";
import { useAsignarPlan } from "../../service/plans/useAsignarPlan";
import { useStoreCheckEx } from "../../store/useStoreCheckEx";
export const ModalElegirPlan = ({
  open,
  setOpen,
  plan,
  setAlertAsignedPlan,
}) => {
  const dataUser = useStoreUserData((state) => state.userData);
  // ERROR AL ASIGNAR
  const [errorToAsign, setErrorToAsign] = useState(false);
  const clearStorage = useStoreCheckEx((state) => state.clearStorage);
  // LOADING DEL BUTTON
  const [loading, setLoading] = useState(false);
  const elegirPlan = async () => {
    setLoading(true);
    try {
      const responseAsignPlan = await useAsignarPlan(
        dataUser.identityUserId,
        plan.id
      );
      if (responseAsignPlan && responseAsignPlan.status == 200) {
        setAlertAsignedPlan(true);
        setOpen(false);
        clearStorage();
      } else {
        setErrorToAsign(true);
      }

    } catch (e) {
      console.log(e, "error al autoasignarse el plan");
    } finally {
      setLoading(false);
    }
  };
  //   useEffect(() => {
  //     setErrorDeletePlan(false);
  //   }, [open]);
  return (
    <ModalLayout Icon={GiClick} open={open} setOpen={setOpen}>
      <div className="flex justify-center items-center gap-1 mb-4">
        <span className="font-semibold text-xl  text-center">
          ¿Quieres elegir
          <span className="font-bold text-xl ml-1 text-center text-customTextGreen">
            {plan?.nombre} ?
          </span>
        </span>
      </div>
      <div className="flex justify-center">
        <ButtonSpinner
          onClick={elegirPlan}
          loading={loading}
          label="Elegir plan"
        ></ButtonSpinner>
      </div>
      {errorToAsign && (
        <ErrorAuth
          messageError={"Usted ya posee planes activos ! "}
          className="flex justify-center items-center"
        ></ErrorAuth>
      )}
    </ModalLayout>
  );
};
