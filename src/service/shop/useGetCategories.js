
import { api } from "../api";

// TRAER CATEGORIAS
export const useGetCategories = async () => {
  try {
    const response = await api.get(`/api/Merch/ObtenerCategorias`);
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
