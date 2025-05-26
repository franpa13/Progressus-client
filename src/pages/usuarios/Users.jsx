import React, { useEffect, useState } from "react";
import { MainLayout } from "../../layout/MainLayout";
import {
  Title,
  Location,
  TableInventary,
  CustomInput,
  SnackbarDefault,
  ButtonSpinner,
} from "../../components";
import { SelectNavegable } from "../../components";
import { useGetAllUsers } from "../../service/auth/use-getAllUsers";
import { CiSearch } from "react-icons/ci";

import { useSendAsist } from "../../service/users/useSendAsist";
import { useSpinnerStore } from "../../store";
export const Users = () => {
  const columnsTable = ["Nombre", "Apellido", "Email", "Rol", "Modificar"];
  // CONFIRMAR ASISTENCIA
  const [confirmAsist, setConfirmAsist] = useState(false);
  const [cancelAsist, setCacnelAsist] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertError, setAlertError] = useState(false);
  // USUARIO ASISTENCIA
  const [userAsistencia, setUserAsistencia] = useState("");
  // ALERTA AL EDITAR
  const [alertEditUser, setAlertEditUser] = useState(false);
  const [errorAlertEdiIUser, setErrorAlertEditUser] = useState(false);
  // ALERTA AL ELIMINAR
  const [alertDeleteUser, setAlertDeleteUser] = useState(false);
  const [errorDeleteUser, seterrorDeleteUser] = useState(false);
  const showSpinner = useSpinnerStore(state => state.showSpinner)
  const hideSpinner = useSpinnerStore(state => state.hideSpinner)

  //  USERS DEL BACK
  const [users, setUsers] = useState([]);
  // ESTADO PARA EL SKELETON
  const [loading, setLoading] = useState(true);
  // BUSCAR ELEMENTO
  const [findElement, setFindElement] = useState("");
  // Lógica del buscador
  const filteredUsers = users.filter(
    (item) =>
      item.nombre && // Verificar que item.nombre no sea null o undefined
      item.nombre.toLowerCase().includes(findElement.toLowerCase())
  );
  useEffect(() => {
    showSpinner()
    const fetchUsers = async () => {
      try {
        const response = await useGetAllUsers();

        setUsers(response.data);
      } catch (e) {
        console.log(e, "error");
      } finally {
        setLoading(false)
        hideSpinner()
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFindElement(e.target.value);
  };
  console.log(userAsistencia, "users");
  // CANCELAR ASISTENCIA
  const cancelAsistencia = () => {
    setCacnelAsist(true); // Mostrar el spinner
    setTimeout(() => {
      setUserAsistencia(""); // Cancelar la asistencia
      setCacnelAsist(false); // Ocultar el spinner
    }, 1000); // 2 segundos
  };
  // ACEPTAR ASISTENCIA
  const sendAsistencia = async () => {
    setConfirmAsist(true);

    try {
      const responseSendAsist = await useSendAsist(
        userAsistencia.identityUserId
      );
      console.log(responseSendAsist, "response send");
      if (responseSendAsist && responseSendAsist.status == 200) {
        setAlertSuccess(true);
        setTimeout(() => {
          setUserAsistencia("");
        }, 500);
      } else {
        setAlertError(true);
      }
    } catch (e) {
      console.log(e, "errorrrrs");
    } finally {
      setConfirmAsist(false);
    }
  };
  return (
    <MainLayout>
      <section className="animate-fade-in-down md:mx-auto bg-white  rounded shadow-xl w-full md:w-11/12 overflow-hidden mb-4">
        <div className="b p-3">
          <Location
            route={`Usuarios`}
            subroute={"Gestionar usuarios"}
          ></Location>

          <Title title={"Usuarios"}></Title>
        </div>
        {/* DIVISION GRAY */}
        <div className="w-full h-2 md:h-4 bg-customGray"></div>
        {/* ////////////////////////////////////////////// */}

        <section className="p-3 mb-4">
          <div className="md:flex md:justify-end">
            <div className="md:w-2/3  md:flex md:justify-end md:items-center md:gap-5">
              <div className="bg-red-500 w-[320px]">
                <CustomInput
                  classNameInput="md:p-1.5"
                  className="border-gray-300 md:p-0"
                  Icon={CiSearch}
                  placeholder="Buscar"
                  value={findElement}
                  onChange={handleChange}
                ></CustomInput>
              </div>
            </div>
          </div>
        </section>
        {/* TABLA DE USUARIOS */}
        <TableInventary
          setAlertDeleteUser={setAlertDeleteUser}
          seterrorDeleteUser={seterrorDeleteUser}
          setAlertEditUser={setAlertEditUser}
          setErrorAlertEditUser={setErrorAlertEditUser}
          setUsers={setUsers}
          users={true}
          arreglo={filteredUsers}
          arregloColumns={columnsTable}
          loading={loading}
          textSinEjercicios={"No se encontraron usuarios.."}
        ></TableInventary>
      </section>

      {/* REGISTRAR ASISTENCIA */}
      {/* <section className="animate-fade-in-down md:mx-auto bg-white  rounded shadow-xl w-full md:w-11/12 overflow-hidden mb-20">
        <div className="b p-3">
          <Location
            route={`Asistencia`}
            subroute={"Marcar asistencia"}
          ></Location>

          <Title title={"Registrar asistencia"}></Title>
        </div>
        <div className="flex flex-col mt-3 gap-5 w-full   justify-center items-center">
          <SelectNavegable
            label={"Elegir usuario"}
            options={users}
            onSelect={setUserAsistencia}
          ></SelectNavegable>
          <div className=" mb-8 flex flex-col justify-center items-center py-4 gap-3 mx-16 rounded">
            <div className="flex justify-center flex-col">
              <Title
                className={"text-customTextBlue w-full text-center "}
                title={
                  userAsistencia && userAsistencia.nombre
                    ? userAsistencia.nombre + " " + userAsistencia.apellido
                    : `Usuario...`
                }
              ></Title>
              <span className="text-center text-gray-600 text-base">
                {userAsistencia && userAsistencia.email
                  ? userAsistencia.email
                  : ""}
              </span>
            </div>
            <img
              className=" w-3/4 md:w-1/2"
              src="https://th.bing.com/th/id/OIP.xHh0kvbL7QYHxwJrvVjIZAHaHa?rs=1&pid=ImgDetMain"
              alt=""
            />
            <div className="flex w-full flex-col md:flex-row items-center md:gap-12 md:justify-beetwen md:mx-8">
              <ButtonSpinner
                label="Confirmar Asistencia"
                onClick={sendAsistencia}
                loading={confirmAsist}
                className="w-3/4 md:w-1/2"
              ></ButtonSpinner>
              <ButtonSpinner
                onClick={cancelAsistencia}
                label="Cancelar"
                className="w-3/4 md:w-1/2 bg-red-700"
                loading={cancelAsist}
              ></ButtonSpinner>
            </div>
          </div>
        </div>
      </section> */}

      {/* ALERT EDITAR CORRECTAMENTE EL USER*/}
      <SnackbarDefault
        open={alertEditUser}
        setOpen={setAlertEditUser}
        message={"User editado correctamente! "}
        severity={"success"}
        position={{ vertical: "bottom", horizontal: "left" }}
      ></SnackbarDefault>
      {/* ALERT ERROR EDITAR EL USER */}
      <SnackbarDefault
        open={errorAlertEdiIUser}
        setOpen={setErrorAlertEditUser}
        message={"Ha ocurrido un error inténtelo nuevamente! "}
        severity={"error"}
        position={{ vertical: "bottom", horizontal: "left" }}
      ></SnackbarDefault>

      {/* ALERT ELIMINAR EL user */}
      <SnackbarDefault
        open={alertDeleteUser}
        setOpen={setAlertDeleteUser}
        message={"User borrado correctamente! "}
        severity={"info"}
        position={{ vertical: "bottom", horizontal: "left" }}
      ></SnackbarDefault>

      {/* ALERT ERRoR ELIMINAR EL user */}
      <SnackbarDefault
        open={errorDeleteUser}
        setOpen={seterrorDeleteUser}
        message={"Ha ocurrido un error inténtelo nuevamente! "}
        severity={"error"}
        position={{ vertical: "bottom", horizontal: "left" }}
      ></SnackbarDefault>


    </MainLayout>
  );
};
