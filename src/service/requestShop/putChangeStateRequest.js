


import { api } from "../api";

export const putChangeStateRequest = async (idRequest, state) => {





    try {
        const response = await api.put(
            `/api/Pago/ActualizarEstadoPedido/${idRequest}`,

            state,

            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return response;
    } catch (error) {
        console.log("Error al cambiar el estado", error);
        throw error; 
    }
};
