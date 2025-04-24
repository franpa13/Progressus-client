import axios from "axios";
import { api } from "../api";

export const useIngresoConClave = async (userId, clave) => {
  try {
    // Realizando la solicitud POST al endpoint que mencionaste
    const response = await api.post(
      `/api/ReservasTurnos/IngresoConClave/${userId}/${clave}`,
      {
        headers: {
          "Content-Type": "application/json", // Asegúrate de que sea el tipo de contenido correcto
        },
      }
    );

    return response; // Devuelve la respuesta para manejarla donde se llame
  } catch (error) {
    console.error(
      "Error al ingresar con clave:",
      error.response?.data || error.message
    );
    return error.response?.data || error.message; // Devuelve el error si ocurre
  }
};
