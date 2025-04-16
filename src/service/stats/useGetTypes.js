
import { api } from "../api";

// TRAER NRO DE ASISTENCIA POR DIA
export const useGetTypes = async () => {
  try {
    const response = await api.get(
      `/api/SolicitudDePago/membresias-por-tipo`
    );
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
