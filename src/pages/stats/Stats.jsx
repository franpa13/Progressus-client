import React, { useEffect, useState } from "react";
import { MainLayout } from "../../layout/MainLayout";
import { ChartBar, Location, SelectNavegable, Title } from "../../components";
import { useGetAsistForMonth } from "../../service/stats/useGetAsistForMonth";
import { TbClockHour4 } from "react-icons/tb";
import { BsCalendar2Month } from "react-icons/bs";
import { useGetIngresosMensuales } from "../../service/stats/useGetIngresosMensuales";
import { useGetAsistForDay } from "../../service/stats/useGetAsistForDay";
import { MdPayment } from "react-icons/md";
import { useGetMemberConfirm } from "../../service/stats/useGetMemberConfirm";
import { IoTodayOutline } from "react-icons/io5";
import { FaRegCalendarCheck } from "react-icons/fa";
import { SelectDef } from "../../components";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { ChartBarHorizontal } from "../../components/stats/ChartBarHorizontal";
import { useSpinnerStore } from "../../store";
import { useGetAsistForHour } from "../../service/stats/useGetAsistForHour";
export const Stats = () => {
  const showSpinner = useSpinnerStore((state) => state.showSpinner);
  const hideSpinner = useSpinnerStore((state) => state.hideSpinner);
  const [selectNav, setSelectNav] = useState("Asistencia/Turnos");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  // ASISTENCIAS POR MES
  const [nroAsistenciaPorMes, setNroAsistenciaPorMes] = useState([]);
  // ASISTENCIAS POR DIA
  const [nroAsistForDay, setNroAsistForDay] = useState([]);
  // ASISTENCIAS POR HORA
  const [hourSelect, setHourSelect] = useState("10:00:00");
  const [asistForHour, setAsistForHour] = useState([]);
  // MEMBRESIAS CONFIRMADAS POR MES
  const [membershipConfirm, setMembershipConfirm] = useState([]);

  //INGRESOS MENSUALES
  const [ingresos, setIngresos] = useState([]);
  useEffect(() => {
    showSpinner();
    const fetchData = async () => {
      try {
        // ASITENCIAS POR MES
        const traerAsistForMes = await useGetAsistForMonth();
        setNroAsistenciaPorMes(traerAsistForMes?.data || []);
        // ASISTENCIAS POR DIA
        const traerAsistForDay = await useGetAsistForDay();
        setNroAsistForDay(traerAsistForDay?.data || []);

        // TRAER MEMBRESIAS CONFIRMADAS POR MES
        const traerConfirm = await useGetMemberConfirm();
        setMembershipConfirm(traerConfirm?.data || []);
        // INGRESOS
        const traerIngresos = await useGetIngresosMensuales();
        setIngresos(traerIngresos?.data || []);
      } catch (e) {
        console.log(e, "error a traer stats");
      } finally {
        hideSpinner();
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const traerForHour = async () => {
      try {
        // TRAER ASISTENCIAS POR HORA
        const traerAsistForHour = await useGetAsistForHour(hourSelect);

        setAsistForHour(traerAsistForHour?.data || []);
      } catch (e) {
        console.log(e, "error");
      }
    };
    traerForHour();
  }, [hourSelect]);
  // ASISTENCIA POR MES
  // Filtrar por año
  const selectYear = (e) => {
    setSelectedYear(Number(e.target.value));
  };

  const filteredData = nroAsistenciaPorMes.filter(
    (asistencia) => asistencia.anio === selectedYear
  );

  // Transformar los datos para el dataset
  const dataset = filteredData.map((asistencia) => ({
    mes: new Date(asistencia.anio, asistencia.mes - 1).toLocaleString("es-ES", {
      month: "long",
    }),
    numeroDeAsistencias: asistencia.numeroDeAsistencias,
  }));

  // Obtener lista de años únicos para el selector
  const availableYears = Array.from(
    new Set(nroAsistenciaPorMes.map((asistencia) => asistencia.anio))
  );
  ///////////////////////////////////////////////////////////////
  // ASISTENCIA POR DIA

  const diasDeLaSemana = [
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
    "domingo",
  ];
  // Mapa de días en inglés a español
  const diaMap = {
    Sunday: "domingo",
    Monday: "lunes",
    Tuesday: "martes",
    Wednesday: "miércoles",
    Thursday: "jueves",
    Friday: "viernes",
    Saturday: "sábado",
  };
  // Transformar los datos para el dataset y asegurarnos de que los días estén en español y en el orden correcto
  const dayOfWeekDataset = nroAsistForDay
    .map((asistencia) => ({
      dia:
        diaMap[asistencia.diaDeSemana] || asistencia.diaDeSemana.toLowerCase(), // Usamos el mapa para traducir al español
      numeroDeAsistencias: asistencia.numeroDeAsistencias,
    }))
    .sort(
      (a, b) => diasDeLaSemana.indexOf(a.dia) - diasDeLaSemana.indexOf(b.dia)
    );

  // Verifica si el orden de los días es el correcto

  ///////////////////////////////////////////////////////////////

  // TRAER POR HORA

  const asistForHourDataset = asistForHour.map((asistencia) => ({
    hora: `${asistencia.franjaHoraria}:00`,
    numeroDeAsistencias: asistencia.numeroDeAsistencias,
  }));

  ///////////////////////////////////////////////////////////////
  // MEMBRESIAS
  // Solicitudes de pago confirmadas por mes

  const mesesDelAno = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  // Crear un dataset que asegure que todos los meses estén presentes
  const membershipDataset = mesesDelAno.map((mes, index) => {
    const mesData = membershipConfirm.find((item) => item.mes === index + 1);
    return {
      mes, // Nombre del mes
      numeroDeMembresias: mesData ? mesData.solicitudes.length : 0, // Valor real o 0 si no hay datos
    };
  });

  ///////////////////////////////////////////////////////////////
  //  BALANCE INGRESOS
  const ingresosDataset = ingresos.map((ingreso) => ({
    mes: new Date(2024, ingreso.mes - 1).toLocaleString("es-ES", {
      month: "long",
    }),
    montoTotal: ingreso.montoTotal,
  }));

  ///////////////////////////////////////////////////////////////
  return (
    <MainLayout>
      <section className="animate-fade-in-down md:mx-auto bg-white rounded shadow-xl w-full md:w-11/12 overflow-hidden mb-20">
        <div className="b p-3">
          <Location route={`Estadisticas`} subroute={"Reportes"} />
          <Title title={"Estadisticas"} />
        </div>
        <div className="w-full h-2 md:h-4 bg-customGray"></div>
        <section className="w-full justify-center p-3 mb-4">
          <div className="flex justify-center gap-4">
            <span
              onClick={() => setSelectNav("Asistencia/Turnos")}
              className={`transition-all font-bold cursor-pointer p-1 ${
                selectNav === "Asistencia/Turnos" &&
                "border-b-2 border-customTextBlue text-customTextBlue md:text-lg"
              }`}
            >
              Asistencias/Turnos
            </span>
            <span
              onClick={() => setSelectNav("Membresias")}
              className={`transition-all font-bold cursor-pointer p-1  ${
                selectNav === "Membresias" &&
                "border-b-2 border-customTextBlue text-customTextBlue md:text-lg"
              }`}
            >
              Membresias
            </span>
          </div>
          {selectNav === "Asistencia/Turnos" ? (
            <>
              {" "}
              {/* ASISTENCIAS/TURNOS */}
              {/* ASISTENCIA POR CADA MES */}
              <div className="mt-5 md:mt-12 mb-3 w-full   flex flex-col justify-center md:justify-between items-center md:items-start gap-6 md:gap-5">
                <div className="flex items-center gap-3">
                  <Title
                    className={"text-customTextGreen "}
                    title={"Asistencias por mes"}
                  ></Title>
                  <BsCalendar2Month className="text-xl md:text-3xl font-bold"></BsCalendar2Month>
                </div>

                <div className="flex justify-end w-full items-center">
                  <SelectDef
                    value={selectedYear}
                    label="Seleccionar Año:"
                    options={availableYears}
                    onChange={selectYear}
                    variant={"filled"}
                  />
                </div>
                {/* ASISTENCIA POR CADA MES */}
                <div className="w-full flex items-center justify-center">
                  <ChartBar
                    dataset={dataset}
                    xAxis={[
                      {
                        scaleType: "band",
                        dataKey: "mes",
                        label: "Mes",
                      },
                    ]}
                    yAxis={[
                      {
                        label: "Número de asistencias",
                      },
                    ]}
                    series={[
                      {
                        dataKey: "numeroDeAsistencias",
                        label: "Asistencias",
                      },
                    ]}
                    barColor="#1890FF"
                  />
                </div>
              </div>
              {/* /////////////////////////////////// */}
              <div className="w-full shadow-md h-4"></div>
              {/* ASISTENCIAS POR DIA DE SEMANA */}
              <div className="mt-12 mb-3 w-full flex flex-col justify-center md:justify-between items-center md:items-start  gap-5 md:gap-12">
                <div className="flex items-center gap-3">
                  <Title
                    className={"text-customTextGreen"}
                    title={"Asistencias por día de la semana"}
                  ></Title>
                  <IoTodayOutline className="text-xl md:text-3xl"></IoTodayOutline>
                </div>

                <div className="w-full flex items-center justify-center">
                  <ChartBar
                    dataset={dayOfWeekDataset} // Usamos el dataset de días de la semana
                    xAxis={[
                      {
                        scaleType: "band",
                        dataKey: "dia", // Clave para los días
                        label: "Día de la Semana",
                      },
                    ]}
                    yAxis={[
                      {
                        label: "Número de asistencias",
                      },
                    ]}
                    series={[
                      {
                        dataKey: "numeroDeAsistencias",
                        label: "Asistencias",
                      },
                    ]}
                    barColor="#FF5733" // Color personalizado para las barras
                  />
                </div>
              </div>
              {/* ////////////////////////////////////////// */}
              <div className="w-full shadow-md h-4"></div>
              {/* ASISTENCIAS POR DIA DE SEMANA */}
              <div className="mt-12 mb-3 w-full flex flex-col justify-center md:justify-between items-center md:items-start gap-5 md:gap-12">
                <div className="flex items-center gap-3">
                  <Title
                    className={"text-customTextGreen"}
                    title={"Asistencias por hora"}
                  ></Title>
                  <TbClockHour4 className="text-2xl md:text-3xl"></TbClockHour4>
                </div>

                <div className="w-full flex items-center justify-center">
                  <ChartBar
                    ticksByOne={true}
                    dataset={asistForHourDataset} // Datos transformados
                    xAxis={[
                      {
                        scaleType: "band",
                        dataKey: "hora",
                        label: "Hora",
                      },
                    ]}
                    yAxis={[
                      {
                        label: "Número de asistencias",
                      },
                    ]}
                    series={[
                      {
                        dataKey: "numeroDeAsistencias", // Clave para el valor de las barras
                        label: "Asistencias",
                      },
                    ]}
                    barColor="#28A745" // Color de las barras
                  />
                </div>
              </div>
              {/* ////////////////////////////////////////// */}
            </>
          ) : (
            <>
              {/* MEMBRESIAS CONFIRMADAS POR MES */}
              <div className="mt-5 md:mt-12 mb-3 w-full   flex flex-col justify-center md:justify-between items-center md:items-start gap-6 md:gap-5">
                <div className="flex items-center gap-3">
                  <Title
                    className={"text-customTextGreen "}
                    title={"Solicitudes de pago confirmados por mes"}
                  ></Title>
                  <FaRegCalendarCheck className="text-xl md:text-2xl font-bold"></FaRegCalendarCheck>
                </div>

                {/* <div className="flex justify-end w-full items-center">
                  <SelectDef
                    value={selectedYear}
                    label="Seleccionar Año:"
                    options={availableYears}
                    onChange={selectYear}
                    variant={"filled"}
                  />
                </div> */}
                {/* MEMBRESIAS POR MES */}
                <div className="w-full flex items-center justify-center">
                  <ChartBar
                    dataset={membershipDataset} // Datos transformados
                    xAxis={[
                      {
                        scaleType: "band", // Escala categórica
                        dataKey: "mes", // Clave de los datos para el eje X
                        label: "Mes",
                      },
                    ]}
                    yAxis={[
                      {
                        label: "Número de Membresías Confirmadas",
                      },
                    ]}
                    series={[
                      {
                        dataKey: "numeroDeMembresias", // Clave de los datos para las barras
                        label: "Membresías Confirmadas",
                      },
                    ]}
                  />
                </div>
              </div>
              {/* /////////////////////////////////// */}
              <div className="w-full shadow-md h-4"></div>
              {/* BALANCES INGRESOS MENSUALES */}
              <div className="mt-5 md:mt-12 mb-3 w-full   flex flex-col justify-center md:justify-between items-center md:items-start gap-6 md:gap-5">
                <div className="flex items-center gap-3">
                  <Title
                    className={"text-customTextGreen "}
                    title={"Balance de ingreso mensuales por mes"}
                  ></Title>
                  <RiMoneyDollarBoxLine className="text-xl md:text-3xl font-bold"></RiMoneyDollarBoxLine>
                </div>

                {/* <div className="flex justify-end w-full items-center">
                  <SelectDef
                    value={selectedYear}
                    label="Seleccionar Año:"
                    options={availableYears}
                    onChange={selectYear}
                    variant={"filled"}
                  />
                </div> */}
                {/* MEMBRESIAS POR MES */}
                <div className="w-full flex items-center justify-center">
                  <ChartBar
                    dataset={ingresosDataset}
                    xAxis={[
                      {
                        scaleType: "band",
                        dataKey: "mes", // Meses
                        label: "Mes",
                      },
                    ]}
                    yAxis={[
                      {
                        label: "Ingresos Totales",
                      },
                    ]}
                    series={[
                      {
                        dataKey: "montoTotal",
                        label: "Ingresos",
                      },
                    ]}
                    barColor="#28A745" // Color de las barras
                  />
                </div>
              </div>
              {/* /////////////////////////////////// */}
              <div className="w-full shadow-md h-4"></div>
            </>
          )}
        </section>
      </section>
    </MainLayout>
  );
};
