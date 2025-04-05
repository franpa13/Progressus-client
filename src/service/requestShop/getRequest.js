import { api } from "../api";

// TRAER PEDIDOS DEL USUAQRIO
export const useGetPedidos = async () => {
  try {
    const response = await api.get(`/api/Pago/ObtenerPedidos`);
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
