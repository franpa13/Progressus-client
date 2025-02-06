import { api } from "../api";

// TRAER PACIENTES
export const useGetPatents = async () => {
  try {
    const response = await api.get(`/ObtenerPaciente`);
    return response;
  } catch (e) {
    console.log(e, "errores al traer pacientes");
  }
};
