import axios from "axios";
import { api } from "../api"; // Asegúrate de que la ruta sea correcta

export const useSendAsist = async (userId) => {
  console.log(userId, "user id");

  try {
    const response = await axios.post(
      `https://progressuscenter.azurewebsites.net/api/ReservasTurnos/registrarAsistencia/${userId}`,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.error(
      "Error al enviar la asistencia:",
      error.response?.data?.errors || error.message
    );
    return error.response?.data?.errors || error.message;
  }
};
