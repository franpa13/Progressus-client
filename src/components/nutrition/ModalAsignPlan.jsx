import React, { useEffect, useState } from 'react'
import { ModalLayout } from '../../layout/ModalLayout'
import { IoNutritionOutline } from "react-icons/io5";
import { SelectNavegable } from '../membership/selectNavegable/SelectNavegable';
import { useSpinnerStore } from '../../store';
import { useGetAllUsersWhitMembership } from '../../service/auth/use-getAllUsers';

import { useAsignPlanNutri } from '../../service/nutrition/useAsignPlanNutri';
import { ButtonSpinner } from '../ui/buttons/ButtonSpinner';
export const ModalAsignPlan = ({ open, setOpen, plan,setAlertAsignedPlan }) => {
    const [loadingSendPlan, setLoadingSendPlan] = useState(false);
    const [users, setUsers] = useState([]);
    const [userSeleccionado, setUserSeleccionado] = useState(null);
    const showSpinner = useSpinnerStore((state) => state.showSpinner);
    const hideSpinner = useSpinnerStore((state) => state.hideSpinner);
    const [errorToAsign, setErrorToAsign] = useState(false);
    console.log(plan, "plan en el modal");
    
    useEffect(() => {
        showSpinner();
        const fetchUsers = async () => {
            try {
                const response = await useGetAllUsersWhitMembership();
                

             
                setUsers(response?.data || []);
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
            const responseAsignPlan = await useAsignPlanNutri(
                userSeleccionado.identityUserId,
                plan.id
            );
            console.log(responseAsignPlan  , "response asign plan");
            
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
        <ModalLayout open={open} Icon={IoNutritionOutline} setOpen={setOpen}><form className='w-full' onSubmit={asignPlan} action="">
            <div className="flex w-full flex-col justify-center items-center gap-1 mb-4">
                <span className="font-semibold text-xl mb-4">Asignar <span className='text-customTextBlue'>
                    {plan?.nombre}
                </span>  </span>
                <div className="flex w-full flex-col items-center gap-5 justify-center ">
                  
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
            </div>
        </form></ModalLayout>
    )
}
