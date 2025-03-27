import { api } from "../api"; // Asegúrate de que la ruta sea correcta

export const SendNotification = async (
  plantillaId,
  userId,
 
) => {
  console.log(plantillaId,
    userId, "paramssssss");

  try {
    const response = await api.post(
      `/api/NotificacionesUsuario`,
      {
        plantillaNotificacionId: plantillaId,
        usuarioId: userId,
        estadoNotificacionId: 1,

      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  console.log(response , "response en la api");
  
    return response;
  } catch (error) {
    console.log("Error al enviar la reserva:");
  }
};
