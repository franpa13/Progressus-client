import React, { useEffect, useState } from "react";
import { MainLayout } from "../../layout/MainLayout";
import { LoadingSkeleton } from "../../components";
import { Stack, ModalPhotoProfile } from "../../components";
import { useUserProfile } from "../../store";
import { useStoreUserData } from "../../store";
import { useGetRequestPaymentSocio } from "../../service/membership/useGetRequestPaymentSocio";
import { useSpinnerStore } from "../../store";
import { MdDeleteOutline } from "react-icons/md";
import { useGetMembershipUser } from "../../service/nutrition/useGetMembershipUser";
import { BiEditAlt } from "react-icons/bi";
import { TableAsist } from "../../components/profile/TableAsist";
import { useAsistProfile } from "../../service/profile/useAsistProfile";
export const Profile = () => {
  const dataUser = useStoreUserData((state) => state.userData);
  const [dataMembership, setDataMembership] = useState(null);
  const showSpinner = useSpinnerStore((state) => state.showSpinner);
  const closeSpinner = useSpinnerStore((state) => state.hideSpinner);
  const [allMembership, setAllMembership] = useState(null);
  const setAvatar = useUserProfile((state) => state.setUserImage);
  const [loadingSkeleton, setLoadingSkeleton] = useState(false);
  // const [havePlan, setHavePlan] = useState(null);
  //  IMAGEN DE FOTO DE PERFIL
  const [isHovered, setIsHovered] = useState(false); // Estado para hover
  const fotoProfile = useUserProfile((state) => state.userImage);
  const [openModal, setOpenModal] = useState(false);
  const roleUser = dataUser.roles[0];
  const [userAsist, setUserAsist] = useState([]);
  const arregloColumns = ["Fecha", "Hora", ""];
  useEffect(() => {



    const traerMembresiaActiva = async () => {
      setLoadingSkeleton(true);
      try {
        // ver si el usuario tiene membresía activa
        if (dataUser?.membresiaActiva) {


          const response = await useGetRequestPaymentSocio(
            dataUser.identityUserId
          );
          // const havePlanRes = await useGetMembershipUser(dataUser.identityUserId);
          // if (havePlanRes.status === 200) {
          //   setHavePlan(havePlanRes.data || null);
          // }
          if (response?.data) {
            setDataMembership(response.data);
            setAllMembership(response.data.historialSolicitudDePagos || []);
          }
        }
        const responseAsist = await useAsistProfile(dataUser.identityUserId);
        // const responseAsist = await useAsistProfile(
        //   "06e89924-00b6-4ad7-adb8-c1f1ee8323cc"
        // );
        if (responseAsist && responseAsist.status == 200) {
          setUserAsist(responseAsist.data);
        }
        console.log(responseAsist, "response asistttt");
      } catch (error) {
        console.error("Error al traer membresía activa:", error);
      } finally {
        setLoadingSkeleton(false);
      }
    };

    traerMembresiaActiva();

  }, [dataUser.identityUserId]);

  const lastMembership =
    Array.isArray(allMembership) && allMembership.length > 0
      ? allMembership[allMembership.length - 1]
      : null;

  let fechaDondeSeActivoMembresia;
  let mesesDuracionMembresia;
  if (
    lastMembership &&
    lastMembership.estadoSolicitud.nombre === "Confirmado"
  ) {
    fechaDondeSeActivoMembresia = new Date(lastMembership.fechaCambioEstado);
    mesesDuracionMembresia = dataMembership.membresia.mesesDuracion;
  }

  let fechaFinalizacionMembresia = null;
  if (fechaDondeSeActivoMembresia && mesesDuracionMembresia) {
    fechaFinalizacionMembresia = new Date(fechaDondeSeActivoMembresia);
    fechaFinalizacionMembresia.setMonth(
      fechaFinalizacionMembresia.getMonth() + mesesDuracionMembresia
    );
  }

  const fechaFinal = fechaFinalizacionMembresia
    ? `${fechaFinalizacionMembresia.getDate()}/${fechaFinalizacionMembresia.getMonth() + 1
    }/${fechaFinalizacionMembresia.getFullYear()}`
    : "Fecha no disponible";

  const selectAvatar = () => {
    setOpenModal(true);
  };
  const deleteAvatar = () => {
    showSpinner();
    setTimeout(() => {
      setAvatar("/avatars/defAvatar.jpg");
      closeSpinner();
    }, 2000);
  };
  console.log(lastMembership, "HAVE PLAN en profile");

  return (
    <MainLayout>
      <div className="animate-fade-in-down bg-white md:mx-auto rounded shadow-xl w-full md:w-11/12 overflow-hidden mb-4">
        <div className="h-[190px] bg-gradient-to-r">
          <img
            src="https://wallpapercave.com/wp/wp8077707.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="px-4 py-2 flex flex-col gap-3 pb-6">
          <div
            className={`relative md:h-[150px] h-[90px] shadow-md w-[90px] md:w-[150px] rounded-full border-2 overflow-hidden -mt-14 border-white 
    ${isHovered ? "" : "bg-transparent"} transition duration-300 ease-in-out`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src={fotoProfile}
              className="w-full h-full rounded-full object-center object-cover"
              alt="Avatar"
            />
            {isHovered && (
              <div className="absolute inset-0 cursor-pointer bg-black bg-opacity-75 flex items-center justify-center transition-opacity duration-300 ease-in-out">
                <button
                  onClick={deleteAvatar}
                  className="text-white mx-1 md:mx-2 p-1 hover:bg-gray-500 rounded-full"
                >
                  <MdDeleteOutline className="text-xl md:text-2xl" />
                </button>
                <button
                  onClick={selectAvatar}
                  className="text-white mx-1 md:mx-2 p-1 hover:bg-gray-500 rounded-full"
                >
                  <BiEditAlt className="text-xl md:text-2xl" />
                </button>
              </div>
            )}
          </div>
          <div className="flex w-full gap-5 justify-between mt-3">
            <div>
              <h3 className="text-lg md:text-2xl text-slate-900 relative font-bold leading-6">
                {dataUser.nombre + " " + dataUser.apellido}
              </h3>
              <p className="text-xs md:text-base text-gray-600">
                {dataUser.email}
              </p>
            </div>
            <div className="flex items-center gap-1 md:gap-3 ">
              {roleUser === "SOCIO" && (
                <span className="rounded-sm bg-green-100 px-2 py-1 md:px-3 md:py-2 text-xs md:text-base font-semibold text-green-900">
                  SOCIO
                </span>
              )}
              {roleUser === "ADMIN" && (
                <span className="rounded-sm bg-yellow-100 px-2 py-1 md:px-3 md:py-2 text-xs md:text-base font-semibold text-yellow-800">
                  ADMIN
                </span>
              )}
              {roleUser === "ENTRENADOR" && (
                <span className="rounded-sm bg-blue-200 px-2 py-1 md:px-3 md:py-2 text-xs md:text-base font-semibold text-gray-800">
                  ENTRENADOR
                </span>
              )}
              {roleUser === "NUTRICIONISTA" && (
                <span className="rounded-sm bg-orange-300 px-2 py-1 md:px-3 md:py-2 text-xs md:text-base font-semibold text-gray-800">
                  NUTRICIONISTA
                </span>
              )}
            </div>
          </div>
          {/* HARDCODE */}
          {roleUser !== "ADMIN" &&
            roleUser !== "ENTRENADOR" && roleUser !== "NUTRICIONISTA" &&
            (loadingSkeleton ? (
              <LoadingSkeleton
                count={1}
                height={80}
                width={"100%"}
                className={"mt-20"}
              ></LoadingSkeleton>
            ) : (
              <div className="flex flex-col items-center md:text-lg gap-3 mt-5 ">
                <h4 className="text-md underline text-customTextGreen font-semibold leading-3 mt-6 pb-4 ">
                  Membresías activas
                </h4>
                {allMembership &&
                  Array.isArray(allMembership) &&
                  allMembership.length > 0 &&
                  lastMembership.estadoSolicitud.nombre === "Confirmado" ? (
                  <Stack
                    duracion={`${mesesDuracionMembresia} ${mesesDuracionMembresia === 1 ? "mes" : "meses"}`}
                    titulo={dataMembership.membresia.nombre}
                    fechaFinalizacion={`Finaliza el ${fechaFinal}`}
                  />
                ) : (
                  <Stack titulo="No tienes membresías activas" />
                )}
                {/* : havePlan &&
                  Array.isArray(havePlan.historialSolicitudDePagos) &&
                  havePlan.historialSolicitudDePagos.length > 0 &&
                  havePlan.historialSolicitudDePagos[0].estadoSolicitud.nombre == "Confirmado" ? (
                  <Stack
                    duracion={"1 mes"}
                    titulo={havePlan.membresia.nombre}
                  />
                ) */}
              </div>
            ))}

          {loadingSkeleton ? (
            <LoadingSkeleton
              count={1}
              height={80}
              width={"50%"}
              className={"mt-20"}
            ></LoadingSkeleton>
          ) : (
            roleUser === "SOCIO" && (
              <div className="w-full flex flex-col md:text-lg justify-center items-center">
                <h4 className="underline text-customTextGreen text-md font-semibold leading-3 mt-6 pb-4 ">
                  Turnos a los que asistí
                </h4>
                <TableAsist
                  columns={arregloColumns}
                  data={userAsist}
                ></TableAsist>
              </div>
            )
          )}
        </div>
      </div>
      <ModalPhotoProfile
        open={openModal}
        setOpen={setOpenModal}
      ></ModalPhotoProfile>
    </MainLayout>
  );
};
