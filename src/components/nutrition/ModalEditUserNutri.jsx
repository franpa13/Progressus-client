import React, { useEffect, useState } from "react";
import { ModalLayout } from "../../layout/ModalLayout";
import { MdOutlineEdit } from "react-icons/md";
import { CustomInput } from "../ui/input/CustomInput";
import { ButtonSpinner } from "../ui/buttons/ButtonSpinner";
import { useEditPatent } from "../../service/nutrition/useEditPatent";
import { useGetPatents } from "../../service/nutrition/useGetPatents";
export const ModalEditUserNutri = ({ open, setOpen, elementEditable, setPatents }) => {
  if (!elementEditable) return null;
  const [loading, setLoading] = useState(false)
  console.log(elementEditable, "element editable");

  const [form, setForm] = useState({
    nombre: elementEditable?.nombre,
    edad: elementEditable?.edad,
    objetivo: elementEditable?.objetivo,
    peso: elementEditable?.peso,
    porcentajeDeGrasa
      : elementEditable?.porcentajeDeGrasa

  });

  useEffect(() => {

    setForm({
      nombre: elementEditable?.nombre,
      edad: elementEditable?.edad,
      objetivo: elementEditable?.objetivo,
      peso: elementEditable?.peso,
      porcentajeDeGrasa
        : elementEditable?.porcentajeDeGrasa

    });
  }, [open]);
  console.log(form, "form");


  // Manejar cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await useEditPatent(elementEditable, form)
      console.log(response, "response");
      if (response.status == 204 || response.status == 200 || response.status == 200 || response.status == "204") {
        setOpen(false)
        const data = await useGetPatents();
        setPatents(data.data);
      }
    } catch (e) {
      console.log(e, "errores");

    } finally {
      setLoading(false)
    }
  }
  return (
    <ModalLayout open={open} setOpen={setOpen} Icon={MdOutlineEdit}>
      <div className="flex justify-center items-center gap-1 mb-4">
        <span className="font-semibold md:text-xl">Editar paciente:</span>
        <span className="font-bold md:text-xl text-center text-customTextGreen">
          {elementEditable?.nombre}
        </span>
      </div>
      <form >

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
          <label className="font-semibold text-start w-full" htmlFor="">Peso(kg) : </label>
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
        <div>
          <label className="font-semibold text-start w-full" htmlFor="">Grasa(%) : </label>
          <CustomInput
            name="porcentajeDeGrasa"
            type="number"
            value={form.porcentajeDeGrasa}
            onChange={handleChange}
            placeholder="Grasa"
            label="Peso"
            className="mb-4"
          />


        </div>

        <ButtonSpinner
          loading={loading}
          onClick={handleSubmit}
          label="Guardar Cambios"


        >

        </ButtonSpinner>
      </form>
    </ModalLayout>
  );
};
