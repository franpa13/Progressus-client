import React, { useEffect, useState } from 'react';
import { useFoodById } from '../../service/nutrition/useFoodById';
import { useSpinnerStore } from "./../../store/useSpinnerStore";

export const InfoNutri = ({ comidas }) => {
  const showSpinner = useSpinnerStore((state) => state.showSpinner);
  const hideSpinner = useSpinnerStore((state) => state.hideSpinner);
  const [nutriInfo, setNutriInfo] = useState({
    kcal: 0,
    prot: 0,
    hc: 0,
    grasas: 0,
  });

  // Caché para almacenar los datos de los alimentos
  const [cache, setCache] = useState({});

  console.log(comidas, "comidas en el info");

  useEffect(() => {
    showSpinner();
    const fetchAndCalculateNutriInfo = async () => {
      // Inicializar acumuladores
      let totalKcal = 0;
      let totalProt = 0;
      let totalHc = 0;
      let totalGrasas = 0;

      // Recorrer cada alimento en comidas
      for (const alimento of comidas) {
        try {
          let foodData;

          // Verificar si los datos del alimento ya están en el caché
          if (cache[alimento.alimentoId]) {
            foodData = cache[alimento.alimentoId]; // Usar datos del caché
          } else {
            // Obtener los datos del alimento usando useFoodById
            const response = await useFoodById(alimento.alimentoId);
            foodData = response.data;

            // Almacenar los datos en el caché
            setCache((prevCache) => ({
              ...prevCache,
              [alimento.alimentoId]: foodData,
            }));
          }

          // Acumular los valores nutricionales
          totalKcal += foodData.calorias * alimento.cantidad;
          totalProt += foodData.proteinas * alimento.cantidad;
          totalHc += foodData.carbohidratos * alimento.cantidad;
          totalGrasas += foodData.grasas * alimento.cantidad;
        } catch (error) {
          console.error("Error al obtener los datos del alimento:", error);
        } finally {
          hideSpinner();
        }
      }

      // Actualizar el estado con los valores acumulados
      setNutriInfo({
        kcal: totalKcal,
        prot: totalProt,
        hc: totalHc,
        grasas: totalGrasas,
      });
    };

    fetchAndCalculateNutriInfo(); // Llamar a la función para calcular la información nutricional
  }, [comidas]); // Ejecutar cada vez que comidas cambie

  return (
    <div className='p-2 text-base mt-6 flex gap-4 flex-wrap w-full md:w-[1500px] justify-between rounded-md font-semibold bg-customBlue'>
      <p>kcal: {nutriInfo.kcal.toFixed(2)}</p> {/* Mostrar kcal con 2 decimales */}
      <p>prot: {nutriInfo.prot.toFixed(2)}</p> {/* Mostrar prot con 2 decimales */}
      <p>hc: {nutriInfo.hc.toFixed(2)}</p>     {/* Mostrar hc con 2 decimales */}
      <p>grasas: {nutriInfo.grasas.toFixed(2)}</p> {/* Mostrar grasas con 2 decimales */}
    </div>
  );
};