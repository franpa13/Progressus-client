import { api } from "../api";

export const useCreatePedido = async (idUser, march) => {

    console.log(idUser, "idUser", march);

    try {
        const response = await api.post(
            `/api/Pago/CrearPedido/${idUser}`,
            march,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return response;
    } catch (error) {
        console.log("Error al realizar pedido", error);
        throw error; // Lanzar el error para manejarlo en el componente que llama a esta función
    }
};