import { api } from "../api";

//ASIGNAR PLAN
export const useAsignPlanNutri = async (socioId, planId) => {
  try {
    const response = await api.post(
      `/asignar-plan`,
          {
            usuarioId: socioId,
            planNutricionalId: planId
          },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.log("Error al asignar plan", error);
  }
};
