import { api } from "../api";

// TRAER METRIC DEL USER
export const useGetMetric = async (idUser) => {
  try {
    const response = await api.get(`/api/Auth/${idUser}`);
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
