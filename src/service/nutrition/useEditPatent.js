import { api } from "../api"; // Asegúrate de que la ruta sea correcta

export const useEditPatent = async (patent) => {


    try {
        const response = await api.put(
            `/actualizar-plan/${planEditable.id}`, // Usa el ID del plan para la URL
            {
                id: planEditable.id, // Incluye el ID en el cuerpo si es necesario
                nombre: planEditable.nombre, // Nombre del plan
                dias: planEditable.dias, // Arreglo de días con comidas y alimentos
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