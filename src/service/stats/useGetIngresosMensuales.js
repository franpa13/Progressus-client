import { api } from "../api";

// TRAER INGRESO MENSUALES
export const useGetIngresosMensuales = async () => {
  try {
    const response = await api.get(`/api/SolicitudDePago/balance-ingresos`);
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
