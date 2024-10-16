import React, { useEffect } from "react";
import { MainLayout } from "../../layout/MainLayout";
import { useStoreUser } from "../../store";
import { useStoreMenu } from "../../store";
import logo from "/progressus.png";
import { Button, Title } from "../../components";
import { Link } from "react-router-dom";
export const HomePage = () => {
  // const time = useStoreTime((state) => state.time);
  // const date = useStoreTime((state) => state.time);
  const token = useStoreUser((state) => state.token);
  const cerrarNavbar = useStoreMenu((state) => state.closeNavBar);
  console.log(token, "usuario del store");
  const nameUser = "Mariano";
  const dateTurn = "18 de octubre a las 15 hs";

  return (
    <MainLayout>
      <div className="animate-fade-in-down w-full min-h-screen flex flex-col justify-start gap-1">
        <div className="bg-white mx-3 mt-4 md:mt-0 md:m-0 md:mx-8 p-2 rounded shadow-sm">
          <Title
            title={`Hola, ${nameUser} !`}
            className={"p-4 text-center w-full justify-center md:justify-start"}
          ></Title>
        </div>
        <div className="bg-white mx-3 md:m-0 md:mx-8 p-2 rounded shadow-sm flex justify-center items-center ">
          <img src={logo} width={500} alt="Progressus" />
        </div>

        <div className="bg-white mx-3 md:m-0 md:mx-8 p-2 rounded shadow-sm gap-1  flex flex-col md:flex-row justify-center items-center ">
          <Title title={"Tu proximo turno es el dia "}> </Title>
          <Title
            className="text-customNavBar font-bold"
            title={dateTurn}
          ></Title>
        </div>

        <div className="bg-white mx-3 md:m-0 md:mx-8 p-2 rounded shadow-sm gap-8 flex justify-center items-center ">
          <Title title={"No tienes turnos reservados"} className={"text-base"}>
            {" "}
          </Title>
          <Link to={"/turns"}>
            <Button label={"Reservar"} className="py-1 px-2 text-base"></Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};
