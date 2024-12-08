import { api } from "../api";
// CREAR PLAN
export const useCreatePlan = async (form) => {
  console.log(form , "form del plan");
  
  try {
    const response = await api.post(
      `/api/PlanDeEntrenamiento/CrearPlanDeEntrenamiento`,
      {
        nombre: form.nombre,
        descripcion: form.descripcion,
        objetivoDelPlanId: form.objetivoDelPlanId,
        diasPorSemana: form.diasPorSemana,
        dueñoId: form.dueñoId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.log("Error al crear el plan:");
    return error;
  }
};
//AGREGAR EJERCICIOS AL PLAN
export const useAddExercises = async (idPlan, planCreado) => {
  console.log(idPlan, planCreado, "formrrrrr");

  // Formatear ejercicios según lo que requiere el endpoint
  const ejerciciosFormateados = planCreado.map((ejercicio, index) => ({
    ejercicioId: ejercicio.id,
    numeroDiaDelPlan: Number(ejercicio.numeroDiaDelPlan),
    ordenDelEjercicio: Number(index + 1),
    repeticiones: Number(ejercicio.repeticiones),
    series: Number(ejercicio.series),
  }));
  console.log(ejerciciosFormateados, "ejerciciosFormateadas");

  try {
    const response = await api.put(
      `api/PlanDeEntrenamiento/ActualizarEjerciciosDelPlan`,
      {
        planDeEntrenamientoId: idPlan,
        ejercicios: ejerciciosFormateados,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.log("Error al enviar el plan", error);
  }
};
