import { api } from "../api";

// TRAER ultimo id de membresias
export const useGetUltimateId = async () => {
  try {
    const response = await api.get(`/api/Membresia/ObtenerUltimoIdMayorDenominacion`);
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
