

import { api } from "../api";

export const useEditFood = async (food, element) => {

    console.log(food, "food");



    try {
        const response = await api.put(
            `/api/AlimentoCalculo/${element.id}`, // Usa el ID del plan para la URL
            {
                id: element.id,
                nombre: element.nombre,
                porcion: food.porcion,
                calorias: food.calorias,
                carbohidratos: food.carbohidratos,
                proteinas: food.proteinas,
                grasas: food.grasas
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return response;
    } catch (error) {
        console.log("Error al actualizar el plan", error);
        throw error; // Lanza el error para manejarlo en el componente
    }
};
