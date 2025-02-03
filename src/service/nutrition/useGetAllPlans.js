import { api } from "../api";

// TRAER METRIC DEL USER
export const useGetAllPlans = async () => {
  try {
    const response = await api.get(`/obtener-planes`);
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
