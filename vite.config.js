import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy para el backend en C# .NET
      "/api": {
        target:
          "https://localhost:7140/" ||
          "https://progressus-ceesd0e0c5d9bfhk.brazilsouth-01.azurewebsites.net", // URL de tu backend
        changeOrigin: true,
        secure: false, // Esto ignora los certificados SSL en localhost
        rewrite: (path) => path.replace(/^\/api/, ""), // Elimina el prefijo /api en la solicitud
      },
    },
  },
});
