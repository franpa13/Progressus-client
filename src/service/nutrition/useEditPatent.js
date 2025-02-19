import { api } from "../api"; // Asegúrate de que la ruta sea correcta

export const useEditPatent = async (patent) => {
console.log(patent , "patent");


    try {
        const response = await api.put(
            `/ActualizarPaciente/${patent.id}`, // Usa el ID del plan para la URL
            {
                id: patent.id, // Incluye el ID en el cuerpo si es necesario
                Nombre: patent.nombre, // Nombre del plan
                Objetivo: patent.dias,
                PorcetajeDeGrasa : patent.porcentajeGrasa ,
                Edad : patent.edad ,
                Peso : patent.peso
                 // Arreglo de días con comidas y alimentos
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