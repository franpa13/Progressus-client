import { api } from "../api";

// TRAER NRO DE ASISTENCIA POR MES
export const useGetMemberConfirm = async () => {
  try {
    const response = await api.get(
      `/api/SolicitudDePago/solicitudes-confirmadas-por-mes`
    );
    console.log(response , "response de solicitudes confirmadas por mes");
    
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
