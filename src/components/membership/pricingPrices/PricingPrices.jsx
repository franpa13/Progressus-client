import React, { useEffect, useState } from "react";
import gym from "/gym.svg";
import { CgGym } from "react-icons/cg";
import logoMp from "/logomp.png";
import { useGetAllUsers } from "../../../service/auth/use-getAllUsers";
import { useGetMemberships } from "../../../service/membership/useGetMembership";
import { useCreateRequestPayment } from "../../../service/membership/useCreateRequestPayment";
import { LoadingSkeleton } from "../../ui/skeleton/LoadingSkeleton";
import { ModalAceptPayment } from "../modalAceptPaymen/ModalAceptPayment";
import {
  IoIosInformationCircleOutline,
  IoMdCheckmarkCircleOutline,
} from "react-icons/io";
import { ModalAddMembership } from "./ModalAddMembership";
import { LuPencilLine } from "react-icons/lu";
import { useSpinnerStore, useStoreUserData } from "../../../store";
import { useMembershipStore } from "../../../store/useStoreMembership";
import { useGetRequestPaymentSocio } from "../../../service/membership/useGetRequestPaymentSocio";
// MERCADO PAGO
// import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

import { Stack } from "../../ui/stack/Stack";
import { SelectNavegable } from "../selectNavegable/SelectNavegable";

import { ButtonSpinner } from "../../ui/buttons/ButtonSpinner";
import { TablePagos } from "../tablePagos/TablePagos";


import { useRegisterComoMp } from "../../../service/membership/useRegisterComoMp";
import { useGetAllMembershipForSocio } from "../../../service/membership/useGetAllMembershipForSocio";
import { Button } from "../../ui/buttons/Button";
import { useGetActiveUser } from "../../../service/users/useGetActiveUser";

const arregloColumns = ["Membresía", "Fecha", "Precio"];

