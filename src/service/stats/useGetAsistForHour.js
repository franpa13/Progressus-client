import { api } from "../api";

// TRAER NRO DE ASISTENCIA POR MES
export const useGetAsistForHour = async () => {
  try {
    const response = await api.get(
      `/api/ReservasTurnos/AsistenciasPorFranjaHoraria`
    );
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
