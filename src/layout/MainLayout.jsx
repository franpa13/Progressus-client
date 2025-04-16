import React from "react";
import { Footer, NavBar, TopMenu } from "../components";
import { useSpinnerStore, useStoreUserData } from "../store";
import { Spinner } from "../components";
import { Chatbot } from "../components/chatbot/Chatbot";
import { useLocation } from "react-router-dom";

export const MainLayout = ({ children }) => {
  const isLoading = useSpinnerStore((state) => state.isLoading);
  const location = useLocation();
  const dataUser = useStoreUserData((state) => state.userData);
  // Define las rutas donde se debe mostrar el Chatbot
  const routesWithChatbot = ["/plansnutrition", "/nutritionalsocio", "/exercices", "/plans"];

  // Verifica si la ruta actual comienza con alguna de las rutas permitidas
  const shouldShowChatbot = routesWithChatbot.some(path =>
    location.pathname.startsWith(path)
  );

  const isSocio = dataUser?.roles[0] == "SOCIO"
  
  return (
    <body className="bg-customGray">
      <Spinner open={isLoading} />
      <TopMenu />
      <NavBar />
      {shouldShowChatbot && isSocio && <Chatbot />}
      <main className="flex-1">{children}</main>
      <Footer />
    </body>
  );
};
