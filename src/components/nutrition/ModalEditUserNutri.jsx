import React, { useEffect, useState } from "react";
import { ModalLayout } from "../../layout/ModalLayout";
import { MdOutlineEdit } from "react-icons/md";
import { CustomInput } from "../ui/input/CustomInput";
import { ButtonSpinner } from "../ui/buttons/ButtonSpinner";

export const ModalEditUserNutri = ({ open, setOpen, elementEditable }) => {
  if (!elementEditable) return null;
  const [form, setForm] = useState({
    nombre: elementEditable?.nombre,
    edad: elementEditable?.edad,
    objetivo: elementEditable?.objetivo,
    peso: elementEditable?.peso

  });
  useEffect(() => {

    setForm({
      nombre: elementEditable?.nombre,
      edad: elementEditable?.edad,
      objetivo: elementEditable?.objetivo,
      peso: elementEditable?.peso
    });
  }, [elementEditable]);


  // Manejar cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return (
    <ModalLayout open={open} setOpen={setOpen} Icon={MdOutlineEdit}>
      <div className="flex justify-center items-center gap-1 mb-4">
        <span className="font-semibold text-xl">Editar paciente:</span>
        <span className="font-bold text-xl text-center text-customTextGreen">
          {elementEditable?.nombre}
        </span>
      </div>
      <form>

        <div>
          <label className="font-semibold text-start w-full" htmlFor="">Edad : </label>
          <CustomInput
            name="edad"
            type="number"
            value={form.edad}
            onChange={handleChange}
            placeholder="Edad"
            label="Edad"
            className="mb-4"
          />
        </div>
        <div>
          <label className="font-semibold text-start w-full" htmlFor="">Objetivo : </label>
          <CustomInput
            name="objetivo"
            value={form.objetivo}
            onChange={handleChange}
            placeholder={form.objetivo || "Agregue un objetivo"}
            label="Objetivo"
            className="mb-4"
          />
        </div>

        <div>
          <label className="font-semibold text-start w-full" htmlFor="">Peso : </label>
          <CustomInput
            name="peso"
            type="number"
            value={form.peso}
            onChange={handleChange}
            placeholder="Peso"
            label="Peso"
            className="mb-4"
          />


        </div>


        <ButtonSpinner
          label="Guardar Cambios"
          type="submit"

        >

        </ButtonSpinner>
      </form>
    </ModalLayout>
  );
};
