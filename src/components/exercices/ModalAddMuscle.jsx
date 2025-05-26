import React, { useEffect, useState } from "react";
import { ModalLayout } from "../../layout/ModalLayout";
import { CustomInput } from "../ui/input/CustomInput";
import { useCreateGruopMuscle } from "../../service/exercices/useCreateGruopMuscle";
import { useCreateMuscle } from "../../service/exercices/useCreateMuscle";
import { SelectNavegable } from "../membership/selectNavegable/SelectNavegable";
import { ButtonSpinner } from "../ui/buttons/ButtonSpinner";
import { useGetAllMuscleGroups } from "../../service/exercices/useGetAllMuscleGroups";
import { ErrorAuth } from "../ui/errorAuth/ErrorAuth";
import { useGetAllMuscles } from "../../service/exercices/useGetAllMuscles";
export const ModalAddMuscle = ({
  open,
  setOpen,
  gruposMusculares,
  setMuscles,
  setOpenAlertCreateMuscle,
}) => {
  const [loading, setLoading] = useState(false);
  const [errorAddGroup, setErrorAddGroup] = useState(false);
  const [grupoMuscularElegido, setGrupoMuscularElegido] = useState();

  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
  });
  const initialFormState = {
    name: "",
    description: "",
    image: "",
  };
  useEffect(() => {
    setErrorAddGroup(false);
  }, [open]);
  // Manejador de cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const addMuscle = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const createMuscle = await useCreateMuscle(form, grupoMuscularElegido);
      if (
        (createMuscle && createMuscle.status == 201) ||
        createMuscle.status == 200
      ) {
        // ACTUALIZAR TABLA LLAMANDO DE NUEVO AL ENDPOINT
        const responseAllMuscles = await useGetAllMuscles();
        setForm(initialFormState);
        setMuscles(responseAllMuscles?.data);
        setOpen(false);
        setOpenAlertCreateMuscle(true);
      } else {
        setErrorAddGroup(true)
      }
      console.log(createMuscle, "create muscleee");
    } catch (e) {
      console.error(e, "error al agregar musculo");
    } finally {
      setLoading(false);
    }
  };

  const opcionesTransformadas = gruposMusculares.map((grupo) => ({
    nombre: grupo.nombre, // Propiedad para mostrar en Autocomplete
    id: grupo.id, // ID único si es necesario
  }));
  return (
    <ModalLayout open={open} setOpen={setOpen}>
      <form className="flex flex-col  items-center gap-5" onSubmit={addMuscle}>
        <div className="w-full">
          <label className="font-semibold text-start w-full" htmlFor="name">
            Nombre del músculo
          </label>
          <CustomInput
            required={true}
            placeholder="Nombre"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="w-full">
          <label
            className="font-semibold text-start w-full"
            htmlFor="description"
          >
            Descripción del músculo
          </label>
          <CustomInput
            required={true}
            placeholder="Descripción"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <div className="w-full">
          <SelectNavegable
            wd={"100%"}
            onSelect={setGrupoMuscularElegido}
            options={opcionesTransformadas}
            label={"Grupo muscular al que pertenece"}
          ></SelectNavegable>
        </div>
        <div className="w-full">
          <label className="font-semibold text-start w-full" htmlFor="image">
            Imagen del músculo
          </label>
          <CustomInput
            type="text"
            placeholder="Url de la imagen..."
            name="image"
            onChange={handleChange}
          />
        </div>
        <ButtonSpinner
          type="submit"
          className="w-1/2"
          label=" Agregar musculo"
          loading={loading}
        ></ButtonSpinner>
        {errorAddGroup && (
          <ErrorAuth
            messageError={"Ha ocurrido un error, intentelo nuevamente"}
            className="flex justify-center"
          ></ErrorAuth>
        )}
      </form>
    </ModalLayout>
  );
};
