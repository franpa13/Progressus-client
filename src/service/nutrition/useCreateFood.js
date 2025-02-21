import { api } from "../api";

export const useCreateFood = async (form) => {
    console.log(form, "Datos del plan a enviar");

    try {
        const response = await api.post(
            `/api/AlimentoCalculo`,
            {


                nombre: form.alimento,
                porcion: form.porcion,
                calorias: form.calorias,
                carbohidratos: form.carbohidratos,
                proteinas: form.calorias,
                grasas: form.grasas

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