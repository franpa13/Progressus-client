import React, { useState } from "react";
import { ModalLayout } from "../../layout/ModalLayout";
import { CustomInput } from "../ui/input/CustomInput";
import { ButtonSpinner } from "../ui/buttons/ButtonSpinner";
import { useStoreUserData } from "../../store";
import { useCreateMetrics } from "../../service/metrics/useCreateMetrics";
import { useGetMetric } from "../../service/metrics/useGetMetric";

export const ModalAddMetric = ({ open, setOpen, setAlert, setMetric }) => {
  // Estado inicial del producto
  const userData = useStoreUserData((state) => state.userData);
  const [load, setLoad] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    altura: 0, // Inicializa como float
    peso: 0,
    porcentajeDeGrasa: 0,
    fecha: "2024-12-08T22:11:40.137Z",
  });

  const initialFormState = {
    id: 0,
    altura: 0.0, // Inicializa como float
    peso: 0,
    porcentajeDeGrasa: 0,
    fecha: "",
  };

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? e.target.checked
          : type === "number"
          ? parseFloat(value) // Convierte el valor a float
          : value,
    });
  };

  console.log(formData, "formdata");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoad(true);
      const resp = await useCreateMetrics(formData, userData.identityUserId);
      if (resp && resp.status == 200) {
        const resp = await useGetMetric(userData.identityUserId);
        setMetric(resp?.data || []);
        setAlert(true);
        setOpen(false);
        setAlert(true);
      }
      console.log(resp, "response");
    } catch (e) {
      console.log(e, "error");
    } finally {
      setLoad(false);
    }
  };

  return (
    <ModalLayout open={open} setOpen={setOpen}>
      <form
        onSubmit={handleSubmit}
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-3"
      >
        <div>
          <label className="mb-2 mt-1" htmlFor="altura">
            Altura
          </label>
          <CustomInput
            name="altura"
            value={formData.altura}
            onChange={handleChange}
            placeholder="Altura"
            type="number"
            step="0.01" // Permite decimales
            required
          />
        </div>

        <div>
          <label className="mb-2" htmlFor="peso">
            Peso
          </label>
          <CustomInput
            name="peso"
            value={formData.peso}
            onChange={handleChange}
            type="number"
            placeholder="Peso"
            required
          />
        </div>

        <div>
          <label className="mb-2" htmlFor="porcentajeDeGrasa">
            Porcentaje de grasa
          </label>
          <CustomInput
            name="porcentajeDeGrasa"
            value={formData.porcentajeDeGrasa}
            onChange={handleChange}
            type="number"
            placeholder="Porcentaje de grasa"
            required
          />
        </div>

        <div>
          <label className="mb-2" htmlFor="fecha">
            Fecha
          </label>
          <CustomInput
            name="fecha"
            type="date"
            value={formData.fecha}
            onChange={handleChange}
            placeholder="Fecha"
            required
          />
        </div>

        <div className="flex justify-start p-0">
          <ButtonSpinner loading={load} type="submit" label="Añadir semana" />
        </div>
      </form>
    </ModalLayout>
  );
};
