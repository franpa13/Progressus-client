
import { api } from "../api";

// TRAER PROD
export const useGetProd = async ({idProd}) => {
  try {
    const response = await api.get(`/api/Merch/ObtenerPorId/${idProd}`);
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
