import { api } from "../api";

// TRAER METRIC DEL USER
export const useGetFood = async () => {
  try {
    const response = await api.get(`/api/AlimentoCalculo`);
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
