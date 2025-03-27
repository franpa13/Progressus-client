
import { api } from "../api";

// TRAER PLANTILLAS
export const getPlantIllas = async () => {
    try {
        const response = await api.get(`/api/PlantillasNotificaciones`);
        return response;
    } catch (e) {
        console.log(e, "errores");
    }
};

