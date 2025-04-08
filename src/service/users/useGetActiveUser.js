
import { api } from "../api";

// TRAER LA DATA DEL USUARIO
export const useGetActiveUser= async (idUser) => {
  try {
    const response = await api.get(`/api/SolicitudDePago/status-by-user/${idUser}`);
    console.log(response ,"response de status");
    
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
