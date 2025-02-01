import { api } from "../api"; // Asegúrate de que la ruta sea correcta

export const useFoodById = async (idFood) => {
    console.log("llega el idalimento", idFood);

    try {
        const response = await api.get(
            `/api/AlimentoCalculo/${idFood}`,

            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return response;
    } catch (error) {
        console.log("Error al enviar la reserva:");
    }
};
