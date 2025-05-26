import React, { useState } from 'react'
import { MainLayout } from '../../layout/MainLayout'
import { ButtonSpinner, DaysSection, Location, SnackbarDefault, Title } from '../../components'
import { useEditPlan } from '../../store/useStoreNutrition'
import { MdOutlineKeyboardReturn } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useUpdatePlan } from '../../service/nutrition/useUpdatePlan'
import { TabsComponent } from '../../components/ui/tabs/Tabs'
export const EditPlanNutrition = () => {
  const [alert, setAlert] = useState(false)
  const planEditable = useEditPlan((state) => state.planEditado);
  const [loading, setLoading] = useState(false)
  const [selectNav, setSelectNav] = useState("Lunes")
  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  console.log(planEditable, "plan editbale");
  const handleActualizar = async () => {
    try {
      setLoading(true)
      const responseUpdate = await useUpdatePlan(planEditable)
      if (responseUpdate.status === 200) {
        setAlert(true)

      }


    } catch (e) {
      console.log(e);

    } finally {
      setLoading(false)
    }

  }
  return (
    <MainLayout> <section className="animate-fade-in-down md:mx-auto bg-white  rounded shadow-xl w-full md:w-11/12 overflow-hidden mb-20">
      <div className="b p-3">
        <Location
          route={`Editar Plan`}
          subroute={"Editar Plan"}
        ></Location>

        <Title title={"Modificar plan"}></Title>
      </div>
      {/* DIVISION GRAY */}
      <div className="w-full h-2 md:h-4 bg-customGray"></div>
      {/* ////////////////////////////////////////////// */}
      <section className='p-3'>
        <div className="flex flex-row-reverse justify-between items-start py-2 pb-4 md:pb-0 md:py-4">
          <Title title={planEditable.nombre}></Title>

          <Link
            className="w-1/12  md:w-[50px] flex justify-center items-center py-1 rounded text-white  bg-customNavBar hover:bg-customTextGreen"
            to={"/plansnutrition"}
          >
            <MdOutlineKeyboardReturn className="text-lg font-semibold md:text-2xl " />
          </Link>
        </div>

        {/* <div className="flex flex-wrap gap-x-20 mb-4 gap-y-6 justify-between md:justify-center  w-full md:gap-16">
          {days.map((day, i) => {
            return (
              <span
                key={i}
                onClick={() => setSelectNav(day)}
                className={`transition-all text-base  md:text-xl font-bold cursor-pointer p-1  ${selectNav === day &&
                  "border-b-2 border-customTextGreen text-customTextGreen md:text-2xl"
                  }`}
              >
                {day}
              </span>
            )
          })}

        </div> */}
        <div className='flex my-6 w-full justify-center items-center'>
        <TabsComponent days={days} selectNav={selectNav} setSelectNav={setSelectNav} />

        </div>


        {planEditable.dias.map((plan) => {
          if (plan.dia === selectNav) {
            return (
              <div key={plan.dia}>
                <div className='flex justify-end w-full'>
                  <ButtonSpinner onClick={handleActualizar} loading={loading} label='Guardar cambios'></ButtonSpinner>
                </div>
                <DaysSection selectNav={selectNav} editable={true} dataPlan={plan} day={plan.dia} data={plan.comidas}></DaysSection>

              </div>
            );
          }
          // else {
          //   return <Title title={"No se encontraron comidas asignadas a este dia"} className={"text-customTextBlue flex justify-center mt-6"}></Title>
          // }
        })}


      </section>

    </section>
      <SnackbarDefault message={"El plan se actualizo correctamente"} open={alert} setOpen={setAlert}></SnackbarDefault>

    </MainLayout>
  )
}
