import { api } from "../api"; // Asegúrate de que la ruta sea correcta

export const useEditPatent = async (dataFix, patent) => {


const porcentajeDeGrasa = parseFloat(patent.porcentajeDeGrasa);
console.log(porcentajeDeGrasa , "porcentajeDegrasa");

    try {
        const response = await api.put(
            `/ActualizarPaciente/${dataFix.id}`, // Usa el ID del plan para la URL
            {
                id: dataFix.id, // Incluye el ID en el cuerpo si es necesario
                nombre: dataFix.nombre, // Nombre del plan
                objetivo: patent.objetivo, 

                porcentajeDeGrasa : porcentajeDeGrasa  ,
                edad : patent.edad ,
                peso : patent.peso
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