import React from 'react'
import { ModalLayout } from '../../layout/ModalLayout'
export const ModalEditState = ({open , setOpen , dataPedido}) => {
    console.log(dataPedido , "data del pedido");
    
  return (
    <ModalLayout  open={open} setOpen={setOpen} Icon="" ><h2>awdawd</h2></ModalLayout>
  )
}
