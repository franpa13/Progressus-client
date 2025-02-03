
import { api } from "../api";

// TRAER TODOS LOS USUARIOS
export const useGetAllUsers = async () => {
  try {
    const response = await api.get(
      `/api/Auth/usuarios`, { timeout: 10000 }
    );
    console.log(response
      , "resp en hook"
    );

    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
