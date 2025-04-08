import React, { useState } from 'react'
import { ModalLayout } from '../../layout/ModalLayout'
import { putChangeStateRequest } from '../../service/requestShop/putChangeStateRequest';
import { CustomInput } from '../ui/input/CustomInput';
import { ButtonSpinner } from '../ui/buttons/ButtonSpinner';
export const ModalEditState = ({ open, setOpen, dataPedido,onUpdate}) => {
  const [load ,setLoad] = useState(false)
  console.log(dataPedido, "data del pedidofa");
  const handleChangeStatus = async () => {
    setLoad(true)
    try {
      const response = await putChangeStateRequest(dataPedido.id, "Pagado")
      if (response.status === 200) {
        onUpdate()
      }
      console.log(response, "response del pedido pagado"); 
      setOpen(false)
    } catch (error) {
      alert("Error al cambiar el estado del pedido")
      console.error("Error al cambiar el estado del pedido:", error);
    } finally{
      setLoad(false)
    }
  }

  return (
    <ModalLayout open={open} setOpen={setOpen} Icon="" >
      <div className='flex flex-col gap-4 p-0'>

      <h2 className='text-center'>Cambiar el estado del pedido con id {dataPedido?.id?.substring(0, 8)} a <span className='font-semibold  text-green-600'>pagado
      </span> ?

      </h2>
      <ButtonSpinner loading={load}   label='Cambiar estado'  onClick={handleChangeStatus}></ButtonSpinner>
      </div>
    </ModalLayout>
  )
}
