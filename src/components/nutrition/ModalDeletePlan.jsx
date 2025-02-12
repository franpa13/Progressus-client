import React, { useState } from 'react'
import { ModalLayout } from '../../layout/ModalLayout'
import { ButtonSpinner } from '../ui/buttons/ButtonSpinner'
import { useDeletePlan } from '../../service/nutrition/useDeletePlan'
import { useGetAllPlans } from '../../service/nutrition/useGetAllPlans'
export const ModalDeletePlan = ({ open, setOpen, plan, setPlans }) => {
    const [loading, setLoading] = useState(false)
    console.log(plan, "plan");

    const deleteItem = async () => {
        setLoading(true)
        try {
            const response = await useDeletePlan(plan.id)
            console.log(response, "response delete");
            if (response.status == 204 || response.status == "204") {
                const responseUpdatePlans = await useGetAllPlans();
                console.log(responseUpdatePlans , "responseup")
                
                setPlans(responseUpdatePlans.data);
            }
        } catch (e) {
            console.log(e, "errores");

        } finally {
            setLoading(false)
            setOpen(false)
        }
    }
    return (
        <ModalLayout open={open} setOpen={setOpen}>  <div className="flex justify-center items-center gap-1 mb-4">
            <span className="font-semibold text-xl  text-center">
                Eliminar a
                <span className="font-bold text-xl ml-1 mr-1 text-center text-red-600">
                    {plan?.nombre}
                </span>
                <span>de la lista de planes ? </span>
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
        </ModalLayout>
    )
}
