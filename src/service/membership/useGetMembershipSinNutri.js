import { api } from "../api"; // Asegúrate de que la ruta sea correcta

export const useGetMembershipSinNutri = async (idUser) => {
  try {
    const response = await api.get(
      `/api/SolicitudDePago/ObtenerSolicitudDePagoDeSocioSinNutricional/${idUser}`,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.log("Error al enviar la reserva:");
  }
};
