import React, { useState } from "react";
import { MainLayout } from "../../layout/MainLayout";
import { Location, Title } from "../../components";
import { GrPlan } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import pesa from "/pesa.png";
import barra from "/barra-de-peso.png";
import { CgGym } from "react-icons/cg";
export const HomePlans = () => {
  const cards = [
    {
      title: "Crear Planes de entrenamiento",
      desc: "Podras ver y crear planes para los clientes",
      icon: { pesa },
    },
    {
      title: "Crear Planes de entrenamiento",
      desc: "Podras ver y crear planes para los clientes",
      icon: { pesa },
    },
  ];
  const [title, setTitle] = useState("Planes");
  return (
    <MainLayout>
      <section className="animate-fade-in-down md:mx-auto bg-white rounded shadow-xl w-full md:w-11/12  overflow-hidden mb-20 flex flex-col ">
        <div className="b p-3 ">
          <Location route={"Planes"} barra={false}></Location>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <Title title={title}></Title>
          </div>
        </div>
        {/* DIVISION GRAY */}
        <div className="w-full h-2 md:h-4 bg-customGray "></div>
        <div className="p-3 flex w-full justify-center md:gap-24 flex-wrap md:my-6">
          {" "}
          <Link
            to={"/plans/createPlans/"}
            className="max-w-sm p-5 cursor-pointer md:p-5  w-full md:my-4 transition duration-300 transform hover:scale-105"
          >
            <div className="relative group ">
              <div className="absolute -inset-0 bg-gradient-to-r  from-green-600 to-blue-600 rounded-lg blur opacity-20 group-hover:opacity-80 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative px-3 md:px-6  py-3 md:py-6 shadow-xl bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex flex-col items-center justify-start ">
                <div className=" font-bold text-gray-900 flex justify-center">
                  <img
                    src={pesa}
                    className="w-1/3 md:w-2/3 font-normal"
                    alt=""
                  />
                </div>

                <span className="text-lg md:text-2xl text-center font-bold text-customTextGreen ">
                  Planes de entrenamiento
                </span>
                <span className="text-base p-1 md:p-0 md:text-lg text-center font-light mt-2 ">
                  Aquí podrás gestionar planes de entrenamiento y asignarlos a los clientes.
                </span>
              </div>
            </div>
          </Link>
          <Link
            to={"/plans/createallExercise"}
            className="max-w-sm p-5 cursor-pointer md:p-5 w-full md:my-4 transition duration-300 transform hover:scale-105"
          >
            <div className="relative group ">
              <div className="absolute -inset-0 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg blur opacity-20 group-hover:opacity-80 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative px-3 md:px-6  py-3 md:py-6 shadow-xl bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex flex-col items-center justify-start ">
                <div className=" font-bold text-gray-900 flex justify-center">
                  <img src={pesa} className="w-1/3 md:w-2/3" alt="" />
                </div>

                <span className="text-lg md:text-2xl text-center font-bold text-customTextGreen">
                  Ejercicios
                </span>
                <span className="text-base p-1 md:p-0 md:text-lg text-center font-light text-gray-900 mt-2">
                  Aqui podras gestionar los ejercicios , grupos musculares y
                  músculos a trabajar
                </span>
                {/* <button className="w-full py-3 mt-3 font-bold text-white bg-customTextGreen rounded-lg">
                  Elegir plan
                </button> */}

                {/* <div className="absolute -top-16 right-0 -mt-4 -mr-6 w-16 h-16 float-animation">
                  <CgGym className="w-full h-full object-cover rounded-full " />
                </div> */}
              </div>
            </div>
          </Link>
        </div>
      </section>
    </MainLayout>
  );
};
