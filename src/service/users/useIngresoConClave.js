import axios from "axios";

export const useIngresoConClave = async (userId, clave) => {
  console.log(userId, "userId");
  console.log(clave, "clave");

  try {
    // Realizando la solicitud POST al endpoint que mencionaste
    const response = await axios.post(
      `https://localhost:44309/api/ReservasTurnos/ingresoConClave/${userId}/${clave}`,
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
