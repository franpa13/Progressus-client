import { api } from "../api";

// DELETE PACIENTE
export const useDeletePatent = async (idPatent) => {
  try {
    const response = await api.delete(`/EliminarPaciente/${idPatent}`);
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
