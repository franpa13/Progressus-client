import React, { useEffect, useState } from "react";
import { MainLayout } from "../../layout/MainLayout";
import { Title, Location, Button } from "../../components";
import { IoMdAdd } from "react-icons/io";
import { TableExercices } from "../../components/exercices/TableExercices";
import { SnackbarDefault } from "../../components";
import { useGetAllMuscles } from "../../service/exercices/useGetAllMuscles";
import { useGetAllMuscleGroups } from "../../service/exercices/useGetAllMuscleGroups";
import { ModalAddMuscle } from "../../components/exercices/ModalAddMuscle";
import { ModalAddGroupMuscle } from "../../components";
import { CgGym } from "react-icons/cg";
import { useGetAllExercises } from "../../service/plans/useGetExercises";
import { ModalAddExercise } from "../../components/exercices/ModalAddExercise";
export const Exercices = () => {
  const [selectNav, setSelectNav] = useState("Grupo muscular");
  const [textButton, setTextButton] = useState("grupo muscular");
  const [loading, setLoading] = useState(false);
  const [gruposMusculares, setGruposMusculares] = useState([]);
  const [muscles, setMuscles] = useState([]);
  const [exercices, setExercices] = useState([]);
  // ALERTA AL CREAR GRUPO
  const [openAlertCreateGroup, setOpenAlertCreateGruop] = useState(false);
  // MODAL PARA AGREGAR EJERCICIO
  const [openModalAgregarPlan, setOpenModalAgregarGrupo] = useState(false);
  // ALERTA EDITAR GRUPO
  const [openAlertEditGroup, setOpenAlertEditGroup] = useState(false);

  // MODAL PARA AGREGAR MUSCULO
  const [openModalAddMuscle, setOpenModalAddMuscle] = useState(false);
  // ALERT CUANDO SE CREA UN MUSCULO
  const [openAlertCreateMuscle, setOpenAlertCreateMuscle] = useState(false);
  // ALERT CUANDO SE EDITA UN MUSCULO
  const [openAlertEditMuscle, setOpenAlertEditMuscle] = useState(false);
  // MODAL PARA AGREGAR EJERCICIO
  const [openAddExercise, setOpenAddExercise] = useState(false);
  // ALERTA AL CREAR EJERCICIO
  const [alertExerciseCreate, setAlertExerciseCreate] = useState(false);
  const [alertExerciseEdit, setAlertExerciseEdit] = useState(false);
  useEffect(() => {
    const fetchExercices = async () => {
      setLoading(true);
      try {
        //  TRAER GRUPOS MUSCULARES
        const responseGruposMusculares = await useGetAllMuscleGroups();
        setGruposMusculares(responseGruposMusculares?.data);
        // TRAER MUSCULOS
        const responseAllMuscles = await useGetAllMuscles();


        setMuscles(responseAllMuscles?.data);
        // TRAER EJERCICIOS
        const responseExercices = await useGetAllExercises();
        setExercices(responseExercices?.data);
      } catch (e) {
        console.log(e, "errores");
      } finally {
        setLoading(false);
      }
    };
    fetchExercices();
  }, [selectNav]);
  const arregloColumnsExercices = [
    "Nombre",
    "Descripción",
    "Músculos por ejercicio",
    "Acciones",
  ];
  const arregloGropuMuscle = [
    "Nombre",
    "Descripción",
    "Músculos del grupo",
    "Imagen",
    "Acciones",
  ];
  const arregloMuscles = [
    "Nombre",
    "Descripción",
    "Grupo muscular",
    "Imagen",
    "Acciones",
  ];

  const addElement = () => {
    if (selectNav === "Grupo muscular") {
      setOpenModalAgregarGrupo(true);
    } else if (selectNav === "Musculo") {
      setOpenModalAddMuscle(true);
    } else {
      setOpenAddExercise(true);
    }
  };
  return (
    <MainLayout>
      <section className="animate-fade-in-down md:mx-auto bg-white  rounded shadow-xl w-full md:w-11/12 overflow-hidden mb-20">
        <div className="b p-3">
          <Location route={`Ejercicios`} subroute={selectNav}></Location>

          <Title title={"Ejercicios"}></Title>
        </div>
        {/* DIVISION GRAY */}
        <div className="w-full h-2 md:h-4 bg-customGray"></div>
        {/* ////////////////////////////////////////////// */}
        <div className="p-3 mb-3 w-full flex flex-col  justify-center md:justify-center items-center gap- md:gap-5  ">
          <div className="p-3 mb-0 w-full flex justify-center md:justify-center items-center gap-5 md:gap-12  ">
            <span
              onClick={() => {
                setSelectNav("Grupo muscular");
                setTextButton("Grupo muscular");
              }}
              className={`transition-all font-bold cursor-pointer p-1  ${selectNav === "Grupo muscular" &&
                "border-b-2 border-customTextBlue text-customTextBlue md:text-lg"
                }`}
            >
              Grupo muscular
            </span>

            <span
              onClick={() => {
                setSelectNav("Musculo");
                setTextButton("Musculo");
              }}
              className={`transition-all font-bold cursor-pointer p-1 ${selectNav === "Musculo" &&
                "border-b-2 border-customTextBlue text-customTextBlue md:text-lg"
                }`}
            >
              Músculo
            </span>
            <span
              onClick={() => {
                setSelectNav("Ejercicio");
                setTextButton("Ejercicio");
              }}
              className={`transition-all font-bold cursor-pointer p-1 ${selectNav === "Ejercicio" &&
                "border-b-2 border-customTextBlue text-customTextBlue md:text-lg"
                }`}
            >
              Ejercicio
            </span>
          </div>
          <div className="flex flex-col items-center md:flex-row md:justify-between w-full">
            {/* <div className="w-full flex justify-start gap-1 items-center">
              <Title
                className={
                  "  underline flex justify-start mb-1 text-customTextGreen w-full text-start "
                }
                title={"Todos los ejercicios"}
              >
                {" "}
              </Title>
              <CgGym className="text-3xl"></CgGym>
            </div> */}
            <div className="flex mt-3 md:mt-0 justify-end w-full">
              <Button
                onClick={addElement}
                className="flex  justify-start items-center gap-1 "
                Icon={IoMdAdd}
                label={`Añadir ${textButton}`}
              ></Button>
            </div>
          </div>
        </div>
        {selectNav === "Grupo muscular" ? (
          <TableExercices
            setOpenAlertEditGroup={setOpenAlertEditGroup}
            loading={loading}
            textSinEjercicios="No se encontraron grupos musculares"
            setGroupMuscles={setGruposMusculares}
            arregloColumns={arregloGropuMuscle}
            selectNav={selectNav}
            arreglo={gruposMusculares}
          ></TableExercices>
        ) : selectNav === "Musculo" ? (
          <TableExercices
            setOpenAlertEditMuscle={setOpenAlertEditMuscle}
            loading={loading}
            textSinEjercicios="No se encontraron músculos"
            arreglo={muscles}
            arregloColumns={arregloMuscles}
            selectNav={selectNav}
            setMuscles={setMuscles}
            gruposMusculares={gruposMusculares}
          ></TableExercices>
        ) : (
          <TableExercices
            setAlertExerciseEdit={setAlertExerciseEdit}
            muscles={muscles}
            loading={loading}
            textSinEjercicios="No se encontraron ejercicios"
            selectNav={selectNav}
            arregloColumns={arregloColumnsExercices}
            arreglo={exercices}
            setExercices={setExercices}
          ></TableExercices>
        )}
      </section>
      {/* MODAL PARA AGREGAR GRUPO MUSCULAR */}
      <ModalAddGroupMuscle
        setOpenAlertCreateGruop={setOpenAlertCreateGruop}
        open={openModalAgregarPlan}
        setGroupMuscles={setGruposMusculares}
        setOpen={setOpenModalAgregarGrupo}
      ></ModalAddGroupMuscle>
      {/* ALERTA AL CREAR GRUPO MUSCULAR */}
      <SnackbarDefault
        open={openAlertCreateGroup}
        severity={"success"}
        setOpen={setOpenAlertCreateGruop}
        message={"Grupo muscular creado correctamente"}
      ></SnackbarDefault>
      {/* ALERT AL EDITAR GRUPO MUSCULAR */}
      <SnackbarDefault
        open={openAlertEditGroup}
        severity={"info"}
        setOpen={setOpenAlertEditGroup}
        message={"Grupo muscular editado correctamente"}
      ></SnackbarDefault>
      {/* MODAL CREAR MUSCULO */}
      <ModalAddMuscle
        setMuscles={setMuscles}
        gruposMusculares={gruposMusculares}
        open={openModalAddMuscle}
        setOpen={setOpenModalAddMuscle}
        setOpenAlertCreateMuscle={setOpenAlertCreateMuscle}
      ></ModalAddMuscle>
      {/* ALERT AL CREAR MUSCULO */}
      <SnackbarDefault
        open={openAlertCreateMuscle}
        severity={"success"}
        setOpen={setOpenAlertCreateMuscle}
        message={"Músculo creado correctamente"}
      ></SnackbarDefault>

      {/* ALERT AL EDITAR MUSCULO */}
      <SnackbarDefault
        open={openAlertEditMuscle}
        severity={"info"}
        setOpen={setOpenAlertEditMuscle}
        message={"Músculo editado correctamente"}
      ></SnackbarDefault>
      {/* MODAL PARA AGREGAR EJERCICIO */}
      <ModalAddExercise
        setAlertExerciseCreate={setAlertExerciseCreate}
        setExercices={setExercices}
        muscles={muscles}
        open={openAddExercise}
        setOpen={setOpenAddExercise}
      ></ModalAddExercise>
      {/* ALERT AL CREAR EJERCICIO */}
      <SnackbarDefault
        open={alertExerciseCreate}
        severity={"success"}
        setOpen={setAlertExerciseCreate}
        message={"Ejercicio creado correctamente"}
      ></SnackbarDefault>
      {/* ALERT AL EDITAR EJERCICIO */}

      <SnackbarDefault
        open={alertExerciseEdit}
        severity={"info"}
        setOpen={setAlertExerciseEdit}
        message={"Ejercicio editado correctamente"}
      ></SnackbarDefault>
    </MainLayout>
  );
};
