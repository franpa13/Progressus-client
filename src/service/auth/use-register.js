import { api } from "../api";
// Registrar usuario
export const registerUser = async (email, password) => {
  try {
    const response = await api.post(
      `/register`,
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error al registrar usuario:", error.response.data.errors);

    return error.response.data.errors;
  }
};
