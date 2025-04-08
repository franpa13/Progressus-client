import React from "react";
import { Footer, NavBar, TopMenu } from "../components";
import { useSpinnerStore, useStoreAlert, useStoreUserData } from "../store";
import { Spinner } from "../components";
export const MainLayout = ({ children }) => {
  const prueba = useStoreAlert((state) => state.alert);
  const isLoading = useSpinnerStore((state) => state.isLoading);


  return (
    <body className="bg-customGray ">
      <Spinner open={isLoading}></Spinner>
      <TopMenu />
      <NavBar />

      {/* Contenedor del contenido principal con flex-grow para ocupar el espacio restante */}
      <main className="flex-1 ">{children}</main>

      {/* Footer siempre al fondo, sin margen adicional */}
      <Footer />
    </body>
  );
};
