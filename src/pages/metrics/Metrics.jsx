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
import { useNavigate } from "react-router-dom";

export const Metrics = () => {
  const userData = useStoreUserData((state) => state.userData);
  const [modalMetric, setModalMetric] = useState(false);
  const arregloColumns = ["Fecha", "Peso (kg)", "Altura", "Grasa (%)"];
  const [alert, setAlert] = useState(false);
  const [metrics, setMetrics] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Estado para el buscador
  const navigate = useNavigate();
  useEffect(() => {
    if (userData.membresiaActiva) {


      const traerData = async () => {
        const resp = await useGetMetric(userData.identityUserId);
        setMetrics(resp?.data || []);
      };
      traerData();
    }else{
      navigate("/membership")
    }
  }, []);

  // Función para manejar el cambio en el input de búsqueda
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filtrar las métricas según el valor del buscador
  const filteredMetrics = metrics.filter(
    (metric) => metric.fecha.toLowerCase().includes(searchQuery.toLowerCase()) // Aquí puedes ajustar el filtro según el campo que necesites
  );

  const openModal = () => {
    setModalMetric(true);
  };

  return (
    <MainLayout>
      <section className="animate-fade-in-down md:mx-auto bg-white rounded shadow-xl w-full md:w-11/12 overflow-hidden mb-20">
        <div className="b p-3">
          <Location route={`Mediciones`} subroute={"Mis mediciones"} />
          <Title title={"Mediciones"} />
        </div>
        <div className="w-full h-2 md:h-4 bg-customGray"></div>
        <section className="p-3 mb-4">
          <div className="md:w-full md:flex md:justify-end md:items-center md:gap-5">
            <div className="w-[320px]">
              <CustomInput
                classNameInput="md:p-1.5"
                className="border-gray-300 md:p-0"
                Icon={CiSearch}
                placeholder="Buscar por fecha"
                value={searchQuery}
                onChange={handleSearch} // Llamada a la función de búsqueda
              />
            </div>
            <Button
              Icon={IoMdAdd}
              className="md:py-[11px] md:px-5 cursor-pointer flex flex-row-reverse items-center gap-1 text-sm"
              label={"Nueva semana"}
              classNameIcon={"text-xl md:text-lg"}
              onClick={openModal}
            />
          </div>
        </section>
        <TableMetrics
          loading={false}
          arreglo={filteredMetrics} // Usamos las métricas filtradas
          arregloColumns={arregloColumns}
        />
      </section>
      <ModalAddMetric
        setMetric={setMetrics}
        setAlert={setAlert}
        open={modalMetric}
        setOpen={setModalMetric}
      />
      <SnackbarDefault
        open={alert}
        severity={"success"}
        message={"Registro semanal guardado"}
        setOpen={setAlert}
      />
    </MainLayout>
  );
};
