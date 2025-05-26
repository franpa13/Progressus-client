import React, { useEffect, useState } from "react";
import { MainLayout } from "../../layout/MainLayout";
import {
  ButtonSpinner,
  Location,
  TableContability,
  Title,
  DatePickerr,
} from "../../components";
import { PiPiggyBankDuotone } from "react-icons/pi";
import autoTable from "jspdf-autotable";
import { FaRegFilePdf } from "react-icons/fa6";
import { useGetContability } from "../../service/contability/useGetContability";
import { jsPDF } from "jspdf";
import dayjs from "dayjs";

export const Contability = () => {
  const [contability, setContability] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM"));
  const [filteredData, setFilteredData] = useState([]);
  const [total, setTotal] = useState(0);
  const [membershipDetails, setMembershipDetails] = useState({});
  const [skeleton, setSkeleton] = useState(true);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const minDate = dayjs("2020-01-01");
  const maxDate = dayjs().endOf("year");

  useEffect(() => {
    const fetchContability = async () => {
      try {
        const responseContability = await useGetContability();
        if (responseContability && responseContability.status === 200) {
          setContability(responseContability.data);
        }
      } catch (e) {
        console.error("Error fetching contability data:", e);
      } finally {
        setSkeleton(false);
      }
    };
    fetchContability();
  }, []);

  useEffect(() => {

    if (contability.length > 0) {
      const filtered = contability.filter((item) => {
        const itemMonthYear = dayjs(item.fechaPago).format("YYYY-MM");
        return itemMonthYear === selectedDate;
      });
      setFilteredData(filtered);
    }
  }, [contability, selectedDate]);

  const columns = ["Nombre", "Fecha", "Descripción", "Monto"];
  const factureData = {
    fecha: dayjs().format("YYYY-MM-DD"),
    title: `Registro de ingresos  ${selectedDate}`,
  };

  const generatePdf = () => {
    setLoadingPdf(true); // Mostrar el spinner

    setTimeout(() => {
      const doc = new jsPDF();

      const marginX = 10; // Margen izquierdo para los textos
      const marginRight = 180; // Ajusta este valor para posicionar la imagen a la derecha
      let currentY = 15;

      const imageUrl = "./progressus.png";
      const imageWidth = 35;
      const imageHeight = 25;

      // Agregar la imagen al PDF a la derecha, pegada arriba
      doc.addImage(imageUrl, "JPEG", 172, 10, imageWidth, imageHeight);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("Progressus Center", marginX, currentY);

      currentY += 10;
      doc.text(`Fecha: ${factureData.fecha}`, marginX, currentY);

      currentY += 10;
      doc.text(`${factureData.title}`, marginX, currentY);

      // Espacio entre título y tabla
      currentY += 22;

      // Verifica si hay datos disponibles
      if (filteredData.length === 0) {
        doc.setFont("helvetica", "italic");
        doc.setFontSize(10);
        doc.text(
          "No hay datos disponibles para el mes seleccionado.",
          marginX,
          currentY
        );
      } else {
        // Datos de la tabla
        const rows = filteredData.map((item) => [
          `${item.nombre} ${item.apellido}`,
          dayjs(item.fechaPago).format("YYYY-MM-DD"),
          item.nombreMembresia || "No especificado",
          item.precioMembresia ? `$${item.precioMembresia}` : "N/A",
        ]);

        // Renderiza la tabla con autoTable
        autoTable(doc, {
          startY: currentY, // Inicia donde terminó el texto
          head: [columns],
          body: rows,
          margin: { left: marginX, right: marginX },
          styles: { fontSize: 10, cellPadding: 3 }, // Ajusta el tamaño del texto
        });

        // Mostrar el total debajo de la tabla
        currentY = doc.lastAutoTable.finalY + 10;
        doc.text(`Total mensual: $${total}`, 150, currentY);
      }

      // Descarga del archivo PDF
      doc.save(`facturaMes_${selectedDate}.pdf`);

      setLoadingPdf(false);
    }, 1000);
  };

  const handleDateChange = React.useCallback((date) => {
    setSelectedDate(dayjs(date).format("YYYY-MM"));
  }, []);
  const memoizedFilteredData = React.useMemo(
    () => filteredData,
    [filteredData]
  );

  return (
    <MainLayout>
      <section className="animate-fade-in-down md:mx-auto bg-white rounded shadow-xl w-full md:w-11/12 overflow-hidden mb-20">
        <div className="b p-3">
          <Location route={`Contabilidad`} subroute={"Reportes"}></Location>
          <Title title={"Recibos"}></Title>
        </div>
        <div className="w-full h-2 md:h-4 bg-customGray"></div>
        <section className="p-3 mb-4">
          <div className="flex w-full justify-between flex-wrap gap-2 items-center">
            <div className="flex items-center gap-1 md:gap-3">
              <Title title={"Registro de ingresos del último mes"}></Title>
              <PiPiggyBankDuotone className="text-xl md:text-3xl"></PiPiggyBankDuotone>
            </div>
            <div className="hidden md:block">
              <ButtonSpinner
                loading={loadingPdf}
                onClick={generatePdf}
                className="flex items-center justify-between  gap-3 w-full"
                label="Descargar PDF"
                Icon={FaRegFilePdf}
              ></ButtonSpinner>
            </div>

            <div className=" block md:hidden">
              <ButtonSpinner
                loading={loadingPdf}
                onClick={generatePdf}
                className="flex items-center justify-between gap-3 w-full"
                Icon={FaRegFilePdf}
              ></ButtonSpinner>
            </div>
          </div>
        </section>

        <div className="w-full p-3 flex flex-col gap-5">
          <div className="w-1/2 md:w-1/3">
            <DatePickerr
              label="Seleccione el año y el mes"
              minDate={minDate}
              maxDate={maxDate}
              selectedDate={selectedDate}
              setSelectedDate={handleDateChange}
            ></DatePickerr>
          </div>
        </div>

        <TableContability
          loading={skeleton}
          data={memoizedFilteredData}
          columns={columns}
          setTotal={setTotal}
        ></TableContability>
      </section>
    </MainLayout>
  );
};
