import React, { useEffect, useState } from "react";
import { ModalLayout } from "../../layout/ModalLayout";
import { Title } from "../ui/title/Title";
import { SelectNavegable } from "../membership/selectNavegable/SelectNavegable";
import { useGetAllExercises } from "../../service/plans/useGetExercises";
import { CustomInput } from "../ui/input/CustomInput";

import { ButtonSpinner } from "../ui/buttons/ButtonSpinner";
import usePlanParaVer from "../../store/planParaVer";
import { useAddExercise } from "../../service/plans/useAddExercise";
import { useGetPlanById } from "../../service/plans/useGetPlanById";
import { ErrorAuth } from "../ui/errorAuth/ErrorAuth";

export const ModalExercise = ({ open, setOpen, day, setDiasDelPlan, setAlertAddExercise }) => {
  const [errorCreateEx, setErrorCreateEx] = useState(false)
  const planParaVer = usePlanParaVer((state) => state.planParaVer);

  const [loadButton, setLoadButton] = useState(false);
  const [exercices, setExercices] = useState([]);
  const [ejercicioSelected, setEjercicioSelected] = useState(null); // Valor inicial nulo
  const [form, setForm] = useState({
    ejercicioId: null, // Inicializamos como null
    numeroDiaDelPlan: day,
    ordenDelEjercicio: 1,
    series: "",
    repeticiones: "",
  });

  // Actualizar ejercicioId en el form cuando cambia ejercicioSelected
  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      ejercicioId: ejercicioSelected?.id || null, // Asignar el ID seleccionado
    }));
  }, [ejercicioSelected]);
  useEffect(() => {
    setErrorCreateEx(false)
  }, [open])
  // Obtener la lista de ejercicios
  useEffect(() => {
    const traerEjercicios = async () => {
      try {
        const dataExercices = await useGetAllExercises();
        setExercices(dataExercices.data);
      } catch (e) {
        console.log("Errores al traer ejercicios", e);
      }
    };
    traerEjercicios();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleExercise = async (e) => {
    e.preventDefault(); // Evitar recargar la página

    setLoadButton(true);
    try {


      const responseAddExercise = await useAddExercise(
        form,
        planParaVer.id,
        day
      );
      if (responseAddExercise && responseAddExercise.status == 200) {
        setOpen(false);
        setAlertAddExercise(true);
        const responseDataPlan = await useGetPlanById(planParaVer.id);
        setDiasDelPlan(responseDataPlan.data.value.value);
      } else {
        setErrorCreateEx(true)
      }
    } catch (e) {
    } finally {
      setLoadButton(false);
    }
  };


  return (
    <ModalLayout open={open} setOpen={setOpen}>
      <form onSubmit={handleExercise}>
        <div className="md:mr-3 flex justify-center">
          <Title
            className={"md:text-xl text-customTextGreen font-bold"}
            title={"Agregar ejercicio"}
          />
        </div>
        <div className="flex flex-col gap-2 mt-3">
          <SelectNavegable
            wd={"100%"}
            label={"Seleccione un ejercicio.."}
            options={exercices}
            onSelect={setEjercicioSelected}
          />
          {/* <label className="font-semibold">
            Orden en el que va el ejercicio
          </label>
          <CustomInput
            required
            name="ordenDelEjercicio"
            value={form.ordenDelEjercicio}
            placeholder={"Orden en el que va el ejercicio"}
            type="number"
            onChange={handleChange}
          /> */}
          <label className="font-semibold">Series</label>
          <CustomInput
            required
            type="number"
            placeholder={"Series"}
            name="series"
            value={form.series}
            onChange={handleChange}
          />
          <label className="font-semibold">Repeticiones</label>
          <CustomInput
            required
            type="number"
            placeholder={"Repeticiones"}
            name="repeticiones"
            value={form.repeticiones}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-center w-full">
          <ButtonSpinner loading={loadButton} type="submit" label={"Agregar"} />
        </div>
        {errorCreateEx && (
          <ErrorAuth
            messageError={"Ha ocurrido un error inténtelo nuevamente"}
            className="flex justify-center items-center"
          ></ErrorAuth>
        )}
      </form>

    </ModalLayout>
  );
};
