import { api } from "../api";

// TRAER SI TIENE O NO PLAN NUTRICIONAL ACTIVO
export const useGetMembershipUser = async (idsocio) => {
    try {
        const response = await api.get(`/api/SolicitudDePago/ObtenerSolicitudDePagoDeSocioSinNutricional/${idsocio}`);
        return response;
    } catch (e) {
        console.log(e, "errores");
    }
};


