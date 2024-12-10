import "./App.css";
import { Login } from "./pages";
import { Register } from "./pages";
import { useStoreSelectAuth } from "./store";
import logoProgressus from "/progressus.png";
import { SpinnerLog } from "./components/ui/spinnerLog/SpinnerLog";
import { LayoutLoginRegister } from "./layout/LayoutLoginRegiste";
import { SnackbarDefault, Spinner } from "./components";
import { useEffect, useState } from "react";
import { useAlertStore } from "./store/useAlertChangePassword";
import { useGetAllExercises } from "./service/plans/useGetExercises";
function App() {
  // MANEJO DE ESTADO PARA MOVERSE DE LOGIN A REGISTER
  const selectedAuth = useStoreSelectAuth((state) => state.auth);
  const setSelectedLogin = useStoreSelectAuth((state) => state.authLogin);
  const setSelectedRegister = useStoreSelectAuth((state) => state.authRegister);
  ///////////////////////
  // ALERTAs AL CAMBIAR CONTRASEÑA
  const alertSuccess = useAlertStore((state) => state.alertSuccess);
  const setAlertSuccess = useAlertStore((state) => state.setAlertSuccess);

  const alertDanger = useAlertStore((state) => state.alertDanger);
  const setAlertDanger = useAlertStore((state) => state.setAlertDanger);

  const [load, setLoad] = useState(true);
  useEffect(() => {
    const traerData = async () => {
      try {
        const data = await useGetAllExercises();
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoad(false);
      }
    };
    traerData();
  }, []);
  return (
    <LayoutLoginRegister>
      <div
        className={`animate-fade-in-down w-full min-h-screen  items-center  justify-center p-4 bg-customGray md:flex  md:flex-col md:items-start ${
          selectedAuth === "login" ? "md:justify-center" : "md:justify-start"
        }  `}
      >
        <div className="flex flex-col gap-4 mt-24 items-center justify-center  md:mt-0 md:w-full ">
          <img className="w-2/5 md:w-[195px]" src={logoProgressus} alt="" />
          <div className="flex justify-center gap-12 w-full md:gap-24">
            <span
              onClick={() => setSelectedLogin()}
              className={`transition-all font-bold cursor-pointer p-1  ${
                selectedAuth === "login" &&
                "border-b-2 border-customTextGreen text-customTextGreen md:text-lg"
              }`}
            >
              Ingresar
            </span>
            <span
              onClick={() => setSelectedRegister()}
              className={`transition-all font-bold cursor-pointer p-1 ${
                selectedAuth === "register" &&
                "border-b-2 border-customTextGreen text-customTextGreen md:text-lg"
              }`}
            >
              Registrarse
            </span>
          </div>
          {selectedAuth === "login" ? <Login></Login> : <Register></Register>}
        </div>
      </div>
      {/* BUEN CAMBIO DE CONTRASEÑA  */}
      <SnackbarDefault
        message={"Contraseña cambiada con exito ! "}
        severity={"success"}
        open={alertSuccess}
        setOpen={setAlertSuccess}
      ></SnackbarDefault>
      {/* ERROR AL CAMBIAR CONTRASEÑA */}
      <SnackbarDefault
        message={"Ocurrio un error , inténtelo nuevamente ! "}
        severity={"warnint"}
        open={alertDanger}
        setOpen={setAlertDanger}
      ></SnackbarDefault>
      <SpinnerLog open={load} />
    </LayoutLoginRegister>
  );
}

export default App;
