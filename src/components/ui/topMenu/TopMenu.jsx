import React from "react";
import { IoSearchSharp } from "react-icons/io5";
import { IoMenuSharp } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useStoreUserData, useUserProfile } from "../../../store";
import logo from "/progressus.png";
import { useStoreMenu } from "../../../store";
import { Link } from "react-router-dom";
import { useNotificacionesUsuario } from "../../../hooks/notificaciones/useNotis";
export const TopMenu = () => {
  
  const imageProfile = useUserProfile((state) => state.userImage);
  //ABRIR EL NAVBAR
  const openNavBar = useStoreMenu((state) => state.openNavBar);
  const dataUser = useStoreUserData((state) => state.userData);
  const firstName = dataUser.nombre ? dataUser.nombre.split(" ")[0] : "";
  const { notificaciones, loading, error } = useNotificacionesUsuario(dataUser.identityUserId);


  return (
    <div className="bg-customNavBar md:mb-5 p-2 md:py-2 shadow-xl sticky top-0 flex z-30 justify-between items-center md:items-center font-semibold text-lg text-white">
      <div className="flex justify-center items-center">
        <button className="hover:bg-customTextGreen rounded transition-all md:p-1">
          <IoMenuSharp
            className="w-8 h-7 md:w-7 md:h-7 cursor-pointer"
            onClick={openNavBar}
            size={22}
          ></IoMenuSharp>
        </button>
      </div>
      <div className="flex justify-center md:justify-start md:ml-2 w-full items-start md:items-center gap-2 mb-1 r ">
        <Link to={"/home"}>
          <img src={logo} className="w-[55px] md:w-[65px]" alt="" />
        </Link>
        {/* <h2 className="hidden md:block text-xl md:text-2xl">Progressus</h2> */}
      </div>

      <div className="flex justify-center items-center gap-3 md:gap-8 md:w-1/4 md:justify-end">
        {/* Buscar en desktop */}
        {/* <div className="hidden  md:flex justify-center items-center "> */}
        {/*   <Link */}
        {/*     to={"/search"} */}
        {/*     className="hover:bg-customTextGreen rounded transition-all p-1" */}
        {/*   > */}
        {/*     <IoSearchSharp */}
        {/*       className="w-9 h-9 md:w-7 md:h-7" */}
        {/*       size={22} */}
        {/*     ></IoSearchSharp> */}
        {/*   </Link> */}
        {/* </div> */}

        <Link
          to={"/notifications"}
          className=" hidden  md:block relative cursor-pointer hover:bg-customTextGreen rounded transition-all p-1"
        >
          <span className="absolute text-xs rounded-full px-1 font-bold -top-1 bg-red-700 text-white -right-1">
            {notificaciones?.length > 10 ? "10+" : notificaciones?.length}
          </span>
          <IoMdNotificationsOutline className="w-9 h-9 md:w-7 md:h-7"></IoMdNotificationsOutline>
        </Link>
        <Link to="/account" className="flex items-center gap-2 cursor-pointer ">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-0 overflow-hidden cursor-pointer">
            <img
              className="w-full h-full object-cover"
              src={imageProfile}
              alt="Rounded avatar"
            />
          </div>

          <span className="hidden lg:block text-lg font-semibold ">
            {firstName}
          </span>
        </Link>
      </div>
    </div>
  );
};
