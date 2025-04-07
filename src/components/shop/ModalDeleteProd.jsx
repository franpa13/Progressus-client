import React, { useState } from 'react'
import { ModalLayout } from '../../layout/ModalLayout'
import { ButtonSpinner } from '../ui/buttons/ButtonSpinner'

export const ModalDeleteProd = ({ open, setOpen, editable, setData }) => {
    const [loading, setLoading] = useState(false)

    const deleteItem = async () => {

        setLoading(true)
        try {
            const responseDelete = await fetch(
                `${import.meta.env.VITE_API_URL}/api/Merch/Eliminar/${editable?.id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            const data = await responseDelete.json()
            if (data.statusCode == 200) {
                setData((prev) => prev.filter((item) => item.id !== editable.id))
                setOpen(false)
            } else {
                console.error('Error deleting item:', data)
            }
        } catch (error) {
            console.error('Error:', error)
        } finally {
            setLoading(false)
        }
    }

    return (

        <ModalLayout
            open={open}
            Icon=""

            setOpen={setOpen}
        >
            <div className="flex justify-center items-center gap-1 mb-4">
                <span className="font-semibold text-xl  text-center">
                    Eliminar
                    <span className="font-bold text-xl ml-1 text-center text-red-600">
                        {editable?.nombre} ?
                    </span>
                </span>
            </div>
            <div className="flex justify-center">
                <ButtonSpinner
                    onClick={deleteItem}
                    loading={loading}
                    label="Eliminar Item"
                    className="bg-red-600"
                ></ButtonSpinner>
            </div>
        </ModalLayout>
    )
}
