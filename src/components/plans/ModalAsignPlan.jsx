import React, { useEffect, useState } from "react";
import { ModalLayout } from "../../layout/ModalLayout";
import { Title } from "../ui/title/Title";
import { SelectNavegable } from "../membership/selectNavegable/SelectNavegable";
import { useSpinnerStore } from "../../store";
import { useGetAllUsers } from "../../service/auth/use-getAllUsers";
import { ButtonSpinner } from "../ui/buttons/ButtonSpinner";
import { useAsignarPlan } from "../../service/plans/useAsignarPlan";
import { ErrorAuth } from "../ui/errorAuth/ErrorAuth";
export const ModalAsignPlan = ({
  open,
  setOpen,
  planToAsignar,
  setAlertAsignedPlan,
}) => {
  const [loadingSendPlan, setLoadingSendPlan] = useState(false);
  const showSpinner = useSpinnerStore((state) => state.showSpinner);
  const hideSpinner = useSpinnerStore((state) => state.hideSpinner);
  const [users, setUsers] = useState([]);
  const [userSeleccionado, setUserSeleccionado] = useState(null);
  // ERROR AL ASIGNAR
  const [errorToAsign, setErrorToAsign] = useState(false);
  useEffect(() => {
    showSpinner();
    const fetchUsers = async () => {
      try {
        const response = await useGetAllUsers();
        
  
        // Filtrar usuarios con rol "SOCIO"
        const socios = response.data.filter((user) =>
          user.roles.includes("SOCIO")
        );
  
        setUsers(socios); // Actualizar el estado con los usuarios filtrados
      } catch (e) {
        console.log(e, "error");
      } finally {
        hideSpinner();
      }
    };
    fetchUsers();
  }, []);
  
  useEffect(() => {
    setErrorToAsign(false)
    setUserSeleccionado(null)
  }, [open]);
  const asignPlan = async () => {
    setLoadingSendPlan(true);
    try {
      const responseAsignPlan = await useAsignarPlan(
        userSeleccionado.identityUserId,
        planToAsignar.id
      );
      if (responseAsignPlan && responseAsignPlan.status == 200) {
        setUserSeleccionado(null);
        setOpen(false);
        setAlertAsignedPlan(true);
      } else {
        setErrorToAsign(true);
      }
    } catch (e) {
      console.log(e, "errores");
    } finally {
      setLoadingSendPlan(false);
    }
  };
  return (
    <ModalLayout open={open} setOpen={setOpen}>
      <div className="flex flex-col items-center gap-5 justify-center ">
        <Title
          className={"md:text-xl text-customTextGreen font-bold mr-2 md:mr-3"}
          title={`Asignar plan`}
        ></Title>
        <span className="mr-2 md:mr-3 font-semibold">
          {planToAsignar?.nombre}
        </span>
        <SelectNavegable
          wd={"100%"}
          options={users}
          onSelect={setUserSeleccionado}
          label={"Seleccionar usuario"}
        ></SelectNavegable>
        {userSeleccionado && (
          <div className="w-full flex flex-col justify-start">
            <span className="font-semibold">
              Asignar plan a{" "}
              <span className="text-customTextGreen">
                {`${userSeleccionado.nombre} ${userSeleccionado.apellido}`}
              </span>
            </span>
            <span className="md:text-base font-light">
              {userSeleccionado.email}
            </span>
          </div>
        )}
        {errorToAsign && (
          <ErrorAuth
            className="flex justify-center"
            messageError={"Este usuario ya posee un plan asignado"}
          ></ErrorAuth>
        )}
        <ButtonSpinner
          loading={loadingSendPlan}
          onClick={asignPlan}
          label="Asignar plan"
        ></ButtonSpinner>
      </div>
    </ModalLayout>
  );
};
