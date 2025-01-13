import React from 'react'
import { ModalLayout } from '../../layout/ModalLayout'
import { MdOutlineEdit } from 'react-icons/md'
import { Title } from '../ui/title/Title'

export const ModalEditUserNutri = ({ open, setOpen, elementEditable }) => {
  console.log(elementEditable.nombre);

  return (
    <ModalLayout open={open} setOpen={setOpen} Icon={MdOutlineEdit}>
      <div className="flex justify-center items-center gap-1 mb-4">
        <span className="font-semibold text-xl">Editar paciente :</span>
        <span className="font-bold text-xl text-center text-customTextGreen">
          {elementEditable?.nombre}
        </span>
      </div>
    </ModalLayout>
  )
}
