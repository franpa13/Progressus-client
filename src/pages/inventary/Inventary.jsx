import React, { useEffect, useState } from "react";
import { MainLayout } from "../../layout/MainLayout";
import {
  Title,
  Location,
  CustomInput,
  Button,
  TableInventary,
  ModalInventary,
  SnackbarDefault,
} from "../../components";

import { CiSearch } from "react-icons/ci";
import { useGetInventary } from "../../service/inventary/useGetInventary";
import { IoMdAdd } from "react-icons/io";

const columnsTable = [
  "Identificador",
  "Nombre",
  "Descripción",
  "Estado",
  "Modificar",
];
export const Inventary = () => {
  // ALERTA AL AGREGAR
  const [alertAddItem, setAlertAddItem] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  // ALERTA AL EDITAR
  const [alertEditItem, setAlertEditItem] = useState(false);
  const [errorAlertEdiItem, setErrorAlertEditItem] = useState(false);
  // ALERTA AL ELIMINAR
  const [alertDeleteItem, setAlertDeleteItem] = useState(false);
  const [errorDeleteiItem, seterrorDeleteiItem] = useState(false);
  // MODAL DE AGREGAR ELEMENTO
  const [modalAddElement, setModalAddElement] = useState(false);
  //  INVENTARIO DEL BACK
  const [inventary, setInventary] = useState([]);
  // ESTADO PARA EL SKELETON
  const [loading, setLoading] = useState(true);
  // BUSCAR ELEMENTO
  const [findElement, setFindElement] = useState("");
  // Lógica del buscador
  const filteredInventary = inventary.filter((item) =>
    item.nombre.toLowerCase().includes(findElement.toLowerCase())
  );

  const handleChange = (e) => {
    setFindElement(e.target.value);
  };

  useEffect(() => {
    const fetchInventary = async () => {
      try {
        const response = await useGetInventary();
        setInventary(response.data.value);
      } catch (e) {
        console.log(e, "error");
      } finally {
        setLoading(false);
      }
    };
    fetchInventary();
  }, []);


  return (
    <MainLayout>
      <section className="animate-fade-in-down md:mx-auto bg-white  rounded shadow-xl w-full md:w-11/12 overflow-hidden mb-20">
        <div className="b p-3">
          <Location
            route={`Inventario`}
            subroute={"Consultar inventario"}
          ></Location>

          <Title title={"Inventario"}></Title>
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
              <Button
                onClick={() => setModalAddElement(true)}
                Icon={IoMdAdd}
                className="md:py-[11px]  md:px-5 cursor-pointer  flex flex-row-reverse items-center gap-1 text-sm "
                label={"Agregar ítem"}
                classNameIcon={"text-xl md:text-lg"}
              ></Button>
            </div>
          </div>
        </section>
        <TableInventary
          setAlertDeleteItem={setAlertDeleteItem}
          seterrorDeleteiItem={seterrorDeleteiItem}
          setAlertEditItem={setAlertEditItem}
          setErrorAlertEditItem={setErrorAlertEditItem}
          setInventary={setInventary}
          arreglo={filteredInventary}
          arregloColumns={columnsTable}
          loading={loading}
          textSinEjercicios={"No se encontraron elementos en el inventario."}
        ></TableInventary>
      </section>
      {/* MODAL PARA AGREGAR ITEM */}
      <ModalInventary
        setInventary={setInventary}
        modalAddElement={modalAddElement}
        setModalAddElement={setModalAddElement}
        setAlertAddItem={setAlertAddItem}
        setErrorAlert={setErrorAlert}
      ></ModalInventary>
      {/* ALERT ADD ELEMENT */}
      <SnackbarDefault
        open={alertAddItem}
        setOpen={setAlertAddItem}
        message={"¡El ítem se agregó correctamente! "}
        severity={"success"}
        position={{ vertical: "bottom", horizontal: "left" }}
      ></SnackbarDefault>
      {/* ALERT ERROR AL ADD ELEMENT */}
      <SnackbarDefault
        open={errorAlert}
        setOpen={setErrorAlert}
        message={"¡Ha ocurrido un error! Inténtelo nuevamente."}
        severity={"error"}
        position={{ vertical: "bottom", horizontal: "left" }}
      ></SnackbarDefault>
      {/* ALERT EDITAR CORRECTAMENTE EL ITEM */}
      <SnackbarDefault
        open={alertEditItem}
        setOpen={setAlertEditItem}
        message={"¡Ítem editado correctamente! "}
        severity={"success"}
        position={{ vertical: "bottom", horizontal: "left" }}
      ></SnackbarDefault>
      {/* ALERT ERROR EDITAR EL ITEM */}
      <SnackbarDefault
        open={errorAlertEdiItem}
        setOpen={setErrorAlertEditItem}
        message={"¡Ha ocurrido un error! Inténtelo nuevamente. "}
        severity={"error"}
        position={{ vertical: "bottom", horizontal: "left" }}
      ></SnackbarDefault>

      {/* ALERT ELIMINAR EL ITEM */}
      <SnackbarDefault
        open={alertDeleteItem}
        setOpen={setAlertDeleteItem}
        message={"¡Ítem borrado correctamente!"}
        severity={"info"}
        position={{ vertical: "bottom", horizontal: "left" }}
      ></SnackbarDefault>

      {/* ALERT ERRoR ELIMINAR EL ITEM */}
      <SnackbarDefault
        open={errorDeleteiItem}
        setOpen={seterrorDeleteiItem}
        message={"¡Ha ocurrido un error! Inténtelo nuevamente. "}
        severity={"error"}
        position={{ vertical: "bottom", horizontal: "left" }}
      ></SnackbarDefault>
    </MainLayout>
  );
};
