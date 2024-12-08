import { useEffect, useState } from "react";
import { ModalLayout } from "../../layout/ModalLayout";
import { useStoreUserData } from "../../store";
import { useStorePlanCreado } from "../../store/useStorePlanCreado";
import { CustomInput } from "../ui/input/CustomInput";
import { ButtonSpinner } from "../ui/buttons/ButtonSpinner";
import { Title } from "../ui/title/Title";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../ui/buttons/Button";
import { Select } from "../ui/select/Select";
import { useGetObjetives } from "../../service/plans/useGetObjetives";
import usePlanParaVer from "../../store/planParaVer";
import { Checkbox } from "../ui/input/Checkbox";
import { useCreatePlan } from "../../service/plans/useCreatePlan";
import { useCreatePlantilla } from "../../service/plans/useCreatePlantilla";
export const ModalCreatePlans = ({ open, setOpen, setErrorServer }) => {
  const setPlanParaVer = usePlanParaVer((state) => state.setPlanParaVer);
  const setIsEditable = usePlanParaVer((state) => state.setIsEditable);
  // ID DEL PLAN CREADO
  const [idPlanCreado, setIdPlanCreado] = useState();
  const [checkboxPlantilla, setCheckboxPlantilla] = useState(false);
  const [objetives, setObjetives] = useState([]);
  const dataUser = useStoreUserData((state) => state.userData);

  const navigate = useNavigate();
  // loading del button
  const [loading, setLoading] = useState(false);

  const nameUser = dataUser.nombre;
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    objetivoDelPlanId: 3,
    diasPorSemana: 1,
    dueñoId: dataUser.identityUserId,
  });

  useEffect(() => {
    const traerObjetivos = async () => {
      try {
        const response = await useGetObjetives();
        if (response) {
          setObjetives(response.data);
        }
      } catch (e) {
        console.log(e, "errores");
      }
    };
    traerObjetivos();
  }, []);
  console.log(form, "form");
  const onSubmitSendPlan = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // CREAR PLAN PRIMERAMENTE

      const responseSendPlan = await useCreatePlan(form);
     

      if (responseSendPlan && responseSendPlan.status == 200) {
        setPlanParaVer(responseSendPlan.data);
        setIsEditable(true);
        navigate("/plans/viewPlan");
      } else {
        setErrorServer(true);
        setOpen(false);
      }
      // checkear si es plantilla
      if (checkboxPlantilla) {
        const responseCrearPlantilla = await useCreatePlantilla(
          responseSendPlan.data.id
        );
        console.log(responseCrearPlantilla, "response al crear plantilla");
      }
    } catch (error) {
      console.error("Error al crear el plan o agregar ejercicios:", error);
      // setErrorServer(true);
    } finally {
      setLoading(false);
      // Este bloque se ejecuta siempre, haya o no error
      // Aquí puedes poner tareas como resetear el estado de carga, cerrar el spinner, etc.
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericValue = parseInt(value, 10);

    if (name === "diasPorSemana" && (numericValue < 1 || numericValue > 7)) {
      return; // Ignora valores fuera del rango
    }

    // Si el campo es objetivoDelPlanId, convierte el valor a un número
    const processedValue =
      name === "objetivoDelPlanId" ? parseInt(value, 10) : value;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: processedValue,
    }));
  };

  const handleCheck = (e) => {
    const isChecked = e.target.checked;
    setCheckboxPlantilla(isChecked);
  };

  return (
    <ModalLayout open={open} setOpen={setOpen}>
      <form
        onSubmit={onSubmitSendPlan}
        className="flex flex-col justify-center items-center text-center gap-2"
      >
        {/* <div className="w-full p-[2px] absolute top-0 justify-start">
                <IoIosTimer size={28}></IoIosTimer>
              </div> */}
        <div className="md:mr-3">
          <Title
            className={"md:text-xl text-customTextGreen font-bold"}
            title={"Nuevo plan"}
          ></Title>
        </div>
        <label htmlFor="" className="text-start font-medium w-full">
          Nombre
        </label>
        <CustomInput
          required={true}
          name={"nombre"}
          value={form.nombre}
          placeholder={"Nombre del Plan"}
          onChange={handleChange}
        ></CustomInput>
        <label htmlFor="" className="text-start font-medium w-full">
          Objetivo del plan
        </label>
        <select
          name="objetivoDelPlanId"
          value={form.objetivoDelPlanId}
          onChange={handleChange}
          className="w-full md:w-full border border-gray-200 outline-none text-gray-900 text-sm rounded-sm focus:ring-customButtonGreen focus:border-customButtonGreen block p-2.5 md:p-2.5"
        >
          {/* Opción por defecto */}
          <option value="" disabled>
            Selecciona un objetivo
          </option>
          {/* Iterar sobre los objetivos */}
          {objetives.map((objetivo) => (
            <option key={objetivo.id} value={objetivo.id}>
              {objetivo.nombre}
            </option>
          ))}
        </select>
        <label htmlFor="" className="text-start font-medium w-full">
          Cantidad de días
        </label>
        <CustomInput
          required={true}
          type="number"
          placeholder={"Días por semana"}
          name={"diasPorSemana"}
          value={form.diasPorSemana}
          onChange={handleChange}
        ></CustomInput>

        <label htmlFor="" className="text-start font-medium w-full">
          Descripción
        </label>
        <div
          className={`flex  bg-white items-center border border-gray-300 rounded-sm w-full `}
        >
          <textarea
            required={true}
            name="descripcion"
            className="outline-none  border-gray-500 w-full flex-1 p-1.5 md:p-2 focus:outline-none font-medium"
            value={form.descripcion}
            placeholder="Descripción"
            onChange={handleChange}
          />
        </div>

        <div className="w-full flex justify-start items-center gap-2">
          <Checkbox check={checkboxPlantilla} onChange={handleCheck}></Checkbox>
          <span className="text-sm font-medium">Convertir en plantilla</span>
        </div>

        <div className="flex gap-8">
          <ButtonSpinner
            label="Crear Plan"
            type="submit"
            loading={loading}
          ></ButtonSpinner>
          <Button
            label={"Cancelar"}
            className="bg-red-600 hover:bg-red-800"
            onClick={() => setOpen(false)}
          ></Button>
        </div>
      </form>
    </ModalLayout>
  );
};
