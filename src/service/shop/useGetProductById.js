import { api } from "../api";

// TRAER EL PROD POR EL ID
export const useGetProductById = async (idProd) => {
  try {
    const response = await api.get(`/api/Merch/ObtenerPorId/${idProd}`);
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
