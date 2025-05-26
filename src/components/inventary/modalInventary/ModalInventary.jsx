import React, { useState } from "react";
import { ModalLayout } from "../../../layout/ModalLayout";
import { CustomInput } from "../../ui/input/CustomInput";
import { ButtonSpinner } from "../../ui/buttons/ButtonSpinner";
import { useCreateItem } from "../../../service/inventary/useCreateItem";
import { Select } from "../../ui/select/Select";
import { useGetInventary } from "../../../service/inventary/useGetInventary";

export const ModalInventary = ({
  modalAddElement,
  setModalAddElement,
  setInventary,
  setAlertAddItem,
  setErrorAlert,
}) => {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    estado: "Correcto",
  });
  // loading del button
  const [loading, setLoading] = useState(false);
  const onSubmitSendItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const responseSendItem = await useCreateItem(
        form.nombre,
        form.descripcion,
        form.estado
      );
      if (responseSendItem && responseSendItem.status == 200) {
        setForm({
          nombre: "",
          descripcion: "",
          estado: "Correcto",
        });
        // llamamos de nuevo al endpoint para poder setearlo de nuevo
        const actualizarInventary = await useGetInventary();
        setInventary(actualizarInventary.data.value);
        // cerramos modal
        setModalAddElement(false);
        //Mostramos alert
        setAlertAddItem(true);
      } else {
        setErrorAlert(true);
      }
    } catch (e) {
      console.log(e, "errores");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };


  return (
    <ModalLayout open={modalAddElement} setOpen={setModalAddElement}>
      <form
        onSubmit={onSubmitSendItem}
        className="flex flex-col justify-center items-center text-center gap-2"
      >
        {/* <div className="w-full p-[2px] absolute top-0 justify-start">
                <IoIosTimer size={28}></IoIosTimer>
              </div> */}
        <label className="font-semibold text-start w-full" htmlFor="">
          Nombre del ítem :{" "}
        </label>

        <CustomInput
          required={true}
          name={"nombre"}
          value={form.nombre}
          placeholder={"Nombre del item"}
          onChange={handleChange}
        ></CustomInput>
        <label className=" font-semibold  text-start w-full" htmlFor="">
          Descripción:{" "}
        </label>
        <CustomInput
          required={true}
          name={"descripcion"}
          value={form.descripcion}
          placeholder={"Descripción"}
          onChange={handleChange}
        ></CustomInput>
        <label className="font-semibold  text-start w-full" htmlFor="">
          Estado del ítem :
        </label>
        <select
          name="estado"
          value={form.estado}
          onChange={handleChange}
          className="border border-gray-300 rounded outline-none p-2 w-full"
          required
        >
          <option value="Correcto">Correcto</option>
          <option value="En Reparación/Mantenimiento">
            En Reparación/Mantenimiento
          </option>
        </select>
        {/* <CustomInput
          required={true}
          type="text"
          placeholder={"Estado"}
          name={"estado"}
          value={form.diasPorSemana}
          onChange={handleChange}
        ></CustomInput> */}
        <ButtonSpinner
          label="Agregar item"
          type="submit"
          loading={loading}
        ></ButtonSpinner>
      </form>
    </ModalLayout>
  );
};
