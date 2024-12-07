import { api } from "../api";

// TRAER TODOS LOS PROD DEL SHOP
export const useGetAllProducts = async () => {
  try {
    const response = await api.get(
      `/api/Merch/ObtenerTodos`
    );
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