export const PricingPrices = ({
  setMesaggePlanElegido,
  setAlertConfirmRequest,
  setAlertCancelPayment,
  setAlertError,
  setAlertPlanElegido,
  setOpenErrorMemb,
  setTextAlert,
}) => {
  // VER SI EL USUARIO TIENE MEMBRESIAS ACTIVAS DEL LADO DEL SOCIO
  const membership = useMembershipStore((state) => state.membershipData);
  // initMercadoPago("YOUR_PUBLIC_KEY");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = useStoreUserData((state) => state.userData);

  const [dataPedido, setDataPedido] = useState(null);
  // ARREGLO QUE VA EN LA TABLA
  const [arregloRows, setArregloRows] = useState([]);
  // ROL DE USER
  const roleUser = userData.roles[0];
  //PLANES QUE AGREGAR EL DE LA VENTANILLA
  const [planElegido, setPlanElegido] = useState(null);

  // Buscador de user
  const [allUsers, setAllUsers] = useState([]);
  const [dataUserBuscado, setDataUserBuscado] = useState(null);
  //  MODAL PARA CONFIRMAR PAGO
  const [openModal, setOpenModal] = useState(false);
  // CONFIGURAR FECHA PARA MOSTRAR EN EL STACK PANTALLA DE ADMIN
  const fechaHora = dataPedido?.fechaCreacion;
  // LOADER AL REALIZAR LA SOLICITUD
  const [loadingRequest, setLoadingRequest] = useState(false);
  const fecha = fechaHora ? new Date(fechaHora).toLocaleDateString() : "";
  const hora = fechaHora ? new Date(fechaHora).toLocaleTimeString() : "";
  // LOADING DEL TABLE
  const [loadingTable, setLoadingTable] = useState(false);
  // SPINNER HASTA QUE TRAIGAN TODOS LOS USERA
  const openSppiner = useSpinnerStore((state) => state.showSpinner);
  const closeSpinner = useSpinnerStore((state) => state.hideSpinner);
  // CREAR MEMBRESIA PERSONALIZADA
  const [addMembership, setAddMembership] = useState(false)


  // TRAER MEMBRESIAS

  useEffect(() => {
    const traerTodosLosUsers = async () => {
      openSppiner();
      try {
        const response = await useGetAllUsers();
        // Filtrar usuarios con rol "SOCIO"
        const socios = response.data.filter((user) =>
          user.roles.includes("SOCIO")
        );
        setAllUsers(socios);
      } catch (e) {
        console.log(e, "errores");
      } finally {
        closeSpinner();
      }
    };
    const traerMembresias = async () => {
      try {
        const response = await useGetMemberships();

        setCards(response.data);
        setLoading(false);
      } catch (e) {
        console.log(e, "errores");
        setLoading(false);
      }
    };

    traerMembresias();
    traerTodosLosUsers();
  }, []);

  // useEffect para traer dataPedido cuando cambia dataUserBuscado
  useEffect(() => {
    const traerDataPedido = async () => {
      setLoadingTable(true);

      try {
        const requestPayment = await useGetAllMembershipForSocio(
          dataUserBuscado.identityUserId
        );
        console.log(dataUserBuscado.identityUserId, "id user");

        if (requestPayment) {
          // Filtrar los pagos que tienen al menos un historial con estado "Confirmado"
          const pagosConfirmados = requestPayment.data.value.filter((pago) =>
            pago.historialSolicitudDePagos.some(
              (historial) => historial.estadoSolicitud.nombre === "Confirmado"
            )
          );

          console.log(pagosConfirmados, "pagos confirmados");

          setArregloRows(pagosConfirmados);
        }
      } catch (e) {
        console.log(e, "Error al traer dataPedido");
        setDataPedido(null);
      } finally {
        setLoadingTable(false);
      }
    };

    traerDataPedido();
  }, [dataUserBuscado]);


  // Se ejecuta cada vez que cambia dataUserBuscado

  // ENVIAR SOLICITUD DE PAGO
  const handleBuy = async (membresiaId, tipoDePagoId, idUser) => {
    try {
      setLoadingRequest(true);

      // Verificar membresías activas
      const responseMembershipUser = await useGetRequestPaymentSocio(idUser);
      let lastMembership;

      if (responseMembershipUser?.data) {
        const allMembership =
          responseMembershipUser.data.historialSolicitudDePagos || [];

        if (Array.isArray(allMembership) && allMembership.length > 0) {
          lastMembership = allMembership[allMembership.length - 1];
        }
      }
      const isActiveUser = await useGetActiveUser(idUser)
      if (
        isActiveUser?.data.isActive
      ) {
        setTextAlert(dataUserBuscado.nombre);
        setOpenErrorMemb(true);
      } else {
        // Crear nueva solicitud
        const response = await useCreateRequestPayment(
          membresiaId,
          tipoDePagoId,
          idUser
        );

        if (response && response.status === 200) {
          // Actualizar datos de membresía después de una solicitud exitosa
          const updatedMembershipResponse = await useGetRequestPaymentSocio(
            idUser
          );
          if (updatedMembershipResponse?.data) {
            const updatedAllMembership =
              updatedMembershipResponse.data.historialSolicitudDePagos || [];
            lastMembership =
              updatedAllMembership[updatedAllMembership.length - 1];
          }

          setOpenModal(true);
        } else {
          setAlertError(true);
        }
      }
    } catch (error) {
      console.error("Error al enviar la solicitud de pago", error);
    } finally {
      setLoadingRequest(false);
    }
  };

  // CANCELAR SOLICITUD DE PAGO DEL LADO DE VENTANILLA
  const handleCancelRequest = async () => {
    setAlertCancelPayment(true);
    setPlanElegido(null);
    setDataUserBuscado(null);

    // try {

    //   const requestPayment = await useGetRequestPaymentSocio(
    //     dataUserBuscado.identityUserId
    //   );

    //   const cancelPayment = await useCancelRequestPayment(
    //     requestPayment.data.value.value.id
    //   );

    //   if (cancelPayment.status === 200) {
    //     console.log("enteraaaa");
    //     setAlertCancelPayment(true);
    //     setPlanElegido(null);
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
  };
  const elegirPlan = (card) => {
    setPlanElegido(card);
    setAlertPlanElegido(true);
    setMesaggePlanElegido(card.nombre);
  };

  const hanleCreateSolicitud = async (card) => {
    if (userData.membresiaActiva) {
      

      setOpenErrorMemb(true);
    } else {
      openSppiner();
      try {
        // CREAR SOLICITUD
        const response = await useCreateRequestPayment(
          card.id,
          4,
          userData.identityUserId
        );
        let idSolicitudMercadoPago;
        if (response?.status == 200) {
          idSolicitudMercadoPago = response.data.id;
        }

        // REGISTRAR SOLICITUD COMO MERCADO PAGO
        const registerComoMercadoPago = await useRegisterComoMp(
          idSolicitudMercadoPago
        );

        // REDIRECCIÓN AL INIT POINT
        const initPoint = registerComoMercadoPago?.data?.value?.initPoint;
        if (initPoint) {
          window.location.href = initPoint; // Redirige al usuario
        } else {
          console.error("InitPoint no encontrado en la respuesta.");
        }
      } catch (e) {
        console.error(e, "error");
      } finally {
        closeSpinner();
      }
    }
  };
  

  return (
    <div
      className={`flex flex-col flex-wrap justify-center items-start md:items-start md:justify-around ${dataUserBuscado !== null ? "gap-0" : "gap-4"
        } md:gap-5 md:flex-row w-full`}
    >
      {loading ? (
        <LoadingSkeleton
          variant="rectangular"
          className={"w-full"}
          count={4}
          width={400}
          height={300}
        />
      ) : (
        cards.map((card) => {
          // Si el id de la tarjeta es 15, no la renderizamos
          if (card.id === 15) {
            return null;
          }

          return (
            <div
              key={card.id}
              className="md:m-5 p-0 md:p-0 w-full my-5 md:w-1/3 md:my-4 transition duration-300 transform hover:scale-105"
            >
              <div className="relative group">
                <div className="absolute -inset-0 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg blur opacity-20 group-hover:opacity-80 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex flex-col items-top justify-start space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      {card.nombre}
                    </span>
                    {card.id == 10 && (
                      <span className="text-xs font-semibold bg-customGreenLigth p-1 px-2">
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="text-4xl font-bold text-gray-900">
                    ${card.precio}
                    <span className="text-lg font-normal text-gray-600"></span>
                  </div>
                  <div className="flex w-full items-start justify-start gap-3">
                    <IoMdCheckmarkCircleOutline className="text-3xl font-semibold text-customTextBlue"></IoMdCheckmarkCircleOutline>
                    <span
                      className="w-5/6 font-semibold text-gray-700"
                      style={{ lineHeight: "1.2" }}
                    >
                      {card.descripcion}
                    </span>
                  </div>

                  {roleUser === "ADMIN" || roleUser === "ENTRENADOR" ? (
                    <button
                      onClick={() => elegirPlan(card)}
                      className="w-full py-3 font-bold text-white bg-customTextGreen rounded-lg"
                    >
                      Agregar Plan
                    </button>
                  ) : (
                    // MERCADO PAGO
                    <>
                      <button
                        onClick={() => hanleCreateSolicitud(card)}
                        style={{
                          backgroundColor: "#009EE3",
                          color: "white",
                          padding: "8px 15px",
                          borderRadius: "5px",
                          fontWeight: "600",
                          fontSize: "16px",
                          border: "none",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "10px",
                          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                          transition: "background-color 0.3s ease",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.backgroundColor = "#007BBE")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.backgroundColor = "#009EE3")
                        }
                      >
                        <img
                          src={logoMp}
                          alt="Mercado Pago"
                          className="w-7 md:w-10"
                        />
                        Pagar con Mercado Pago
                      </button>
                    </>
                  )}
                  {card.id == 10 && (
                    <div className="absolute -top-16 right-0 -mt-4 -mr-6 w-16 h-16 float-animation">
                      <CgGym className="w-full h-full object-cover rounded-full" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}
      {roleUser === "ADMIN" && (

        <div className="flex justify-end w-full px-6">

          <Button onClick={() => setAddMembership(true)} Icon={LuPencilLine} className="flex items-center flex-row-reverse gap-3 bg-customTextBlue" label={"Crear Membresia Personalizada"}></Button>
        </div>
      )}
      {roleUser === "ADMIN" &&
        (planElegido ? (
          <div className="flex flex-col md:mx-5 px-2 md:px-0 items-center justify-center w-full">
            <label
              htmlFor=""
              className="text-xl mb-3  text-customTextGreen font-semibold"
            >
              Membresía seleccionada
            </label>
            <Stack
              className={"w-full   md:w-full md:m-5"}
              titulo={planElegido.nombre}
              duracion={`${planElegido.mesesDuracion} meses `}
              fechaFinalizacion={`$ ${planElegido.precio}`}
              classNameText={"md:text-3xl text-customGreenNavBar"}
            ></Stack>
          </div>
        ) : (
          <div className="flex flex-col md:mx-5 px-2 md:px-0 items-center justify-center w-full">

            <label
              htmlFor=""
              className="text-xl mb-3 text-customTextGreen  font-semibold"
            >
              Membresía seleccionada
            </label>
            <Stack
              className={"w-full   md:w-full md:m-5"}
              titulo={"Ningun plan elegido"}
            ></Stack>
          </div>
        ))}

      {roleUser === "ADMIN" && (
        <div className=" w-full h-2 md:h-4 bg-customGray "></div>
      )}
      {/*BUTTON PARA REGISTRAR PAGO DEL LADO DEL QUE ATIENDE EL GYM */}
      {/* HARDCODE  */}
      {roleUser === "ADMIN" && (
        <div className="w-full justify-center md:px-5">
          <div className="w-full flex justify-center mb-7">
            <label
              htmlFor=""
              className="text-xl text-end  text-customTextGreen font-semibold"
            >
              Dar de alta
            </label>
          </div>
          <section className="flex flex-col gap-6 items-center justify-center">
            <div className="w-full flex-col md:flex-row flex justify-between items-center mt-0  gap-4  ">
              <div className="flex flex-col mb-1 md:flex-row md:items-center gap-4">
                <label htmlFor="" className="md:text-xl font-semibold">
                  Nombre del cliente :{" "}
                </label>
                <div className="flex w-[300px] item gap-2">
                  <SelectNavegable
                    label={"Seleccione un cliente"}
                    options={allUsers}
                    onSelect={setDataUserBuscado}
                  ></SelectNavegable>
                </div>
              </div>
              {planElegido && dataUserBuscado && (
                <div className="flex gap-14 md:gap-8 ">
                  <ButtonSpinner
                    loading={loadingRequest}
                    onClick={() =>
                      handleBuy(
                        planElegido.id,
                        1,
                        dataUserBuscado.identityUserId
                      )
                    }
                    label={"Aceptar pago"}
                  ></ButtonSpinner>
                  <ButtonSpinner
                    onClick={handleCancelRequest}
                    className="bg-gray-600"
                    label={"Cancelar "}
                  ></ButtonSpinner>
                </div>
              )}
            </div>
          </section>
        </div>
      )}
      {roleUser === "ADMIN" && (
        <div className=" w-full h-2 md:h-4 bg-customGray "></div>
      )}
      {roleUser === "ADMIN" && (
        <div className="flex px-5 w-full justify-start md:items-start items-center flex-col ">
          {dataUserBuscado && roleUser === "ADMIN" ? (
            <>
              <section className="flex items-center md:flex-row mt-4 md:mt-0 md:gap-2 justify-center flex-col">
                <span className="md:text-xl font-semibold">{`Últimos pagos de `}</span>
                <span className="md:text-xl font-bold text-customTextGreen ">{` ${dataUserBuscado &&
                  dataUserBuscado.nombre + " " + dataUserBuscado.apellido
                  }`}</span>
              </section>
              <span className="md:text-base font-light">
                {dataUserBuscado.email}
              </span>
              <div className="w-full my-6 md:my-16 ">
                <TablePagos
                  loading={loadingTable}
                  arregloColumns={arregloColumns}
                  arreglo={arregloRows}
                  textSinEjercicios={
                    "El usuario seleccionado no posee un historial de membresías "
                  }
                ></TablePagos>
              </div>
            </>
          ) : (
            <div className="flex justify-center my-11 items-center mb-16 md:mb-20 w-full gap-1">
              <span className="md:text-xl text-gray-500 font-semibold">
                Ningun cliente seleccionado
              </span>
              <IoIosInformationCircleOutline
                fontWeight={700}
                className="md:text-2xl  text-customTextBlue  font-bold"
              ></IoIosInformationCircleOutline>
            </div>
          )}
          <ModalAceptPayment
            setAlertError={setAlertError}
            setOpen={setOpenModal}
            open={openModal}
            dataUserBuscado={dataUserBuscado}
            setAlertConfirmRequest={setAlertConfirmRequest}
          ></ModalAceptPayment>
        </div>
      )}
      <ModalAddMembership setPlanElegido={setPlanElegido} open={addMembership} setOpen={setAddMembership} ></ModalAddMembership>
    </div>
  );
};