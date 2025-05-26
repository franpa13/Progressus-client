import React, { useState } from 'react'
import { ModalLayout } from '../../layout/ModalLayout'
import { ButtonSpinner } from '../ui/buttons/ButtonSpinner'
import { ErrorAuth } from '../ui/errorAuth/ErrorAuth'
import { MdDeleteOutline } from 'react-icons/md'
import { useDeletePatent } from '../../service/nutrition/useDeletePatent'
import { useGetPatents } from '../../service/nutrition/useGetPatents'
export const ModalDeletePatent = ({ open, setOpen, elementEditable, setPatents }) => {
    const [loading, setLoading] = useState(false)
    const deleteItem = async () => {
        setLoading(true)
        try {
            const responseDelete = await useDeletePatent(elementEditable?.id)
            console.log(responseDelete, "responseDelete");
            if ([204, 200, 201].includes(responseDelete.status)) {
                const data = await useGetPatents();
                setPatents(data.data);
                setOpen(false);
            }

        }
        catch (e) {
            console.log(e, "error");

        } finally {
            setLoading(false)
        }
    }
    return (
        <ModalLayout Icon={MdDeleteOutline} open={open} setOpen={setOpen}>
            <div className="flex justify-center items-center gap-1 mb-4">
                <span className="font-semibold text-xl  text-center">
                    ¿Eliminar a
                    <span className="font-bold text-xl ml-1 mr-1 text-center text-red-600">
                        {elementEditable?.nombre}
                    </span>
                    <span>de mi lista de pacientes ? </span>
                </span>
            </div>
            <div className="flex justify-center">
                <ButtonSpinner
                    onClick={deleteItem}
                    loading={loading}
                    label="Eliminar paciente"
                    className="bg-red-600"
                ></ButtonSpinner>
            </div>
            {/* {alertError && (
                <ErrorAuth
                    messageError={"Ha ocurrido un error inténtelo nuevamente"}
                    className="flex justify-center items-center"
                ></ErrorAuth>
            )} */}
        </ModalLayout>
    )
}
