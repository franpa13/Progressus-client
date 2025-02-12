import { CiSearch } from "react-icons/ci"
import { CustomInput, Location, Title, NutritionTable, Button, ModalAddPlan, SnackbarDefault } from "../../components"
import { useGetAllPlans } from "../../service/nutrition/useGetAllPlans";
import { MainLayout } from "../../layout/MainLayout"
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
const arregloCol = ["Nombre del plan", "Acciones"]
const arreglo = [
  { id: 1, nombre: "Plan de pérdida de peso", acciones: "Editar | Eliminar" },
  { id: 2, nombre: "Plan de ganancia muscular", acciones: "Editar | Eliminar" },
  { id: 3, nombre: "Plan de mantenimiento", acciones: "Editar | Eliminar" },
];

// const arreglo = [
//   { id: 1, nombre: "Plan de pérdida de peso", objetivo: "Reducir el peso corporal en un 10% en 3 meses", acciones: "Editar | Eliminar" },
//   { id: 2, nombre: "Plan de ganancia muscular", objetivo: "Aumentar la masa muscular en un 5% en 6 meses", acciones: "Editar | Eliminar" },
//   { id: 3, nombre: "Plan de mantenimiento", objetivo: "Mantener el peso actual y mejorar la composición corporal", acciones: "Editar | Eliminar" },
// ];
export const PlansNutrition = () => {
  const [plans, setPlans] = useState([]);
  const [findElement, setFindElement] = useState("");
  const [loading, setLoading] = useState(false);
  const [addPlan, setAddPlan] = useState(false);
  const [alertAsignedPlan, setAlertAsignedPlan] = useState(false)
  const handleChange = (e) => {
    setFindElement(e.target.value);
  };

  useEffect(() => {
    setLoading(true);
    const getPlans = async () => {
      try {
        const response = await useGetAllPlans();
        setPlans(response.data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    getPlans();
  }, []);

  // Filtrar planes según findElement
  const filteredPlans = plans.filter(plan =>
    plan.nombre.toLowerCase().includes(findElement.toLowerCase())
  );

  return (
    <MainLayout>
      <section className="animate-fade-in-down md:mx-auto bg-white rounded shadow-xl w-full md:w-11/12 overflow-hidden mb-20">
        <div className="b p-3">
          <Location route="Planes nutricionales" subroute="Mis Planes" />
          <Title title="Planes" />
        </div>
        <div className="w-full h-2 md:h-4 bg-customGray"></div>

        <section className="p-3 mb-4">
          <div className="flex md:flex-row flex-col justify-end items-start md:items-center md:gap-3 w-full">
            <div>
              <CustomInput
                classNameInput="md:p-1.5"
                className="border-gray-300 md:p-0"
                Icon={CiSearch}
                placeholder="Buscar"
                value={findElement}
                onChange={handleChange}
              />
            </div>
            <div className="flex mt-2 md:mt-0 justify-end">
              <Button
                onClick={() => setAddPlan(true)}
                className="flex justify-start items-center gap-1"
                Icon={IoMdAdd}
                label="Añadir plan"
              />
            </div>
          </div>
        </section>

        <NutritionTable setPlans={setPlans} setAlertAsignedPlan={setAlertAsignedPlan} loading={loading} arregloColumns={arregloCol} arreglo={filteredPlans} />
      </section>

      <ModalAddPlan open={addPlan} setOpen={setAddPlan} />
      <SnackbarDefault message={"El plan se ha asignado correctamente"} open={alertAsignedPlan} setOpen={setAlertAsignedPlan}></SnackbarDefault>
    </MainLayout>
  );
};
