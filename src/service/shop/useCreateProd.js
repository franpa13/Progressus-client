import { api } from "../api"; // Asegúrate de que la ruta sea correcta

export const useCreateProd = async (form) => {
    console.log(form , "form");
    
  try {
    const response = await api.post(
      `/api/Merch/Crear`,
      {
        id: 0,
        nombre: form.nombre,
        descripcion: form.descripcion,
        categoria: form.categoria,
        marca: form.marca,
        stock: form.stock,
        talle: form.talle,
        precio: form.precio,
        popular: false,
        imagenUrl: form.imagenUrl,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.log("Error al crear el item", error);
  }
};
