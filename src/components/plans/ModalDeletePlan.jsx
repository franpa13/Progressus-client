import React, { useEffect, useState } from "react";
import { ModalLayout } from "../../layout/ModalLayout";
import { MdDeleteOutline } from "react-icons/md";
import { ButtonSpinner } from "../ui/buttons/ButtonSpinner";
import { useDeletePlan } from "../../service/plans/useDeletePlan";
import { useStoreUserData } from "../../store";
import { useGetAllPlansByUser } from "../../service/plans/useGetAllPlansByUser";
import { ErrorAuth } from "../ui/errorAuth/ErrorAuth";
export const ModalDeletePlan = ({ open, setOpen, plan, setPlanes }) => {
  const dataUser = useStoreUserData((state) => state.userData);
  const [errorDeletePlan, setErrorDeletePlan] = useState(false);
  // LOADING DEL BUTTON
  const [loading, setLoading] = useState(false);
  const deleteItem = async () => {
    setLoading(true);
    try {
      const responseDelete = await useDeletePlan(plan.id);


      if (responseDelete && responseDelete.status == 200) {
        // llamamos de nuevo al endpoint para poder setearlo de nuevo
        const actualizarPlanes = await useGetAllPlansByUser(
          dataUser.identityUserId
        );
        if (actualizarPlanes?.status == 200) {
          setPlanes(actualizarPlanes.data);
          setOpen(false);
        }

        //  setOpenDeleteElement(false);

        //  setAlertDeleteItem(true);
      } else {
        setErrorDeletePlan(true);
      }
    } catch (e) {
      console.log(e, "error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setErrorDeletePlan(false);
  }, [open]);
  return (
    <ModalLayout Icon={MdDeleteOutline} open={open} setOpen={setOpen}>
      <div className="flex justify-center items-center gap-1 mb-4">
        <span className="font-semibold text-xl  text-center">
          ¿Eliminar
          <span className="font-bold text-xl ml-1 text-center text-red-600">
            {plan?.nombre} ?
          </span>
        </span>
      </div>
      <div className="flex justify-center">
        <ButtonSpinner
          onClick={deleteItem}
          loading={loading}
          label="Eliminar plan"
          className="bg-red-600"
        ></ButtonSpinner>
      </div>
      {errorDeletePlan && (
        <ErrorAuth
          messageError={"Ha ocurrido un error inténtelo nuevamente"}
          className="flex justify-center items-center"
        ></ErrorAuth>
      )}
    </ModalLayout>
  );
};
