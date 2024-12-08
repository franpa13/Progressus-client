import { api } from "../api"; // Asegúrate de que la ruta sea correcta

export const useCreateMetrics = async (form, idUser) => {
  console.log(form, "form");

  try {
    const response = await api.post(
      `/api/Auth/RegistrarMedicionUsuario`,
      {
        id: 0,
        idUser: idUser,
        altura: form.altura,
        peso: form.peso,
        porcentajeDeGrasa: form.porcentaje,
        fecha: form.fecha,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.error(
      "Error al enviar la reserva:",
      error.response?.data?.errors || error.message
    );
    return error.response?.data?.errors || error.message;
  }
};
