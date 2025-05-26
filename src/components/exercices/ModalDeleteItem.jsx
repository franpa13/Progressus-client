import React, { useState } from "react";
import { ModalLayout } from "../../layout/ModalLayout";
import { ButtonSpinner } from "../ui/buttons/ButtonSpinner";
import { useDeleteGroup } from "../../service/exercices/useDeleteGroup";
import { useGetAllMuscleGroups } from "../../service/exercices/useGetAllMuscleGroups";
import { useDeleteMuscle } from "../../service/exercices/useDeleteMuscle";
import { useGetAllMuscles } from "../../service/exercices/useGetAllMuscles";
import { useDeleteOneExercise } from "../../service/exercices/useDeleteOneExercise";
import { useGetAllExercises } from "../../service/plans/useGetExercises";
import { ErrorAuth } from "../ui/errorAuth/ErrorAuth";
export const ModalDeleteItem = ({
  open,
  setOpen,
  elementEditable,
  setGroupMuscles,
  setMuscles,
  selectNav,
  setExercices,
}) => {
  const [loading, setLoading] = useState(false);
  const [errorAddExercise, setErrorAddExercise] = useState(false);
  const deleteItem = async () => {
    setLoading(true);
    try {
      if (selectNav === "Grupo muscular") {
        const deleteRes = await useDeleteGroup(elementEditable.id);

        if ((deleteRes && deleteRes.status == 200) || deleteRes.status == 201) {
          const responseGruposMusculares = await useGetAllMuscleGroups();
          setGroupMuscles(responseGruposMusculares?.data);
          setOpen(false);
        } else {
          setErrorAddExercise(true);
        }
      } else if (selectNav === "Musculo") {
        const deleteMuscle = await useDeleteMuscle(elementEditable.id);
        
        if (
          (deleteMuscle && deleteMuscle.status == 200) ||
          deleteMuscle.status == 201
        ) {
          const responseAllMuscles = await useGetAllMuscles();
          setMuscles(responseAllMuscles?.data);
          setOpen(false);
        } else {
          setErrorAddExercise(true);
        }
      } else {
        const deleteExercise = await useDeleteOneExercise(elementEditable.id);
        if (deleteExercise?.status == 200 || deleteExercise?.status == 201) {
          const responseExercices = await useGetAllExercises();
          setExercices(responseExercices?.data);
          setOpen(false);
        } else {
          setErrorAddExercise(true);
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ModalLayout open={open} setOpen={setOpen}>
      <div className="flex justify-center items-center gap-1 mb-4">
        <span className="font-semibold text-xl  text-center">
          Eliminar
          <span className="font-bold text-xl ml-1 text-center text-red-600">
            {elementEditable?.nombre} ?
          </span>
        </span>
      </div>
      <div className="flex justify-center">
        <ButtonSpinner
          loading={loading}
          onClick={deleteItem}
          label={`Eliminar ${selectNav}`}
          className="bg-red-600"
        ></ButtonSpinner>
      </div>
      {errorAddExercise && (
        <ErrorAuth
          messageError={"Ha ocurrido un error, intentelo nuevamente"}
          className="flex justify-center"
        />
      )}
    </ModalLayout>
  );
};
