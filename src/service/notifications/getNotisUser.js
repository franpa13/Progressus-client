import { api } from "../api";

// TRAER NOTIS
export const getNotisUser = async (idUser) => {
    try {
        const response = await api.get(`/api/NotificacionesUsuario/${idUser}`);
        return response;
    } catch (e) {
        console.log(e, "errores");
    }
};

