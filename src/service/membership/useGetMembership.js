import { api } from "../api";

// TRAER LA DATA DEL USUARIO
export const useGetMemberships = async () => {
  try {
    const response = await api.get(`/api/Membresia/ObtenerTodasParaPagar`);
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
