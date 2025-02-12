import { api } from "../api";

// DELETE PACIENTE
export const useDeletePlan = async (idPlan) => {
  try {
    const response = await api.delete(`/eliminar-plan/${idPlan}`);
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
