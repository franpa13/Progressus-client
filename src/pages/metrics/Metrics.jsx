import React, { useEffect, useState } from "react";
import { MainLayout } from "../../layout/MainLayout";
import {
  Button,
  CustomInput,
  Location,
  SnackbarDefault,
  Title,
} from "../../components";
import { TableMetrics } from "../../components/metrics/TableMetrics";
import { CiSearch } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { useStoreUserData } from "../../store";
import { ModalAddMetric } from "../../components/metrics/ModalAddMetric";
import { useGetMetric } from "../../service/metrics/useGetMetric";
export const Metrics = () => {
  const userData = useStoreUserData((state) => state.userData);
  const [modalMetric, setModalMetric] = useState(false);
  const arreglo = [
    {
      id: 1,
      fecha: "2024-12-01",
      peso: 70.5,
      cintura: 85,
      grasa: 18.5,
      muslos: 60,
      biceps: 35,
      hombros: 110,
    },
    {
      id: 2,
      fecha: "2024-12-08",
      peso: 71.2,
      cintura: 86,
      grasa: 18.8,
      muslos: 61,
      biceps: 36,
      hombros: 112,
    },
    {
      id: 3,
      fecha: "2024-12-15",
      peso: 70.8,
      cintura: 85,
      grasa: 18.6,
      muslos: 60.5,
      biceps: 35.5,
      hombros: 111,
    },
    {
      id: 4,
      fecha: "2024-12-22",
      peso: 71.0,
      cintura: 86,
      grasa: 18.7,
      muslos: 61.2,
      biceps: 36.2,
      hombros: 113,
    },
    {
      id: 5,
      fecha: "2024-12-29",
      peso: 70.6,
      cintura: 85,
      grasa: 18.4,
      muslos: 60.8,
      biceps: 35.8,
      hombros: 111.5,
    },
  ];
  const [metrics, setMetrics] = useState([]);
  const arregloColumns = ["Fecha", "Peso (kg)", "Altura", "Grasa (%)"];
  const [alert, setAlert] = useState(false);
  useEffect(() => {
    const traerData = async () => {
      const resp = await useGetMetric(userData.identityUserId);
      setMetrics(resp?.data || []);
    };
    traerData();
  }, []);
  const openModal = () => {
    setModalMetric(true);
  };
  console.log(metrics, "metric");

  return (
    <MainLayout>
      <section className="animate-fade-in-down md:mx-auto bg-white  rounded shadow-xl w-full md:w-11/12 overflow-hidden mb-20">
        <div className="b p-3">
          <Location route={`Mediciones`} subroute={"Mis mediciones"}></Location>
          <Title title={"Mediciones"}></Title>
        </div>
        <div className="w-full h-2 md:h-4 bg-customGray"></div>
        <section className="p-3 mb-4">
          <div className="md:w-full  md:flex md:justify-end md:items-center md:gap-5">
            <div className=" w-[320px]">
              <CustomInput
                classNameInput="md:p-1.5"
                className="border-gray-300 md:p-0"
                Icon={CiSearch}
                placeholder="Buscar"
              ></CustomInput>
            </div>
            <Button
              Icon={IoMdAdd}
              className="md:py-[11px] md:px-5 cursor-pointer flex flex-row-reverse items-center gap-1 text-sm"
              label={"Nueva semana"}
              classNameIcon={"text-xl md:text-lg"}
              onClick={openModal}
            ></Button>
          </div>
        </section>
        <TableMetrics
          loading={false}
          arreglo={metrics}
          arregloColumns={arregloColumns}
        ></TableMetrics>
      </section>
      <ModalAddMetric
        setMetric={setMetrics}
        setAlert={setAlert}
        open={modalMetric}
        setOpen={setModalMetric}
      ></ModalAddMetric>
      <SnackbarDefault
        open={alert}
        severity={"success"}
        message={"Registro semanal guardado"}
        setOpen={setAlert}
      ></SnackbarDefault>
    </MainLayout>
  );
};
