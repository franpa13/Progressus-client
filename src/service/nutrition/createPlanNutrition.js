import { api } from "../api";

export const createPlanNutrition = async (nombrePlan, planData) => {
  console.log(planData, "Datos del plan a enviar");

  try {
    const response = await api.post(
      `/crear-plan`,
      {

        nombre: nombrePlan, // Nombre del plan
        dias: planData, // Arreglo de días con comidas y alimentos
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.log("Error al crear el plan de nutrición", error);
    throw error; // Lanzar el error para manejarlo en el componente que llama a esta función
  }
};