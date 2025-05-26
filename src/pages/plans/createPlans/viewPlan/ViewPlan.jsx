import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonSpinner,
  LoadingSkeleton,
  Location,
  SnackbarDefault,
  Title,
} from "../../../../components";
import { MainLayout } from "../../../../layout/MainLayout";
import usePlanParaVer from "../../../../store/planParaVer";
import { GiFinishLine } from "react-icons/gi";
import { GiReturnArrow } from "react-icons/gi";
import { useSpinnerStore } from "../../../../store";
import { useGetPlanById } from "../../../../service/plans/useGetPlanById";
import { TableDay } from "../../../../components";
import { MdOutlineKeyboardReturn } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { Link } from "react-router-dom";
export const ViewPlan = () => {
  const columnsDayEdit = ["Ejercicio", "Series", "Repeticiones", "Acciones"];
  // VER SI ES EDITABLE O NO
  const isEditable = usePlanParaVer((state) => state.isEditable);
  ////////////////////////
  const columnsDay = ["Ejercicio", "Series", "Repeticiones", "Ver/Checkear"];
  const planParaVer = usePlanParaVer((state) => state.planParaVer);
  const showSpinner = useSpinnerStore((state) => state.showSpinner);
  const hideSpinner = useSpinnerStore((state) => state.hideSpinner);
  const [alertAddExercise, setAlertAddExercise] = useState(false);
  const [alertDelete, setOpenAlertDelete] = useState(false);
  const [diasDelPlan, setDiasDelPlan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [daySelected, setDaySelected] = useState("");
  const [alertDayFinish, setAlertDayFinish] = useState(false);
  useEffect(() => {
    const fetchDataPlan = async () => {
      showSpinner();
      try {
        const responseDataPlan = await useGetPlanById(planParaVer.id);
        setDiasDelPlan(responseDataPlan.data.value.value);
      } catch (e) {
        console.log(e, "errores al traer el plan");
      } finally {
        setLoading(false);
        hideSpinner();
      }
    };
    fetchDataPlan();
  }, []);


  return (
    <MainLayout>
      <section className="animate-fade-in-down md:mx-auto bg-white rounded shadow-xl w-full md:w-11/12  overflow-hidden mb-20 flex flex-col ">
        <div className="b p-3 ">
          <Location route={"Planes"} subroute={"Ver plan"}></Location>
          <div className="flex  flex-row justify-between  items-center">
            <Title title={"Ver plan de entrenamiento"}></Title>
            <Link
              className="w-1/12 md:w-auto flex justify-center items-center p-1 md:p-2 rounded bg-customButtonGreen"
              to={"/plans"}
            >
              <MdOutlineKeyboardReturn className="text-lg md:text-2xl text-white"></MdOutlineKeyboardReturn>
            </Link>
          </div>
        </div>
        {/* DIVISION GRAY */}
        <div className="w-full h-2 md:h-4 bg-customGray"></div>
        <section className="b p-3  flex flex-col justify-center gap-1 items-center w-full md:flex-row md:justify-between md:text-xl">
          <span className="font-semibold">
            Nombre :{" "}
            <span className="text-customTextGreen">{diasDelPlan?.nombre}</span>
          </span>
          <span className="font-semibold">
            Objetivo :{" "}
            <span className="text-customTextGreen">
              {diasDelPlan?.objetivoDelPlan?.nombre}
            </span>
          </span>
          <span className="font-semibold">
            Cantidad de días :{" "}
            <span className="text-customTextGreen">
              {diasDelPlan?.diasPorSemana}
            </span>
          </span>
        </section>
        <div className="mt-3 pb-7">
          {loading ? (
            <div>
              <LoadingSkeleton
                count={4}
                width={"100%"}
                className={"p-3"}
                height={200}
              ></LoadingSkeleton>
            </div>
          ) : (
            diasDelPlan &&
            diasDelPlan.diasDelPlan.map((dia) => {
              

              return (
                <div
                  className={`${
                    isEditable ? " " : "border-gray-300 mt-14   border-b-2"
                  }`}
                >
                  <div
                    className={`p-0 flex ${
                      dia.numeroDeDia !== 1 && "mt-12"
                    }  underline justify-center items-center gap-2 mb-0`}
                  >
                    <Title
                      title={`Día ${dia.numeroDeDia}`}
                      className={""}
                    ></Title>
                    <LuCalendarDays className="text-customTextBlue text-lg md:text-3xl"></LuCalendarDays>
                  </div>
                  <TableDay
                  setAlertDayFinish = {setAlertDayFinish}
                  setDaySelected = {setDaySelected}
                    setOpenAlertDelete={setOpenAlertDelete}
                    setAlertAddExercise={setAlertAddExercise}
                    setDiasDelPlan={setDiasDelPlan}
                    day={dia.numeroDeDia}
                    isEditable={isEditable}
                    textSinEjercicios={"No hay ejercicios en este día."}
                    arregloColumns={isEditable ? columnsDayEdit : columnsDay}
                    arreglo={dia.ejerciciosDelDia}
                  />
                </div>
              );
            })
          )}
        </div>
        {/* {isEditable && (
          <div className="p-3 flex w-full justify-end gap-4">
            <ButtonSpinner label="Guardar"></ButtonSpinner>
            <Button className="bg-red-600" label={"Cancelar"}></Button>
          </div>
        )} */}
      </section>
      <SnackbarDefault
        message={"Ejercicio añadido correctamente"}
        severity={"success"}
        position={{ vertical: "bottom", horizontal: "left" }}
        open={alertAddExercise}
        setOpen={setAlertAddExercise}
      ></SnackbarDefault>
      <SnackbarDefault
        message={"Ejercicio eliminado correctamente"}
        severity={"info"}
        position={{ vertical: "bottom", horizontal: "left" }}
        open={alertDelete}
        setOpen={setOpenAlertDelete}
      ></SnackbarDefault>
      <SnackbarDefault
        message={`Rutina del dia ${daySelected} finalizada`}
        severity={"success"}
        position={{ vertical: "bottom", horizontal: "left" }}
        open={alertDayFinish}
        setOpen={setAlertDayFinish}
      ></SnackbarDefault>
    </MainLayout>
  );
};
