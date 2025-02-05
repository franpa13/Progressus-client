import { api } from "../api";

// TRAER METRIC DEL USER
export const useGetPlanById= async (idPlan) => {
    try {
        const response = await api.get(`/obtener-plan/${idPlan}`);
        return response;
    } catch (e) {
        console.log(e, "errores");
    }
};


