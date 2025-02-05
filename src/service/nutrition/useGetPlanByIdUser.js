import { api } from "../api";

// TRAER METRIC DEL USER
export const useGetPlanByIdUser= async (idUser) => {
    try {
        const response = await api.get(`/asignaciones-vigentes/${idUser}`);
        return response;
    } catch (e) {
        console.log(e, "errores");
    }
};


