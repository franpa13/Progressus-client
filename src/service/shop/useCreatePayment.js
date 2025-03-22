import { api } from "../api";

export const useCreatePayment = async (idUser, march) => {

    console.log(idUser, "idUser", march);

    try {
        const response = await api.post(
            `/api/Pago/CrearPago/${idUser}`,
            march,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return response;
    } catch (error) {
        console.log("Error al pagar el mp", error);
        throw error; // Lanzar el error para manejarlo en el componente que llama a esta función
    }
};