import { api } from "../api";
// ENVIAR RUTINA
export const useSendRutin = async (idUser, finalizado) => {
  const idRutina = Math.floor(Math.random() * 90000) + 10000;
  try {
    const response = await api.post(
      `/api/Auth/RegistrarRutinaFinalizada`,
      {
        idRutina: idRutina,
        idUser: idUser,
        haFinalizado: finalizado,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.log("Error al editar contraseña", error);
  }
};
