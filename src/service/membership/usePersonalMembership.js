import { api } from "../api"; // Asegúrate de que la ruta sea correcta

export const usePersonalMembership = async (
  mesesDuracion,
  nombre,
  precio,
  descripcion
) => {
  console.log( mesesDuracion,
    nombre,
    precio,
    descripcion,"paramssssss");

  try {
    const response = await api.post(
      `/api/Membresia/CrearMembresia`,
      {
        mesesDuracion: mesesDuracion,
        nombre: nombre,
        precio: precio,
        descripcion: descripcion
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
