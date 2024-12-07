import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

export const ChartBar = ({
  dataset,
  xAxis,
  yAxis = [
    {
      label: "Values",
    },
  ],
  series = [],
  height = 300,
  sx = {},
  barColor = "#1976d2", // Color predeterminado
}) => {
  const [tickPlacement, setTickPlacement] = React.useState("middle");
  const [tickLabelPlacement, setTickLabelPlacement] = React.useState("middle");

  // Filtrar los valores del eje Y para eliminar los que tienen decimales no deseados
  const filterTicks = (ticks) => {
    return ticks.filter((tick) => {
      // Solo acepta valores enteros y no aquellos que terminan en .5
      return tick % 1 === 0; // Esto asegura que solo los enteros pasen
    });
  };

  // Modificar las series para incluir el color de las barras
  const updatedSeries = series.map((serie) => ({
    ...serie,
    color: barColor, // Aplica el color de las barras
  }));

  // Filtrar los ticks del eje Y
  const updatedYAxis = yAxis.map((axis) => ({
    ...axis,
    ticks: filterTicks(axis.ticks || []), // Filtrar los ticks si están definidos
  }));

  return (
    <div className="w-full md:w-5/6 text-xs">
      <BarChart
        dataset={dataset}
        xAxis={xAxis.map((axis) => ({
          ...axis,
          tickPlacement,
          tickLabelPlacement,
        }))}
        yAxis={updatedYAxis}
        series={updatedSeries} // Usar las series actualizadas con el color
        height={height}
        sx={{
          [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
            transform: "translateX(-10px)",
          },
          ...sx,
        }}
      />
    </div>
  );
};
